/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { GPU, IGPUKernelSettings, IKernelFunctionThis, KernelOutput, Texture } from "gpu.js";
import { PokeCpmSet, PokeformBaseStats, PokeformTotalStats, PokeformTotalStatsArray, PokeIv, PokeIvSet } from "../types";
import { TestState, TestStatus } from "../types";
import { ParseResult } from "papaparse";

//#region CONSTANTS
const GM_WHOLE_LEVEL_CPMS = [0.094, 0.16639787, 0.21573247, 0.25572005, 0.29024988, 0.3210876, 0.34921268, 0.3752356, 0.39956728, 0.4225, 0.44310755, 0.4627984, 0.48168495, 0.49985844, 0.51739395, 0.5343543, 0.5507927, 0.5667545, 0.5822789, 0.5974, 0.6121573, 0.6265671, 0.64065295, 0.65443563, 0.667934, 0.6811649, 0.69414365, 0.7068842, 0.7193991, 0.7317, 0.7377695, 0.74378943, 0.74976104, 0.7556855, 0.76156384, 0.76739717, 0.7731865, 0.77893275, 0.784637, 0.7903, 0.7953, 0.8003, 0.8053, 0.8103, 0.8153, 0.8203, 0.8253, 0.8303, 0.8353, 0.8403, 0.8453]

export const
  ALL_CPMS = getFullCpmList(GM_WHOLE_LEVEL_CPMS),
  // ALL_IVS = createIvMatrix(),
  TEST_LIMITS = {
    IV_BATCH_SIZE: 4096,
    MAX_CP: 9999,
    IV_FLOOR: 0,
    MAX_LEVEL: 51
  } as const,
  TEST_DEFAULTS = {
    CP_LIMITS: [1500],
    TARGET_LEVELS: [40]
  } as const,
  CP_LIMITS = {
    LL: 500,
    GL: 1500,
    UL: 2500,
    ML: 9999,
  } as const
//#endregion CONSTANTS

//#region HELPER FUNCTIONS
export function timeTest<T extends (...args: any[]) => any>({ testName, fn, silent, logPerformance, logResult }: {
  testName: string
  fn: T
  // fnArgs?: any[]
  silent?: boolean
  logPerformance?: boolean
  logResult?: boolean
}): { result: ReturnType<T>, duration: number } {
  // let { useWorker, silentRun, logPerformance, logResult } = options
  // {targetEl, appendToEl, appendChildToEl}
  if (!silent)
    console.log(`%cRunning ${testName}`, "background-color:cornflowerblue; color:white");
  const t0 = performance.now();
  const result = fn()
  const t1 = performance.now();
  const duration = t1 - t0

  if (!(logPerformance == false))
    console.log(`${testName} duration: ${Math.round(duration).toLocaleString()} ms`);

  /* Log result by default. Explicitly disable */
  if (!(logResult == false))
    console.log(`${testName} result:\n`, result);
  if (!silent)
    console.info(`%cFinished ${testName}`, "background-color:orange; color:black");
  return { result, duration };
}

export function createTestState(initialStatus: TestStatus | undefined, initialResult: number | undefined): TestState {
  return {
    getMaxValidCPMsAndStats: {
      cpu: { status: initialStatus, result: initialResult },
      gpu: { status: initialStatus, result: initialResult },
      cpuFallback: { status: initialStatus, result: initialResult },
    },
    sortSPs: {
      cpu: { status: initialStatus, result: initialResult },
      gpu: { status: initialStatus, result: initialResult },
      cpuFallback: { status: initialStatus, result: initialResult },
    },
    calcPercentSPs: {
      cpu: { status: initialStatus, result: initialResult },
      gpu: { status: initialStatus, result: initialResult },
      cpuFallback: { status: initialStatus, result: initialResult },
    }
  }
}

export function getFullCpmList(floatCPMs: number[]): number[]
export function getFullCpmList(floatCPMs: number[], withLevels: 'array'): PokeCpmSet[]
export function getFullCpmList(floatCPMs: number[], withLevels: 'map'): Map<number, number>
export function getFullCpmList(floatCPMs: number[], withLevels?: 'array' | 'map') {
  const allCpms = _getFullCpmList(floatCPMs);
  if (!withLevels) return allCpms
  else {
    const allCpmsWithLevels = allCpms.map((cpm, i) => [cpmIdxToLevel(i), cpm]) as [number, number][]
    if (withLevels == 'array') return allCpmsWithLevels
    else return new Map<number, number>(allCpmsWithLevels)
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
        allCpms[mappedIdx + 1] = _getHalfLevelCPM(cpm, trueCpms[i + 1]);
      }
    })
    return allCpms

  }

  function _getHalfLevelCPM(levelCpm: number, nextLevelCpm: number) {
    const halfLevelCpm = Math.sqrt(
      levelCpm * levelCpm
      - (levelCpm * levelCpm) / 2
      + (nextLevelCpm * nextLevelCpm) / 2
    );
    return halfLevelCpm;
  }
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

export function shouldFilterPokeforms(testParams: Record<string, any>) {
  return (
    testParams.PF_BATCH_SIZE > 0
    || testParams.filter?.range?.length > 0
    || (testParams.filter?.selection?.length > 0)
  )
}

export function filterPokeforms(
  pokeforms: PokeformBaseStats[], testParams: Record<string, any>
): PokeformBaseStats[] {
  const { PF_BATCH_SIZE, filter: { range, selection } } = testParams
  let filteredPokeforms: PokeformBaseStats[] = pokeforms.map(pf => [...pf])
  if (range) {
    const pidIdx = 0
    const fidIdx = 1
    /* range option set -> get all rows with matching pId, including multiple forms */
    filteredPokeforms = pokeforms.filter((pf) => pf[pidIdx] >= range[pidIdx] && pf[pidIdx] <= range[fidIdx]);
  }
  else if (selection && selection.length > 0) {
    /* selection set -> get all rows with matching [pId, fId] */
    const selectionMap = selection.reduce((map: { set: (arg0: any, arg1: boolean) => any; }, pf: any[]) => map.set(pf.join(), true), new Map());
    const rowCount = pokeforms.length;
    let remaining = selectionMap.size;
    let i = 0;
    filteredPokeforms = []
    while (remaining > 0 /* when 0 remaining all pokeforms found -> break out of loop  */
      && i < rowCount) { /* when i reaches rowCount, nothing more to check */
      if (selectionMap.has(`${pokeforms[i][0]},${pokeforms[i][1]}`)) {
        filteredPokeforms.push(pokeforms[i]);
        remaining--;
      }
      i++;
    }
  }
  if (PF_BATCH_SIZE < filteredPokeforms.length) return filteredPokeforms.slice(0, testParams.PF_BATCH_SIZE)
  return filteredPokeforms
}

function binarySearchMatch(
  arr: number[],
  target: number,
  match_type: -1 | 0 | 1 = 0) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return mid;
    }
    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  // If target is not found
  if (match_type === 0) {
    return -1;
  } else if (match_type === -1) {
    return right;
  } else {
    return left;
  }
}

function getMaxValidCPM_binarySearch(
  cpms: number[],
  targetCpm: number) {
  const idx = binarySearchMatch(cpms, targetCpm, -1)
  return cpms[idx]
}

function getMaxValidCpm_reverseSearch(theoreticalCpm: number, cpms: number[]) {
  const lastCpmIdx = cpms.length - 1; /* starting point for reverse scan of CPMs (CPMs length depends on IV_BATCH size) */
  for (let i = lastCpmIdx; i > -1; i--) {
    if (cpms[i] <= theoreticalCpm) return cpms[i];
  }
}

// function getMaxValidCpms(calcCpms: number[][], cpms: [number, number][]) {
//   const yLength = calcCpms.length; /* number of pokeforms (1 calcCPM set per pokemform) */
//   const xLength = calcCpms[0].length; /* number of IV combos per pokeform */
//   const lastCpmIdx = cpms.length - 1; /* starting point for reverse scan of CPMs (CPMs length depends on IV_BATCH size) */
//   /* create array to hold results, length = # of pokeforms */
//   const trueCpms = Array(yLength);
//   /* loop through pokeforms */
//   for (let y = 0; y < yLength; y++) {
//     /* for each pokeform, create nested array for trueCPM results */
//     trueCpms[y] = Array(xLength);
//     /* loop through calcCPMs of current pokeform */
//     for (let x = 0; x < xLength; x++) {
//       // trueCpms[y][x] = cpms[0];
//       /* for each calcCPM reverse scan CPMs to find max valid CPM (first CPM <= calcCPM) */
//       for (let i = lastCpmIdx; i > -1; i--) {
//         if (cpms[i][1] <= calcCpms[y][x]) {
//           trueCpms[y][x] = cpms[i];
//           break;
//         }
//       }
//     }
//   }
//   return trueCpms;
// }

export function saveAsFile(data: BlobPart, mimeType: any, filename: string) {
  const a = document.createElement('a')
  const blob = new Blob([data], { type: mimeType })
  a.href = URL.createObjectURL(blob)
  a.download = filename
  a.click()
  URL.revokeObjectURL(a.href)
}

// export function compareCpuGpuResults_pfIvLevelsSPs2D(
//   cpuResults: ReturnType<typeof getMaxStats2D_PFs_IVs>,
//   gpuResults: [number, number, number, number][][],
//   pokeforms: PokeformBaseStats[],
//   ivs: PokeIvSet[]) {
//   const cols = ["level", "cp", "hp", "sp"]
//   const differences = {} as Record<string, any>
//   const maxPfIdx = cpuResults.length - 1
//   const maxIvIdx = cpuResults[0].length
//   for (let pfIdx = 0; pfIdx < maxPfIdx; pfIdx++) {
//     let isDifferent = false
//     for (let ivIdx = 0; ivIdx < maxIvIdx; ivIdx++) {
//       for (let colIdx = 0; colIdx < 4; colIdx++) {
//         if (gpuResults[pfIdx][ivIdx][colIdx] != cpuResults[pfIdx][ivIdx][colIdx]) {
//           if (!differences[pfIdx]) differences[pfIdx] = {}
//           if (!differences[pfIdx][ivIdx]) differences[pfIdx][ivIdx] = {}
//           differences[pfIdx][ivIdx][cols[colIdx]] = { gpu: gpuResults[pfIdx][ivIdx][colIdx], cpu: cpuResults[pfIdx][ivIdx][colIdx] }
//           isDifferent = true
//           break
//         }
//       }
//       if (isDifferent) break
//     }
//   }
//   // console.log("differences:", differences)
//   const differenceSummary = { level: 0, cp: 0, hp: 0, sp: 0 }
//   Object.values(differences).forEach((pfEntry) => Object.values(pfEntry).forEach(ivEntry => Object.keys(ivEntry as object).forEach((diffKey) => differenceSummary[diffKey]++)))
//   console.log("differenceSummary:", differenceSummary)

//   const nonSPdiffs = Object.entries(differences)
//     .filter(([pfIdx, ivIdx]) => Object.values(ivIdx).every(iv => !(Object.keys(iv as object)[0] == "sp")))
//     .reduce((result, [pfIdx, diffEntry]) => {
//       const pfId = `${pokeforms[+pfIdx][0]},${pokeforms[+pfIdx][1]}`
//       const [, ...iv] = ivs[Object.keys(diffEntry)[0]]
//       const ivString = iv.join("-")
//       result.push([`${pfId} @ ${ivString}`, Object.values(diffEntry)[0]])
//       return result
//     }, [])
//   console.log("non-SP differences:", nonSPdiffs)
// }

export function getHeadersAndData(results: ParseResult<any>, areHeadersSeparate: boolean) {
  // console.log("Results", results);
  /* ENTRIES AS OBJECTS */
  let headers: string[] | undefined
  let { data } = results
  if (areHeadersSeparate) {
    // console.log("Object Results");
    headers = results.meta.fields
  } else {
    /* ENTRIES AS ARRAYS */
    // console.log("Array Results");
    /* extract headers from first row */
    headers = results.data.slice(0, 1)
    data = results.data.slice(1)
  }

  // console.log("Headers:", headers)
  // console.log("Data", data);
  return { headers, data }
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

//#region CALC FUNCTIONS

function _getTotalStats(baseStats: PokeformBaseStats, ivSet: PokeIvSet
): PokeformTotalStatsArray {
  const
    bAtk = baseStats[2],
    bDef = baseStats[3],
    bSta = baseStats[4],
    atkIv = ivSet[1],
    defIv = ivSet[2],
    staIv = ivSet[3]

  return [
    bAtk + atkIv,
    bDef + defIv,
    bSta + staIv
  ]
}

function getTotalStats(baseStats: PokeformBaseStats, ivSet: PokeIvSet): PokeformTotalStats {
  const tStats = _getTotalStats(baseStats, ivSet)
  return {
    tAtk: tStats[0],
    tDef: tStats[1],
    tSta: tStats[2]
  }
}

function _getCP(totalStats: PokeformTotalStatsArray, cpm: number): number {
  /* Can't use level (cpm-scaled) base stats */
  const tAtk = totalStats[0],
    tDef = totalStats[1],
    tSta = totalStats[2]
  // return Math.max(10, Math.floor((tAtk * Math.sqrt(tDef) * Math.sqrt(tSta) * Math.pow(cpm, 2)) / 10));
  return Math.max(10, Math.floor((tAtk * Math.sqrt(tDef * tSta) * Math.pow(cpm, 2)) / 10));
}

function getCP(totalStats: PokeformTotalStats, cpm: number): number {
  /* Can't use cpm-scaled base stats */
  return _getCP([totalStats.tAtk, totalStats.tDef, totalStats.tSta], cpm)
}

function getHP(tSta: number, cpm: number) {
  return Math.floor(tSta * cpm)
}

function _getSP(levelStats: [lAtk: number, lDef: number, hp: number]) {
  const lAtk = levelStats[0],
    lDef = levelStats[1],
    hp = levelStats[2]

  return lAtk * lDef * hp;
}

function getSP(levelStats: { lAtk: number, lDef: number, hp: number }) {
  return _getSP([levelStats.lAtk, levelStats.lDef, levelStats.hp])
}

function _getLevelStatsBasic(totalStats: PokeformTotalStatsArray, cpm: number
): [lAtk: number, lDef: number, hp: number] {
  const tAtk = totalStats[0],
    tDef = totalStats[1],
    tSta = totalStats[2]

  return [
    tAtk * cpm,
    tDef * cpm,
    getHP(tSta, cpm)
  ]
}

function getLevelStatsBasic(totalStats: PokeformTotalStats, cpm: number) {
  const lStats = _getLevelStatsBasic([totalStats.tAtk, totalStats.tDef, totalStats.tSta], cpm)
  return {
    lAtk: lStats[0],
    lDef: lStats[1],
    hp: lStats[2]
  }
}

function _getLevelStatsAdvanced(totalStats: PokeformTotalStatsArray, cpm: number) {
  const lStats = _getLevelStatsBasic(totalStats, cpm),
    lAtk = lStats[0],
    hp = lStats[2]

  return [
    _getCP(totalStats, cpm),
    hp,
    _getSP(lStats),
    lAtk,
  ]
}

function getLevelStatsAdvanced(totalStats: PokeformTotalStats, cpm: number) {
  const { lAtk, lDef, hp } = getLevelStatsBasic(totalStats, cpm)
  return {
    cp: getCP(totalStats, cpm),
    hp,
    sp: getSP({ lAtk, lDef, hp }),
    lAtk,
    // lDef
  }
}

function _getTheoreticalCpm(totalStats: PokeformTotalStatsArray, targetCP: number) {
  const
    tAtk = totalStats[0],
    tDef = totalStats[1],
    tSta = totalStats[2]
  return Math.sqrt(
    ((targetCP + 0.9999999) * 10)
    / (tAtk * Math.sqrt(tDef) * Math.sqrt(tSta))
  )
}

function getTheoreticalCpm(totalStats: PokeformTotalStats, targetCP: number) {
  return Math.sqrt(
    ((targetCP + 0.9999999) * 10)
    / (totalStats.tAtk * Math.sqrt(totalStats.tDef) * Math.sqrt(totalStats.tSta))
  )
}

//#endregion CALC FUNCTIONS

//#region CPU TESTS

/**
 * Finds the greatest valid CPM less than or equal to a theoretical CPM
 * @returns Either index, cpm, level, or [level, cpm], depending on 'resultType' parameter
 */
function getValidCpm(
  theoreticalCpm: number,
  cpms: number[],
  resultType: 'idx' | 'cpm' | 'level' | 'both' = 'cpm',
): number | [level: number, cpm: number] {
  const idx = getMaxValidCPM_binarySearch(cpms, theoreticalCpm)
  switch (resultType) {
    case "idx":
      return idx
    case "cpm":
      return cpms[idx]
    case "level": 
      return cpmIdxToLevel(idx)
    case "both": {
      const level = cpmIdxToLevel(idx),
        cpm = cpms[idx]
      return [level, cpm]
    }
    default:
      throw new Error("Invalid resultType. Must be one of 'idx', 'cpm', or 'set'");
  }
}

// function getTheoreticalCpmsForManyIvSets(
//   pfBaseStats: PokeformBaseStats,
//   ivs: PokeIvSet[],
//   targetCp: number
// ) {

//   const result = Array(ivs.length) as ReturnType<typeof getTheoreticalCpm>[]
//   for (const ivIdx in ivs) {
//     result[ivIdx] =
//       getTheoreticalCpm(getTotalStats(pfBaseStats, ivs[ivIdx]), targetCp)
//   }
//   return result
// }



// export function getTheoreticalCpmsAtCp_CPU(
//   pokeforms: PokeformBaseStats[],
//   ivs: PokeIvSet[],
//   cpLimit: number
// ) {
//   const calcCpms = Array(pokeforms.length);
//   for (const pfIdx in pokeforms) {
//     calcCpms[pfIdx] = getTheoreticalCpmsForManyIvSets(pokeforms[pfIdx], ivs, cpLimit)
//   }
//   /* calcCpms = [
//     [0.34534, 0.64534,...], <- pokeform 1
//     [0.42018, 0.00483,...], <- pokeform 2
//      ^ iv 1    ^ iv 2
//     ...
//   ] */
//   return calcCpms as number[][];
// }

function getMaxStats0D_PF_IV(args: {
  pfBaseStats: PokeformBaseStats,
  ivSet: PokeIvSet,
  ivIdx: number,
  targetCP: number,
  cpms: number[]
}): [ivIdx: number, cpmIdx: number, cp: number, sp: number] {
  const tStats = getTotalStats(args.pfBaseStats, args.ivSet),
    tCpm = getTheoreticalCpm(tStats, args.targetCP),
    cpm = getValidCpm(tCpm, args.cpms, 'cpm') as number,
    { cp, sp, lAtk } = getLevelStatsAdvanced(tStats, cpm)
  // /* return [ivIdx, level, cp, sp, lAtk] */
  // return [ivIdx, level, cp, sp, lAtk]; 

  // /* return [pfIdx, ivIdx, level, sp] so that entries can be identified after sorting */
  // return [pfIdx, ivIdx, level, sp]

  /* return [ivIdx, cpmIdx, cp, sp] so that entries can be identified after sorting */
  return [args.ivIdx, cp, sp, lAtk]
}
function getMaxStats1D_PF_IVs(args: {
  targetCP: number,
  pfBaseStats: PokeformBaseStats,
  ivSets: PokeIvSet[],
  cpms: number[]
}): [ivIdx: number, cp: number, statProd: number, lAtk: number][] {
  const { cpms, ivSets, pfBaseStats, targetCP } = args
  const pfIvStatsArray = []
  for (const ivIdx in ivSets) {
    pfIvStatsArray.push(
      getMaxStats0D_PF_IV({
        cpms,
        ivIdx: +ivIdx,
        ivSet: ivSets[ivIdx],
        pfBaseStats,
        targetCP,
      })
    );
  }
  return pfIvStatsArray
}

export function getMaxStats2D_PFs_IVs(args: {
  targetCP: number,
  pokeforms: PokeformBaseStats[],
  ivSets: PokeIvSet[],
  cpms: number[]
}): [ivIdx: number, cp: number, statProd: number, lAtk: number][][] {
  const { cpms, ivSets, pokeforms, targetCP } = args
  /* loop through pokeforms, loop through ivs, create [] */
  const pfArray = []
  for (const pfBaseStats of pokeforms) {
    pfArray.push(
      getMaxStats1D_PF_IVs({
        cpms,
        ivSets,
        pfBaseStats,
        targetCP,
      })
    );
  }

  /* pf = [
    [0.34534, 0.64534,...], <- pfIdx 0
    [0.42018, 0.00483,...], <- pfIdx 1
     ^ ivIdx 0    ^ ivIdx 1
    ...
  ] */
  return pfArray
}

export function getMaxStats3D_PF_CPs_IVs(args: {
  targetCP: number,
  pokeforms: PokeformBaseStats[],
  ivSets: PokeIvSet[],
  cpms: number[]
}): [ivIdx: number, cp: number, statProd: number, lAtk: number][][] {
  const { cpms, ivSets, pokeforms, targetCP } = args
  /* loop through pokeforms, loop through ivs, create [] */
  const pfArray = []
  for (const pfBaseStats of pokeforms) {
    pfArray.push(
      getMaxStats1D_PF_IVs({
        cpms: cpms,
        ivSets,
        pfBaseStats,
        targetCP,
      })
    );
  }

  /* pf = [
    [0.34534, 0.64534,...], <- pfIdx 0
    [0.42018, 0.00483,...], <- pfIdx 1
     ^ ivIdx 0    ^ ivIdx 1
    ...
  ] */
  return pfArray
}

function sortPfIvsComparator(
  a: [ivIdx: number, cpmIdx: number, sp: number],
  b: [ivIdx: number, cpmIdx: number, sp: number],
  pfIdx: number,
  pokeforms: PokeformBaseStats[],
  ivs: PokeIvSet[],
  cpms: PokeCpmSet[]
) {
  /* compare SPs */
  const c1 = b[2] - a[2]
  if (c1) return c1

  const
    tStatsA = getTotalStats(pokeforms[pfIdx], ivs[a[0]]),
    tStatsB = getTotalStats(pokeforms[pfIdx], ivs[b[0]]),
    cpmA = cpms[a[1]][1],
    cpmB = cpms[b[1]][1],
    cpA = getCP(tStatsA, cpmA),
    cpB = getCP(tStatsB, cpmB),
    /* compare CPs */
    c2 = cpB - cpA
  if (c2) return c2

  /* compare Atk */
  const AtkA = tStatsA.tAtk * cpmA,
    AtkB = tStatsB.tAtk * cpmB
  return AtkB - AtkA
}

export function sortPfIvsByStatsDesc2D_CPU(
  pfIvs_statsUnderCP: ReturnType<typeof getMaxStats2D_PFs_IVs>,
  // pokeforms: PokeformBaseStats[],
  // ivs: PokeIvSet[],
  // cpms: [number, number][]
) {
  /* modify idx vars below to match contents of validCPMsWithSPs entries */
  // let spColIdx = 3, cpIdx = 1, AtkIdx = 2 /* for entries as [level, cp, Atk, sp] */
  // let spColIdx = 3, pfIdx = 0, ivIdx = 1, cpmIdx = 2 /* for entries as [pfIdx, ivIdx, cpmIdx, sp] */
  // const ivIdx = 0, cpmIdx = 1, spColIdx = 2 /* for entries as [ivIdx, cpmIdx, sp] */
  const ivIdx = 0, cpColIdx = 1, spColIdx = 2, lAtkIdx = 3/* for entries as [ivIdx, cp, sp, lAtk] */
  for (const pfIdx in pfIvs_statsUnderCP) {
    pfIvs_statsUnderCP[pfIdx].sort((a, b) => {
      // /* For entries as [ivIdx, cpmIdx, sp]  */
      // return sortPfIvsComparator(a,b,pfIdx,pokeforms,ivs,cpms)

      /* For entries as [ivIdx, cp, sp, lAtk] */
      return b[spColIdx] - a[spColIdx] || b[cpColIdx] - a[cpColIdx] || b[lAtkIdx] - a[lAtkIdx]
    })
    return pfIvs_statsUnderCP
  }
}

export function calcCpmsAtCpLimit3D_CPU(
  pokeforms: PokeformBaseStats[],
  ivs: PokeIvSet[],
  cpLimits: number[]
) {
  const calcCpms: number[][][] = Array(pokeforms.length);
  for (const pfIdx in pokeforms) {
    calcCpms[pfIdx] = Array(cpLimits.length);
    for (const cpLimit of cpLimits) {
      calcCpms[pfIdx] = Array(ivs.length);
      for (const ivIdx in ivs) {
        calcCpms[pfIdx][cpLimit][ivIdx] =
          getTheoreticalCpm(getTotalStats(pokeforms[pfIdx], ivs[ivIdx]), cpLimit)
      }
    }
  }

  return calcCpms;
}

export function getSPsAtCpLimit3D_CPU(
  cpLimits: number[],
  pokeforms: PokeformBaseStats[],
  ivs: PokeIvSet[],
  cpms: [number, number][]
): [ivIdx: number, cp: number, statProd: number, lAtk: number][][][] {
  const calcCpms = calcCpmsAtCpLimit3D_CPU(pokeforms, ivs, cpLimits)
  const ivCount = ivs.length;
  /* create array to hold results, length = # of pokeforms */
  const result = Array(pokeforms.length) as [ivIdx: number, cp: number, statProd: number, lAtk: number][][][]
  /* loop through pokeforms */
  for (const pfIdx in pokeforms) {
    /* for each pokeform, create nested array for trueCPM results */
    result[pfIdx] = Array(cpLimits.length);
    for (const cpLimitIdx in cpLimits) {
      /* for each pokeform, create nested array for trueCPM results */
      result[pfIdx][cpLimitIdx] = Array(ivCount);
      /* loop through calcCPMs of current pokeform */
      for (const ivIdx in ivs) {
        const tStats = getTotalStats(pokeforms[pfIdx], ivs[ivIdx]),
          cpm = getMaxValidCPM_binarySearch(cpms.map(c => c[1]), calcCpms[pfIdx][cpLimitIdx][ivIdx]),
          { cp, sp, lAtk } = getLevelStatsAdvanced(tStats, cpm)
        // result[y][x] = cpms[i]; /* return [level, cpm] */
        // result[y][x] = [cpms[i][0], cp, (a * cpm), sp]; /* return [level, cp, hp, sp] */
        // result[y][x] = [y, x, cpms[i][1], sp] /* return [pfIdx, ivIdx, cpm@cpLimit, sp] so that entries can be identified after sorting */
        result[pfIdx][cpLimitIdx][ivIdx] = [+ivIdx, cp, sp, lAtk] /* return [ivIdx, cpmIdx, sp] so that entries can be identified after sorting */
      }
    }
  }
  return result;
}

export function sortIVsBySPs3D_CPU(
  pfIvSPs: ReturnType<typeof getSPsAtCpLimit3D_CPU>,
  // pokeforms: PokeformBaseStats[],
  // ivs: PokeIvSet[],
  // cpms: [number, number][]
  cpLimits: number[]
) {
  /* modify idx vars below to match contents of validCPMsWithSPs entries */
  // let spColIdx = 3, cpIdx = 1, AtkIdx = 2 /* for entries as [level, cp, Atk, sp] */
  // let spColIdx = 3, pfIdx = 0, ivIdx = 1, cpmIdx = 2 /* for entries as [pfIdx, ivIdx, cpmIdx, sp] */
  // const ivIdx = 0, cpmIdx = 1, spColIdx = 2 /* for entries as [ivIdx, cpmIdx, sp] */
  const ivIdx = 0, cpColIdx = 1, spColIdx = 2, lAtkIdx = 3/* for entries as [ivIdx, cp, sp, lAtk] */
  for (const pfIdx in pfIvSPs) {
    for (const cpLimitIdx in cpLimits) {
      pfIvSPs[cpLimitIdx][pfIdx].sort((a, b) => {
        // /* For entries as [ivIdx, cpmIdx, sp]  */
        // return sortPfIvsComparator(a,b,pfIdx,pokeforms,ivs,cpms)
        /* For entries as [ivIdx, cp, sp, lAtk] */
        return b[spColIdx] - a[spColIdx]
          || b[cpColIdx] - a[cpColIdx]
          || b[lAtkIdx] - a[lAtkIdx]
      })
    }
  }
  return pfIvSPs
}
//#endregion CPU TESTS

//#region GPU TEST KERNEL FUNCTIONS

export const gpuG = new GPU({ mode: 'gpu' })
export const gpuC = new GPU({ mode: 'cpu' })
export const gpuD = new GPU({ mode: 'dev' })
gpuG
export function warmupGpu(size: number, gpuName: string = "gpuG", gpu: GPU = gpuG) {
  const kernel = gpu.createKernel(function () {
    // return this.thread.x * this.thread.y * this.thread.z * 3
    return 0
  }, {
    output: [size, size],
    pipeline: true,
    immutable: true,
    optimizeFloatMemory: true,
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

export function createKernlIndirect(
  gpu: GPU,
  kernelFn: typeof gpu.createKernel,
  kernelSettings?: IGPUKernelSettings
): ReturnType<typeof kernelFn> {
  return gpu.createKernel(kernelFn, kernelSettings);
}

export function calcCPs_GPU(this: any, pokeForms: PokeformBaseStats[], ivs: PokeIvSet[], cpms: number[]) {
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

export function calcCpmsAtCpLimit_GPU(this: any, pokeforms: PokeformBaseStats[], ivs: PokeIvSet[], cpLimit: number) {
  if (cpLimit == 0) return 1
  const atkBaseIdx = 2, defBaseIdx = 3, staBaseIdx = 4;
  const atkIvIdx = 1, defIvIdx = 2, staIvIdx = 3;
  const { x, y } = this.thread;
  /*
        x -> iterator for pokeform
        y -> iterator for IVs
       */
  const a = pokeforms[y][atkBaseIdx] + ivs[x][atkIvIdx];
  const d = pokeforms[y][defBaseIdx] + ivs[x][defIvIdx];
  const s = pokeforms[y][staBaseIdx] + ivs[x][staIvIdx];
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

export function getMaxValidCpms_GPU(calcCpms: { [x: string]: { [x: string]: number; }; }, cpms: { [x: string]: { [x: string]: any; }; }, lastCpmIdx: any, returnCPM: any, returnLevel: any) {
  // debugger;
  // if (!returnCPM && !returnLevel)
  //   return;
  const { x, y } = (this as IKernelFunctionThis).thread;
  /* x -> iterator for pokeform
     y -> iterator for IVs*/
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

export function getPfIvLevelsSPsAtCpLimit2D_GPU(this: any,
  pokeForms: PokeformBaseStats[],
  ivs: PokeIvSet[],
  cpms: [level: number, cpm: number][],
  cpLimit: number,
  maxLevelIdx: number) {
  // debugger;
  /* GET CALC CPMs AT CP LIMIT */
  // if (cpLimit == 0) return 1
  const { x: ivIdx, y: pfIdx } = (this as IKernelFunctionThis).thread;
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
  let cpmIdx = maxLevelIdx
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
  // debugger;
  // return [cpms[cpmIdx][0], cp, A, sp] /* return [level, cp Atk, sp] */
  // return [pfIdx, ivIdx, cpms[cpmIdx][1], sp] /* return [pfIdx, ivIdx, cpm@cpLimit, sp] so that entries can be identified after sorting */
  // return [ivIdx, cpmIdx, sp] /* return [ivIdx, cpmIdx, sp] so that entries can be identified after sorting */
  return [ivIdx, sp, cp, A] /* return [ivIdx, sp, cp, A] so that entries can be identified after sorting, and so sorting on gpu doesn't need to perform lookups (since it already has cp and Atk for tie-breaking) */
}

export function getPfIvLevelsSPsAtCpLimit3D_GPU(this: any,
  pokeForms: PokeformBaseStats[],
  ivs: PokeIvSet[],
  cpms: [level: number, cpm: number][],
  cpLimit: number,
  maxLevelIdx: number) {
  // debugger;
  /* GET CALC CPMs AT CP LIMIT */
  // if (cpLimit == 0) return 1
  const { x: ivIdx, y: pfIdx } = (this as IKernelFunctionThis).thread;
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
  let cpmIdx = maxLevelIdx
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
  // debugger;
  // return [cpms[cpmIdx][0], cp, A, sp] /* return [level, cp Atk, sp] */
  // return [pfIdx, ivIdx, cpms[cpmIdx][1], sp] /* return [pfIdx, ivIdx, cpm@cpLimit, sp] so that entries can be identified after sorting */
  // return [ivIdx, cpmIdx, sp] /* return [ivIdx, cpmIdx, sp] so that entries can be identified after sorting */
  return [ivIdx, sp, cp, A] /* return [ivIdx, sp, cp, A] so that entries can be identified after sorting, and so sorting on gpu doesn't need to perform lookups (since it already has cp and Atk for tie-breaking) */
}

// export function oddEvenSort_CPU(input, n) {
//   /* https://www.geeksforgeeks.org/odd-even-sort-brick-sort/ */
//   // let { y: pfIdx, x: ivIdx } = this.thread
//   let isSorted = false;

//   while (!isSorted) {
//     isSorted = true;
//     let temp = 0;

//     // Perform Bubble sort on odd indexed element
//     for (let i = 1; i <= n - 2; i = i + 2) {
//       if (input[i] > input[i + 1]) {
//         temp = input[i];
//         input[i] = input[i + 1];
//         input[i + 1] = temp;
//         isSorted = false;
//       }
//     }

//     // Perform Bubble sort on even indexed element
//     for (let i = 0; i <= n - 2; i = i + 2) {
//       if (input[i] > input[i + 1]) {
//         temp = input[i];
//         input[i] = input[i + 1];
//         input[i + 1] = temp;
//         isSorted = false;
//       }
//     }
//   }

//   return;
// }

export function sortPfIVsAtCpLimit_GPU(pfIvLevelsSP, pokeforms, ivs, cpms) {
  /* currently will not run due to unknown identifiers -> probably 'outputX' and 'result' */
  // debugger;
  const { y, x } = this.thread
  /* outputX is the X dimension length inside kernel */
  /* pass all except last input element directly to result */
  if (x < this.output.x - 1) { return pfIvLevelsSP[y][x] }

  /* manually add last input element, then sort */
  result[y][x] = pfIvLevelsSP[y][x]

  // let spColIdx = 3, pfIdx = 0, ivIdx = 1, cpmIdx = 2 /* for entries as [pfIdx, ivIdx, cpmIdx, sp] */
  const ivIdx = 0, cpmIdx = 1, spColIdx = 2 /* for entries as [ivIdx, cpmIdx, sp] */
  function compareSP_CP_Atk(a: (string | number)[], b: (string | number)[]) {
    /*  */
    // return b[spColIdx] - a[spColIdx] || b[cpIdx] - a[cpIdx] || b[AtkIdx] - a[AtkIdx]

    /* compare SPs */
    const c1 = b[spColIdx] - a[spColIdx]
    if (c1) return c1

    /* get stats for further comparisons */
    const statsB = [
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
    const cpB = Math.max(10, ((statsB[0] * Math.sqrt(statsB[1]) * Math.sqrt(statsB[2]) * Math.pow(cpmB, 2)) / 10) >> 0)
    const cpA = Math.max(10, ((statsA[0] * Math.sqrt(statsA[1]) * Math.sqrt(statsA[2]) * Math.pow(cpmA, 2)) / 10) >> 0)
    const c2 = cpB - cpA
    if (c2) return c2

    /* compare Atk */
    const AtkB = statsB[0] * cpmB
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

export function oddEvenSort2D_oddPhase(input, spColIdx: string | number) {
  // debugger
  const { y: pfIdx, x: el1Idx } = (this as IKernelFunctionThis).thread
  // const { y, x } = (this as IKernelFunctionThis).thread
  const isIv1IdxEven = el1Idx % 2 == 0
  /* if iv1Idx is odd iv2Idx is iv1Idx - 1 
     if iv1Idx is odd iv2Idx is iv1Idx + 1 
     Can't use the inverse bc '& 0' to check even always returns 0 */
  let el2Idx = el1Idx - (el1Idx & 1 || -1)
  // let el2Idx = 0
  if (el1Idx % 2 == 0) el2Idx = el1Idx + 1
  else el2Idx = el1Idx - 1

  const sp2 = input[pfIdx]
  // return input[y][x]
  if (sp2 < 0) return input[pfIdx][el1Idx]

  const sp1 = input[pfIdx][el1Idx][spColIdx]
  return sp1
  // let resultIdx = iv1Idx
  if (isIv1IdxEven) {
    if (sp2 > sp1) return input[pfIdx][el2Idx]
    else return input[pfIdx][el1Idx]
  }
  else { /* iv1Idx is ODD */
    if (sp2 < sp1) return input[pfIdx][el2Idx]
    else return input[pfIdx][el1Idx]
  }
  el2Idx = el1Idx - 1
  if (input[pfIdx][el2Idx]) {
    resultIdx = input[pfIdx][el1Idx][spColIdx] < input[pfIdx][el2Idx][spColIdx] ? el1Idx : el2Idx
  }
  // return input[pfIdx][resultIdx ?? iv1Idx]
  return input[pfIdx][resultIdx]
}

export function oddEvenSort2D_evenPhase(input, spColIdx: string | number) {
  const { y: pfIdx, x: iv1Idx } = (this as IKernelFunctionThis).thread
  let iv2Idx = iv1Idx + 1
  let resultIdx = iv1Idx
  if (iv1Idx & 1 && input[pfIdx][iv2Idx]) {
    resultIdx = input[pfIdx][iv1Idx][spColIdx] > input[pfIdx][iv2Idx][spColIdx] ? iv1Idx : iv2Idx
  }
  iv2Idx = iv1Idx - 1
  if (input[pfIdx][iv2Idx]) {
    resultIdx = input[pfIdx][iv1Idx][spColIdx] < input[pfIdx][iv2Idx][spColIdx] ? iv1Idx : iv2Idx
  }
  // return input[pfIdx][resultIdx ?? iv1Idx]
  return input[pfIdx][resultIdx]
}

/* lastIdx:   last index of array (cannot use 'arary.length' in kernel) */
/* phase:     0 == even phase | 1 == odd phase */
/* sortOrder: 1 == ascending | -1 == descending */
export function oddEvenSort2D_halfPassFlex(
  array: [number, number, number, number][][],
  lastIdx: number,
  sortOrder: 1 | -1,
  phase: 0 | 1
) {
  const { y: pfIdx, x: ivIdx } = (this as IKernelFunctionThis).thread,
    // ivIdx, sp, cp, Atk
    ivColIdx = 0,
    spColIdx = 1,
    cpColIdx = 2,
    AtkColIdx = 3,
    /* Must explicitly coerce to boolean */
    isParityCongruent = ivIdx % 2 == phase ? true : false;

  // /* VERSION 1: USE VALUE REFERENCES */
  // // debugger;
  // // const curPfIv = array[pfIdx][ivIdx];
  // // let curSP = 0
  // const curSP = array[pfIdx][ivIdx][spColIdx]
  // if (isParityCongruent) {
  //   /* COMPARE LEFT */
  //   /* first idx can't compare left */
  //   if (ivIdx == 0) {
  //     // return array[pfIdx][ivIdx];
  //     return array[pfIdx][ivIdx]
  //   }
  //   // let leftSP = 0
  //   const leftSP = array[pfIdx][ivIdx - 1][spColIdx]
  //   // debugger;
  //   /* multiply by direction ( 1 or -1 ) to make comparison correct in all cases  */
  //   /* curSP / leftSP / rightSP *SHOULD* be numbers, but for some reason are arrays in runtime, must use index to access value */
  //   return (curSP * sortOrder) > (leftSP * sortOrder)
  //     ? array[pfIdx][ivIdx]
  //     : array[pfIdx][ivIdx - 1];
  // }
  // /* COMPARE RIGHT */
  // /* lastIdx can't compare right */
  // if (ivIdx == lastIdx) {
  //   // return array[pfIdx][ivIdx];
  //   return array[pfIdx][ivIdx]
  // }
  // // let rightSP = 0
  // const rightSP = array[pfIdx][ivIdx + 1][spColIdx]
  // // debugger;
  // return (curSP * sortOrder) < (rightSP * sortOrder)
  //   ? array[pfIdx][ivIdx]
  //   : array[pfIdx][ivIdx + 1];


  /* VERSION 2: EXTRACT PF-IV ENTRIES */
  // debugger;
  const curEntry = array[pfIdx][ivIdx]
  const curSP = curEntry[spColIdx]

  // let result;

  if (isParityCongruent) {
    /* COMPARE LEFT */
    /* first idx can't compare left */
    if (ivIdx == 0) {
      return curEntry;
    }
    const leftPfIv = array[pfIdx][ivIdx - 1]
    const leftSP = leftPfIv[spColIdx];
    // debugger;
    /* multiply by direction ( 1 or -1 ) to make comparison correct in all cases  */
    return sortOrder * curSP > leftSP * sortOrder ? curEntry : leftPfIv;
  }
  /* COMPARE RIGHT */
  /* lastIdx can't compare right */
  if (ivIdx == lastIdx) {
    return curEntry;
  }
  const rightPfIv = array[pfIdx][ivIdx + 1]
  const rightSP = rightPfIv[spColIdx];
  return sortOrder * curSP < rightSP * sortOrder ? curEntry : rightPfIv;
}

export function oddEvenSort3D_halfPassOdd(
  array: [number, number, number, number][][][],
  // lastIdx: number,
  sortOrder: 1 | -1,
) {
  const { z: pfIdx, y: cpCapIdx, x: ivIdx } = (this as IKernelFunctionThis).thread,
    lastIdx = (this as IKernelFunctionThis).output.x - 1,
    /* [ivIdx, sp, cp, Atk] */
    ivColIdx = 0,
    spColIdx = 1,
    cpColIdx = 2,
    AtkColIdx = 3,
    /* Must explicitly coerce to boolean */
    isParityCongruent = ivIdx % 2 == 1 ? true : false;

  // /* VERSION 1: USE VALUE REFERENCES */
  // // debugger;
  // // const curPfIv = array[pfIdx][ivIdx];
  // // let curSP = 0
  // const curSP = array[pfIdx][ivIdx][spColIdx]
  // if (isParityCongruent) {
  //   /* COMPARE LEFT */
  //   /* first idx can't compare left */
  //   if (ivIdx == 0) {
  //     // return array[pfIdx][ivIdx];
  //     return array[pfIdx][ivIdx]
  //   }
  //   // let leftSP = 0
  //   const leftSP = array[pfIdx][ivIdx - 1][spColIdx]
  //   // debugger;
  //   /* multiply by direction ( 1 or -1 ) to make comparison correct in all cases  */
  //   /* curSP / leftSP / rightSP *SHOULD* be numbers, but for some reason are arrays in runtime, must use index to access value */
  //   return (curSP * sortOrder) > (leftSP * sortOrder)
  //     ? array[pfIdx][ivIdx]
  //     : array[pfIdx][ivIdx - 1];
  // }
  // /* COMPARE RIGHT */
  // /* lastIdx can't compare right */
  // if (ivIdx == lastIdx) {
  //   // return array[pfIdx][ivIdx];
  //   return array[pfIdx][ivIdx]
  // }
  // // let rightSP = 0
  // const rightSP = array[pfIdx][ivIdx + 1][spColIdx]
  // // debugger;
  // return (curSP * sortOrder) < (rightSP * sortOrder)
  //   ? array[pfIdx][ivIdx]
  //   : array[pfIdx][ivIdx + 1];


  /* VERSION 2: EXTRACT PF-IV ENTRIES */
  // debugger;
  const curEntry = array[pfIdx][cpCapIdx][ivIdx]
  const curSP = curEntry[spColIdx]

  // let result;

  if (isParityCongruent) {
    /* COMPARE LEFT */
    /* first idx can't compare left */
    if (ivIdx == 0) {
      return curEntry;
    }
    const leftPfIv = array[pfIdx][cpCapIdx][ivIdx - 1]
    const leftSP = leftPfIv[spColIdx];
    // debugger;
    /* multiply by direction ( 1 or -1 ) to make comparison correct in all cases  */
    return sortOrder * curSP > leftSP * sortOrder ? curEntry : leftPfIv;
  }
  /* COMPARE RIGHT */
  /* lastIdx can't compare right */
  if (ivIdx == lastIdx) {
    return curEntry;
  }
  const rightPfIv = array[pfIdx][cpCapIdx][ivIdx + 1]
  const rightSP = rightPfIv[spColIdx];
  return sortOrder * curSP < rightSP * sortOrder ? curEntry : rightPfIv;
}

export function oddEvenSort3D_halfPassEven(
  array: [number, number, number, number][][][],
  // lastIdx: number,
  sortOrder: 1 | -1,
) {
  const { z: pfIdx, y: cpCapIdx, x: ivIdx } = (this as IKernelFunctionThis).thread,
    lastIdx = (this as IKernelFunctionThis).output.x - 1,
    /* [ivIdx, sp, cp, Atk] */
    ivColIdx = 0,
    spColIdx = 1,
    cpColIdx = 2,
    AtkColIdx = 3,
    /* Must explicitly coerce to boolean */
    isParityCongruent = ivIdx % 2 == 0 ? true : false;

  // /* VERSION 1: USE VALUE REFERENCES */
  // // debugger;
  // // const curPfIv = array[pfIdx][ivIdx];
  // // let curSP = 0
  // const curSP = array[pfIdx][ivIdx][spColIdx]
  // if (isParityCongruent) {
  //   /* COMPARE LEFT */
  //   /* first idx can't compare left */
  //   if (ivIdx == 0) {
  //     // return array[pfIdx][ivIdx];
  //     return array[pfIdx][ivIdx]
  //   }
  //   // let leftSP = 0
  //   const leftSP = array[pfIdx][ivIdx - 1][spColIdx]
  //   // debugger;
  //   /* multiply by direction ( 1 or -1 ) to make comparison correct in all cases  */
  //   /* curSP / leftSP / rightSP *SHOULD* be numbers, but for some reason are arrays in runtime, must use index to access value */
  //   return (curSP * sortOrder) > (leftSP * sortOrder)
  //     ? array[pfIdx][ivIdx]
  //     : array[pfIdx][ivIdx - 1];
  // }
  // /* COMPARE RIGHT */
  // /* lastIdx can't compare right */
  // if (ivIdx == lastIdx) {
  //   // return array[pfIdx][ivIdx];
  //   return array[pfIdx][ivIdx]
  // }
  // // let rightSP = 0
  // const rightSP = array[pfIdx][ivIdx + 1][spColIdx]
  // // debugger;
  // return (curSP * sortOrder) < (rightSP * sortOrder)
  //   ? array[pfIdx][ivIdx]
  //   : array[pfIdx][ivIdx + 1];


  /* VERSION 2: EXTRACT PF-IV ENTRIES */
  // debugger;
  const curEntry = array[pfIdx][cpCapIdx][ivIdx]
  const curSP = curEntry[spColIdx]

  // let result;

  if (isParityCongruent) {
    /* COMPARE LEFT */
    /* first idx can't compare left */
    if (ivIdx == 0) {
      return curEntry;
    }
    const leftPfIv = array[pfIdx][cpCapIdx][ivIdx - 1]
    const leftSP = leftPfIv[spColIdx];
    // debugger;
    /* multiply by direction ( 1 or -1 ) to make comparison correct in all cases  */
    return sortOrder * curSP > leftSP * sortOrder ? curEntry : leftPfIv;
  }
  /* COMPARE RIGHT */
  /* lastIdx can't compare right */
  if (ivIdx == lastIdx) {
    return curEntry;
  }
  const rightPfIv = array[pfIdx][cpCapIdx][ivIdx + 1]
  const rightSP = rightPfIv[spColIdx];
  return sortOrder * curSP < rightSP * sortOrder ? curEntry : rightPfIv;
}

//#endregion GPU TEST KERNEL FUNCTIONS

//#region CREATE KERNELS

export const getPfIvLevelsSPsAtCpLimit_kernel = gpuG.createKernel(getPfIvLevelsSPsAtCpLimit2D_GPU, {
  // output: [kernelOutputSize.x, kernelOutputSize.y],
  dynamicOutput: true,
  pipeline: true,
  // immutable: true,
  // tactic: "precision",
  // optimizeFloatMemory: true,
  // tactic: "speed",
  // fixIntegerDivisionAccuracy: true
});

export const sortPfIVsAtCpLimit_kernel = gpuG.createKernel(sortPfIvsByStatsDesc2D_CPU, {
  // output: [kernelOutputSize.x, kernelOutputSize.y],
  // pipeline: true,
  // optimizeFLoatMemory: true,
  // tactic: "precision",
  // tactic: "speed",
  // fixIntegerDivisionAccuracy: true
  dynamicOutput: true
});
// console.log(sortPfIVsAtCpLimit_kernel.toJSON())


export const oddEvenSort2D_oddPhase_kernel = gpuG.createKernel(oddEvenSort2D_oddPhase, {
  // output: [kernelOutputSize.x, kernelOutputSize.y],
  dynamicOutput: true,
  pipeline: true,
  // immutable: true,
  // optimizeFloatMemory: true,
  tactic: "precision",
  // tactic: "speed",
  // fixIntegerDivisionAccuracy: true
});

export const oddEvenSort2D_evenPhase_kernel = gpuG.createKernel(oddEvenSort2D_evenPhase, {
  // output: [kernelOutputSize.x, kernelOutputSize.y],
  dynamicOutput: true,
  pipeline: true,
  immutable: true,
  // optimizeFloatMemory: true,
  tactic: "precision",
  // tactic: "speed",
  // fixIntegerDivisionAccuracy: true
});

export const oddEvenSort2D_combinedKernel = gpuG.combineKernels(
  oddEvenSort2D_oddPhase_kernel,
  oddEvenSort2D_evenPhase_kernel,
  function (input, spIdx) {
    return oddEvenSort2D_evenPhase_kernel(oddEvenSort2D_oddPhase_kernel(input, spIdx), spIdx)
  }
)

// export const getPfIvLevelsSPsAtCpLimit_gpuOddEvenSort_kernel = gpuG.combineKernels(
//   getPfIvLevelsSPsAtCpLimit_kernel,
//   oddEvenSort2D_oddPhase_kernel,
//   oddEvenSort2D_evenPhase_kernel,
//   function (pokeforms, ivs, cpms, cpLimit, lastCpmIdx, n, spIdx) {
//     const n = this.output.x / 2 - 1
//     let result = oddEvenSort2D_evenPhase_kernel(
//       oddEvenSort2D_oddPhase_kernel(
//         getPfIvLevelsSPsAtCpLimit_kernel(pokeforms, ivs, cpms, cpLimit, lastCpmIdx), spIdx), spIdx)
//     for (let i = 0; i < n / 2 - 1; i++) {
//       const oldResult = result
//       result = oddEvenSort2D_evenPhase_kernel(oddEvenSort2D_oddPhase_kernel(oldResult, spIdx), spIdx);
//       (oldResult as Texture).delete()
//     }
//     return result;
//   }
// )

export const oddEvenSort2D_halfPassFlex_kernel = gpuG.createKernel(oddEvenSort2D_halfPassFlex, {
  dynamicOutput: true,
  pipeline: true,
  immutable: true,
  // tactic: "precision",
})

export const oddEvenSort_fullPass_kernel = gpuG.combineKernels(
  oddEvenSort2D_halfPassFlex_kernel,
  function (
    data: KernelOutput | [number, number, number, number][][],
    lastIdx: number,
    sortOrder: 1 | -1
  ) {
    return oddEvenSort2D_halfPassFlex_kernel(oddEvenSort2D_halfPassFlex_kernel(data, lastIdx, sortOrder, 1), lastIdx, sortOrder, 0)
  }
)

export function gpuOddEvenSort2D(
  data: KernelOutput,
  // lastIdx,
  // iterations,
  sortOrder: 1 | -1,
  method: 'combined' | 'sequential' | 'nested'
) {
  /* TODO: get lastIdx and iterations from data.length, simplify function signature */
  const lastIdx = (data.length ?? data.output[0]) - 1,
    iterations = (data.length ?? data.output[0]) / 2

  let sortedIn
  let sortedOut
  try {
    switch (method) {
      case "combined":
        for (let i = 0; i < iterations; i++) {
          // if (i > 0) {
          if (typeof sortedOut?.clear == 'function') {
            sortedIn = sortedOut
            sortedOut.clear()
            sortedOut.delete()
          }
          sortedOut = oddEvenSort_fullPass_kernel(sortedIn ?? data, lastIdx, sortOrder);
        }
        break;
      case "sequential":
        for (let i = 0; i < iterations; i++) {
          // if (i > 0) {
          if (typeof sortedOut?.clear == 'function') {
            sortedIn = sortedOut
            sortedOut.clear()
            sortedOut.delete()
          }
          sortedOut = oddEvenSort2D_halfPassFlex_kernel(sortedIn ?? data, lastIdx, sortOrder, 1);
          sortedIn = sortedOut
          sortedOut.clear()
          sortedOut.delete()
          sortedOut = oddEvenSort2D_halfPassFlex_kernel(sortedIn, lastIdx, sortOrder, 0);
          if (i >= iterations - 1) console.log("last sorting iteration:", sortedOut)
        }
        break
      case "nested":
        for (let i = 0; i < iterations; i++) {
          // if (i > 0) {
          // if (typeof sortedOut?.clear == 'function') {
          //   sortedIn = sortedOut
          //   sortedOut.clear()
          //   sortedOut.delete()
          // }
          sortedOut = oddEvenSort2D_halfPassFlex_kernel(
            oddEvenSort2D_halfPassFlex_kernel(sortedIn ?? data, lastIdx, sortOrder, 1),
            lastIdx, sortOrder, 0);
        }
        break
      default:
        break;
    }
    // try {
    //   console.log(sorted.toArray())
    // } catch (error) {
    //   console.error(error);
    // }
    return sortedOut
  } catch (error) {
    console.error(error)
  }
}


export const oddEvenSort3D_halfPassOdd_kernel = gpuG.createKernel(oddEvenSort3D_halfPassOdd, {
  dynamicOutput: true,
  pipeline: true,
  // immutable: true,
  // tactic: "precision",
})

export const oddEvenSort3D_halfPassEven_kernel = gpuG.createKernel(oddEvenSort3D_halfPassEven, {
  dynamicOutput: true,
  pipeline: true,
  immutable: true,
  // tactic: "precision",
})

export const oddEvenSort3D_fullPass_kernel = gpuG.combineKernels(
  oddEvenSort3D_halfPassOdd_kernel,
  oddEvenSort3D_halfPassEven_kernel,
  function (array, sortOrder) {
    return oddEvenSort2D_evenPhase_kernel(oddEvenSort2D_oddPhase_kernel(array, sortOrder), sortOrder)
  }
)

export function gpuOddEvenSort3D(
  data: KernelOutput,
  // lastIdx,
  // iterations,
  sortOrder: 1 | -1,
  method: 'combined' | 'sequential' | 'nested'
) {
  /* TODO: get lastIdx and iterations from data.length, simplify function signature */
  const lastIdx = (data.length ?? data.output[0]) - 1,
    iterations = (data.length ?? data.output[0]) / 2

  let sortedIn
  let sortedOut
  try {
    switch (method) {
      case "combined":
        for (let i = 0; i < iterations; i++) {
          // if (i > 0) {
          if (typeof sortedOut?.clear == 'function') {
            sortedIn = sortedOut
            sortedOut.clear()
            sortedOut.delete()
          }
          sortedOut = oddEvenSort_fullPass_kernel(sortedIn ?? data, lastIdx, sortOrder);
        }
        break;
      case "sequential":
        for (let i = 0; i < iterations; i++) {
          // if (i > 0) {
          if (typeof sortedOut?.clear == 'function') {
            sortedIn = sortedOut
            sortedOut.clear()
            sortedOut.delete()
          }
          sortedOut = oddEvenSort2D_halfPassFlex_kernel(sortedIn ?? data, lastIdx, sortOrder, 1);
          sortedIn = sortedOut
          sortedOut.clear()
          sortedOut.delete()
          sortedOut = oddEvenSort2D_halfPassFlex_kernel(sortedIn, lastIdx, sortOrder, 0);
          if (i >= iterations - 1) console.log("last sorting iteration:", sortedOut)
        }
        break
      case "nested":
        for (let i = 0; i < iterations; i++) {
          // if (i > 0) {
          // if (typeof sortedOut?.clear == 'function') {
          //   sortedIn = sortedOut
          //   sortedOut.clear()
          //   sortedOut.delete()
          // }
          sortedOut = oddEvenSort2D_halfPassFlex_kernel(
            oddEvenSort2D_halfPassFlex_kernel(sortedIn ?? data, lastIdx, sortOrder, 1),
            lastIdx, sortOrder, 0);
        }
        break
      default:
        break;
    }
    // try {
    //   console.log(sorted.toArray())
    // } catch (error) {
    //   console.error(error);
    // }
    return sortedOut
  } catch (error) {
    console.error(error)
  }
}



// const kernelMap = gpuG.createKernelMap(
  // [pfId, ivId]
// )

/* SAVE KERNEL TO JSON */
/* LOADING KERNEL FROM JSON MAY REDUCE KERNEL STARTUP TIME, BUT THREW ERRORS I COULD NOT RESOLVE */
/* gpuKernel.toJSON() throws error if called before kernel is called */
// const getPfIvLevelsSPsAtCpLimit_kernelJson = getPfIvLevelsSPsAtCpLimit_kernel.toJSON()
// saveAsFile(JSON.stringify(getPfIvLevelsSPsAtCpLimit_kernelJson), 'application/json', 'getCalcThenValidCPMs_kernel.json')


//#endregion CREATE KERNELS
//#endregion FUNCTION DEFINITIONS



