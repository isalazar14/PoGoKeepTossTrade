import { useEffect, useState } from "react"
import CSVDropDropUpload from "../../components/CSVDragDropUpload"
import GenericErrorBoundary from "../../shared/components/GenericErrorBoundary"
import GpuPerformanceTable from "./components/GpuPerformanceTable"
import GpuSupportTable from "./components/GpuSupportTable"
import GpuTestSettingsTable from "./components/GpuTestSettingsTable"
import { GpuTestSettings, PokeformCsvResults, TestStatus, GpuTestWorkerTaskProps, GpuTestWorkerResponse, TestState } from "./types"
import './GpuTest.css'
import { createTestState } from "./utils/GpuTestCore"

// import { runTest } from "../util/gpuWorker"

const CPU_CORE_COUNT = navigator.hardwareConcurrency
const SMALL_TEST_SETTINGS: GpuTestSettings = {
  pfBatchSize: 10,
  ivBatchSize: 5,
  cpLimit: 1500,
  ivFloor: 10,
  maxLevel: 40,
  targetLevels: [40]
}
const UNLIMITED_TEST_SETTINGS: GpuTestSettings = {
  pfBatchSize: 0,
  ivBatchSize: 0,
  cpLimit: 0,
  ivFloor: 0,
  maxLevel: 51,
  targetLevels: [40, 41, 50, 51]
}

const UNDEFINED_TEST_STATE: TestState = createTestState(undefined, undefined)
const MOCK_COMPLETE_TEST_STATE: TestState = createTestState('complete', 100)

let gpuTestWorker: Worker;

export default function GpuTestPage() {
  const [currentTestSettings, setCurrentTestSettings] = useState<GpuTestSettings>(SMALL_TEST_SETTINGS)

  const [isFileLoaded, setFileLoaded] = useState(false)

  const [csvResults, setCsvResults] = useState<PokeformCsvResults | null>(null)

  const [testState, setTestState] = useState<TestState>(UNDEFINED_TEST_STATE)

  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString())
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString())
    })
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const worker = new Worker(new URL('./utils/textureLoopWorker.js', import.meta.url), {type: "module"})

    worker.postMessage('run')

    return () => worker.terminate()
  }, [])

  useEffect(() => {
    /* create gpuTestWorker and warmup GPU */
    gpuTestWorker = new Worker(new URL('./utils/GpuTestWorker.ts', import.meta.url), { type: "module" })

    // const data: GpuTestWorkerTaskProps = { task: "gpuWarmup" }
    // gpuTestWorker.postMessage(data)
    // gpuTestWorker.onmessage = ({data: {testName, method, result}}: GpuTestWorkerResponse) => {
    //   if (testName) {
    //     setTestState(currentResults => {
    //       return {
    //         ...currentResults,
    //         [testName]: {
    //           ...currentResults[testName],
    //           [method]: result
    //         }
    //       }
    //     })
    //   }
    // }
    return () => {
      gpuTestWorker.terminate()
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


  const [testStatus, setTestStatus] = useState<TestStatus>("notStarted")


  function runTest() {
    console.log("Test Started")
    if (!csvResults?.pokeForms) {
      console.error("No pokeforms to test");
      return
    }
    const data: GpuTestWorkerTaskProps = {
      task: "runTest",
      payload: {
        testSettings: currentTestSettings,
        pokeForms: csvResults?.pokeForms
      }
    }
    gpuTestWorker.postMessage(data)
    gpuTestWorker.onmessage = (event: MessageEvent) => {
      if (event.data) console.log('response from worker:', event.data)
    }
  }

  return (
    <div id="content">
      <h1>GPU Test Page</h1>
      <p id='timeNow'>Current Time: {currentTime}</p>
      <p id="cpuCores">CPU threads: {CPU_CORE_COUNT}</p>
      <CSVDropDropUpload
        handleResults={handlePokeformsCsvResults}
        config={{
          // worker: true,
          dynamicTyping: true,
          skipEmptyLines: 'greedy',
          // transformHeader: cleanHeader,
          // preview: currentTestSettings.pfBatchSize 
          //           ? currentTestSettings.pfBatchSize + 1 
          //           : 0,
          error: (error, file) => console.log(error)
        }}
      />

      {/* <input type="file" name="" id="file-input" onChange={importPokeGenieFile()} /> */}
      <GenericErrorBoundary>
        <GpuTestSettingsTable settings={currentTestSettings} setSettings={setCurrentTestSettings} />
        <button type="reset" onClick={() => setCurrentTestSettings(UNLIMITED_TEST_SETTINGS)}>Large Test Settings</button>
        <button type="reset" onClick={() => setCurrentTestSettings(SMALL_TEST_SETTINGS)}>Reset Settings</button>
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
        <GpuPerformanceTable testState={testState} />
      </GenericErrorBoundary>

      <GenericErrorBoundary>
        <GpuSupportTable />
      </GenericErrorBoundary>


      <div id="results"></div>
    </div>
  )
}

