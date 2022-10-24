// import { GPU, Input } from "gpu.js";
// import {parse} from "papaparse";
// import getCorrectCpms from "./cpmConverter";
declare const GPU, Input; // from GPU.js, loaded in html
declare const Papa; // from Papa-parse, loaded in html
// declare const getCorrectCpms // from "./cpmConverter";, loaded in html
export {}; // required to make this a module -> allows top-level 'await'

// let x = await getPokeForms("http://localhost:5500/client/src/data/csv/pokemon_forms.csv")
let x = await Papa.parse(
  "http://localhost:5500/client/src/data/csv/pokemon_forms.csv",
  {
    download: true,
    // header: true, // will turn results into objects with headers (from results 1st row) as properties
    dynamicTyping: true,
    skipEmptyLines: true,
    // preview: preview ?? 0
  }
);

function getCorrectCpms(floatCPMs: number[], resultType: "df" | "map" = "df") {
  // if (floatCPMs.length == 0) {console.error("floatCpms array is empty"); return}
  const trueCpms = new Float32Array(floatCPMs);
  const maxLevel = trueCpms.length;
  const totalCpmCount = trueCpms.length * 2 - 1;
  let allCpms: [number, number][] = Array(totalCpmCount);
  trueCpms.forEach((levelCpm, i) => {
    let level = i + 1;
    allCpms[(level - 1) * 2] = [level, levelCpm];
    if (level < maxLevel) {
      let nextLevelCpm = trueCpms[i + 1];
      let halfLevelCpm = getHalfLevelCPM(levelCpm, nextLevelCpm);
      let halfLevel = level + 0.5;
      allCpms[(halfLevel - 1) * 2] = [halfLevel, halfLevelCpm];
    }
  }, allCpms);
  if (resultType == "df") return allCpms;
  return new Map(allCpms);
}

function getHalfLevelCPM(levelCpm: number, nextLevelCpm: number): number {
  let halfLevelCpm = Math.sqrt(
    levelCpm * levelCpm -
      (levelCpm * levelCpm) / 2 +
      (nextLevelCpm * nextLevelCpm) / 2
  );
  return halfLevelCpm;
}

type PokeFormBaseStatsSet = [
  p_id: number,
  f_id: number,
  baseAtk: number,
  baseDef: number,
  baseSta: number
];
// prettier-ignore
type PokeIv = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;
type PokeIvSet = [iv_id: number, atkIV: PokeIv, defIV: PokeIv, staIV: PokeIv];
type PokeCpmSet = [level: number, cpm: number];

async function getPokeForms(filePath: string, preview?: number) {
  try {
    return (
      await Papa.parse(filePath, {
        download: true,
        // header: true, // will turn results into objects with headers (from results 1st row) as properties
        dynamicTyping: true,
        skipEmptyLines: true,
        preview: preview ?? 0,
      })
    )?.data;
  } catch (error) {
    throw error;
  }
}

(async function () {
  // const {GPU} = require('~/Google\ Drive/Coding\ Projects/pokemon_go_evaluator/client/node_modules/gpu.js/src/gpu.js')
  // document.body.append('HELLO FROM JS FILE')

  // import {GPU} from 'gpu.js'
  // onmessage = (e) =>{
  //   const [gpuG, gpuC] = e.data
  // postMessage("in gpujsTestWorker.js")
  console.log("in gpujsTestWorker.js");
  // document.querySelector("#cpuCores").innerText = `${navigator.hardwareConcurrency} cpu cores`;
  const gpuG = new GPU({ mode: "gpu" });
  const gpuC = new GPU({ mode: "cpu" });
  // prettier-ignore
  {
    /* adding gpu features table to DOM */
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
    // // document.querySelector('#gpuSupport').innerText = `GPU${new IsGPUSupported ? "" : " NOT"} supported`;
    // // document.querySelector('#gpuSupport').style.color = new IsGPUSupported ? "green" : "red";
    // document.querySelector("#timeNow").innerText = new Date();
    // setInterval(() => {
    //   document.querySelector("#timeNow").innerText = new Date();
    // }, 1000);
  }

  const PF_BATCH_SIZE = 731;
  console.log("PF BATCH SIZE:", PF_BATCH_SIZE);

  const IV_BATCH_SIZE = 4096;
  console.log("IV BATCH SIZE:", IV_BATCH_SIZE);

  const maxLevel = 40;
  console.log("MAX LEVEL:", maxLevel);

  // prettier-ignore
  const cpms = [0.094,0.1351374318,0.16639787,0.192650919,0.21573247,0.2365726613,0.25572005,0.2735303812,0.29024988,0.3060573775,0.3210876,0.3354450362,0.34921268,0.3624577511,0.3752356,0.387592416,0.39956728,0.4111935514,0.4225,0.4329264091,0.44310755,0.4530599591,0.4627984,0.472336093,0.48168495,0.4908558003,0.49985844,0.508701765,0.51739395,0.5259425113,0.5343543,0.5426357375,0.5507927,0.5588305862,0.5667545,0.5745691333,0.5822789,0.5898879072,0.5974,0.6048236651,0.6121573,0.6194041216,0.6265671,0.6336491432,0.64065295,0.6475809666,0.65443563,0.6612192524,0.667934,0.6745818959,0.6811649,0.6876849038,0.69414365,0.70054287,0.7068842,0.7131691091,0.7193991,0.7255756136,0.7317,0.7347410093,0.7377695,0.7407855938,0.74378943,0.7467812109,0.74976104,0.7527290867,0.7556855,0.7586303683,0.76156384,0.7644860647,0.76739717,0.7702972656,0.7731865,0.7760649616,0.77893275,0.7817900548,0.784637,0.7874736075,0.7903,0.792803968,0.79530001,0.797800015,0.8003,0.802799995,0.8053,0.8078,0.81029999,0.812799985,0.81529999,0.81779999,0.82029999,0.82279999,0.82529999,0.82779999,0.83029999,0.83279999,0.83529999,0.83779999,0.84029999];
  // prettier-ignore
  const gmCPMs = [0.094,0.16639787,0.21573247,0.25572005,0.29024988,0.3210876,0.34921268,0.3752356,0.39956728,0.4225,0.44310755,0.4627984,0.48168495,0.49985844,0.51739395,0.5343543,0.5507927,0.5667545,0.5822789,0.5974,0.6121573,0.6265671,0.64065295,0.65443563,0.667934,0.6811649,0.69414365,0.7068842,0.7193991,0.7317,0.7377695,0.74378943,0.74976104,0.7556855,0.76156384,0.76739717,0.7731865,0.77893275,0.784637,0.7903,0.7953,0.8003,0.8053,0.8103,0.8153,0.8203,0.8253,0.8303,0.8353,0.8403,0.8453];
  let cpmsFloatArray = getCorrectCpms(gmCPMs, "df") as [number, number][];
  // console.log(cpmsFloatArray)

  /* looking for max cp / sp entries for given pokeform (via CPU) */
  // prettier-ignore
  {
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

  /* createIvCombos function (currently causing problems for code further down) */
  // prettier-ignore
  {
    // const createIvCombos = () => {
    //   const ivs = Array(4096);
    //   let i = 1;
    //   console.time('creatIvCombos');
    //   for (let aI = 0; aI < 16; aI++) {
    //     for (let dI = 0; dI < 16; dI++) {
    //       for (let sI = 0; sI < 16; sI++) {
    //         ivs[i] = [i, aI, dI, sI];
    //         i++;
    //       }
    //     }
    //   }
    //   console.timeEnd('creatIvCombos');
    //   return ivs
    // }
    // const ivs = createIvCombos()
  }

  let ivs = Array(4096);
  {
    // filling iv combos array
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

  function calcCpmsAtCpLimit_cpu(
    cpLimit: number,
    pokeForms: PokeFormBaseStatsSet[],
    ivs: PokeIvSet[]
  ) {
    const atkBaseIdx = 2,
      defBaseIdx = 3,
      staBaseIdx = 4;
    const atkIvIdx = 1,
      defIvIdx = 2,
      staIvIdx = 3;

    const calcCpms = Array(pokeForms.length);
    let i = 0 /* iterator for calcCPMs */,
      j = 0; /* iterator for  */
    for (let pf of pokeForms) {
      calcCpms[i] = Array(IV_BATCH_SIZE);
      for (let ivSet of ivs) {
        let a = pf[atkBaseIdx] + ivSet[atkIvIdx];
        let d = pf[defBaseIdx] + ivSet[defIvIdx];
        let s = pf[staBaseIdx] + ivSet[staIvIdx];
        calcCpms[i][j] = Math.sqrt(
          ((cpLimit + 0.9999999) * 10) / (a * Math.sqrt(d) * Math.sqrt(s))
        );
        j++;
      }
      i++;
      j = 0;
    }
    return calcCpms;
  }

  const calcCp_gpuG = gpuG
    .createKernel(function (
      pokeForms: PokeFormBaseStatsSet[],
      ivs: PokeIvSet[],
      cpms: number[]
    ) {
      // prettyier-ignore
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
      const cp = Math.max(
        10,
        ((a * Math.sqrt(d) * Math.sqrt(s) * cpm * cpm) / 10) >> 0
      );
      const sp = ((a * cpm * d * cpm * (s * cpm)) >> 0) / 1000;
      // return [a,Math.sqrt(d),Math.sqrt(s),cpm*cpm] //
      // return [pokeForms[this.thread.z][2], ivs[this.thread.y][1], cpms[this.thread.x]]
      return [pokeForms[z][0], cpm, cp, sp];
    })
    .setOutput([cpms.length, IV_BATCH_SIZE, PF_BATCH_SIZE]); // [x, y, z] -> matches this.thread._

  const calcCpmsAtCpLimit_gpuG = gpuG
    .createKernel(function (
      cpLimit: number,
      pokeForms: PokeFormBaseStatsSet[],
      ivs: PokeIvSet
    ) {
      const atkBaseIdx = 2,
        defBaseIdx = 3,
        staBaseIdx = 4;
      const atkIvIdx = 1,
        defIvIdx = 2,
        staIvIdx = 3;

      const { x, y } = this.thread;
      /* 
        x -> iterator for pokeform
        y -> iterator for IVs
       */
      const a = pokeForms[y][atkBaseIdx] + ivs[x][atkIvIdx];
      const d = pokeForms[y][defBaseIdx] + ivs[x][defIvIdx];
      const s = pokeForms[y][staBaseIdx] + ivs[x][staIvIdx];
      const calcCpm = Math.sqrt(
        ((cpLimit + 0.9999999) * 10) / (a * Math.sqrt(d) * Math.sqrt(s))
      );
      // debugger;
      return calcCpm;
    })
    .setPipeline(true)
    .setOutput([IV_BATCH_SIZE, PF_BATCH_SIZE]);

  const calcCpmsAtCpLimit_gpuC = gpuC
    .createKernel(function (
      cpLimit: number,
      pokeForms: PokeFormBaseStatsSet[],
      ivs: PokeIvSet
    ) {
      const atkBaseIdx = 2,
        defBaseIdx = 3,
        staBaseIdx = 4;
      const atkIvIdx = 1,
        defIvIdx = 2,
        staIvIdx = 3;
      const { x, y } = this.thread;
      /* 
        x -> iterator for pokeform
        y -> iterator for IVs
       */
      const a = pokeForms[y][atkBaseIdx] + ivs[x][atkIvIdx];
      const d = pokeForms[y][defBaseIdx] + ivs[x][defIvIdx];
      const s = pokeForms[y][staBaseIdx] + ivs[x][staIvIdx];
      const calcCpm = Math.sqrt(
        ((cpLimit + 0.9999999) * 10) / (a * Math.sqrt(d) * Math.sqrt(s))
      );
      return calcCpm;
    })
    .setPipeline(true)
    .setOutput([IV_BATCH_SIZE, PF_BATCH_SIZE]);

  // const getTrueCpmIdxsFromCalcCpms_gpuG = gpuG.createKernel(function (calcCpms, cpms) {
  //     for (let i = 98; i > -1; i--) {
  //       if (cpms[i] <= calcCpms[this.thread.y][this.thread.x]) return i;
  //     }
  //     return 0;
  //   }).setPipeline(true).setOutput([IV_BATCH_SIZE, PF_BATCH_SIZE]);
  // prettier-ignore
  {
    // const getTrueCpmIdxsFromCalcCpms_gpuC = gpuC.createKernel(function (calcCpms, cpms) {
    //     for (let i = 98; i > -1; i--) {
    //       if (cpms[i] <= calcCpms[this.thread.y][this.thread.x]) return i;
    //     }
    //     return 0;
    //   }).setPipeline(true).setOutput([IV_BATCH_SIZE, BATCH_SIZE]);
    // const getTrueCpmsFromCpmIdxs_gpuG = gpuG.createKernel(function (cpmIdxs, cpms) {
    //     return cpms[cpmIdxs[this.thread.y][this.thread.x]];
    //   }).setOutput([IV_BATCH_SIZE, BATCH_SIZE]);
  }
  const getTrueCpmsFromCalcCpms_cpu = (calcCpms, cpms) => {
    const yLength = calcCpms.length;
    const xLength = cpms.length;
    const trueCpms = Array(yLength);
    for (let y = 0; y < yLength; y++) {
      trueCpms[y] = Array(IV_BATCH_SIZE);
      for (let x = 0; x < IV_BATCH_SIZE; x++) {
        trueCpms[y][x] = cpms[0];
        for (let i = xLength; i > -1; i--) {
          if (cpms[i] <= calcCpms[y][x]) {
            trueCpms[y][x] = cpms[i];
            break;
          }
        }
      }
    }
    return trueCpms;
  };

  const getTrueCpmsFromCalcCpms_gpuG = gpuG.createKernel(
    // /**
    //  * @param {*} calcCpms
    //  * @param {[number, number, number, number][]} cpms 2D array, nested items must be [level, atkIv, defIv, staIV]
    //  * @param {*} lastCpmIdx
    //  * @param {boolean} returnCPM If true, returns CPMs only. If false, returns corresponding levels
    //  * @returns
    //  */
    function (
      calcCpms: number[][],
      cpms: PokeCpmSet[],
      lastCpmIdx: number,
      returnCPM: boolean
    ) {
      // debugger;
      const { x, y } = this.thread;
      /* x -> iterator for pokeform | y -> iterator for IVs*/
      // let i = cpms.length;
      let i = lastCpmIdx;
      while (i > -1 && calcCpms[y][x] < cpms[i][1]) {
        i--;
      }
      const resultIdx = returnCPM ? 1 : 0;
      return cpms[i][resultIdx]; // return level
      /* For Debugging: 
        [current calcCPM, i, first cpm < calcCPM, corresponding level] */
      // return [calcCpms[y][x], i, cpms[i][1], cpms[i][0]]
    },
    {
      output: [IV_BATCH_SIZE, PF_BATCH_SIZE],
      // optimizeFLoatMemory: true,
      // tactic: "precision",
    }
  );
  // .setOutput([IV_BATCH_SIZE, PF_BATCH_SIZE]);

  const getTrueCpmsFromCalcCpms_gpuC = gpuC.createKernel(
    function (
      calcCpms: number[][],
      cpms: PokeCpmSet[],
      lastCpmIdx: number,
      returnCPM: boolean
    ) {
      const { x, y } = this.thread;
      /* 
        x -> iterator for pokeform
        y -> iterator for IVs
       */
      for (let i = lastCpmIdx; i > -1; i--) {
        if (cpms[i][1] <= calcCpms[y][x]) return cpms[i];
      }
      return cpms[0];
    },
    {
      constants: { cpmCount: cpms.length },
      output: [IV_BATCH_SIZE, PF_BATCH_SIZE],
    }
  );
  // .setOutput([IV_BATCH_SIZE, PF_BATCH_SIZE]);

  const pokeForms_expressServer =
    "http://localhost:8000/data/pokemon_forms.csv";
  const pokeForms_liveServer =
    "http://localhost:5500/client/src/data/csv/pokemon_forms.csv";

  let pokeForms: PokeFormBaseStatsSet[];
  let pfHeaders: string[];
  try {
    let pokeForms_csv = await getPokeForms(pokeForms_liveServer);
    pfHeaders = pokeForms_csv[0] as string[];
    pokeForms = [, ...pokeForms_csv] as PokeFormBaseStatsSet[];
  } catch (err) {
    // console.error(err)
    throw err;
  }

  // pokeForms = pokeForms.slice(1, PF_BATCH_SIZE);
  // pokeForms = [pokeForms.find(([p_id]) => p_id == 59)];
  // pokeForms = pokeForms.filter(([p_id]) => p_id == 59 || p_id == 130 || p_id == 334 || p_id == 340);
  // pokeForms = [pokeForms[69],pokeForms[148],pokeForms[353],pokeForms[359]];

  // console.log("pokeForms", pokeForms);
  // let batchStart = 0;
  // let batchStop = batchStart+BATCH_SIZE;
  // while (batchStop < pokeForms.)

  // ivs = ivs.splice(500, IV_BATCH_SIZE);
  // ivs = [[0, 1, 14, 12]];

  let maxLevelIdx = maxLevel * 2 - 2;
  let cpmLengthAtMaxLevel = maxLevelIdx + 1;
  cpmsFloatArray = cpmsFloatArray.slice(0, cpmLengthAtMaxLevel);

  // console.log(cpmsFloatArray);
  // prettier-ignore
  let pokeFormsFlattened = new Input(pokeForms.flat(), [pokeForms[0].length, pokeForms.length]);
  // prettier-ignore
  let ivsFlattened = new Input(ivs.flat(), [ivs[0].length, ivs.length]);
  // prettier-ignore
  let cpmsFloatArrayFlattened = new Input(cpmsFloatArray.flat(), [cpmsFloatArray[0].length, cpmsFloatArray.length]);

  console.log("~~~ calcCpmsAtCpLimit ~~~");
  // const calcCpms_cpu_t0 = performance.now();
  // const calcCpms_cpu = calcCpmsAtCpLimit_cpu(1500, pokeForms, ivs);
  // const calcCpms_cpu_t1 = performance.now();
  // const calcCpms_cpu_dt = calcCpms_cpu_t1 - calcCpms_cpu_t0;
  // console.log(`calcCpms_cpu: ${calcCpms_cpu_dt} ms`);
  // console.log(calcCpms_cpu);

  const calcCpms_gpuG_t0 = performance.now();
  const calcCpms_gpuG_texture = calcCpmsAtCpLimit_gpuG(1500, pokeForms, ivs);
  const calcCpms_gpuG_t1 = performance.now();
  const calcCpms_gpuG_dt = calcCpms_gpuG_t1 - calcCpms_gpuG_t0;
  console.log(`calcCpms_gpuG: ${calcCpms_gpuG_dt} ms`);
  // console.log(calcCpms_gpuG_texture.toArray()); // texture

  // const calcCpms_gpuC_t0 = performance.now();
  // const calcCpms_gpuC = calcCpmsAtCpLimit_gpuC(1500, pokeForms, ivs);
  // const calcCpms_gpuC_t1 = performance.now();
  // const calcCpms_gpuC_dt = calcCpms_gpuC_t1 - calcCpms_gpuC_t0
  // console.log(`calcCpms_gpuC: ${calcCpms_gpuC_dt} ms`);
  // console.log(calcCpms_gpuC, "")

  // prettier-ignore
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

  const calcTimeDiv = document.querySelector("#calcTime");

  console.log("~~~ getTrueCpmFromCALCCPMs ~~~");
  /* getTrueCpmsFromCalcCpms_cpu */
  // const getTrueCpmFromCalcCpms_cpu_t0 = performance.now();
  // let trueCpmsFrpmCalcCpms_cpu = getTrueCpmsFromCalcCpms_cpu(
  //   calcCpms_cpu,
  //   cpmsFloatArray,
  //   // cpmsFloatArray.length - 1
  //   // false
  // );
  // // = cpmsFloatArray.slice(0, maxLevel * 2 - 1)
  // const getTrueCpmFromCalcCpms_cpu_t1 = performance.now();
  // const getTrueCpmFromCalcCpms_cpu_dt =
  //   getTrueCpmFromCalcCpms_cpu_t1 - getTrueCpmFromCalcCpms_cpu_t0;
  // console.log(
  //   `getTrueCpmFromCALCCPMs_cpu: ${getTrueCpmFromCalcCpms_cpu_dt} ms`
  // );
  // console.log(trueCpmsFrpmCalcCpms_cpu);
  // let p = document.createElement("p");
  // p.textContent = `getTrueCpmFromCALCCPMs_cpu: ${getTrueCpmFromCalcCpms_cpu_dt} ms`;
  // calcTimeDiv.appendChild(p);

  /* getTrueCpmsFromCalcCpms_gpuG */
  const getTrueCpmFromCalcCpms_gpuG_t0 = performance.now();
  let trueCpmsFrpmCalcCpms_gpuG = getTrueCpmsFromCalcCpms_gpuG(
    calcCpms_gpuG_texture,
    cpmsFloatArray,
    maxLevelIdx,
    false
  );
  const getTrueCpmFromCalcCpms_gpuG_t1 = performance.now();
  const getTrueCpmFromCalcCpms_gpuG_dt =
    getTrueCpmFromCalcCpms_gpuG_t1 - getTrueCpmFromCalcCpms_gpuG_t0;
  console.log(
    `getTrueCpmFromCALCCPMs_gpuG: ${getTrueCpmFromCalcCpms_gpuG_dt} ms`
  );
  console.log(trueCpmsFrpmCalcCpms_gpuG);
  let p = document.createElement("p");
  p.textContent = `getTrueCpmFromCALCCPMs_gpuG: ${getTrueCpmFromCalcCpms_gpuG_dt} ms`;
  calcTimeDiv?.appendChild(p);
  // document.querySelector("#results").textContent = JSON.stringify(
  //   trueCpmsFrpmCalcCpms_gpuG[0].slice(0, 10)
  // ).replace(/,/g, "\r\n");

  /* getTrueCpmsFromCalcCpms_gpuG */
  // const getTrueCpmFromCalcCpms_gpuC_t0 = performance.now();
  // let trueCpmsFrpmCalcCpms_gpuC = getTrueCpmsFromCalcCpms_gpuC(calcCpms_gpuC, cpms);
  // const getTrueCpmFromCalcCpms_gpuC_t1 = performance.now();
  // const getTrueCpmFromCalcCpms_gpuC_dt = getTrueCpmFromCalcCpms_gpuC_t1 - getTrueCpmFromCalcCpms_gpuC_t0
  // console.log(`getTrueCpmFromCALCCPMs_gpuC: ${getTrueCpmFromCalcCpms_gpuC_dt} ms`)
  // // console.log(trueCpmsFrpmCalcCpms_gpuC, "");
  // console.log(JSON.stringify(trueCpmsFrpmCalcCpms_gpuC[0].slice(0,10)));
  // p = document.createElement('p')
  // p.textContent=`getTrueCpmFromCALCCPMs_gpuC: ${getTrueCpmFromCalcCpms_gpuC_dt} ms`
  // calcTimeDiv.appendChild(p)
  // document.querySelector('#results').textContent = JSON.stringify(trueCpmsFrpmCalcCpms_gpuC[0].slice(0,10)).replace(/,/g , "\r\n",)

  // const calcTime = t1-t0
  // // console.log("calcCpms\n", calcCpms)
  // // console.log("trueCpms\n", trueCpms)
  // document.querySelector('#calcTime').innerText = `time to calculate stats for ${PF_BATCH_SIZE} pokemon (${(PF_BATCH_SIZE*IV_BATCH_SIZE).toLocaleString()} calculations): ${(calcTime/1000).toFixed(3)} s`
  // console.log(cps)
  // });
  // }
})();
