import { GPU } from "gpu.js";
import { createIvMatrix, createKernel, filterPokeforms, getFullCpmList, getPfIvLevelsSPsAtCpLimit_GPU, gpuOddEvenSort_evenPhase, gpuOddEvenSort_oddPhase, warmupGpu } from "../GpuTestCore";
import { GpuTestWorkerTaskMessage, PokeformFilterOption } from "../types";

const gpuG = new GPU({ mode: 'gpu' })
const gpuC = new GPU({ mode: 'cpu' })

const gmCPMs = [0.094, 0.16639787, 0.21573247, 0.25572005, 0.29024988, 0.3210876, 0.34921268, 0.3752356, 0.39956728, 0.4225, 0.44310755, 0.4627984, 0.48168495, 0.49985844, 0.51739395, 0.5343543, 0.5507927, 0.5667545, 0.5822789, 0.5974, 0.6121573, 0.6265671, 0.64065295, 0.65443563, 0.667934, 0.6811649, 0.69414365, 0.7068842, 0.7193991, 0.7317, 0.7377695, 0.74378943, 0.74976104, 0.7556855, 0.76156384, 0.76739717, 0.7731865, 0.77893275, 0.784637, 0.7903, 0.7953, 0.8003, 0.8053, 0.8103, 0.8153, 0.8203, 0.8253, 0.8303, 0.8353, 0.8403, 0.8453];
const allCpms = getFullCpmList(gmCPMs, "array") as [number, number][]
const allIvs = createIvMatrix()

onmessage = (event: GpuTestWorkerTaskMessage) => {
  switch (event.data.task) {
    case 'gpuWarmup': {
      const warmupSize = 15811
      console.log('Warming up GPU');
      warmupGpu(gpuG, warmupSize, 'gpuG')
      // warmupGpu(gpuC, warmupSize, 'gpuC')
      console.log("GPU warmup finished");
    }
      break;

    case 'runTest': {
      const { testSettings, pokeForms: pokeforms } = event.data.payload!
      // console.log('worker running');
      const testParams = {
        PF_BATCH_SIZE: testSettings.pfBatchSize ?? pokeforms.length /* 0 = no limit */,
        IV_BATCH_SIZE: testSettings.ivBatchSize ?? 4096 /* 0 = no limit */,
        IV_FLOOR: testSettings.ivFloor ?? 0,
        CP_LIMIT: testSettings.cpLimit,
        MAX_LEVEL: testSettings.maxLevel,
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

      let testPokeforms = pokeforms
      if (pokeformFilter) testPokeforms = filterPokeforms(pokeforms, pokeformFilter)
      
      let testIvs = allIvs
      if (testParams.IV_FLOOR) testIvs = createIvMatrix(testParams.IV_FLOOR)
      if (testParams.IV_BATCH_SIZE) testIvs = testIvs.slice(0, testParams.IV_BATCH_SIZE);
      
      kernelOutputSize.y = testPokeforms.length
      kernelOutputSize.x = testIvs.length;

      const maxLevelIdx = (testSettings.maxLevel ?? 51) * 2 - 2;
      const cpmLengthAtMaxLevel = maxLevelIdx + 1;
      const testCpms = allCpms.slice(0, cpmLengthAtMaxLevel);

      //#region CREATE GPU KERNELS

      const getPfIvLevelsSPsAtCpLimit_kernel = gpuG.createKernel(getPfIvLevelsSPsAtCpLimit_GPU, {
        output: [kernelOutputSize.x, kernelOutputSize.y],
        // pipeline: true,
        // optimizeFLoatMemory: true,
        // tactic: "precision",
        // tactic: "speed",
        // fixIntegerDivisionAccuracy: true,
        // immutable: true
      });

      // const sortPfIVsAtCpLimit_kernel = gpuG.createKernel(sortPfIVsAtCpLimit_GPU, {
      //   output: [kernelOutputSize.x, kernelOutputSize.y],
      //   // pipeline: true,
      //   // optimizeFLoatMemory: true,
      //   // tactic: "precision",
      //   // tactic: "speed",
      //   // fixIntegerDivisionAccuracy: true
      // });
      // console.log(sortPfIVsAtCpLimit_kernel.toJSON())
      /* LOADING KERNEL FROM JSON MAY REDUCE KERNEL STARTUP TIME, BUT THREW ERRORS I COULD NOT RESOLVE */

      const gpuOddEvenSort_oddPhase_kernel = gpuG.createKernel(gpuOddEvenSort_oddPhase, {
        output: [kernelOutputSize.x, kernelOutputSize.y],
        // pipeline: true,
        // optimizeFLoatMemory: true,
        // tactic: "precision",
        // tactic: "speed",
        // fixIntegerDivisionAccuracy: true
      });

      const gpuOddEvenSort_evenPhase_kernel = gpuG.createKernel(gpuOddEvenSort_evenPhase, {
        output: [kernelOutputSize.x, kernelOutputSize.y],
        // pipeline: true,
        // optimizeFLoatMemory: true,
        // tactic: "precision",
        // tactic: "speed",
        // fixIntegerDivisionAccuracy: true
      });

      const gpuOddEvenSort_kernel = gpuG.combineKernels(
        gpuOddEvenSort_oddPhase_kernel,
        gpuOddEvenSort_evenPhase_kernel,
        function (input, n, spIdx) {
          result = gpuOddEvenSort_evenPhase_kernel(gpuOddEvenSort_oddPhase_kernel(input, spIdx), spIdx)
          for (let i = 1; i < n; i++) {
            let result = gpuOddEvenSort_evenPhase_kernel(gpuOddEvenSort_oddPhase_kernel(result, spIdx), spIdx)
          }
          return result;
        }
      )

      const getPfIvLevelsSPsAtCpLimit_gpuOddEvenSort_kernel = gpuG.combineKernels(
        getPfIvLevelsSPsAtCpLimit_kernel,
        gpuOddEvenSort_oddPhase_kernel,
        gpuOddEvenSort_evenPhase_kernel,
        function (cpLimit, pokeForms, ivs, cpms, lastCpmIdx, n, spIdx) {
          result = gpuOddEvenSort_evenPhase_kernel(
            gpuOddEvenSort_oddPhase_kernel(
              getPfIvLevelsSPsAtCpLimit_kernel(cpLimit, pokeForms, ivs, cpms, lastCpmIdx), spIdx), spIdx)
          for (let i = 0; i < n; i++) {
            let result = gpuOddEvenSort_evenPhase_kernel(gpuOddEvenSort_oddPhase_kernel(result, spIdx), spIdx)
          }
          return result;
        }
      )

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

      // console.log('warming up gpu')
      // performance.mark('gpu_warmup')
      // let warmupResults = warmup_kernel()
      // // warmupResults.delete()
      // console.log('gpu warmup duration (ms)', performance.measure('gpu_warmup').duration)
      //#endregion CREATE GPU KERNELS


      /* END CASE: runTest */
    }
      break
    default:
      break;
  }
}