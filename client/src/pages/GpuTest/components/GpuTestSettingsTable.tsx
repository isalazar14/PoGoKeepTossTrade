import { ChangeEvent, Dispatch, SetStateAction, useCallback } from "react"
import { GpuTestSettings } from "../pages/GpuTest"

type GpuTestSettingsTableProps = {
  settings: GpuTestSettings
  setSettings: Dispatch<SetStateAction<GpuTestSettings>>
}

export default function GpuTestSettingsTable({ settings, setSettings }: GpuTestSettingsTableProps) {
  const setSettingsByKey = useCallback(
    (settingName: keyof GpuTestSettings, value: any) => {
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
          key={settingName}
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
    <td data-settingname={dataSettingName} style={{}}>
      <input type="text"
        onChange={handleInput}
        style={{
          border: "none",
          background: "transparent",
          textAlign: "center"
        }}
        value={Array.isArray(value)
          ? value.join(", ")
          : value
        } />
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