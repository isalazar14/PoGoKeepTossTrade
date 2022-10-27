export {}; // required make this a module -> allows top-level 'await' (will not compile without it)
/* For running in html without bundler
  Load scripts in html (from CDN), declare global vars */
declare const GPU; // from GPU.js, loaded in html
declare const Papa; // from Papa-parse, loaded in html
// declare const getCorrectCpms // from "./cpmConverter";, loaded in html

/* for running WITH bundler (e.g. react app)
    Use import module syntax  */
// import { GPU, Input } from "gpu.js"
// import { parse } from "papaparse";
// import getCorrectCpms from "./cpmConverter";

console.log("running gpuTest");
displayHardwareSupport();

// onmessage = (e) =>{
//   const [gpuG, gpuC] = e.data
// postMessage("in gpujsTestWorker.js")

let calcParams = {
  PF_BATCH_SIZE: 20,
  IV_BATCH_SIZE: 20,
  CP_LIMIT: 1500,
  MAX_LEVEL: 40,
  TARGET_LEVELS: [30, 40, 41],
  POKEFORMS_CSV_LOCATION_URL:
    // "http://localhost:8000/data/pokemon_forms.csv" // expressServer:
    // "http://localhost:5500/client/src/data/csv/pokemon_forms.csv" // liveServer
    "pokemon_forms.csv",
};
console.log(calcParams);
let pfOptions = {
  preview: calcParams.PF_BATCH_SIZE,
  // pIdRange: [25, 26],
  // pfSelection: ["3,1", "6,1", "9,1"],
};

let ivs = createIvMatrix();
if (calcParams.IV_BATCH_SIZE < 4096) ivs.splice(calcParams.IV_BATCH_SIZE);
// console.log(ivs)
// prettier-ignore
const gmCPMs = [0.094,0.16639787,0.21573247,0.25572005,0.29024988,0.3210876,0.34921268,0.3752356,0.39956728,0.4225,0.44310755,0.4627984,0.48168495,0.49985844,0.51739395,0.5343543,0.5507927,0.5667545,0.5822789,0.5974,0.6121573,0.6265671,0.64065295,0.65443563,0.667934,0.6811649,0.69414365,0.7068842,0.7193991,0.7317,0.7377695,0.74378943,0.74976104,0.7556855,0.76156384,0.76739717,0.7731865,0.77893275,0.784637,0.7903,0.7953,0.8003,0.8053,0.8103,0.8153,0.8203,0.8253,0.8303,0.8353,0.8403,0.8453];
let cpmsFloatArray = getCorrectCpms(gmCPMs, "df") as [number, number][];
// console.log(cpmsFloatArray)

let pfHeaders: string[];
let pokeForms: PokeFormBaseStatsSet[];
try {
  let pokeForm_csv = await getPokeForms(
    calcParams.POKEFORMS_CSV_LOCATION_URL,
    pfOptions
  );
  pfHeaders = pokeForm_csv.headers;
  pokeForms = pokeForm_csv.data;
  // console.log(pokeForms);
} catch (err) {
  // console.error(err)
  throw err;
}
if (calcParams.PF_BATCH_SIZE != pokeForms.length)
  calcParams.PF_BATCH_SIZE = pokeForms.length;

/* looking for max cp / sp entries for given pokeform (via CPU) */
// prettier-ignore
{
      // console.log(cpmsFloatArray);
      // /* creating iv combos in CPU */
      // console.time("singleMonCpAtAllCpmIvCombos");
      // const aB = 198,
      //   dB = 189,
      //   sB = 190;
      // const cpmCount = calcParams.IV_BATCH_SIZE
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
      //         const cpmi = cpmsFloatArray[i];
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

const pokeCalc = {
  CP: {
    onCPU: function () {},
    onGPU_g: function () {},
    onGPU_c: function () {},
  },
  cpmsAtCpLimit: {
    onCPU: function (
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
        calcCpms[i] = Array(calcParams.IV_BATCH_SIZE);
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
    },
    onGPU_g: function () {},
    onGPU_c: function () {},
  },
  maxValidCpm: {
    onCPU: function () {},
    onGPU_g: function () {},
    onGPU_c: function () {},
  },
};

const gpuG = new GPU({ mode: "gpu" });
const gpuC = new GPU({ mode: "cpu" });

const calcCp_gpuG = gpuG
  .createKernel(function (
    pokeForms: PokeFormBaseStatsSet[],
    ivs: PokeIvSet[],
    cpms: number[]
  ) {
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
    const cp = Math.max(
      10,
      ((a * Math.sqrt(d) * Math.sqrt(s) * cpm * cpm) / 10) >> 0
    );
    const sp = ((a * cpm * d * cpm * (s * cpm)) >> 0) / 1000;
    // return [a,Math.sqrt(d),Math.sqrt(s),cpm*cpm] //
    // return [pokeForms[this.thread.z][2], ivs[this.thread.y][1], cpms[this.thread.x]]
    return [pokeForms[z][0], cpm, cp, sp];
  })
  .setOutput([
    calcParams.IV_BATCH_SIZE,
    calcParams.IV_BATCH_SIZE,
    calcParams.PF_BATCH_SIZE,
  ]); // [x, y, z] -> matches this.thread._

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
  .setOutput([calcParams.IV_BATCH_SIZE, calcParams.PF_BATCH_SIZE]);

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
  .setOutput([calcParams.IV_BATCH_SIZE, calcParams.PF_BATCH_SIZE]);

// const getTrueCpmIdxsFromCalcCpms_gpuG = gpuG.createKernel(function (calcCpms, cpms) {
//     for (let i = 98; i > -1; i--) {
//       if (cpms[i] <= calcCpms[this.thread.y][this.thread.x]) return i;
//     }
//     return 0;
//   }).setPipeline(true).setOutput([options.IV_BATCH_SIZE, options.PF_BATCH_SIZE]);
// prettier-ignore
{
    // const getTrueCpmIdxsFromCalcCpms_gpuC = gpuC.createKernel(function (calcCpms, cpms) {
    //     for (let i = 98; i > -1; i--) {
    //       if (cpms[i] <= calcCpms[this.thread.y][this.thread.x]) return i;
    //     }
    //     return 0;
    //   }).setPipeline(true).setOutput([options.IV_BATCH_SIZE, BATCH_SIZE]);
    // const getTrueCpmsFromCpmIdxs_gpuG = gpuG.createKernel(function (cpmIdxs, cpms) {
    //     return cpms[cpmIdxs[this.thread.y][this.thread.x]];
    //   }).setOutput([options.IV_BATCH_SIZE, BATCH_SIZE]);
  }
const getTrueCpmsFromCalcCpms_cpu = (calcCpms, cpms) => {
  const yLength = calcCpms.length;
  const xLength = cpms.length;
  const trueCpms = Array(yLength);
  for (let y = 0; y < yLength; y++) {
    trueCpms[y] = Array(calcParams.IV_BATCH_SIZE);
    for (let x = 0; x < calcParams.IV_BATCH_SIZE; x++) {
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
    output: [calcParams.IV_BATCH_SIZE, calcParams.PF_BATCH_SIZE],
    // optimizeFLoatMemory: true,
    // tactic: "precision",
  }
);
// .setOutput([calcParams.IV_BATCH_SIZE, calcParams.PF_BATCH_SIZE]);

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
    constants: { cpmCount: calcParams.IV_BATCH_SIZE },
    output: [calcParams.IV_BATCH_SIZE, calcParams.PF_BATCH_SIZE],
  }
);
// .setOutput([calcParams.IV_BATCH_SIZE, calcParams.PF_BATCH_SIZE]);

const settingsTableBody = document.querySelector("table#settings > tbody");
// prettier-ignore
settingsTableBody!.innerHTML = `
  <tr><td>PF batch size</td><td>${calcParams.PF_BATCH_SIZE}</td></tr>
  <tr><td>IV batch size</td><td>${calcParams.IV_BATCH_SIZE}</td></tr>
  <tr><td>CP limit </td><td>${calcParams.CP_LIMIT}</td></tr>
  <tr><td>Max level</td><td>${calcParams.MAX_LEVEL}</td></tr>
  <tr><td>Target Levels</td><td>${calcParams.TARGET_LEVELS.toString()}</td></tr>
`
/* show settings table */
document.querySelector("table#settings")!.removeAttribute("hidden");

let maxLevelIdx = calcParams.MAX_LEVEL * 2 - 2;
let cpmLengthAtMaxLevel = maxLevelIdx + 1;
cpmsFloatArray = cpmsFloatArray.slice(0, cpmLengthAtMaxLevel);

// console.log(cpmsFloatArray);
// prettier-ignore
let pokeFormsFlattened = GPU.input(pokeForms.flat(), [pokeForms[0].length, pokeForms.length]);
// prettier-ignore
let ivsFlattened = GPU.input(ivs.flat(), [ivs[0].length, ivs.length]);
// prettier-ignore
let cpmsFloatArrayFlattened = GPU.input(cpmsFloatArray.flat(), [cpmsFloatArray[0].length, cpmsFloatArray.length]);

/* SHOW PERFORMANCE TABLE */
document.querySelector("table#performance")!.removeAttribute("hidden");

/* SHOW CALC STATUS SPINNER*/
const calcStatusDiv = document.querySelector("#calcStatus");
calcStatusDiv?.querySelector(".spinner-border")?.removeAttribute("hidden");

//#region RUN CALCS
console.log("~~~ calcCpmsAtCpLimit ~~~");
/* SET CURRENT TEST CELL AS ACTIVE AND SHOW SPINNER */

const calcTimeRow_maxCalcCPMs = addCalcTimeRow("Max calc CPMs");
const calcTimeRow_maxValidCPMs = addCalcTimeRow("Max valid CPMs");
const calcTimeRow_calcStats = addCalcTimeRow("Calculate stats");
const calcTimeCell_calcStats = getCalcTimeRowCell(
  calcTimeRow_calcStats,
  "operation"
);
calcTimeCell_calcStats.innerHTML += `<br>(CP, HP, Atk, Def, SP)`;
const calcTimeRow_calcSPs = addCalcTimeRow("Calculate SPs");
const calcTimeRow_sortSPs = addCalcTimeRow("Sort SPs");
const calcTimeCell_ = getCalcTimeRowCell(calcTimeRow_calcStats, "operation");
calcTimeCell_calcStats.innerHTML += `<br>(SP%, CP, HP, Atk, Def`;
/* NOTE TO SELF: HANDLE SHADOW MONS */

/* RUN CALCS ON CPU */
/* calcCpms*/
// prettier-ignore
const calcTimeCell_maxCalcCPM_CPU = getCalcTimeRowCell(calcTimeRow_maxCalcCPMs,"cpu");
calcTimeCell_maxCalcCPM_CPU.classList.toggle("running-calc");
// prettier-ignore
calcTimeCell_maxCalcCPM_CPU.innerHTML= `<div class="d-flex justify-content-center">
                                            <div class="spinner-border spinner-border-sm" role="status"></div>
                                          </div>`;

runCalcPerfTest(
  "calcCpms_CPU",
  {
    fn: pokeCalc.cpmsAtCpLimit.onCPU,
    fnArgs: [calcParams.CP_LIMIT, pokeForms, ivs],
  },
  {
    logPerformance: "duration",
    logResult: true,
    renderPerformance: { targetEL: calcTimeCell_maxCalcCPM_CPU },
  }
);

//#region RUN calcCpms_CPU, RENDER PERFORMANCE
performance.mark("calcCpms_CPU");
// prettier-ignore
const calcCpms_cpu = pokeCalc.cpmsAtCpLimit.onCPU(calcParams.CP_LIMIT,pokeForms,ivs);
const calcCpms_cpu_dt = performance.measure("calcCpms_CPU").duration;

console.log(`calcCpms_cpu: ${calcCpms_cpu_dt} ms`);
/* SET CURRENT TEST CELL AS INACTIVE AND SHOW TIME */
calcTimeCell_maxCalcCPM_CPU.classList.toggle("running-calc");
calcTimeCell_maxCalcCPM_CPU.innerHTML = calcCpms_cpu_dt.toString();
console.log(calcCpms_cpu);

/* getTrueCpmsFromCalcCpms_cpu */
const getTrueCpmFromCalcCpms_cpu_t0 = performance.now();
let trueCpmsFrpmCalcCpms_cpu = getTrueCpmsFromCalcCpms_cpu(
  calcCpms_cpu,
  cpmsFloatArray
  // cpmsFloatArray.length - 1
  // false
);
//#endregion RUN calcCpms_CPU, RENDER PERFORMANCE

//#region RUN GPU CALCS
/* calcCpms_GPU*/
// prettier-ignore
const calcTimeCell_maxCalcCPM_GPU = getCalcTimeRowCell(calcTimeRow_maxCalcCPMs,"gpu");
calcTimeCell_maxCalcCPM_GPU.classList.toggle("running-calc");
// prettier-ignore
calcTimeCell_maxCalcCPM_GPU.innerHTML= `<div class="d-flex justify-content-center">
                                          <div class="spinner-border spinner-border-sm" role="status"></div>
                                        </div>`;

/* RUN CALC calcCpms_GPU*/
performance.mark("calcCpms_gpuG");
// prettier-ignore
const calcCpms_gpuG_texture = calcCpmsAtCpLimit_gpuG(calcParams.CP_LIMIT,pokeForms,ivs);
// prettier-ignore
const calcCpms_gpuG_dt = Math.round(performance.measure("calcCpms_gpuG").duration);
// console.log(calcCpms_gpuG_texture.toArray()); // texture
console.log(`calcCpms_gpuG (TEXTURE): ${calcCpms_gpuG_dt} ms`);
/* SET CURRENT TEST CELL AS INACTIVE AND SHOW TIME */
calcTimeCell_maxCalcCPM_GPU.classList.toggle("running-calc");
calcTimeCell_maxCalcCPM_GPU.innerHTML = calcCpms_gpuG_dt.toString();
console.log(calcCpms_gpuG_texture);

// const calcCpms_gpuC_t0 = performance.now();
// const calcCpms_gpuC = calcCpmsAtCpLimit_gpuC(calcParams.CP_LIMIT, pokeForms, ivs);
// const calcCpms_gpuC_t1 = performance.now();
// const calcCpms_gpuC_dt = calcCpms_gpuC_t1 - calcCpms_gpuC_t0
// console.log(`calcCpms_gpuC: ${calcCpms_gpuC_dt} ms`);
// console.log(calcCpms_gpuC, "")

const getTrueCpmFromCalcCpms_cpu_t1 = performance.now();
const getTrueCpmFromCalcCpms_cpu_dt =
  getTrueCpmFromCalcCpms_cpu_t1 - getTrueCpmFromCalcCpms_cpu_t0;
console.log(`getTrueCpmFromCALCCPMs_cpu: ${getTrueCpmFromCalcCpms_cpu_dt} ms`);
console.log(trueCpmsFrpmCalcCpms_cpu);
let p = document.createElement("p");
p.textContent = `getTrueCpmFromCALCCPMs_cpu: ${getTrueCpmFromCalcCpms_cpu_dt} ms`;
// if(calcTimeDiv != undefined) calcTimeDiv.appendChild(p);

/* getTrueCpmsFromCalcCpms_gpuC */
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
// document.querySelector('#performance').innerText = `time to calculate stats for ${calcParams.PF_BATCH_SIZE} pokemon (${(calcParams.PF_BATCH_SIZE*calcParams.IV_BATCH_SIZE).toLocaleString()} calculations): ${(calcTime/1000).toFixed(3)} s`
// console.log(cps)
// });
// }

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

console.log("~~~ getTrueCpmFromCALCCPMs ~~~");
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
// const p = document.createElement("p");
// p.textContent = `getTrueCpmFromCALCCPMs_gpuG: ${getTrueCpmFromCalcCpms_gpuG_dt} ms`;
// calcTimeDiv?.appendChild(p);
// document.querySelector("#results").textContent = JSON.stringify(
//   trueCpmsFrpmCalcCpms_gpuG[0].slice(0, 10)
// ).replace(/,/g, "\r\n");

document.querySelector("#calcStatus")!.innerHTML = `<p>Done!</p>`;
//#endregion RUN CALCS

//#region DEFINITIONS
// prettier-ignore
type PokeIv = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;
type PokeIvSet = [iv_id: number, atkIV: PokeIv, defIV: PokeIv, staIV: PokeIv];
type PokeCpmSet = [level: number, cpm: number];
type PokeFormBaseStatsSet = [
  p_id: number,
  f_id: number,
  baseAtk: number,
  baseDef: number,
  baseSta: number
];

function getPokeForms(
  filePath: string,
  options?: {
    preview?: number;
    pIdRange?: [start: number, end: number];
    pfSelection?: string[] /* "{pId},{fId}" */;
  }
) {
  /* CANNOT USE ASYNC/AWAIT BECAUSE 'parse' FUNCTION RETURNS 'void'. 
  MUST USE 'complete' CALLBACK */
  if (
    (options?.pIdRange && options?.pfSelection) ||
    (options?.pIdRange && options?.preview) ||
    (options?.preview && options?.pfSelection)
  )
    throw new Error("Cannot use more than one option at a time");

  return new Promise<{ headers: string[]; data: PokeFormBaseStatsSet[] }>(
    (resolve, reject) => {
      Papa.parse(filePath, {
        download: true,
        // header: true, // will turn results into objects with headers (from results 1st row) as properties
        dynamicTyping: true,
        skipEmptyLines: true,
        preview: options?.preview ? options.preview + 1 : 0,
        complete: (parseResults) => {
          let result: { headers: string[]; data: PokeFormBaseStatsSet[] } = {
            headers: parseResults.data.splice(0, 1),
            data: [],
          };
          if (!options || options?.preview) {
            /* no options OR preview option set -> pass through results */
            result.data = parseResults.data;
          } else if (options!.pIdRange) {
            /* range option set -> get all rows with matching pId, including multiple forms */
            result.data = parseResults.data.filter(
              (pf: PokeFormBaseStatsSet) =>
                pf[0] >= options.pIdRange![0] && pf[0] <= options.pIdRange![1]
            );
          } else if (options!.pfSelection) {
            /* selection option set -> get all rows with matching [pId, fId] */
            let selection = options.pfSelection.reduce(
              (map, pf, i) => map.set(pf, true),
              new Map<string, any>()
            );
            let parseResultsLength = parseResults.data.length;
            let remaining = options.pfSelection.length;
            let i = 0;
            let data: any[] = [];
            while (remaining > 0 && i < parseResultsLength) {
              if (
                selection.has(
                  `${parseResults.data[i][0]},${parseResults.data[i][1]}`
                )
              ) {
                data.push(parseResults.data[i]);
                remaining--;
              }
              i++;
            }
            result.data = data;
          }
          resolve(result);
          return;
        },
        error: (error) => reject(error),
      });
    }
  );
}

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

  function getHalfLevelCPM(levelCpm: number, nextLevelCpm: number): number {
    let halfLevelCpm = Math.sqrt(
      levelCpm * levelCpm -
        (levelCpm * levelCpm) / 2 +
        (nextLevelCpm * nextLevelCpm) / 2
    );
    return halfLevelCpm;
  }
}

function createIvMatrix() {
  const ivs = Array(4096);
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
  return ivs;
  // console.log(ivs);
}

function displayHardwareSupport() {
  /* adding gpu features table to DOM */
  let timeEl = document.querySelector("#timeNow");
  if (timeEl != undefined) {
    timeEl.innerHTML = new Date().toLocaleTimeString();
    setInterval(() => {
      timeEl!.innerHTML = new Date().toLocaleTimeString();
    }, 1000);
  }
  let cpuEl = document.querySelector("#cpuCores");
  if (cpuEl != undefined) {
    cpuEl.innerHTML = `CPU, total threads: ${navigator.hardwareConcurrency}`;
  }

  const gpuFeatures = [
    "GPU",
    "Kernel Map",
    "Offscreen Canvas",
    "WebGL",
    "WebGL 2",
    "Headless GL",
    "Canvas",
    "GPU HTML Image Array",
    "Single Precision",
  ];

  const gpuSupportTable = document.querySelector("table#gpuSupport");
  // gpuFeatures.forEach(f=>console.log(f, GPU[f]));
  gpuFeatures.forEach((f) => {
    let row = document.createElement("tr");
    let featureGetter = `is${f.split(" ").join("")}Supported`;
    let isSupported = GPU[featureGetter];
    if (!isSupported) row.classList.add("notSupported");
    row.innerHTML = `<td>${f}</td><td>${isSupported}</td>`;
    document.querySelector("table#gpuSupport > tbody")?.appendChild(row);
    gpuSupportTable?.querySelector("tbody")?.appendChild(row);
    gpuSupportTable?.removeAttribute("hidden");
  });
}

function addCalcTimeRow(operation) {
  const calcTimeRow = document.createElement("tr");
  calcTimeRow.innerHTML = `<td>${operation}</td>  <td></td> <td></td> <td></td>`;
  calcTimeRow.id = operation.toLowerCase().split(" ").join("-");
  const calcTimeTableBody = document.querySelector("table#performance > tbody");
  return calcTimeTableBody!.appendChild(calcTimeRow);
}
function getCalcTimeRowCell(
  rowEl: HTMLTableRowElement,
  colName: "operation" | "cpu" | "gpu" | "gpuC"
) {
  let idx = { cpu: 1, gpu: 2, gpuCpu: 3 };
  // return document.querySelector(`table#performance tr#${rowId} > td:nth-child(${idx[col]})`)
  return rowEl.children[idx[colName]] as HTMLElement;
}

function runCalcPerfTest(
  calcName: string,
  calc: {
    fn: Function;
    fnArgs: any[];
    fnOptions?: { [key: string]: any };
  },
  runOptions?: {
    silentRun?: true;
    logPerformance?: "duration" | "full";
    logResult?: boolean;
    renderPerformance?: {
      targetEL: HTMLElement;
      appendToEl?: HTMLElement;
      appendChildToEl?: HTMLElement;
    };
    renderResult?: {
      targetEL: HTMLElement;
      appendToEl?: HTMLElement;
      appendChildToEl?: HTMLElement;
    };
  }
) {
  if (!runOptions?.silentRun) console.log(`%c~ ~ ~ Running ${calcName} ~ ~ ~`, "background-color:cornflowerblue;");

  if (runOptions != undefined) {
    if (runOptions.renderPerformance) {
      runOptions.renderPerformance.targetEL.classList.toggle("running-calc");
      // prettire-ignore
      runOptions.renderPerformance.targetEL.innerHTML = `<div class="d-flex justify-content-center">
                                                          <div class="spinner-border spinner-border-sm" role="status"></div>
                                                        </div>`;
      if (runOptions.renderPerformance.appendToEl)
        runOptions.renderPerformance.appendToEl.append(
          runOptions.renderPerformance.targetEL
        );
      else if (runOptions.renderPerformance.appendChildToEl)
        runOptions.renderPerformance.appendChildToEl.appendChild(
          runOptions.renderPerformance.targetEL
        );
    }
  }

  performance.mark(calcName);
  let calcResult = calc.fn.apply(null, calc.fnArgs);
  let perfResult = performance.measure(calcName);
  performance.clearMarks(calcName);

  if (runOptions != undefined) {
    if (runOptions.logPerformance == "full")
      console.log(`${calcName} performance:\n`, perfResult);
    else
      console.log(
        `${calcName} duration: ${Math.round(
          perfResult.duration
        ).toLocaleString()} ms`
      );
    if (runOptions.logResult)
      console.log(`${calcName} performance:\n`, perfResult);
    if (runOptions.renderPerformance) {
      runOptions.renderPerformance.targetEL.innerHTML = Math.round(
        perfResult.duration
      ).toLocaleString();
      runOptions.renderPerformance.targetEL.classList.toggle("running-calc");
    }
  }
  if (!runOptions?.silentRun) console.info("background-color:orange; color:black");
  return { calcResult, perfResult };
}
//#endregion DEFINITIONS
