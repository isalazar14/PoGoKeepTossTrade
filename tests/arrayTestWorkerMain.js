onmessage = (e) => {
  if (e.data.msg == "run") {
    const TEST_LENGTH = 1e3;
    const MAX_THREADS = navigator.hardwareConcurrency - 1;
    // const NUM_BIT_SIZE = 16;
    // const NUM_BYTE_SIZE = NUM_BIT_SIZE/8
    const PARTIAL_ARR_LEN = TEST_LENGTH / MAX_THREADS;
    // const PARTIAL_ARR_BUFF_BYTES = PARTIAL_ARR_LEN*NUM_BYTE_SIZE;

    const partialArrays = {};
    for (let t = 0; t < MAX_THREADS; t++) {}
    // const result = new Uint16Array(TEST_LENGTH)

    // let threadsStarted = 0;
    let threadsDone = 0;
    for (let t = 0; t < MAX_THREADS; t++) {
      console.time("createShareArraydBuffer");
      console.timeEnd("createShareArraydBuffer");
      let currArrBuff = `arr${t}`;
      partialArrays[currArrBuff] = new Uint16Array(PARTIAL_ARR_LEN);
      partialArrays.arr0;
      let workerHelper = new Worker("./arrayTestWorkerHelper.js");
      workerHelper.onmessage = (e) => {
        if (e.data.msg == "done") {
          workerHelper.terminate();
          threadsDone++;
          let { offset, nums } = e.data.offset;
          results[offset] = nums;
        }
      };
      let startNum = t * PARTIAL_ARR_LEN;
      workerHelper.postMessage(
        {
          // cmd:'start',
          task: "createArray",
          i: t,
          startNum,
          endNum: PARTIAL_ARR_LEN,
          buffer: partialArrays[currArrBuff],
        },
        [partialArrays[currArrBuff]]
      );
      // postMessage(`started worker helper thread #${t})
      console.log(`started worker helper #${t}`);
    }
  }
};
