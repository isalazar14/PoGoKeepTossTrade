import { GPU, Texture, input } from "gpu.js";
import { createIvMatrix, filterPokeforms, getFullCpmList, getPfIvLevelsSPsAtCpLimit_GPU, gpuOddEvenSort_evenPhase, gpuOddEvenSort_oddPhase, warmupGpu } from "./GpuTestCore";
import { GpuPokeThis, GpuTestWorkerTaskMessage, IGpuPokeConstants, PokeformFilterOption } from "../types";
import { getPfIvLevelsSPsAtCpLimit_CPU, saveAsFile, sortPfIVsAtCpLimit_CPU, timeTest } from "./GpuTestCore";

const gpuG = new GPU({ mode: 'gpu' })
const gpuC = new GPU({ mode: 'cpu' })

const gmCPMs = [0.094, 0.16639787, 0.21573247, 0.25572005, 0.29024988, 0.3210876, 0.34921268, 0.3752356, 0.39956728, 0.4225, 0.44310755, 0.4627984, 0.48168495, 0.49985844, 0.51739395, 0.5343543, 0.5507927, 0.5667545, 0.5822789, 0.5974, 0.6121573, 0.6265671, 0.64065295, 0.65443563, 0.667934, 0.6811649, 0.69414365, 0.7068842, 0.7193991, 0.7317, 0.7377695, 0.74378943, 0.74976104, 0.7556855, 0.76156384, 0.76739717, 0.7731865, 0.77893275, 0.784637, 0.7903, 0.7953, 0.8003, 0.8053, 0.8103, 0.8153, 0.8203, 0.8253, 0.8303, 0.8353, 0.8403, 0.8453];
const allCpms = getFullCpmList(gmCPMs, "array") as [number, number][]
const allIvs = createIvMatrix()

onmessage = (event: GpuTestWorkerTaskMessage) => {
  switch (event.data.task) {
    case 'gpuWarmup': {
      const warmupSize = 100
      console.log('Warming up GPU');
      warmupGpu(gpuG, warmupSize, 'gpuG')
      // warmupGpu(gpuC, warmupSize, 'gpuC')
      console.log("GPU warmup finished");
    }
      break;

    case 'runTest': {
      //#region SETUP
      const { testSettings, pokeForms: pokeforms } = event.data.payload!
      // console.log('worker running');
      const testParams = {
        PF_BATCH_SIZE: testSettings.pfBatchSize ?? pokeforms.length /* 0 = no limit */,
        IV_BATCH_SIZE: testSettings.ivBatchSize ?? 4096 /* 0 = no limit */,
        IV_FLOOR: testSettings.ivFloor ?? 0,
        CP_LIMIT: testSettings.cpLimit ?? 9999,
        MAX_LEVEL: testSettings.maxLevel ?? 51,
        TARGET_LEVELS: testSettings.targetLevels,
        // POKEFORMS_CSV_LOCATION_URL:
        //   // "http://localhost:8000/data/pokemon_forms.csv" // expressServer:
        //   // "http://localhost:5500/client/src/data/csv/pokemon_forms.csv" // liveServer
        //   "pokemon_forms.csv",
      };
      // console.log(testParams);


      const pokeformFilter: PokeformFilterOption = {
        /* USE ZERO OR ONE OPTION */
        limit: testParams.PF_BATCH_SIZE,

        // pIdRange: [3, 3], /* [start, end] end-inclusive */

        // pfSelection: [
        // /* [pId, fId] */
        //   [3,1],
        //   [6,1],
        //   [9,1]
        // ],
      }

      const kernelOutputSize = { x: 0, y: 0, z: 0 }

      const testPokeforms = !pokeformFilter
        ? pokeforms
        : filterPokeforms(pokeforms, pokeformFilter)

      let testIvs = allIvs
      if (testParams.IV_FLOOR) testIvs = createIvMatrix(testParams.IV_FLOOR)
      if (testParams.IV_BATCH_SIZE) testIvs = testIvs.slice(0, testParams.IV_BATCH_SIZE);

      const maxLevelIdx = (testSettings.maxLevel ?? 51) * 2 - 2;
      const cpmLengthAtMaxLevel = maxLevelIdx + 1;
      const testCpms = allCpms.slice(0, cpmLengthAtMaxLevel);

      kernelOutputSize.y = testPokeforms.length
      kernelOutputSize.x = testIvs.length;

      // prettier-ignore
      const testPokeformsFlat = input(testPokeforms.flat(), [testPokeforms[0].length, testPokeforms.length]);
      // prettier-ignore
      const testIvsFlat = input(testIvs.flat(), [testIvs[0].length, testIvs.length]);
      // prettier-ignore
      const testCpmsFlat = input(testCpms.flat(), [testCpms[0].length, testCpms.length]);

      //#endregion SETUP

      //#region RUN CALCS / PERF TESTS

      /* TODO: HANDLE SHADOW MONS */

      //#region CPU TESTS
      console.log("~~~ calcCpmsAtCpLimit ~~~");


      /* CPU - GET MAX LEVEL/CPM, CALCULATE SPs*/
      const pFIvLevelsSPsAtCpLimit_cpu = timeTest({
        calcName: "getPfIvLevelsSPsAtCpLimit_CPU",
        fn: () => getPfIvLevelsSPsAtCpLimit_CPU(testParams.CP_LIMIT, pokeforms, testIvs, testCpms),
        logResult: false,
      })

      /* CPU - SORT SPs */
      const sortedPfIVsAtCpLimit_cpu = timeTest({
        calcName: "sortPfIVsAtCpLimit_CPU",
        fn: () => sortPfIVsAtCpLimit_CPU(pFIvLevelsSPsAtCpLimit_cpu.result, testPokeforms, testIvs, testCpms),
        logResult: true,
      });

      //#endregion CPU TESTS

      //#region CREATE GPU KERNELS

      const getPfIvLevelsSPsAtCpLimit_kernel = gpuG.createKernel(getPfIvLevelsSPsAtCpLimit_GPU, {
        output: [kernelOutputSize.x, kernelOutputSize.y],
        pipeline: true,
        optimizeFloatMemory: true,
        tactic: "precision",
        // tactic: "speed",
        // fixIntegerDivisionAccuracy: true,
        immutable: true
      });

      const sortPfIVsAtCpLimit_kernel = gpuG.createKernel(sortPfIVsAtCpLimit_CPU, {
        output: [kernelOutputSize.x, kernelOutputSize.y],
        // pipeline: true,
        // optimizeFLoatMemory: true,
        // tactic: "precision",
        // tactic: "speed",
        // fixIntegerDivisionAccuracy: true
      });
      console.log(sortPfIVsAtCpLimit_kernel.toJSON())


      const gpuOddEvenSort_oddPhase_kernel = gpuG.createKernel(gpuOddEvenSort_oddPhase, {
        output: [kernelOutputSize.x, kernelOutputSize.y],
        pipeline: true,
        optimizeFloatMemory: true,
        tactic: "precision",
        // tactic: "speed",
        // fixIntegerDivisionAccuracy: true
      });

      const gpuOddEvenSort_evenPhase_kernel = gpuG.createKernel(gpuOddEvenSort_evenPhase, {
        output: [kernelOutputSize.x, kernelOutputSize.y],
        pipeline: true,
        optimizeFloatMemory: true,
        tactic: "precision",
        // tactic: "speed",
        // fixIntegerDivisionAccuracy: true
      });

      // const gpuOddEvenSort_kernel = gpuG.combineKernels(
      //   gpuOddEvenSort_oddPhase_kernel,
      //   gpuOddEvenSort_evenPhase_kernel,
      //   function (this: GpuPokeThis, input, spIdx) {
      //     let result: Texture | undefined  = undefined
      //     for (let i = 1; i < this.constants.ivCount; i++) {
      //       result = gpuOddEvenSort_evenPhase_kernel(gpuOddEvenSort_oddPhase_kernel(input, spIdx), spIdx) as Texture
      //     }
      //     return result;
      //   }
      // ).setConstants<IGpuPokeConstants>({ivCount: testIvs.length})

      // const getPfIvLevelsSPsAtCpLimit_gpuOddEvenSort_kernel = gpuG.combineKernels(
      //   getPfIvLevelsSPsAtCpLimit_kernel,
      //   gpuOddEvenSort_oddPhase_kernel,
      //   gpuOddEvenSort_evenPhase_kernel,
      //   function (cpLimit, pokeForms, ivs, cpms, lastCpmIdx, n, spIdx) {
      //     result = gpuOddEvenSort_evenPhase_kernel(
      //       gpuOddEvenSort_oddPhase_kernel(
      //         getPfIvLevelsSPsAtCpLimit_kernel(cpLimit, pokeForms, ivs, cpms, lastCpmIdx), spIdx), spIdx)
      //     for (let i = 0; i < n; i++) {
      //       const result = gpuOddEvenSort_evenPhase_kernel(gpuOddEvenSort_oddPhase_kernel(result, spIdx), spIdx)
      //     }
      //     return result;
      //   }
      // )

      // const oddEvenSortIteration_kernel = gpuG.combineKernels(
      //   // add,multiply,
      //   gpuOddEvenSort_oddPhase_kernel,
      //   gpuOddEvenSort_evenPhase_kernel,
      //   function (input, spIdx) {
      //     // let { x: pfIdx } = this.thread
      //     return gpuOddEvenSort_evenPhase_kernel(gpuOddEvenSort_oddPhase_kernel(input, spIdx), spIdx)
      //     // return this.thread.x + this.thread.y
      //   }
      // )

      // /* SAVE KERNEL TO JSON */
      // /* LOADING KERNEL FROM JSON MAY REDUCE KERNEL STARTUP TIME, BUT THREW ERRORS I COULD NOT RESOLVE */
      // /* gpuKernel.toJSON() throws error if called before kernel is called */
      // const getCalcThenValidCPMs_kernelJson = getCalcThenValidCPMs_kernelJson.toJSON()
      // saveAsFile(JSON.stringify(getCalcThenValidCPMs_kernelJson), 'application/json', 'getCalcThenValidCPMs_kernel.json')

      // //#endregion CREATE GPU KERNELS

      // /* GPU - GET MAX LEVEL/CPM, CALCULATE SPs */
      // pFIvLevelsSPsAtCpLimit_cpu = timeTest({
      //   calcName: "getPfIvLevelsSPsAtCpLimit_GPU",
      //   fn: getPfIvLevelsSPsAtCpLimit_kernel,
      //   fnArgs: [testParams.CP_LIMIT, pokeFormsFlat, testIvsFlat, cpmsFlat, cpms.length - 1],
      // }, {
      //   logResult: false,
      //   // logResult: true,
      //   renderPerformance: {
      //     targetEL: getCalcTimeRowCell(calcTimeRow_calcThenValidCPMs, "gpu"),
      //   },
      // }).calcResult





      // /* CPU - SORT SPs */
      // timeTest("sortPfIVsAtCpLimit_GPU results on CPU)", {
      //   // fn: sortIVsAtCpLimit_kernel,
      //   fn: sortPfIVsAtCpLimit_CPU,
      //   // fnArgs: [pfIvLevelsSPsAtCpLimit_gpu, pokeForms, ivs, cpms], /* when pipeline false */
      //   fnArgs: [pfIvLevelsSPsAtCpLimit_gpu.toArray(), pokeForms, ivs, cpms], /* when pipeline true */
      // }, {
      //   logResult: true,
      //   logAlt: pfIvLevelsSPsAtCpLimit_gpu,
      //   renderPerformance: {
      //     /* render in CPU col bc sorting is on CPU */
      //     targetEL: getCalcTimeRowCell(calcTimeRow_getPfIvLevelsSPs, "gpu"),
      //   },
      // }).calcResult

      // timeTest("sortPfIVsAtCpLimit_GPU (gpu oddEvenSort)", {
      //   // fn: sortIVsAtCpLimit_kernel,
      //   // fn: gpuOddEvenSort,
      //   fn: gpuOddEvenSort_kernel,
      //   fnArgs: [pfIvLevelsSPsAtCpLimit_gpu, testParams.IV_BATCH_SIZE, 1], /* when pipeline false */
      //   // fnArgs: [pfIvLevelsSPsAtCpLimit_gpu.toArray(), pokeForms, ivs, cpms], /* when pipeline true */
      // }, {
      //   logResult: true,
      //   // logAlt: pfIvLevelsSPsAtCpLimit_gpu,
      //   renderPerformance: {
      //     /* render in CPU col bc sorting is on CPU */
      //     targetEL: getCalcTimeRowCell(calcTimeRow_getPfIvLevelsSPs, "gpu"),
      //   },
      // }).calcResult


      // timeTest("getAndSortPfIVsAtCpLimit_GPU", {
      //   fn: getPfIvLevelsSPsAtCpLimit_gpuOddEvenSort_kernel,
      //   fnArgs: [
      //     testParams.CP_LIMIT, /* cpLimit */
      //     testPokeformsFlat, /* pokeforms */
      //     testIvsFlat, /* ivs */
      //     cpmsFlat, /* cpms */
      //     cpms.length - 1, /* lastCpmIdx */
      //     testParams.IV_BATCH_SIZE, /* oddEven sort iterations */
      //     1 /* spColIdx */
      //   ],
      // }, {
      //   logResult: true,
      //   // logAlt: pfIvLevelsSPsAtCpLimit_gpu,
      //   renderPerformance: {
      //     targetEL: getCalcTimeRowCell(calcTimeRow_getPfIvLevelsSPs, "gpu"),
      //   },
      // }).calcResult

      // performance.mark('gpu_sort')
      // for (let i = 0; i < testParams.PF_BATCH_SIZE; i++) {
      //   pFIvLevelsSPsAtCpLimit_cpu = gpuOddEvenSort_evenPhase(gpuOddEvenSort_oddPhase(pFIvLevelsSPsAtCpLimit_cpu, 1), 1)
      // }
      // console.log('gpu sort w/ for loop', performance.measure('gpu_sort').duration)
      // performance.clearMeasures('gpu_sort')

      // //#endregion GPU TESTS

      // //#region COMPARE GPU / CPU MAX VALID CPM VALUES
      // compareCpuGpuResults_IvLevelsSPs(ivLevelsSPsAtCpLimit_cpu, ivLevelsSPsAtCpLimit_gpu)

      //#endregion COMPARE GPU / CPU MAX VALID CPM VALUES

      /* END CASE: runTest */
    }
      break
    default:
      break;
  }
}