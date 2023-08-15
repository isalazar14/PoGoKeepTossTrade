import { useEffect, useMemo, useState } from "react"
import CSVDropDropUpload from "../components/CSVDragDropUpload"
import GenericErrorBoundary from "../components/GenericErrorBoundary"
import GpuPerformanceTable from "../components/GpuPerformanceTable"
import GpuSupportTable from "../components/GpuSupportTable"
import GpuTestSettingsTable from "../components/GpuTestSettingsTable"
import './GpuTest.css'
import { GPU } from "gpu.js"
import { CustomConfig } from "react-papaparse/dist/model"

// import { runTest } from "../util/gpuWorker"

type IvValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15

export type GpuTestSettings = {
  pfBatchSize?: number | undefined,
  ivBatchSize?: number | undefined,
  cpLimit?: number | undefined,
  ivFloor?: IvValue | undefined,
  maxLevel?: number | undefined,
  targetLevels?: number[] | undefined
}

type GpuTestResultsByHardware = {
  gpu: number
  cpu: number
  cpuFallback?: number
}

export type GpuTestResultSet = {
  getMaxValidCPMsAndStats: GpuTestResultsByHardware | undefined
  sortSPs: GpuTestResultsByHardware | undefined
  calcPercentSPs: GpuTestResultsByHardware | undefined
}

export default function GpuTestPage() {
  const cpuCoreCount = useMemo(() => navigator.hardwareConcurrency, [])
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString())

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString())
    })
    return () => clearInterval(interval)
  }, [])

  const initialTestSettings = useMemo<GpuTestSettings>(() => {
    return {
      pfBatchSize: 10,
      ivBatchSize: 5,
      cpLimit: 1500,
      ivFloor: 10,
      maxLevel: 40,
      targetLevels: [40]
    }
  }, [])

  const unlimitedTestSettings = useMemo<GpuTestSettings & object>(() => {
    return {
      pfBatchSize: 0,
      ivBatchSize: 0,
      cpLimit: 1500,
      ivFloor: 0,
      maxLevel: 40,
      targetLevels: [30, 40, 50]
    }
  }, [])

  const [currentTestSettings, setCurrentTestSettings] = useState<GpuTestSettings>(initialTestSettings)

  const undefinedTestResults = useMemo<GpuTestResultSet>(() => {
    return {
      getMaxValidCPMsAndStats: undefined,
      sortSPs: undefined,
      calcPercentSPs: undefined
    }
  }, [])

  const [testResults, setTestResults] = useState<GpuTestResultSet>(undefinedTestResults)

  const [isFileLoaded, setFileLoaded] = useState(false)

  type PokeformCsvResults = {
    pfHeaders: string[]
    pokeForms: any[][]
  }

  const [csvResults, setCsvResults] = useState<PokeformCsvResults | null>(null)

  const readPokeFormsCsvConfig = useMemo<CustomConfig>(() => {
    return {
      // worker: true,
      dynamicTyping: true,
      skipEmptyLines: 'greedy',
      // header: true,
      // transformHeader: cleanHeader,
      // preview: currentTestSettings.pfBatchSize 
      //           ? currentTestSettings.pfBatchSize + 1 
      //           : 0,
      error: (error, file) => console.log(error)
    }
  }, [])

  function handlePokeformsCsvResults(pfHeaders, pokeForms) {
    /* TODO: implement pf range and selection */
    // if (options?.pIdRange) {
    //   /* range option set -> get all rows with matching pId, including multiple forms */
    //   result.data = data.filter((pf) => pf[0] >= options.pIdRange[0] && pf[0] <= options.pIdRange[1]);
    // }
    // else if (options?.pfSelection) {
    //   /* selection option set -> get all rows with matching [pId, fId] */
    //   let selection = options.pfSelection.reduce((map, pf, i) => map.set(pf, true), new Map());
    //   let rowCount = parseResults.data.length;
    //   let remaining = options.pfSelection.length;
    //   let i = 0;
    //   let filteredPFs = [];
    //   while (remaining > 0 && i < rowCount) {
    //     if (selection.has(`${data[i][0]},${data[i][1]}`)) {
    //       filteredPFs.push(data[i]);
    //       remaining--;
    //     }
    //     i++;
    //   }
    //   result.data = filteredPFs;


    setCsvResults({ pfHeaders, pokeForms } as PokeformCsvResults)
    setFileLoaded(true)
  }

  type TestStatus = "notStarted" | "running" | "complete"

  const [testStatus, setTestStatus] = useState<TestStatus>("notStarted")
  
  const cpms = useMemo(() => {
    const gmCPMs = [0.094, 0.16639787, 0.21573247, 0.25572005, 0.29024988, 0.3210876, 0.34921268, 0.3752356, 0.39956728, 0.4225, 0.44310755, 0.4627984, 0.48168495, 0.49985844, 0.51739395, 0.5343543, 0.5507927, 0.5667545, 0.5822789, 0.5974, 0.6121573, 0.6265671, 0.64065295, 0.65443563, 0.667934, 0.6811649, 0.69414365, 0.7068842, 0.7193991, 0.7317, 0.7377695, 0.74378943, 0.74976104, 0.7556855, 0.76156384, 0.76739717, 0.7731865, 0.77893275, 0.784637, 0.7903, 0.7953, 0.8003, 0.8053, 0.8103, 0.8153, 0.8203, 0.8253, 0.8303, 0.8353, 0.8403, 0.8453];
    const allCpms = getFullCpmList(gmCPMs, "df");
    console.log(allCpms)
    return allCpms
  }, [])
  const gpu = useMemo(() => new GPU(), [])

  function runTest() {
    console.log("Test Started")

    const ivs = createIvMatrix(currentTestSettings.ivFloor)

  }

  return (
    <div id="content">
      <h1>GPU Test Page</h1>
      <p id='timeNow'>Current Time: {currentTime}</p>
      <p id="cpuCores">CPU threads: {cpuCoreCount}</p>
      <CSVDropDropUpload
        config={readPokeFormsCsvConfig}
        handleResults={handlePokeformsCsvResults}
      />

      {/* <input type="file" name="" id="file-input" onChange={importPokeGenieFile()} /> */}
      <GenericErrorBoundary>
        <GpuTestSettingsTable settings={currentTestSettings} setSettings={setCurrentTestSettings} />
        <button type="reset" onClick={() => setCurrentTestSettings(unlimitedTestSettings)}>Large Test Settings</button>
        <button type="reset" onClick={() => setCurrentTestSettings(initialTestSettings)}>Reset Settings</button>
      </GenericErrorBoundary>
      {isFileLoaded &&
        <div className="d-flex justify-content-center" id="calcStatus">
          <button id="startBtn" onClick={runTest} className="btn btn-success" hidden={testStatus == "running" ? true : false}>Run Test</button>
          <div className="spinner-border" role="status" hidden={testStatus == "running" ? false : true}></div>
          <p hidden={testStatus != "complete" ? true : false}>Test Finished</p>
          <p id="errorP" hidden>Error</p>
        </div>
      }
      <GenericErrorBoundary>
        <GpuPerformanceTable results={testResults} />
      </GenericErrorBoundary>

      <GenericErrorBoundary>
        <GpuSupportTable />
      </GenericErrorBoundary>


      <div id="results"></div>
    </div>
  )
}

function timeTest(calcName, calc, options) {
  // let { useWorker, silentRun, logPerformance, logResult } = options
  // {targetEl, appendToEl, appendChildToEl}
  if (!options?.silentRun)
    console.log(`%cRunning ${calcName}`, "background-color:cornflowerblue;");
  if (options?.renderPerformance != undefined) {
    if (options.renderPerformance) {
      options.renderPerformance.targetEL.classList.toggle("running-calc");
      // prettire-ignore
      options.renderPerformance.targetEL.innerHTML = `<div class="d-flex justify-content-center">
                                                      <div class="spinner-border spinner-border-sm" role="status"></div>
                                                    </div>`;
      if (options.renderPerformance.appendToEl)
        options.renderPerformance.appendToEl.append(options.renderPerformance.targetEL);
      else if (options.renderPerformance.appendChildToEl)
        options.renderPerformance.appendChildToEl.appendChild(options.renderPerformance.targetEL);
    }
  }
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
function getFullCpmList(floatCPMs, resultType = "df") {
  // if (floatCPMs.length == 0) {console.error("floatCpms array is empty"); return}
  const trueCpms = new Float32Array(floatCPMs);
  const maxLevel = trueCpms.length;
  const totalCpmCount = trueCpms.length * 2 - 1;
  const allCpms = Array(totalCpmCount);
  trueCpms.forEach((levelCpm, i) => {
    const level = i + 1;
    allCpms[(level - 1) * 2] = [level, levelCpm];
    if (level < maxLevel) {
      const nextLevelCpm = trueCpms[i + 1];
      const halfLevelCpm = getHalfLevelCPM(levelCpm, nextLevelCpm);
      const halfLevel = level + 0.5;
      allCpms[(halfLevel - 1) * 2] = [halfLevel, halfLevelCpm];
    }
  }, allCpms);
  if (resultType == "df")
    return allCpms;
  return new Map(allCpms);
  function getHalfLevelCPM(levelCpm, nextLevelCpm) {
    const halfLevelCpm = Math.sqrt(levelCpm * levelCpm -
      (levelCpm * levelCpm) / 2 +
      (nextLevelCpm * nextLevelCpm) / 2);
    return halfLevelCpm;
  }
}
function createIvMatrix(floor = 0) {
  const ivs = Array(4096);
  // filling iv combos array
  let i = 0;
  console.time("creatIvCombos");
  for (let aI = floor; aI < 16; aI++) {
    for (let dI = floor; dI < 16; dI++) {
      for (let sI = floor; sI < 16; sI++) {
        ivs[i] = [i, aI, dI, sI];
        i++;
      }
    }
  }
  console.timeEnd("creatIvCombos");
  return ivs;
  // console.log(ivs);
}
function getTotalStats(pfIdx, ivIdx, pokeForms, ivs) {
  const a = pokeForms[pfIdx][2] + ivs[ivIdx][1]
  const d = pokeForms[pfIdx][3] + ivs[ivIdx][2]
  const s = pokeForms[pfIdx][4] + ivs[ivIdx][3]
  return { a, d, s }
}
function getCP({ a, d, s, cpm }) {
  return Math.max(10, ((a * Math.sqrt(d) * Math.sqrt(s) * Math.pow(cpm, 2)) / 10) >> 0);
}