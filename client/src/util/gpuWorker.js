import {GPU} from 'gpu.js'
import {readRemoteFile} from 'react-papaparse'
import readRemoteFilePromise from './csvReaderPromise';
// import {cpm, getRandCpm, /* findNearestCpm */} from '../tests/levelLookupPerfTest'


console.log("in gpujsTestWorker.js");
// document.querySelector("#cpuCores").innerText = `${navigator.hardwareConcurrency} cpu cores`;
const gpuG = new GPU({ mode: "gpu" });
const gpuC = new GPU({ mode: "cpu" });
const BATCH_SIZE = 730;

{ // adding gpu features table to DOM
  // const gpuFeatures = [
  //   "isGPUSupported",
  //   "isKernelMapSupported",
  //   "isOffscreenCanvasSupported",
  //   "isWebGLSupported",
  //   "isWebGL2Supported",
  //   "isHeadlessGLSupported",
  //   "isCanvasSupported",
  //   "isGPUHTMLImageArraySupported",
  //   "isSinglePrecisionSupported",
  // ];
  // // gpuFeatures.forEach(f=>console.log(f, GPU[f]));
  // gpuFeatures.forEach((f) => {
  //   let row = document.createElement("tr");
  //   row.innerHTML = `<td>${f}</td><td>${GPU[f]}</td>`;
  //   document.querySelector("#gpuFeatureList").appendChild(row);
  // });
  // // document.querySelector('#gpuSupport').innerText = `GPU${GPU.isGPUSupported ? "" : " NOT"} supported`;
  // // document.querySelector('#gpuSupport').style.color = GPU.isGPUSupported ? "green" : "red";
  // document.querySelector("#timeNow").innerText = new Date();
  // setInterval(() => {
  //   document.querySelector("#timeNow").innerText = new Date();
  // }, 1000);
}

const cpms = [0.094,0.1351374318,0.16639787,0.192650919,0.21573247,0.2365726613,0.25572005,0.2735303812,0.29024988,0.3060573775,0.3210876,0.3354450362,0.34921268,0.3624577511,0.3752356,0.387592416,0.39956728,0.4111935514,0.4225,0.4329264091,0.44310755,0.4530599591,0.4627984,0.472336093,0.48168495,0.4908558003,0.49985844,0.508701765,0.51739395,0.5259425113,0.5343543,0.5426357375,0.5507927,0.5588305862,0.5667545,0.5745691333,0.5822789,0.5898879072,0.5974,0.6048236651,0.6121573,0.6194041216,0.6265671,0.6336491432,0.64065295,0.6475809666,0.65443563,0.6612192524,0.667934,0.6745818959,0.6811649,0.6876849038,0.69414365,0.70054287,0.7068842,0.7131691091,0.7193991,0.7255756136,0.7317,0.7347410093,0.7377695,0.7407855938,0.74378943,0.7467812109,0.74976104,0.7527290867,0.7556855,0.7586303683,0.76156384,0.7644860647,0.76739717,0.7702972656,0.7731865,0.7760649616,0.77893275,0.7817900548,0.784637,0.7874736075,0.7903,0.792803968,0.79530001,0.797800015,0.8003,0.802799995,0.8053,0.8078,0.81029999,0.812799985,0.81529999,0.81779999,0.82029999,0.82279999,0.82529999,0.82779999,0.83029999,0.83279999,0.83529999,0.83779999,0.84029999];

{ // looking for max cp / sp entries for given pokeform (via CPU)
  // console.log(cpms);
  //creating iv combos in CPU
  // console.time("singleMonCpAtAllCpmIvCombos");
  // const aB = 198,
  //   dB = 189,
  //   sB = 190;
  // const cpmCount = cpms.length;
  // const calcs = [];
  // let maxCp = 0;
  // let maxSp = 0;
  // let maxCpEntries = {};
  // let maxSpEntries = {};
  // for (let i = 0; i < cpmCount; i++) {
  //   for (let aI = 0; aI < 16; aI++) {
  //     for (let dI = 0; dI < 16; dI++) {
  //       for (let sI = 0; sI < 16; sI++) {
  //         // get CP
  //         const a = aB + aI,
  //           d = dB + dI,
  //           s = sB + sI;
  //         const cpmi = cpms[i];
  //         const cp0 = ((a * Math.sqrt(d) * Math.sqrt(s) * cpmi) ^ 2) / 10;
  //         const cp = Math.max(10, cp0 >> 0);
  //         // get SP
  //         const sp = (a * cpmi * d * cpmi * ((s * cpmi) >> 0)) / 1000;
  //         // const entry = {
  //         //   level: i / 2 + 1,
  //         //   a,
  //         //   d,
  //         //   s,
  //         //   cp,
  //         //   sp,
  //         // };
  //         const entry = [
  //           (i / 2 + 1),
  //           a,
  //           d,
  //           s,
  //           cp,
  //           sp,
  //         ];
  //         calcs.push(entry);
  //         // if (cp >= maxCp) {
  //         //   if (cp > maxCp) maxCpEntries = [entry];
  //         //   else maxCpEntries.push(entry);
  //         //   maxCp = cp;
  //         // }
  //         // if (cp >= maxCp) {
  //         //   if (cp > maxCp) maxCpEntries = [entry];
  //         //   else maxCpEntries.push(entry);
  //         //   maxCp = cp;
  //         // }
  //       }
  //     }
  //   }
  // }
  // console.timeEnd("singleMonCpAtAllCpmIvCombos"); // ~1s / 1000 reps of creating iv combos
  // console.log(calcs)
}

{ // createIvCombos function (currently causing problems for code further down)
  // const createIvCombos = () => {
  //   const ivs = Array(4096);
  //   let i = 0;
  //   console.time('creatIvCombos');
  //   for (let aI = 0; aI < 16; aI++) {
  //     for (let dI = 0; dI < 16; dI++) {
  //       for (let sI = 0; sI < 16; sI++) {
  //         ivs[i] = [i+1, aI, dI, sI];
  //         i++;
  //       }
  //     }
  //   }
  //   console.timeEnd('creatIvCombos');
  //   return ivs
  // }
  // const ivs = createIvCombos()
}
const ivs = Array(4096);
{ // filling iv combos array
  let i = 0;
  console.time("creatIvCombos");
  for (let aI = 0; aI < 16; aI++) {
    for (let dI = 0; dI < 16; dI++) {
      for (let sI = 0; sI < 16; sI++) {
        ivs[i] = [i, aI, dI, sI];
        i++;
      }
    }
  }
  console.timeEnd("creatIvCombos");
}
// console.log(ivs);

console.log("BATCH SIZE:", BATCH_SIZE)

const calcCp_gpuG = gpuG.createKernel(function (pokeForms, ivs, cpms) {
  /**
   * dimensions in .setOutput() are in [x, y, z] order,
   * and correspond to the length of the arrays in the respective thread (this.thread._).
   * multidimensional output will be nested in reverse order:
   * if output is [x,y] -> result will be [y[x]] -> array of length y, with nested arrays of length x
   * if output is [x,y,z] -> result will be [z[y[x]]] -> array of length z, with nested arrays of length y, which also has nested arrays of length x
   **/

  /**
   * I want output as [pokemonForms[ivs[cpms]]] so...
   * pokeForms  -> this.thread.z
   * ivs        -> this.thread.y
   * cpms       -> this.thread.x
   **/

  /**
   * pokeForms[this.thread.z][2] -> atkBase
   * pokeForms[this.thread.z][3] -> defBase
   * pokeForms[this.thread.z][3] -> staBase
   * ivs[this.thread.y][1] -> atkIv
   * ivs[this.thread.y][2] -> defIv
   * ivs[this.thread.y][3] -> staIv
   * cpms[this.thread.x] -> cpm
   **/

  // function calcCp (atk, def, sta, cpm) {
  //   // atk, def, sta are base+IV
  //   return Math.max(10,
  //   ((a * Math.sqrt(d) * Math.sqrt(s) * cpm*cpm )  / 10) >> 0
  // )}

  const atkBaseIdx = 2;
  const defBaseIdx = 3;
  const staBaseIdx = 4;
  const atkIvIdx = 1;
  const defIvIdx = 2;
  const staIvIdx = 3;

  const a =
    pokeForms[this.thread.z][atkBaseIdx] + ivs[this.thread.y][atkIvIdx];
  const d =
    pokeForms[this.thread.z][defBaseIdx] + ivs[this.thread.y][defIvIdx];
  const s =
    pokeForms[this.thread.z][staBaseIdx] + ivs[this.thread.y][staIvIdx];
  const cpm = cpms[this.thread.x];
  const cp = Math.max(
    10,
    ((a * Math.sqrt(d) * Math.sqrt(s) * cpm * cpm) / 10) >> 0
  );
  const sp = ((a * cpm * d * cpm * (s * cpm)) >> 0) / 1000;
  // return [a,Math.sqrt(d),Math.sqrt(s),cpm*cpm] //
  // return [pokeForms[this.thread.z][2], ivs[this.thread.y][1], cpms[this.thread.x]]
  return [pokeForms[this.thread.z][0], cpm, cp, sp];
}).setOutput([99, 4096, BATCH_SIZE]); // [x, y, z] -> matches this.thread._

const calcCpmsAtCpLimit_cpu = (cpLimit, pokeForms, ivs) => {
  const atkBaseIdx = 2, defBaseIdx = 3, staBaseIdx = 4;
  const atkIvIdx = 1, defIvIdx = 2, staIvIdx = 3;

  const calcCpms = Array(pokeForms.length);
  let y = 0, x = 0;
  for (let pf of pokeForms) {
    calcCpms[y] = Array(4096);
    for (let ivSet of ivs) {
      let a = pf[atkBaseIdx] + ivSet[atkIvIdx];
      let d = pf[defBaseIdx] + ivSet[defIvIdx];
      let s = pf[staBaseIdx] + ivSet[staIvIdx];
      calcCpms[y][x] = Math.sqrt(
        (cpLimit * 10) / (a * Math.sqrt(d) * Math.sqrt(s))
      );
      x++;
    }
    y++;
    x = 0;
  }
  return calcCpms;
};

const calcCpmsAtCpLimit_gpuG = gpuG.createKernel(function (cpLimit, pokeForms, ivs) {
    const atkBaseIdx = 2,
      defBaseIdx = 3,
      staBaseIdx = 4;
    const atkIvIdx = 1,
      defIvIdx = 2,
      staIvIdx = 3;

    const a =
      pokeForms[this.thread.y][atkBaseIdx] + ivs[this.thread.x][atkIvIdx];
    const d =
      pokeForms[this.thread.y][defBaseIdx] + ivs[this.thread.x][defIvIdx];
    const s =
      pokeForms[this.thread.y][staBaseIdx] + ivs[this.thread.x][staIvIdx];
    const calcCpm = Math.sqrt(
      (cpLimit * 10) / (a * Math.sqrt(d) * Math.sqrt(s))
    );
    return calcCpm;
  }).setPipeline(true).setOutput([4096, BATCH_SIZE]);
 
const calcCpmsAtCpLimit_gpuC = gpuC.createKernel(function (cpLimit, pokeForms, ivs) {
    const atkBaseIdx = 2,
      defBaseIdx = 3,
      staBaseIdx = 4;
    const atkIvIdx = 1,
      defIvIdx = 2,
      staIvIdx = 3;

    const a =
      pokeForms[this.thread.y][atkBaseIdx] + ivs[this.thread.x][atkIvIdx];
    const d =
      pokeForms[this.thread.y][defBaseIdx] + ivs[this.thread.x][defIvIdx];
    const s =
      pokeForms[this.thread.y][staBaseIdx] + ivs[this.thread.x][staIvIdx];
    const calcCpm = Math.sqrt(
      (cpLimit * 10) / (a * Math.sqrt(d) * Math.sqrt(s))
    );
    return calcCpm;
  }).setPipeline(true).setOutput([4096, BATCH_SIZE]);
{ //getTrueCpmIdxsFromCalcCpms_gpuG & getTrueCpmIdxsFromCalcCpms_gpuC
// const getTrueCpmIdxsFromCalcCpms_gpuG = gpuG.createKernel(function (calcCpms, cpms) {
//     for (let i = 98; i > -1; i--) {
//       if (cpms[i] <= calcCpms[this.thread.y][this.thread.x]) return i;
//     }
//     return 0;
//   }).setPipeline(true).setOutput([4096, BATCH_SIZE]);

// const getTrueCpmIdxsFromCalcCpms_gpuC = gpuC.createKernel(function (calcCpms, cpms) {
//     for (let i = 98; i > -1; i--) {
//       if (cpms[i] <= calcCpms[this.thread.y][this.thread.x]) return i;
//     }
//     return 0;
//   }).setPipeline(true).setOutput([4096, BATCH_SIZE]);

// const getTrueCpmsFromCpmIdxs_gpuG = gpuG.createKernel(function (cpmIdxs, cpms) {
//     return cpms[cpmIdxs[this.thread.y][this.thread.x]];
//   }).setOutput([4096, BATCH_SIZE]);
}
const getTrueCpmsFromCalcCpms_cpu = (calcCpms, cpms) => {
  const yLength = calcCpms.length;
  // const xLength = cpms.length;
  const trueCpms = Array(yLength);
  for (let y = 0; y < yLength; y++) {
    trueCpms[y] = Array(4096);
    for (let x = 0; x < 4096; x++) {
      trueCpms[y][x] = cpms[0];
      for (let i = 98; i > -1; i--) {
        if (cpms[i] <= calcCpms[y][x]) {
          trueCpms[y][x] = cpms[i];
          break;
        }
      }
    }
  }
  return trueCpms;
};

const getTrueCpmsFromCalcCpms_gpuG = gpuG.createKernel(function (calcCpms, cpms) {
  for (let i = 98; i > -1; i--) {
    if (cpms[i] <= calcCpms[this.thread.y][this.thread.x]) return cpms[i];
  }
  return cpms[0];
}).setOutput([4096, BATCH_SIZE]);

{ // gpuC version 4x slower than gpuG version
// const getTrueCpmsFromCalcCpms_gpuC = gpuC.createKernel(function (calcCpms, cpms) {
//     for (let i = 98; i > -1; i--) {
//       if (cpms[i] <= calcCpms[this.thread.y][this.thread.x]) return cpms[i];
//     }
//     return cpms[0];
//   }).setOutput([4096, BATCH_SIZE]);
}

// const getPokeForms = () => {
//   readRemoteFilePromise("http://localhost:8000/data/pokemon_forms.csv", {
//     download: true,
//     worker:true,
//     dynamicTyping: true,
//     skipEmptyLines: true,
//   });
// };

export const runTest = async () => {
  console.log("running test in gpuWorker...");
  try {
    // const results = await getPokeForms();
    const results = await readRemoteFilePromise("http://localhost:8000/data/pokemon_forms.csv", {
      download: true,
      worker:true,
      dynamicTyping: true,
      skipEmptyLines: true,
    });
    results.data.shift();
    const pokeForms = results.data.slice(0, BATCH_SIZE);
    console.log("pokeForms", pokeForms)
    // let batchStart = 0;
    // let batchStop = batchStart+BATCH_SIZE;
    // while (batchStop < pokeForms.)

    console.log("-------------------------");
    console.log("~~~ calcCpmsAtCpLimit ~~~");
    // console.log("-------------------------");
    
    const calcCpms_cpu_t0 = performance.now();
    const calcCpms_cpu = calcCpmsAtCpLimit_cpu(1500, pokeForms, ivs);
    const calcCpms_cpu_t1 = performance.now();
    console.log(`calcCpms_cpu: ${calcCpms_cpu_t1 - calcCpms_cpu_t0} ms`);
    // console.log(calcCpms_cpu, "");
    
    const calcCpms_gpuG_t0 = performance.now();
    const calcCpms_gpuG = calcCpmsAtCpLimit_gpuG(1500, pokeForms, ivs);
    const calcCpms_gpuG_t1 = performance.now();
    console.log(`calcCpms_gpuG: ${calcCpms_gpuG_t1 - calcCpms_gpuG_t0} ms`);
    // console.log(calcCpms_gpuG) // texture
    
    const calcCpms_gpuC_t0 = performance.now();
    const calcCpms_gpuC = calcCpmsAtCpLimit_gpuC(1500, pokeForms, ivs);
    const calcCpms_gpuC_t1 = performance.now();
    console.log(`calcCpms_gpuC: ${calcCpms_gpuC_t1 - calcCpms_gpuC_t0} ms`);
    // console.log(calcCpms_gpuC, "")
    {
    // // getTrueCpmIdxsFromCalcCpms_gpuG
    // const getTrueCpmIdxs_gpuG_t0 = performance.now();
    // let trueCpmIdxs = getTrueCpmIdxsFromCalcCpms_gpuG(calcCpms_gpuG, cpms);
    // const getTrueCpmIdxs_gpuG_t1 = performance.now();
    // console.log(`getTrueCpmIdxs_gpuG: ${getTrueCpmIdxs_gpuG_t1-getTrueCpmIdxs_gpuG_t0} ms`)
    // console.log(trueCpmIdxs) // texture

    // // getTrueCpmsFromCpmIdxs_gpuG
    // const getTrueCpmFromIdxs_gpuG_t0 = performance.now();
    // let trueCpmsFromIdxs = getTrueCpmsFromCpmIdxs_gpuG(trueCpmIdxs, cpms);
    // const getTrueCpmFromIdxs_gpuG_t1 = performance.now();
    // console.log(`getTrueCpmFromIDXs_gpuG: ${getTrueCpmFromIdxs_gpuG_t1-getTrueCpmFromIdxs_gpuG_t0} ms`)
    // console.log(trueCpmsFromIdxs);
    }

    console.log("-------------------------");
    console.log("~~~ getTrueCpmFromCALCCPMs ~~~");
    // console.log("-------------------------");
    // getTrueCpmsFromCalcCpms_cpu
    const getTrueCpmFromCalcCpms_cpu_t0 = performance.now();
    let trueCpmsFrpmCalcCpms_cpu = getTrueCpmsFromCalcCpms_cpu(calcCpms_cpu, cpms);
    const getTrueCpmFromCalcCpms_cpu_t1 = performance.now();
    console.log(`getTrueCpmFromCALCCPMs_cpu: ${getTrueCpmFromCalcCpms_cpu_t1 - getTrueCpmFromCalcCpms_cpu_t0} ms`)
    // console.log(trueCpmsFrpmCalcCpms_cpu, "");

    // getTrueCpmsFromCalcCpms_gpuG
    const getTrueCpmFromCalcCpms_gpuG_t0 = performance.now();
    let trueCpmsFrpmCalcCpms_gpuG = getTrueCpmsFromCalcCpms_gpuG(calcCpms_gpuG, cpms);
    const getTrueCpmFromCalcCpms_gpuG_t1 = performance.now();
    console.log(`getTrueCpmFromCALCCPMs_gpuG: ${getTrueCpmFromCalcCpms_gpuG_t1 - getTrueCpmFromCalcCpms_gpuG_t0} ms`)
    // console.log(trueCpmsFrpmCalcCpms_gpuG, "");

  } catch (err) {
    console.log(err)
  }
}
{
// const REPS = 10;
// const approxCpms = [];
// for (let i=0; i<REPS; i++) {
//   approxCpms.push(getRandCpm())
// }
// const findNearestCpm = (approxCpm) => {
//   let i = 0;
//   while (cpm[i] <= approxCpm) i++;
//   return i-1;
// }

// const gpu = new GPU({mode: 'dev'});

// // const reps = arr.length
// const gpuCpmLookupTest = gpu.createKernel(function(arr) {
//   for (let i=0; i < 10; i++) {
//     let j = 0;
//     while (cpm[j] <= arr[this.thread.x]) j++;
//     return cpm[j-1];
//   }
// }).setOutput([10])

// // const idxs = gpuCpmLookupTest(approxCpms);
// // console.log(idxs)
// const getRandNumBetween = (min=0, max=1) =>{
//   return Math.round(min + Math.random()*(max-min))
// }
// // const min = 12;
// // const max = 13;
// // const reps = 20;
// // const rands = {};
// // for(let i=0; i<reps; i++) {
// //   let num = getRandNumBetween(min,max);
// //   if (num in rands) rands[num]++;
// //   else rands[num] =  1;
// //   if (num < min || num > max) console.error("out of bounds")
// // }
// // console.log(rands);

// const createRandNumArr = (length, min=0, max=1) => {
//   const newArr = Array(length);
//   for (let i =0; i<length;i++){
//     newArr[i] = getRandNumBetween(min, max);
//   }
//   return newArr;
// }
// const testLength = 3
// console.time("createArrA");
// const arrA = createRandNumArr(testLength,10,300);
// console.timeEnd("createArrA");
// // console.log("create ArrA time: ", (tA1-tA0))
// console.time("createArrB");
// const arrB = createRandNumArr(testLength,1,15);
// console.timeEnd("createArrB");
// // console.log("create ArrB time: ", (tB1-tB0))
// // console.log(arrA,arrB);
// // console.log(arrA.map((num, i)=>num*arrB[i]));
// console.time("SumProd");
// const sumProdAB = arrA.reduce((total, num, i) => total += (num*arrB[i]), 0);
// console.timeEnd("SumProd");
// console.log(sumProdAB);
// // const gpujsTest = gpu.createKernel(function(a,b){

// // })
}

