import { Texture, input } from "gpu.js";
import { createIvMatrix, filterPokeforms, getPfIvLevelsSPsAtCpLimit_kernel, gpuC, gpuOddEvenSort2D, oddEvenSort2D_combinedKernel, levelToCpmIdx, oddEvenSort2D_halfPassFlex_kernel, shouldFilterPokeforms, warmupGpu, TEST_LIMITS, ALL_CPMS, TEST_DEFAULTS } from "./GpuTestCore";
import { GpuTestWorkerResultProps, GpuTestWorkerTaskMessage, PokeformFilterOption } from "../types";
import { getMaxStats2D_PFs_IVs, sortPfIvsByStatsDesc2D_CPU, timeTest } from "./GpuTestCore";

onmessage = (event: GpuTestWorkerTaskMessage) => {
  console.log('worker received message')
  console.log(event.data);
  switch (event.data.task) {
    case 'gpuWarmup': {
      const warmupSize = 100
      console.log('Warming up GPU');
      warmupGpu(warmupSize)
      warmupGpu(warmupSize, "gpuC", gpuC)
      // warmupGpu(gpuC, warmupSize, 'gpuC')
      console.log("GPU warmup finished");
    }
      break;

    case 'runTest':
      try {
        console.log("Test Started")
        //#region SETUP
        const { testSettings: userOptions, pokeforms } = event.data.payload!
        // console.log('worker running');

        const testParams = {
          PF_BATCH_SIZE: userOptions.pfBatchSize || pokeforms.length /* 0 = no limit */,
          IV_BATCH_SIZE: userOptions.ivBatchSize || TEST_LIMITS.IV_BATCH_SIZE /* 0 = no limit */,
          CP_LIMIT: (Array.isArray(userOptions.cpLimits) && userOptions.cpLimits.length)
            ? userOptions.cpLimits
            : TEST_DEFAULTS.CP_LIMITS,
          IV_FLOOR: userOptions.ivFloor ?? TEST_LIMITS.IV_FLOOR,
          MAX_LEVEL: userOptions.maxLevel ?? TEST_LIMITS.MAX_LEVEL,
          MAX_LEVEL_IDX: levelToCpmIdx(userOptions.maxLevel ?? TEST_LIMITS.MAX_LEVEL),
          MAX_LEVEL_LENGTH: levelToCpmIdx(userOptions.maxLevel ?? TEST_LIMITS.MAX_LEVEL) + 1,
          TARGET_LEVELS: userOptions.targetLevels || TEST_DEFAULTS.CP_LIMITS,
          OUTPUT_SIZE: { x: 0, y: 0, z: 0 },
          filter: { /* USE ZERO OR ONE OPTION */
            // /* [start, end] end-inclusive */
            // range: [3, 3],

            // selection: [
            // /* [pId, fId] */
            //   [3,1],
            //   [6,1],
            //   [9,1]
            // ],
          } as PokeformFilterOption
          // POKEFORMS_CSV_LOCATION_URL:
          //   // "http://localhost:8000/data/pokemon_forms.csv" // expressServer:
          //   // "http://localhost:5500/client/src/data/csv/pokemon_forms.csv" // liveServer
          //   "pokemon_forms.csv",
        };
        // console.log(testParams);

        const PIPELINING = true

        const testPokeforms = shouldFilterPokeforms(testParams)
          ? filterPokeforms(pokeforms, testParams)
          : [...pokeforms]

        let testIvs = createIvMatrix(testParams.IV_FLOOR)
        if (testParams.IV_BATCH_SIZE) testIvs = testIvs.slice(0, testParams.IV_BATCH_SIZE);

        const testCpms = ALL_CPMS.slice(0, testParams.MAX_LEVEL_LENGTH);

        testParams.OUTPUT_SIZE.z = testPokeforms.length
        testParams.OUTPUT_SIZE.y = testParams.TARGET_LEVELS.length;
        testParams.OUTPUT_SIZE.x = testIvs.length;

        // // prettier-ignore
        // const testPokeformsFlat = input(testPokeforms.flat(), [testPokeforms[0].length, testPokeforms.length]);
        // // prettier-ignore
        // const testIvsFlat = input(testIvs.flat(), [testIvs[0].length, testIvs.length]);
        // // prettier-ignore
        // const testCpmsFlat = input(testCpms.flat(), [testCpms[0].length, testCpms.length]);

        //#endregion SETUP

        //#region RUN CALCS / PERF TESTS

        /* TODO: HANDLE SHADOW MONS */

        //#region CPU TESTS
        // console.log("~~~ calcCpmsAtCpLimit ~~~");

        /* CPU - GET MAX LEVEL/CPM, CALCULATE SPs*/
        const pFIvLevelsSPsAtCpLimitTest_cpu = timeTest({
          testName: "getPfIvLevelsSPsAtCpLimit_CPU",
          fn: () => getMaxStats2D_PFs_IVs({
            targetCP: testParams.CP_LIMIT[0], 
            pokeforms: testPokeforms, 
            ivSets: testIvs, 
            cpms: testCpms}),
          // logResult: false,
          // logPerformance: false
        })

        postMessage({
          testName: "getMaxValidCPMsAndStats",
          method: "cpu",
          result: pFIvLevelsSPsAtCpLimitTest_cpu.duration
        } as GpuTestWorkerResultProps)

        /* CPU - SORT SPs */
        const sortPfIVsAtCpLimitTest_cpu = timeTest({
          testName: "sortPfIVsAtCpLimit_CPU",
          // fn: () => sortPfIvsByStatsDesc2D_CPU(pFIvLevelsSPsAtCpLimitTest_cpu.result, testPokeforms, testIvs, testCpms),
          fn: () => sortPfIvsByStatsDesc2D_CPU(pFIvLevelsSPsAtCpLimitTest_cpu.result),
          // logResult: false,
          // logPerformance: false
        });

        postMessage({
          testName: "sortSPs",
          method: "cpu",
          result: sortPfIVsAtCpLimitTest_cpu.duration
        } as GpuTestWorkerResultProps)

        //#endregion CPU TESTS

        //#region GPU TESTS

        /* GPU - GET MAX LEVEL/CPM, CALCULATE SPs */
        getPfIvLevelsSPsAtCpLimit_kernel.setOutput([testParams.OUTPUT_SIZE.x, testParams.OUTPUT_SIZE.y])
        const pfIvLevelsSPsAtCpLimitTest_gpu = timeTest({
          testName: "getPfIvLevelsSPsAtCpLimit_GPU",
          fn: () => getPfIvLevelsSPsAtCpLimit_kernel(
            testPokeforms,
            testIvs,
            testCpms,
            testParams.CP_LIMIT[0],
            testParams.MAX_LEVEL_IDX
          ),
          logResult: !PIPELINING,
          logPerformance: !PIPELINING
        })
        console.log(pfIvLevelsSPsAtCpLimitTest_gpu.result?.toArray
          ? pfIvLevelsSPsAtCpLimitTest_gpu.result?.toArray()
          : pfIvLevelsSPsAtCpLimitTest_gpu.result
        )

        postMessage({
          testName: "getMaxValidCPMsAndStats",
          method: "gpu",
          result: pfIvLevelsSPsAtCpLimitTest_gpu.duration
        } as GpuTestWorkerResultProps)

        // /* CPU - SORT SPs */
        // timeTest({
        //   calcName: "sortPfIVsAtCpLimit_GPU results on CPU)",
        //   /* when pipeline true */
        //   fn: () => sortPfIVsAtCpLimit_CPU(pfIvLevelsSPsAtCpLimit_gpu.toArray(), testPokeforms, testIvs, TEST_CPMS),
        //   /* when pipeline false */
        //   // fn: () => sortIVsAtCpLimit_kernel(pfIvLevelsSPsAtCpLimit_gpu, testPokeformsFlat, testIvsFlat, testCpmsFlat),
        //   // logResult: false,
        //   // logPerformance: false,

        //   // logAlt: pfIvLevelsSPsAtCpLimit_gpu,
        // }).result


        oddEvenSort2D_halfPassFlex_kernel.setOutput([testParams.OUTPUT_SIZE.x, testParams.OUTPUT_SIZE.y])
        const sortPfIVsAtCpLimitTest_GPU = timeTest({
          testName: "sortPfIVsAtCpLimit_GPU (gpu oddEvenSort)",
          // fn: sortIVsAtCpLimit_kernel,
          // fn: gpuOddEvenSort,
          /* when pipeline true */
          // fn: () => gpuOddEvenSort(pfIvLevelsSPsAtCpLimit_gpu.result, testPokeformsFlat, testIvsFlat, testCpmsFlat),
          fn: () => gpuOddEvenSort2D(
            pfIvLevelsSPsAtCpLimitTest_gpu.result,
            // testParams.OUTPUT_SIZE.x - 1,
            // testParams.OUTPUT_SIZE.x / 2,
            -1,
            'nested'
          ),
          /* when pipeline false */
          // fn: () => gpuOddEvenSort_kernel(pfIvLevelsSPsAtCpLimit_gpu, testParams.IV_BATCH_SIZE, 1),
          logResult: !PIPELINING,
          logPerformance: !PIPELINING
        })
        if (typeof sortPfIVsAtCpLimitTest_GPU.result?.toArray == 'function') {
          const sortedPfIvsToArray = timeTest({
            testName: 'sortedPfIvsToArray',
            fn: () => sortPfIVsAtCpLimitTest_GPU.result?.toArray(),
            logPerformance: PIPELINING,
            logResult: PIPELINING
          })
        } else console.log(sortPfIVsAtCpLimitTest_GPU.result)

        postMessage({
          testName: "sortSPs",
          method: "gpu",
          result: pfIvLevelsSPsAtCpLimitTest_gpu.duration
        } as GpuTestWorkerResultProps)

        if (typeof sortPfIVsAtCpLimitTest_GPU.result?.delete == 'function') {
          sortPfIVsAtCpLimitTest_GPU.result?.clear()
          sortPfIVsAtCpLimitTest_GPU.result?.delete()
        }
        oddEvenSort2D_halfPassFlex_kernel.destroy()
        // timeTest({
        //   calcName: "getAndSortPfIVsAtCpLimit_GPU",
        //   fn: () => getPfIvLevelsSPsAtCpLimit_gpuOddEvenSort_kernel(
        //     testParams.CP_LIMIT, /* cpLimit */
        //     testPokeformsFlat, /* pokeforms */
        //     testIvsFlat, /* ivs */
        //     testCpmsFlat, /* cpms */
        //     TEST_CPMS.length - 1, /* lastCpmIdx */
        //     testParams.IV_BATCH_SIZE, /* oddEven sort iterations */
        //     1 /* spColIdx */
        //   ),
        //   logResult: true,
        //   // logAlt: pfIvLevelsSPsAtCpLimit_gpu,
        //   logPerformance: true
        // }).result

        // performance.mark('gpu_sort')
        // for (let i = 0; i < testParams.PF_BATCH_SIZE; i++) {
        //   pFIvLevelsSPsAtCpLimit_cpu = gpuOddEvenSort_evenPhase(gpuOddEvenSort_oddPhase(pFIvLevelsSPsAtCpLimit_cpu, 1), 1)
        // }
        // console.log('gpu sort w/ for loop', performance.measure('gpu_sort').duration)
        // performance.clearMeasures('gpu_sort')

        // gpuOddEvenSort_kernel.setConstants<IGpuPokeConstants>({ ivCount: testIvs.length })


        
        //#endregion GPU TESTS

        //#region COMPARE GPU / CPU MAX VALID CPM VALUES

        // compareCpuGpuResults_IvLevelsSPs(ivLevelsSPsAtCpLimit_cpu, ivLevelsSPsAtCpLimit_gpu)

        //#endregion COMPARE GPU / CPU MAX VALID CPM VALUES

      } catch (error) {
        console.error(error);
      }
      postMessage({ task: 'runTest', status: 'complete' })
      /* END CASE: runTest */
      break
    default:
      break;
  }
}