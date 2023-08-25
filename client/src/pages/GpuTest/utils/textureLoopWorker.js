import { GPU } from "gpu.js";
/* TESTING REUSING A KERNEL FOR DERIVED ITERATIONS */
//#region SETUP, CREATE KERNELS

const arrays1D = {
  unsorted: [2, 5, 3, 1, 4],
  sortedDesc: [5, 4, 3, 2, 1],
  sortedAsc: [1, 2, 3, 4, 5],
};

const arrays2D = {
  unsorted: [
    [2, 4, 5, 1, 3],
    [6, 10, 7, 9, 8],
    [14, 12, 13, 15, 11],
    [16, 18, 17, 20, 19],
  ],
};

const commonToTextureSettings = {
    pipeline: true,
    immutable: true,
    dynamicOutput: true,
    // optimizeFloatMemory: true,
  },
  commonTextureLoopSettings = {
    pipeline: true,
    immutable: true,
    dynamicOutput: true,
    // optimizeFloatMemory: true,
  };

const gpu = new GPU({ mode: "gpu" });

const array1DToTexture = gpu.createKernel(function (input) {
  return input[this.thread.x];
}, commonToTextureSettings);

const array2DToTexture = gpu.createKernel(function (input) {
  return input[this.thread.y][this.thread.x];
}, commonToTextureSettings);

const array1DShiftRight = gpu.createKernel(function (array, lastIdx) {
  const { x } = this.thread;
  if (x > 0) return array[x - 1];
  else return array[lastIdx];
}, commonTextureLoopSettings);

const array2DShiftRight = gpu.createKernel(function (array, lastIdx) {
  const { x, y } = this.thread;
  if (x > 0) return array[y][x - 1];
  else return array[y][lastIdx];
}, commonTextureLoopSettings);

/* lastIdx:   last index of array (cannot use 'arary.length' in kernel) */
/* phase:     0 == even phase | 1 == odd phase */
/* sortOrder: 1 == ascending | -1 == descending */
const oddEvenSort1D_halfPass = gpu.createKernel(
  function (array, lastIdx, phase, sortOrder) {
    const { x } = this.thread;
    /* Must explicitly coerce to boolean */
    const isParityCongruent = x % 2 == phase ? true : false;
    let curVal = array[x];

    if (isParityCongruent) {
      /* IDXCOMPARE LEFT */
      /* first idx can't compare left */
      if (x == 0) {
        return curVal;
      }
      let leftVal = array[x - 1];
      return curVal * sortOrder > leftVal * sortOrder ? curVal : leftVal;
      /* multiply by direction ( 1 or -1 ) to make comparison correct in all cases  */
    }
    /* COMPARE RIGHT */
    /* lastIdx can't compare right */
    if (x == lastIdx) {
      return curVal;
    }
    let rightVal = array[x + 1];
    const result =
      curVal * sortOrder < rightVal * sortOrder ? curVal : rightVal;
    return result;
  },
  {
    ...commonTextureLoopSettings,
    // output: [4],
  }
);

//#endregion SETUP, CREATE KERNELS

// self.onmessage = (event) => {
console.log("running textureLoop test");

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
console.log("~~~ shiftArray1D ~~~");

const shiftArray1DParams = {
  array: arrays1D.sortedAsc,
  outputWidth: undefined,
  outputHeight: undefined,
  lastXIdx: undefined,
};

shiftArray1DParams.outputWidth = shiftArray1DParams.array.length;
shiftArray1DParams.outputHeight = shiftArray1DParams.array.length;
shiftArray1DParams.lastXIdx = shiftArray1DParams.array.length - 1;

array1DToTexture.setOutput([shiftArray1DParams.outputWidth]);
array1DShiftRight.setOutput([shiftArray1DParams.outputWidth]);

let resultShiftArray1D = array1DToTexture(shiftArray1DParams.array);
for (let i = 0; i < shiftArray1DParams.outputWidth - 1; i++) {
  resultShiftArray1D = array1DShiftRight(
    resultShiftArray1D,
    shiftArray1DParams.lastXIdx
  );
  console.log([...resultShiftArray1D.toArray()]);
}
// const result1DArr = [...resultShiftArray1D.toArray()];
// console.log(result1DArr);
resultShiftArray1D.delete();
console.log("-------------------------------------------");

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

console.log("~~~ shiftArray2D ~~~");

const shiftArray2DParams = {
  array: arrays2D.unsorted,
  outputWidth: undefined,
  outputHeight: undefined,
  lastXIdx: undefined,
};
shiftArray2DParams.outputWidth = shiftArray2DParams.array[0].length;
shiftArray2DParams.outputHeight = shiftArray2DParams.array.length;
shiftArray2DParams.lastXIdx = shiftArray2DParams.array[0].length - 1;

array2DToTexture.setOutput([shiftArray2DParams.outputWidth]);
array2DShiftRight.setOutput([shiftArray2DParams.outputWidth]);
let resultShiftArray2D = array2DToTexture(shiftArray2DParams.array);
for (let i = 0; i < shiftArray1DParams.outputWidth - 1; i++) {
  resultShiftArray2D = array2DShiftRight(
    resultShiftArray2D,
    shiftArray2DParams.lastXIdx
  );
  // console.log(resultShiftArray2D.toArray().map((innerArr) => [...innerArr]));
}
// const result2DArr = resultShiftArray2D.toArray().map((innerArr) => [...innerArr]);
// console.log(result2DArr);
resultShiftArray2D.delete();

console.log("-------------------------------------------");

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

console.log("~~~ sortArray1D ~~~");

const sortArray1DParams = {
  array: arrays1D.sortedAsc,
  ODD_PHASE: 1,
  EVEN_PHASE: 0,
  outputWidth: undefined,
  lastIdx: undefined,
  sortIterationCount: undefined,
  sortOrder: undefined,
};
sortArray1DParams.outputWidth = sortArray1DParams.array.length;
sortArray1DParams.lastIdx = sortArray1DParams.array.length - 1;
sortArray1DParams.sortIterationCount = sortArray1DParams.array.length / 2;
sortArray1DParams.sortOrder = -1;

oddEvenSort1D_halfPass.setOutput([sortArray1DParams.outputWidth]);
array1DToTexture.setOutput([sortArray1DParams.outputWidth]);

// let sorted1D = array1DToTexture(sortArray1DParams.array);
let sorted1D;
try {
  for (let i = 0; i < sortArray1DParams.sortIterationCount; i++) {
    if (sorted1D) sorted1D.delete();
    /* ODD PHASE PASS */
    console.log(`iteration ${i + 1} - ODD`);
    sorted1D = oddEvenSort1D_halfPass(
      sorted1D ?? sortArray1DParams.array,
      sortArray1DParams.lastIdx,
      sortArray1DParams.ODD_PHASE,
      sortArray1DParams.sortOrder
    );
    console.log([...sorted1D.toArray()]);
    // sorted1D.delete();

    /* EVEN PHASE PASS */
    console.log(`iteration ${i + 1} - EVEN`);
    sorted1D = oddEvenSort1D_halfPass(
      sorted1D,
      sortArray1DParams.lastIdx,
      sortArray1DParams.EVEN_PHASE,
      sortArray1DParams.sortOrder
    );
    console.log([...sorted1D.toArray()]);
    // sorted1D.delete();
  }
} catch (error) {
  console.error(error);
}
try {
  console.log([...sorted1D.toArray()]);
  sorted1D.delete();
} catch (error) {
  console.error(error);
}

console.log("-------------------------------------------");
console.log("finished textureLoop test");
// };
