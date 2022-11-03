// export {}; // required to make this a module (if no other import statements) -> allows top-level 'await' (will not compile without it)
import {
  displayHardwareSupport,
  runCalcPerfTest,
  getCalcTimeRowCell,
  getPokeForms,
} from "./gpujsTestHelpers";
import { createIvMatrix, getCorrectCpms } from "./pokeCalcHelpers";
import {
  getCalcCPMsAtCpLimit_CPU,
  getMaxValidCpms_CPU,
} from "./pokeCalcsCPU";
import {
  calcCP,
  calcCpmsAtCpLimit,
  createKernel,
  getTrueCpmIdxsFromCalcCpms,
  getMaxValidCpms,
  getTrueCpmsFromCpmIdxs,
} from "./pokeCalcsGPU";
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

// onmessage = (e) =>{
//   const [gpuG, gpuC] = e.data
// postMessage("in gpujsTestWorker.js")

//#region INIT + GLOBAL VARS
console.log("running gpuTest");
displayHardwareSupport();

let calcParams = {
  PF_BATCH_SIZE: 20 /* 0 = no limit */,
  IV_BATCH_SIZE: 20 /* 0 = no limit */,
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
  preview: calcParams.PF_BATCH_SIZE | 0,
  // pIdRange: [25, 26],
  // pfSelection: ["3,1", "6,1", "9,1"],
};

let ivs = createIvMatrix();
if (calcParams.IV_BATCH_SIZE > 0) ivs = ivs.slice(0, calcParams.IV_BATCH_SIZE);
// console.log(ivs)
// prettier-ignore
const gmCPMs = [0.094,0.16639787,0.21573247,0.25572005,0.29024988,0.3210876,0.34921268,0.3752356,0.39956728,0.4225,0.44310755,0.4627984,0.48168495,0.49985844,0.51739395,0.5343543,0.5507927,0.5667545,0.5822789,0.5974,0.6121573,0.6265671,0.64065295,0.65443563,0.667934,0.6811649,0.69414365,0.7068842,0.7193991,0.7317,0.7377695,0.74378943,0.74976104,0.7556855,0.76156384,0.76739717,0.7731865,0.77893275,0.784637,0.7903,0.7953,0.8003,0.8053,0.8103,0.8153,0.8203,0.8253,0.8303,0.8353,0.8403,0.8453];
let cpmsFloatArray = getCorrectCpms(gmCPMs, "df") as [number, number][];
let maxLevelIdx = calcParams.MAX_LEVEL * 2 - 2;
let cpmLengthAtMaxLevel = maxLevelIdx + 1;
cpmsFloatArray = cpmsFloatArray.slice(0, cpmLengthAtMaxLevel);
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

const settingsTable = document.querySelector("table#settings") as HTMLTableElement;
settingsTable!.querySelector("#pf-batch-size")!.innerHTML =  calcParams.PF_BATCH_SIZE.toString()
settingsTable!.querySelector("#iv-batch-size")!.innerHTML =  calcParams.IV_BATCH_SIZE.toString()
settingsTable!.querySelector("#cp-limit")!.innerHTML =  calcParams.CP_LIMIT.toString()
settingsTable!.querySelector("#max-level")!.innerHTML =  calcParams.MAX_LEVEL.toString()
settingsTable!.querySelector("#target-levels")!.innerHTML =  calcParams.TARGET_LEVELS.toString();
/* show settings table */
document.querySelector("table#settings")!.removeAttribute("hidden");

/* SHOW PERFORMANCE TABLE */
document.querySelector("table#performance")!.removeAttribute("hidden");

/* SHOW CALC STATUS SPINNER*/
const calcStatusDiv = document.querySelector("#calcStatus");
calcStatusDiv?.querySelector(".spinner-border")?.removeAttribute("hidden");

//#endregion INIT + GLOBAL VARS

//#region CREATE GPU KERNELS
const gpuG = new GPU({ mode: "gpu" });
const gpuC = new GPU({ mode: "cpu" });

const calcCp_gpuG = createKernel(gpuG, calcCP, {
  output: [
    cpmsFloatArray.length,
    calcParams.IV_BATCH_SIZE,
    calcParams.PF_BATCH_SIZE,
  ],
}); // [x, y, z] -> matches this.thread._

const calcCpmsAtCpLimit_gpuG = createKernel(gpuG, calcCpmsAtCpLimit, {
  output: [calcParams.IV_BATCH_SIZE, calcParams.PF_BATCH_SIZE],
  pipeline: true,
});

const calcCpmsAtCpLimit_gpuC = createKernel(gpuC, calcCpmsAtCpLimit, {
  output: [calcParams.IV_BATCH_SIZE, calcParams.PF_BATCH_SIZE],
  pipeline: true,
});

const getTrueCpmIdxsFromCalcCpms_gpuG = createKernel(
  gpuG,
  getTrueCpmIdxsFromCalcCpms,
  {
    output: [calcParams.IV_BATCH_SIZE, calcParams.PF_BATCH_SIZE],
    pipeline: true,
  }
);

const getTrueCpmIdxsFromCalcCpms_gpuC = createKernel(
  gpuC,
  getTrueCpmIdxsFromCalcCpms,
  {
    output: [calcParams.IV_BATCH_SIZE, calcParams.PF_BATCH_SIZE],
    // pipeline: true /* can this be used in CPU mode?? */
  }
);

const getTrueCpmsFromCpmIdxs_gpuG = createKernel(gpuG, getTrueCpmsFromCpmIdxs, {
  output: [calcParams.IV_BATCH_SIZE, calcParams.PF_BATCH_SIZE],
  // pipeline: true
});

const getTrueCpmsFromCalcCpms_gpuG = createKernel(
  gpuG,
  getMaxValidCpms,
  {
    output: [calcParams.IV_BATCH_SIZE, calcParams.PF_BATCH_SIZE],
    // pipeline: true
    // optimizeFLoatMemory: true,
    // tactic: "precision",
  }
);
const getTrueCpmsFromCalcCpms_gpuC = createKernel(
  gpuC,
  getMaxValidCpms,
  {
    output: [calcParams.IV_BATCH_SIZE, calcParams.PF_BATCH_SIZE],
    // pipeline: true
    // optimizeFLoatMemory: true,
    // tactic: "precision",
  }
);
//#endregion CREATE GPU KERNELS

//#region RUN CALCS / PERF TESTS

// prettier-ignore
let pokeFormsFlattened = GPU.input(pokeForms.flat(), [pokeForms[0].length, pokeForms.length]);
// prettier-ignore
let ivsFlattened = GPU.input(ivs.flat(), [ivs[0].length, ivs.length]);
// prettier-ignore
let cpmsFloatArrayFlattened = GPU.input(cpmsFloatArray.flat(), [cpmsFloatArray[0].length, cpmsFloatArray.length]);

console.log("~~~ calcCpmsAtCpLimit ~~~");
/* SET CURRENT TEST CELL AS ACTIVE AND SHOW SPINNER */

const calcTimeRow_maxValidCPMs = document.querySelector(
  "tr#maxValidCPMs"
) as HTMLTableRowElement;
const calcTimeRow_calcStats = document.querySelector(
  "tr#stats"
) as HTMLTableRowElement;
const calcTimeRow_calcSPs = document.querySelector(
  "tr#sortSPs"
) as HTMLTableRowElement;
const calcTimeRow_sortSPs = document.querySelector(
  "tr#spPercent"
) as HTMLTableRowElement;
/* NOTE TO SELF: HANDLE SHADOW MONS */

//#region CPU CALCS
//#region calcCpms
// prettier-ignore
const calcTimeRow_maxCalcCPMs = document.querySelector("tr#maxCalcCPMs") as HTMLTableRowElement;
let { calcResult: calcCpms_cpu } = runCalcPerfTest(
  "calcCpms_CPU",
  {
    fn: getCalcCPMsAtCpLimit_CPU,
    fnArgs: [calcParams.CP_LIMIT, pokeForms, ivs],
  },
  {
    logResult: true,
    renderPerformance: {
      targetEL: getCalcTimeRowCell(calcTimeRow_maxCalcCPMs, "cpu"),
    },
  }
);

/* getTrueCpmsFromCalcCpms_cpu */
const getTrueCpmFromCalcCpms_cpu_t0 = performance.now();
let trueCpmsFrpmCalcCpms_cpu = getMaxValidCpms_CPU(
  calcCpms_cpu,
  cpmsFloatArray
  // cpmsFloatArray.length - 1
  // false
);
const getTrueCpmFromCalcCpms_cpu_t1 = performance.now();
const getTrueCpmFromCalcCpms_cpu_dt =
  getTrueCpmFromCalcCpms_cpu_t1 - getTrueCpmFromCalcCpms_cpu_t0;
console.log(`getTrueCpmFromCALCCPMs_cpu: ${getTrueCpmFromCalcCpms_cpu_dt} ms`);
console.log(trueCpmsFrpmCalcCpms_cpu);
let p = document.createElement("p");
p.textContent = `getTrueCpmFromCALCCPMs_cpu: ${getTrueCpmFromCalcCpms_cpu_dt} ms`;
//#endregion RUN calcCpms_CPU, RENDER PERFORMANCE
//#endregion CPU CALCS

//#region GPU CALCS
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
//#endregion GPU CALCS

//#endregion RUN CALCS / PERF TESTS