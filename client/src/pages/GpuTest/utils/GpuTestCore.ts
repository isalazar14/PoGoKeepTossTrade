import { GPU, IGPUKernelSettings, IKernelRunShortcutBase, KernelFunction, Texture } from "gpu.js";
import { PokeCpmSet, PokeformBaseStats, PokeIv, PokeIvSet, PokeformFilterOption } from "./types";

//#region HELPER FUNCTIONS
export function timeTest(calcName:string , calc:Function, options) {
  // let { useWorker, silentRun, logPerformance, logResult } = options
  // {targetEl, appendToEl, appendChildToEl}
  if (!options?.silentRun)
    console.log(`%cRunning ${calcName}`, "background-color:cornflowerblue;");
  const t0 = performance.now();
  const calcResult = calc.fn.apply(null, calc.fnArgs);
  const t1 = performance.now();
  const dt = t1 - t0
  if (options != undefined) {
    if (!(options.logPerformance == false)) {
      console.log(`${calcName} duration: ${Math.round(dt).toLocaleString()} ms`);
    }
    if (!options.logResult || !(options.logResult == false))
      /* Log calc result by default. Explicitly disable */
      console.log(`${calcName} result:\n`, calcResult);
    if (options.logAlt)
      console.log(`${calcName} alt result:\n`, options.logAlt);
    if (options.renderPerformance) {
      /* Do not render performance by default */
      options.renderPerformance.targetEL.innerHTML = Math.round(dt).toLocaleString();
      options.renderPerformance.targetEL.classList.toggle("running-calc");
    }
  }
  if (!options?.silentRun)
    console.info(`%cFinished ${calcName}`, "background-color:orange; color:black");
  return { calcResult, dt };
}

declare function getFullCpmList(floatCPMs: number[]): number[]
declare function getFullCpmList(floatCPMs: number[], withLevels: 'array'): PokeCpmSet[]
declare function getFullCpmList(floatCPMs: number[], withLevels: 'map'): Map<number, number>

export function getFullCpmList(floatCPMs: number[], withLevels?: 'array' | 'map') {
  const allCpms = _getFullCpmList(floatCPMs);
  if (!withLevels) return allCpms
  else {
    const allCpmsWithLevels = allCpms.map((cpm, i) => [cpmIdxToLevel(i), cpm]) as [number, number][]
    if (withLevels == 'array') return allCpmsWithLevels
    else return new Map<number, number>(allCpmsWithLevels)
  }
}
function _getFullCpmList(floatCPMs: number[]) {
  // if (floatCPMs.length == 0) {console.error("floatCpms array is empty"); return}
  const trueCpms = new Float32Array(floatCPMs);
  const lastIdx = trueCpms.length
  const totalCpmCount = lastIdx * 2 - 1; /* to fite all whole + half levels */
  const allCpms: number[] = Array(totalCpmCount);
  trueCpms.forEach((cpm, i) => {
    const mappedIdx = i * 2;
    allCpms[mappedIdx] = cpm;
    if (i < lastIdx) {
      allCpms[mappedIdx + 1] = getHalfLevelCPM(cpm, trueCpms[i + 1]);
    }
  })
  return allCpms
}

export function getHalfLevelCPM(levelCpm: number, nextLevelCpm: number) {
  const halfLevelCpm = Math.sqrt(
    levelCpm * levelCpm
    - (levelCpm * levelCpm) / 2
    + (nextLevelCpm * nextLevelCpm) / 2
  );
  return halfLevelCpm;
}

export function cpmIdxToLevel(cpmIdx: number) {
  return cpmIdx / 2 + 1
}

export function levelToCpmIdx(level: number) {
  return (level - 1) * 2
}

export function createIvMatrix(floor: PokeIv = 0) {
  const ivs = Array(Math.pow((16 - floor), 3)) as PokeIvSet[]
  // filling iv combos array
  let i = 0;
  let ivId = 1;
  console.time("creatIvCombos");
  if (floor) ivId += floor * 16 ** 2
  for (let aI = floor; aI < 16; aI++) {
    if (floor) ivId += floor * 16
    for (let dI = floor; dI < 16; dI++) {
      if (floor) ivId += floor
      for (let sI = floor; sI < 16; sI++) {
        ivs[i] = [ivId, aI, dI, sI];
        i++;
        ivId++
      }
    }
  }
  console.timeEnd("creatIvCombos");
  return ivs;
  // console.log(ivs);
}

export function filterPokeforms(pokeforms: PokeformBaseStats[], option: PokeformFilterOption) {
  let filteredPokeforms: PokeformBaseStats[] = []
  if (option.limit) {
    /* preview option set -> pass through results */
    filteredPokeforms = pokeforms.slice(0, option.limit);
  } else if (option.pIdRange) {
    /* range option set -> get all rows with matching pId, including multiple forms */
    filteredPokeforms = pokeforms.filter((pf) => pf[0] >= option.pIdRange[0] && pf[0] <= option.pIdRange[1]);
  } else if (option.pfSelection) {
    /* selection option set -> get all rows with matching [pId, fId] */
    const selectionMap = option.pfSelection.reduce((map, pf) => map.set(pf.join(), true), new Map());
    const rowCount = pokeforms.length;
    let remaining = selectionMap.size;
    let i = 0;
    while (remaining > 0 /* when 0 remaining all pokeforms found -> break out of loop  */
      && i < rowCount) { /* when i reaches rowCount, nothing more to check */
      if (selectionMap.has(`${pokeforms[i][0]},${pokeforms[i][1]}`)) {
        filteredPokeforms.push(pokeforms[i]);
        remaining--;
      }
      i++;
    }
  }
  return filteredPokeforms
}

export function getTotalStats(pfIdx: number, ivIdx: number, pokeForms: PokeformBaseStats[], ivs: PokeIvSet[]) {
  const a = pokeForms[pfIdx][2] + ivs[ivIdx][1]
  const d = pokeForms[pfIdx][3] + ivs[ivIdx][2]
  const s = pokeForms[pfIdx][4] + ivs[ivIdx][3]
  return { a, d, s }
}

export function calculateCP([a, d, s, cpm]) {
  return Math.max(10, ((a * Math.sqrt(d) * Math.sqrt(s) * Math.pow(cpm, 2)) / 10) >> 0);
}

export function saveAsFile(data, mimeType, filename) {
  let a = document.createElement('a')
  let blob = new Blob([data], { type: mimeType })
  a.href = URL.createObjectURL(blob)
  a.download = filename
  a.click()
  URL.revokeObjectURL(a.href)
}

export function compareCpuGpuResults_pfIvLevelsSPsAtCpLimit(cpuResults, gpuResults) {
  let cols = ["level", "cp", "hp", "sp"]
  const differences = {}
  let maxPfIdx = (testParams.PF_BATCH_SIZE || testParams.DEFAULT_PF_BATCH_SIZE)
  let maxIvIdx = (testParams.IV_BATCH_SIZE || testParams.DEFAULT_IV_BATCH_SIZE)
  for (let pfIdx = 0; pfIdx < maxPfIdx; pfIdx++) {
    let isDifferent = false
    for (let ivIdx = 0; ivIdx < maxIvIdx; ivIdx++) {
      for (let colIdx = 0; colIdx < 4; colIdx++) {
        if (gpuResults[pfIdx][ivIdx][colIdx] != cpuResults[pfIdx][ivIdx][colIdx]) {
          if (!differences[pfIdx]) differences[pfIdx] = {}
          if (!differences[pfIdx][ivIdx]) differences[pfIdx][ivIdx] = {}
          differences[pfIdx][ivIdx][cols[colIdx]] = { gpu: gpuResults[pfIdx][ivIdx][colIdx], cpu: cpuResults[pfIdx][ivIdx][colIdx] }
          isDifferent = true
          break
        }
      }
      if (isDifferent) break
    }
  }
  // console.log("differences:", differences)
  let differenceSummary = { level: 0, cp: 0, hp: 0, sp: 0 }
  Object.values(differences).forEach((pfEntry) => Object.values(pfEntry).forEach(ivEntry => Object.keys(ivEntry).forEach((diffKey) => differenceSummary[diffKey]++)))
  console.log("differenceSummary:", differenceSummary)

  let nonSPdiffs = Object.entries(differences)
    .filter(([pfIdx, ivIdx]) => Object.values(ivIdx).every(iv => !(Object.keys(iv)[0] == "sp")))
    .reduce((result, [pfIdx, diffEntry]) => {
      let pfId = `${pokeForms[pfIdx][0]},${pokeForms[pfIdx][1]}`
      let [, ...iv] = ivs[Object.keys(diffEntry)[0]]
      let ivString = iv.join("-")
      result.push([`${pfId} @ ${ivString}`, Object.values(diffEntry)[0]])
      return result
    }, [])
  console.log("non-SP differences:", nonSPdiffs)
}

export function warmupGpu(gpu: GPU, size: number, gpuName: string) {
  const kernel = gpu.createKernel(function () {
    // return this.thread.x * this.thread.y * this.thread.z * 3
    return 0
  }, {
    output: [size, size],
    pipeline: true,
    // immutable: true
    // optimizeFloatMemory: true,
    tactic: "speed"

  }).setOptimizeFloatMemory(true) /* must be set with method, settings prop does not work */

  // console.log(`Warming up ${gpuName}`)
  performance.mark(`${gpuName}WarmupStart`)
  const output = kernel()
  performance.mark(`${gpuName}WarmupEnd`)

  performance.measure(`${gpuName} Warmup`, `${gpuName}WarmupStart`, `${gpuName}WarmupEnd`)
  console.log(`${gpuName} Warmup duration:`, performance.getEntriesByName(`${gpuName} Warmup`)[0].duration)
  if (output instanceof Texture) {
    output.delete()
    console.log(`Deleted ${gpuName} warmup memory`);
  }
}
// export function getPokeForms(filePath, options) {
//   /* CANNOT USE ASYNC/AWAIT BECAUSE 'parse' FUNCTION RETURNS 'void'.
//   MUST USE 'complete' CALLBACK */
//   if ((options?.pIdRange && options?.pfSelection) ||
//     (options?.pIdRange && options?.preview) ||
//     (options?.preview && options?.pfSelection))
//     throw new Error("Cannot use more than one option at a time");
//   return new Promise((resolve, reject) => {
//     Papa.parse(filePath, {
//       download: true,
//       // header: true, // will turn results into objects with headers (from results 1st row) as properties
//       dynamicTyping: true,
//       skipEmptyLines: true,
//       preview: options?.preview ? options.preview + 1 : 0,
//       complete: (parseResults) => {
//         /* First row is headers */
//         let [headers] = parseResults.data;
//         /* Remaining rows are pokeforms */
//         let [, ...data] = parseResults.data;
//         let result = { headers, data };
//         // if (options?.preview) {
//         //   /* no options OR preview option set -> pass through results */
//         //   result.data = parseResults.data;
//         // } else 
//         if (options?.pIdRange) {
//           /* range option set -> get all rows with matching pId, including multiple forms */
//           result.data = data.filter((pf) => pf[0] >= options.pIdRange[0] && pf[0] <= options.pIdRange[1]);
//         }
//         else if (options?.pfSelection) {
//           /* selection option set -> get all rows with matching [pId, fId] */
//           let selection = options.pfSelection.reduce((map, pf, i) => map.set(pf, true), new Map());
//           let rowCount = parseResults.data.length;
//           let remaining = options.pfSelection.length;
//           let i = 0;
//           let filteredPFs = [];
//           while (remaining > 0 && i < rowCount) {
//             if (selection.has(`${data[i][0]},${data[i][1]}`)) {
//               filteredPFs.push(data[i]);
//               remaining--;
//             }
//             i++;
//           }
//           result.data = filteredPFs;
//         }
//         resolve(result);
//         return;
//       },
//       error: (error) => reject(error),
//     });
//   });
// }
//#endregion HELPER FUNCTIONS

//#region CPU CALCS
export function calcCpmsAtCpLimit_CPU(pokeForms: PokeformBaseStats[], ivs: PokeIvSet[], cpLimit: number) {
  const atkIdx = 2, defIdx = 3, staIdx = 4;
  const atkIvIdx = 1, defIvIdx = 2, staIvIdx = 3;
  const calcCpms = Array(pokeForms.length);
  for (let pfIdx in pokeForms) {
    calcCpms[pfIdx] = Array(ivs.length);
    for (let ivIdx in ivs) {
      let a = pokeForms[pfIdx][atkIdx] + ivs[ivIdx][atkIvIdx];
      let d = pokeForms[pfIdx][defIdx] + ivs[ivIdx][defIvIdx];
      let s = pokeForms[pfIdx][staIdx] + ivs[ivIdx][staIvIdx];
      calcCpms[pfIdx][ivIdx] = Math.sqrt(((cpLimit + 0.9999999) * 10) / (a * Math.sqrt(d) * Math.sqrt(s)));
    }
  }
  /* calcCpms = [
    [0.34534, 0.64534,...], <- pokeform 1
    [0.42018, 0.00483,...], <- pokeform 2
     ^ iv 1    ^ iv 2
    ...
  ] */
  return calcCpms as number[][];
}

export function getMaxValidCpms_CPU(calcCpms: number[][], cpms: [number, number]) {
  const yLength = calcCpms.length; /* number of pokeforms (1 calcCPM set per pokemform) */
  const xLength = calcCpms[0].length; /* number of IV combos per pokeform */
  const lastCpmIdx = cpms.length - 1; /* starting point for reverse scan of CPMs (CPMs length depends on IV_BATCH size) */
  /* create array to hold results, length = # of pokeforms */
  const trueCpms = Array(yLength);
  /* loop through pokeforms */
  for (let y = 0; y < yLength; y++) {
    /* for each pokeform, create nested array for trueCPM results */
    trueCpms[y] = Array(xLength);
    /* loop through calcCPMs of current pokeform */
    for (let x = 0; x < xLength; x++) {
      // trueCpms[y][x] = cpms[0];
      /* for each calcCPM reverse scan CPMs to find max valid CPM (first CPM <= calcCPM) */
      for (let i = lastCpmIdx; i > -1; i--) {
        if (cpms[i][1] <= calcCpms[y][x]) {
          trueCpms[y][x] = cpms[i];
          break;
        }
      }
    }
  }
  return trueCpms;
}
export function getPfIvLevelsSPsAtCpLimit_CPU(cpLimit, pokeForms, ivs, cpms) {
  const calcCpms = calcCpmsAtCpLimit_CPU(pokeForms, ivs, cpLimit)
  const yLength = calcCpms.length; /* number of pokeforms (1 calcCPM set per pokemform) */
  const xLength = calcCpms[0].length; /* number of IV combos per pokeform */
  const lastCpmIdx = cpms.length - 1; /* starting point for reverse scan of CPMs (CPMs length depends on IV_BATCH size) */
  /* create array to hold results, length = # of pokeforms */
  // const result = Array(yLength).fill(Array(xLength));
  const result = Array(yLength);
  /* loop through pokeforms */
  for (let y = 0; y < yLength; y++) {
    /* for each pokeform, create nested array for trueCPM results */
    result[y] = Array(xLength);
    /* loop through calcCPMs of current pokeform */
    for (let x = 0; x < xLength; x++) {
      // trueCpms[y][x] = cpms[0];
      /* for each calcCPM reverse scan CPMs to find max valid CPM (first CPM <= calcCPM) */
      for (let i = lastCpmIdx; i > -1; i--) {
        if (cpms[i][1] <= calcCpms[y][x]) {
          const a = pokeForms[y][2] + ivs[x][1]
          const d = pokeForms[y][3] + ivs[x][2]
          const s = pokeForms[y][4] + ivs[x][3]
          const cpm = cpms[i][1]
          const cp = Math.max(10, ((a * Math.sqrt(d) * Math.sqrt(s) * Math.pow(cpm, 2)) / 10) >> 0);
          const hp = Math.floor(s * cpm)
          const sp = Math.round(a * d * Math.pow(cpm, 2) * hp);
          // result[y][x] = cpms[i]; /* return [level, cpm] */
          // result[y][x] = [cpms[i][0], cp, (a * cpm), sp]; /* return [level, cp, hp, sp] */
          // result[y][x] = [y, x, cpms[i][1], sp] /* return [pfIdx, ivIdx, cpm@cpLimit, sp] so that entries can be identified after sorting */
          result[y][x] = [x, i, sp] /* return [ivIdx, cpmIdx, sp] so that entries can be identified after sorting */
          // if (result[y][x][0] == 28) {
          //   console.log(y, x, i)
          // }
          break;
        }
      }
    }
  }
  return result;
}
export function sortPfIVsAtCpLimit_CPU(pfIvLevelsSPs, pokeforms, ivs, cpms) {
  /* modify idx vars below to match contents of validCPMsWithSPs entries */
  // let spColIdx = 3, cpIdx = 1, AtkIdx = 2 /* for entries as [level, cp, Atk, sp] */
  // let spColIdx = 3, pfIdx = 0, ivIdx = 1, cpmIdx = 2 /* for entries as [pfIdx, ivIdx, cpmIdx, sp] */
  const ivIdx = 0, cpmIdx = 1, spColIdx = 2 /* for entries as [ivIdx, cpmIdx, sp] */
  const atkBaseIdx = 2, defBaseIdx = 3, staBaseIdx = 4;
  const atkIvIdx = 1, defIvIdx = 2, staIvIdx = 3;
  for (const pfIdx in pfIvLevelsSPs) {
    let aBase = pokeforms[pfIdx][atkBaseIdx],
      dBase = pokeforms[pfIdx][defBaseIdx],
      sBase = pokeforms[pfIdx][staBaseIdx]

    pfIvLevelsSPs[pfIdx].sort((a, b) => {
      // return b[spColIdx] - a[spColIdx] || b[cpIdx] - a[cpIdx] || b[AtkIdx] - a[AtkIdx]

      /* compare SPs */
      let c1 = b[spColIdx] - a[spColIdx]
      if (c1) return c1

      /* get stats for further comparisons */
      let statsB = [
        aBase + ivs[b[ivIdx]][atkIvIdx], /* atk total */
        dBase + ivs[b[ivIdx]][defIvIdx], /* def total */
        sBase + ivs[b[ivIdx]][staIvIdx]  /* sta total */
      ]
        , statsA = [
          aBase + ivs[a[ivIdx]][atkIvIdx], /* atk total */
          dBase + ivs[a[ivIdx]][defIvIdx], /* def total */
          sBase + ivs[a[ivIdx]][staIvIdx]  /* sta total */
        ]
        , cpmB = cpms[b[cpmIdx]][1]
        , cpmA = cpms[a[cpmIdx]][1]

      /* compare CPs */
      let cpB = Math.max(10, ((statsB[0] * Math.sqrt(statsB[1]) * Math.sqrt(statsB[2]) * Math.pow(cpmB, 2)) / 10) >> 0)
      let cpA = Math.max(10, ((statsA[0] * Math.sqrt(statsA[1]) * Math.sqrt(statsA[2]) * Math.pow(cpmA, 2)) / 10) >> 0)
      let c2 = cpB - cpA
      if (c2) return c2

      /* compare Atk */
      let AtkB = statsB[0] * cpmB
        , AtkA = statsA[0] * cpmA
      return AtkB - AtkA
    })
    // return pfIvLevelsSPs
  }
}
//#endregion CPU CALCS

//#region GPU CALC FUNCTIONS
export function createKernel<KernelType extends KernelFunction>(
  gpu: GPU,
  kernelFn: typeof createKernel,
  kernelSettings?: IGPUKernelSettings
): ((...args: Parameters<KernelType>) =>
  ReturnType<KernelType>[]
  | ReturnType<KernelType>[][]
  | ReturnType<KernelType>[][][]
  | Texture
  | void
)
  & IKernelRunShortcutBase {
  return gpu.createKernel(kernelFn, kernelSettings);
}
export function calcCPs_GPU(pokeForms, ivs, cpms) {
  // prettyier-ignore /* GPU.createKernel notes */
  {
    /**
     * dimensions in .setOutput() are in [x, y, z] order,
     * and correspond to the length of the arrays in the respective thread (this.thread._).
     * multidimensional output will be nested in reverse order:
     * if output is [x,y] -> result will be [y[x]] -> array of length y, with nested arrays of length x
     * if output is [x,y,z] -> result will be [z[y[x]]] -> array of length z, with nested arrays of length y, which also has nested arrays of length x
     **/
    // prettyier-ignore
    /**
     * I want output as [pokemonForms[ivs[cpms]]] so...
     * pokeForms  -> this.thread.z
     * ivs        -> this.thread.y
     * cpms       -> this.thread.x
     **/
    // prettyier-ignore
    /**
     * pokeForms[this.thread.z][2] -> atkBase
     * pokeForms[this.thread.z][3] -> defBase
     * pokeForms[this.thread.z][3] -> staBase
     * ivs[this.thread.y][1] -> atkIv
     * ivs[this.thread.y][2] -> defIv
     * ivs[this.thread.y][3] -> staIv
     * cpms[this.thread.x] -> cpm
     **/
    // prettyier-ignore
    // function calcCp (atk, def, sta, cpm) {
    //   // atk, def, sta are base+IV
    //   return Math.max(10,
    //   ((a * Math.sqrt(d) * Math.sqrt(s) * cpm*cpm )  / 10) >> 0
    // )}
  }
  const atkBaseIdx = 2;
  const defBaseIdx = 3;
  const staBaseIdx = 4;
  const atkIvIdx = 1;
  const defIvIdx = 2;
  const staIvIdx = 3;
  const { x, y, z } = this.thread;
  /*
          x -> iterator for pokeform
          y -> iterator for IVs
          z -> iterator for CPMs
         */
  const a = pokeForms[z][atkBaseIdx] + ivs[y][atkIvIdx];
  const d = pokeForms[z][defBaseIdx] + ivs[y][defIvIdx];
  const s = pokeForms[z][staBaseIdx] + ivs[y][staIvIdx];
  const cpm = cpms[x];
  const cp = Math.max(10, ((a * Math.sqrt(d) * Math.sqrt(s) * cpm * cpm) / 10) >> 0);
  const sp = ((a * cpm * d * cpm * (s * cpm)) >> 0) / 1000;
  // return [a,Math.sqrt(d),Math.sqrt(s),cpm*cpm] //
  // return [pokeForms[this.thread.z][2], ivs[this.thread.y][1], cpms[this.thread.x]]
  return [pokeForms[z][0], cpm, cp, sp];
}
export function calcCpmsAtCpLimit_GPU(cpLimit, pokeForms, ivs) {
  if (cpLimit == 0) return 1
  const atkBaseIdx = 2, defBaseIdx = 3, staBaseIdx = 4;
  const atkIvIdx = 1, defIvIdx = 2, staIvIdx = 3;
  const { x, y } = this.thread;
  /*
        x -> iterator for pokeform
        y -> iterator for IVs
       */
  const a = pokeForms[y][atkBaseIdx] + ivs[x][atkIvIdx];
  const d = pokeForms[y][defBaseIdx] + ivs[x][defIvIdx];
  const s = pokeForms[y][staBaseIdx] + ivs[x][staIvIdx];
  const calcCpm = Math.sqrt(((cpLimit + 0.9999999) * 10) / (a * Math.sqrt(d) * Math.sqrt(s)));
  // debugger;
  return calcCpm;
}
/** Given calculated CPMs, get index of max valid CPMs/levels
* @param {*} calcCpms
* @param {[level: number, cpm: number][]} cpms 2D array, nested items must be [level, CPM]
* @param {*} lastCpmIdx
* @param {boolean} returnCPM If true, result includes CPMs. If returnLevel is also true, result is 2D array
* @param {boolean} returnLevel If true, result includes level. If returnCPM is also true, result is 2D array
* @returns
*/
export function getMaxValidCpms_GPU(calcCpms, cpms, lastCpmIdx, returnCPM, returnLevel) {
  // debugger;
  // if (!returnCPM && !returnLevel)
  //   return;
  const { x, y } = this.thread;
  /* x -> iterator for pokeform | y -> iterator for IVs*/
  // let i = cpms.length - 1; /* can't use .length??  using lastCpmIdx param instead */
  let i = lastCpmIdx
  while (i > -1 && calcCpms[y][x] < cpms[i][1]) {
    i--;
  }
  if (returnCPM && returnLevel)
    return cpms[i];
  const resultIdx = returnLevel ? 0 : 1;
  return cpms[i][resultIdx]; // return level
  /* For Debugging:
      [current calcCPM, i, first cpm < calcCPM, corresponding level] */
  // return [calcCpms[y][x], i, cpms[i][1], cpms[i][0]]
}
export function getPfIvLevelsSPsAtCpLimit_GPU(cpLimit, pokeForms, ivs, cpms, lastCpmIdx) {
  // debugger;
  /* GET CALC CPMs AT CP LIMIT */
  // if (cpLimit == 0) return 1
  const { x: ivIdx, y: pfIdx } = this.thread;
  const atkBaseIdx = 2, defBaseIdx = 3, staBaseIdx = 4;
  const atkIvIdx = 1, defIvIdx = 2, staIvIdx = 3;
  /*
  x -> iterator for pokeform
  y -> iterator for IVs
  */
  const a = pokeForms[pfIdx][atkBaseIdx] + ivs[ivIdx][atkIvIdx];
  const d = pokeForms[pfIdx][defBaseIdx] + ivs[ivIdx][defIvIdx];
  const s = pokeForms[pfIdx][staBaseIdx] + ivs[ivIdx][staIvIdx];
  const calcCpm = Math.sqrt(((cpLimit + 0.9999999) * 10) / (a * Math.sqrt(d) * Math.sqrt(s)));

  /* GET MAX VALID CPMs */
  // if (!returnCPM && !returnLevel)
  //   return;
  let cpmIdx = lastCpmIdx
  while (cpmIdx > -1 && calcCpm < cpms[cpmIdx][1]) {
    cpmIdx--;
  }
  const cpm = cpms[cpmIdx][1]
  const A = a * cpm
  const D = d * cpm
  const hp = Math.floor(s * cpm)
  const cp = Math.max(10, ((a * Math.sqrt(d) * Math.sqrt(s) * Math.pow(cpm, 2)) / 10) >> 0);
  // const sp = ((a *  d * Math.pow(cpm,2) * Math.floor(s * cpm)));
  const sp = Math.round(A * D * hp);
  // return [cpms[cpmIdx][0], cp, A, sp] /* return [level, cp Atk, sp] */
  // return [pfIdx, ivIdx, cpms[cpmIdx][1], sp] /* return [pfIdx, ivIdx, cpm@cpLimit, sp] so that entries can be identified after sorting */
  // return [ivIdx, cpmIdx, sp] /* return [ivIdx, cpmIdx, sp] so that entries can be identified after sorting */
  return [ivIdx, sp, cp, A] /* return [ivIdx, sp, cp, A] so that entries can be identified after sorting, and so sorting on gpu doesn't need to perform lookups (since it already has cp and Atk for tie-breaking) */
}
export function sortPfIVsAtCpLimit_GPU(pfIvLevelsSP, pokeforms, ivs, cpms) {
  /* currently will not run due to unknown identifiers -> probably 'outputX' and 'result' */
  // debugger;
  let { y, x } = this.thread
  /* outputX is the X dimension length inside kernel */
  /* pass all except last input element directly to result */
  if (x < outputX - 1) { return pfIvLevelsSP[y][x] }

  /* manually add last input element, then sort */
  result[y][x] = pfIvLevelsSP[y][x]

  // let spColIdx = 3, pfIdx = 0, ivIdx = 1, cpmIdx = 2 /* for entries as [pfIdx, ivIdx, cpmIdx, sp] */
  let ivIdx = 0, cpmIdx = 1, spColIdx = 2 /* for entries as [ivIdx, cpmIdx, sp] */
  function compareSP_CP_Atk(a, b) {
    /*  */
    // return b[spColIdx] - a[spColIdx] || b[cpIdx] - a[cpIdx] || b[AtkIdx] - a[AtkIdx]

    /* compare SPs */
    let c1 = b[spColIdx] - a[spColIdx]
    if (c1) return c1

    /* get stats for further comparisons */
    let statsB = [
      pokeforms[b[pfIdx]][2] + ivs[b[ivIdx]][1], /* atk total */
      pokeforms[b[pfIdx]][3] + ivs[b[ivIdx]][2], /* def total */
      pokeforms[b[pfIdx]][4] + ivs[b[ivIdx]][3]  /* sta total */
    ]
      , statsA = [
        pokeforms[a[pfIdx]][2] + ivs[a[ivIdx]][1], /* atk total */
        pokeforms[a[pfIdx]][3] + ivs[a[ivIdx]][2], /* def total */
        pokeforms[a[pfIdx]][4] + ivs[a[ivIdx]][3]  /* sta total */
      ]
      , cpmB = cpms[b[cpmIdx]]
      , cpmA = cpms[a[cpmIdx]]

    /* compare CPs */
    let cpB = Math.max(10, ((statsB[0] * Math.sqrt(statsB[1]) * Math.sqrt(statsB[2]) * Math.pow(cpmB, 2)) / 10) >> 0)
    let cpA = Math.max(10, ((statsA[0] * Math.sqrt(statsA[1]) * Math.sqrt(statsA[2]) * Math.pow(cpmA, 2)) / 10) >> 0)
    let c2 = cpB - cpA
    if (c2) return c2

    /* compare Atk */
    let AtkB = statsB[0] * cpmB
      , AtkA = statsA[0] * cpmA
    return AtkB - AtkA
  }
  this.result[y].sort(compareSP_CP_Atk)
  /* return last item after sorting, so it's not lost */
  return this.result[y][x]
  //  done = false
  //  while (!done) {}
}

// function gpuOddEvenSort_oddPhase(input, spIdx, cpIdx, AtkIdx) {
export function gpuOddEvenSort_oddPhase(input, spColIdx) {
  // debugger
  // let { y: pfIdx, x: el1Idx } = this.thread
  let { y, x } = this.thread
  // let isIv1IdxEven = iv1Idx % 2 == 0
  /* if iv1Idx is odd iv2Idx is iv1Idx - 1 
     if iv1Idx is odd iv2Idx is iv1Idx + 1 
     Can't use the inverse bc '& 0' to check even always returns 0 */
  // let el2Idx = el1Idx - (el1Idx & 1 || -1)
  // let el2Idx = 0
  // if (el1Idx % 2 == 0) el2Idx = el1Idx + 1
  // else el2Idx = el1Idx - 1

  // let sp2 = input[pfIdx]
  return input[y][x]
  // if (sp2 < 0) return input[pfIdx][el1Idx]

  // let sp1 = input[pfIdx][el1Idx][spColIdx]
  // return sp1
  // // let resultIdx = iv1Idx
  // if (isIv1IdxEven) {
  //   if (sp2 > sp1) return input[pfIdx][el2Idx]
  //   else return input[pfIdx][el1Idx]
  // }
  // else { /* iv1Idx is ODD */
  //   if (sp2 < sp1) return input[pfIdx][el2Idx]
  //   else return input[pfIdx][el1Idx]
  // }
  // el2Idx = el1Idx - 1
  // if (input[pfIdx][el2Idx]) {
  //   resultIdx = input[pfIdx][el1Idx][spColIdx] < input[pfIdx][el2Idx][spColIdx] ? el1Idx : el2Idx
  // }
  // // return input[pfIdx][resultIdx ?? iv1Idx]
  // return input[pfIdx][resultIdx]
}
export function gpuOddEvenSort_evenPhase(input, spColIdx) {
  let { y: pfIdx, x: iv1Idx } = this.thread
  return input[pfIdx][iv1Idx]
  // return input[pfIdx][iv1Idx]
  // let iv2Idx = iv1Idx + 1
  // let resultIdx = iv1Idx
  // if (iv1Idx & 1 && input[pfIdx][iv2Idx]) {
  //   resultIdx = input[pfIdx][iv1Idx][spColIdx] > input[pfIdx][iv2Idx][spColIdx] ? iv1Idx : iv2Idx
  // }
  // iv2Idx = iv1Idx - 1
  // if (input[pfIdx][iv2Idx]) {
  //   resultIdx = input[pfIdx][iv1Idx][spColIdx] < input[pfIdx][iv2Idx][spColIdx] ? iv1Idx : iv2Idx
  // }
  // // return input[pfIdx][resultIdx ?? iv1Idx]
  // return input[pfIdx][resultIdx]
}
export function oddEvenSort_js(input, n) {
  /* https://www.geeksforgeeks.org/odd-even-sort-brick-sort/ */
  // let { y: pfIdx, x: ivIdx } = this.thread
  let isSorted = false;

  while (!isSorted) {
    isSorted = true;
    let temp = 0;

    // Perform Bubble sort on odd indexed element
    for (let i = 1; i <= n - 2; i = i + 2) {
      if (input[i] > input[i + 1]) {
        temp = input[i];
        input[i] = input[i + 1];
        input[i + 1] = temp;
        isSorted = false;
      }
    }

    // Perform Bubble sort on even indexed element
    for (let i = 0; i <= n - 2; i = i + 2) {
      if (input[i] > input[i + 1]) {
        temp = input[i];
        input[i] = input[i + 1];
        input[i + 1] = temp;
        isSorted = false;
      }
    }
  }

  return;
}


//#endregion GPU CALC FUNCTIONS

//#region CREATE KERNELS

//#endregion CREATE KERNELS
//#endregion FUNCTION DEFINITIONS



