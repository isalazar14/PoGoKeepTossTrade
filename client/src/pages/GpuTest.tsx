import { ChangeEvent, FormEvent, SyntheticEvent, useCallback, useMemo, useState } from "react"
// import { runTest } from "../util/gpuWorker"
import CSVDropDropUpload from "../components/CSVDragDropUpload"
import GenericErrorBoundary from "../components/GenericErrorBoundary"



export default function GpuTestPage() {

  return (
    <div id="content">
      <h1>GPU Test Page</h1>
      <p id='timeNow'></p>
      <p id="cpuCores"></p>
      <CSVDropDropUpload />
      {/* <input type="file" name="" id="file-input" onChange={importPokeGenieFile()} /> */}
      <GenericErrorBoundary>
        <TestSettingsTable />
      </GenericErrorBoundary>
      <h2>Performance (ms)</h2>
      <table id="performance">
        <thead>
          <tr>
            <th>Operation</th>
            <th>CPU</th>
            <th>GPU</th>
            <th>GPU<br /><small>(CPU fallback)</small></th>
          </tr>
        </thead>
        <tbody>
          {/* <tr id="maxCalcCPMs">
              <td>Max calc CPMs</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr id="maxValidCPMs">
              <td>Max valid CPMs<br/><small>Level at CP limit</small></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr id="stats">
              <td>Calculate stats<br/><small>(CP, HP, Atk, Def, SP)</small></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr> */}
          <tr id="calcThenValidCPMs">
            <td>calc & valid CPMs<br /><small>(+ CP, HP, SP)</small></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr id="sortSPs">
            <td>Sort SPs</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr id="spPercent">
            <td>Calculate SP%</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <div className="d-flex justify-content-center" id="calcStatus">
        <button id="startBtn" onClick={() => console.log('clicked start')} className="btn btn-success">Start</button>
        <div className="spinner-border" role="status" hidden></div>
        <p id="errorP" hidden>Error</p>
      </div>
      <h2>GPU Support</h2>
      <table id="gpuSupport">
        <thead>
          <tr>
            <th>Feature</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>GPU</td>
            <td id="gpu"></td>
          </tr>
          <tr>
            <td>Kernel Map</td>
            <td id="kernel-map"></td>
          </tr>
          <tr>
            <td>Offscreen Canvas</td>
            <td id="offscreen-canvas"></td>
          </tr>
          <tr>
            <td>WebGL</td>
            <td id="webgl"></td>
          </tr>
          <tr>
            <td>WebGL 2</td>
            <td id="webgl2"></td>
          </tr>
          <tr>
            <td>Headless GL</td>
            <td id="headlessgl"></td>
          </tr>
          <tr>
            <td>Canvas</td>
            <td id="canvas"></td>
          </tr>
          <tr>
            <td>GPU HTML Image Array</td>
            <td id="gpu-html-image-array"></td>
          </tr>
          <tr>
            <td>Single Precision</td>
            <td id="single-precision"></td>
          </tr>
        </tbody>
      </table>
      <div id="results"></div>
    </div>
  )
}

type IvValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15

type GpuTestSettings = {
  pfBatchSize?: number | undefined,
  ivBatchSize?: number | undefined,
  cpLimit?: number | undefined,
  ivFloor?: IvValue | undefined,
  maxLevel?: number | undefined,
  targetLevels?: number[] | undefined
}

function TestSettingsTable() {
  const initialSettings = useMemo<GpuTestSettings>(() => {
    return {
      pfBatchSize: 10,
      ivBatchSize: 5,
      cpLimit: 0,
      ivFloor: 0,
      maxLevel: 40,
      targetLevels: [30,40]
    }
  }, [])
  const [settings, setSettings] = useState<GpuTestSettings>(initialSettings)
  const setSettingsByKey = useCallback((settingName: keyof GpuTestSettings, value: any) => {
    setSettings({ ...settings, [settingName]: value } as GpuTestSettings)
  }, [])
  const settingRows = Object.keys(settings)
    .map((settingName, i) => {
      return (
        <TestSettingsTableRow
          label={settingName}
          dataSettingName={settingName as keyof GpuTestSettings}
          value={settings[settingName as keyof GpuTestSettings] ?? ""}
          handleInput={(event: ChangeEvent<HTMLInputElement>) => {
            setSettingsByKey(settingName as keyof GpuTestSettings,
              settingName as keyof GpuTestSettings == "targetLevels"
                ? parseStringToNumArray(event.target.value, ",")
                : event.target.value)
          }}
          key={i}
        />
      )
    })

  return (
    <div>
      <h2>Test Settings</h2>
      <table id="settings">
        <thead>
          <tr>
            <th>Name</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {settingRows}
        </tbody>
      </table>
      <button type="reset" onClick={() => setSettings(initialSettings)}>Reset Settings</button>
    </div>
  )
}

type TestSettingsTableRowProps = {
  label: string,
  value: string | number | any[],
  dataSettingName: keyof GpuTestSettings,
  handleInput: (event: ChangeEvent<HTMLInputElement>) => void
}

function TestSettingsTableRow(props: TestSettingsTableRowProps) {
  const { label, value, dataSettingName, handleInput } = props
  return <tr>
    <td>{label}</td>
    <td data-settingname={dataSettingName}>
      <input type="text"
        style={{ border: "none", background: "transparent" }}
        onChange={handleInput}
        value={  dataSettingName != "targetLevels"
                ? value
                : (value as number[]).join(", ")}
      />
    </td>
  </tr>
}

function parseStringToNumArray(input: string, delimeter: string) {
  const nums = input.replace(/\s/g, "")
    .split(delimeter)
    .map(value => {
      const num = parseInt(value)
      if (isNaN(num)) return
      return num
    })
    .filter(value => typeof value == 'number')
  return nums
}