import { useEffect, useState } from "react"
import CSVDropDropUpload from "../../components/CSVDragDropUpload"
import GenericErrorBoundary from "../../shared/components/GenericErrorBoundary"
import GpuPerformanceTable from "./components/GpuPerformanceTable"
import GpuSupportTable from "./components/GpuSupportTable"
import GpuTestSettingsTable from "./components/SettingsTable"
import { TestSettings, PokeformCsvResults, TestStatus, GpuTestWorkerTaskProps, TestState, GpuTestWorkerResultProps } from "./types"
import './GpuTest.css'
import { createTestState, getHeadersAndData } from "./utils/GpuTestCore"
import Papa from "papaparse"

// import { runTest } from "../util/gpuWorker"

const CPU_CORE_COUNT = navigator.hardwareConcurrency,
  TEST_SETTINGS_PRESETS = {
    SMALL: {
      pfBatchSize: 10,
      ivBatchSize: 5,
      cpLimits: [1500],
      ivFloor: 10,
      maxLevel: 40,
      targetLevels: [40]
    } as TestSettings,
    UNLIMITED: {
      pfBatchSize: 3,
      ivBatchSize: 0,
      cpLimits: [1500, 2500, 9999],
      ivFloor: 0,
      maxLevel: 51,
      targetLevels: [40, 41, 50, 51]
    } as TestSettings
  },
  TEST_STATE_PRESETS: Record<string, TestState> = {
    UNDEFINED: createTestState(undefined, undefined),
    MOCK: createTestState('complete', 100)
  }

let gpuTestWorker: Worker
// const gpuTestWorker: Worker = new Worker(
//   new URL('./utils/GpuTestWorker.ts', import.meta.url),
//   { type: "module" })

export default function GpuTestPage() {
  const [currentTestSettings, setCurrentTestSettings] = useState<TestSettings>(TEST_SETTINGS_PRESETS.SMALL)

  const [isFileLoaded, setFileLoaded] = useState(false)

  const [csvResults, setCsvResults] = useState<PokeformCsvResults | null>(null)

  const [testState, setTestState] = useState<TestState>(TEST_STATE_PRESETS.UNDEFINED)

  const [testStatus, setTestStatus] = useState<TestStatus>("notStarted")

  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString())

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString())
    })
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    Papa.parse('/pokemon_forms.csv', {
      download: true,
      dynamicTyping: true,
      skipEmptyLines: "greedy",
      complete(results, file) {
        const { data, headers } = getHeadersAndData(results, false)
        if (data) {
          setCsvResults({ pfHeaders: headers, pokeforms: data })
          setFileLoaded(true)
        }
      },
    })
  }, [])

  useEffect(() => {
    if (csvResults) console.log(csvResults)
  }, [csvResults])

  // useEffect(() => { /* create gpujsPlayground Worker and listeners */
  //   const playgroundWorker = new Worker(
  //     new URL('./utils/gpujsPlaygroundWorker.js', import.meta.url),
  //     { type: "module" }
  //   )

  //   return () => playgroundWorker.terminate()
  // }, [])

  useEffect(() => { /* create gpuTestWorker and listeners */
    gpuTestWorker = new Worker(
      new URL('./utils/GpuTestWorker.ts', import.meta.url),
      { type: "module" }
    )



    gpuTestWorker.onmessage = ({ data }) => {
      if (('result' as keyof GpuTestWorkerResultProps) in data) {
        // console.log('received test result from worker', data)
        const { testName, method, result } = data as GpuTestWorkerResultProps
        setTestState(currentResults => {
          // console.log('updating test state')
          const newTestState = {
            ...currentResults,
            [testName]: {
              ...currentResults[testName],
              [method]: {
                result: Math.round(result),
                status: 'complete'
              }
            }
          }
          // console.log(newTestState)
          return newTestState
        })
      }
      else {
        console.log('response from worker:', data)
        if (data.task == 'runTest' && data.status == 'complete') {
          setTestStatus("complete")
        }
      }
    }
    return () => {
      gpuTestWorker.terminate()
    }
  }, [])

  useEffect(() => { /* warmup GPU */
    const data: GpuTestWorkerTaskProps = { task: "gpuWarmup" }
    gpuTestWorker.postMessage(data)
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


    setCsvResults({ pfHeaders, pokeforms: pokeForms } as PokeformCsvResults)
    setFileLoaded(true)
  }

  function runTest() {

    if (!csvResults?.pokeforms) {
      console.error("No pokeforms to test");
      return
    }
    const data: GpuTestWorkerTaskProps = {
      task: "runTest",
      payload: {
        testSettings: currentTestSettings,
        pokeforms: csvResults?.pokeforms
      }
    }
    gpuTestWorker.postMessage(data)
    setTestStatus("running")
  }

  return (
    <div id="content">
      <h1>GPU Test Page</h1>
      <p id='timeNow'>Current Time: {currentTime}</p>

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
        <button type="reset" onClick={() => setCurrentTestSettings(TEST_SETTINGS_PRESETS.UNLIMITED)}>Large Test Settings</button>
        <button type="reset" onClick={() => setCurrentTestSettings(TEST_SETTINGS_PRESETS.SMALL)}>Small Test Settings</button>
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
        <div>
          <h2>Hardware Support</h2>
          <h3 id="cpuCores">CPU threads: {CPU_CORE_COUNT}</h3>
          <GpuSupportTable />
        </div>
      </GenericErrorBoundary>


      <div id="results"></div>
    </div>
  )
}

