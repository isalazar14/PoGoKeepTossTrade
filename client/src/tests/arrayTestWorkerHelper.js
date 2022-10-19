const getRandNumBetween = (min = 0, max = 1) => {
  return Math.round(min + Math.random() * (max - min));
};
const createRandNumArr = (length, min = 0, max = 1) => {
  const newArr = Array(length);
  for (let i = 0; i < length; i++) {
    newArr[i] = getRandNumBetween(min, max);
  }
  return newArr;
};


onmessage = e => {
  if (e.data.task == "createArray") {
  // let buffer = new ArrayBuffer(BUFFER_SIZE);
  let uInt16Arr = new Uint16Array(BUFFER_SIZE)
  console.time("createArrA");
  const arrA = createRandNumArr(testLength, 10, 300);
  console.timeEnd("createArrA");
  // console.log("create ArrA time: ", (tA1-tA0))
  console.time("createArrB");
  const arrB = createRandNumArr(testLength, 1, 15);
  console.timeEnd("createArrB");
  // console.log("create ArrB time: ", (tB1-tB0))
  // console.log(arrA,arrB);
  // console.log(arrA.map((num, i)=>num*arrB[i]));
  console.time("SumProd");
  arrA.map((num, i)=>num*arrB[i]);
  // const sumProdAB = arrA.reduce(
  //   (total, num, i) => (total += num * arrB[i]),
  //   0
  // );
  console.timeEnd("SumProd");
  // console.log(sumProdAB);
  postMessage({msg:'done'})
  }
}
