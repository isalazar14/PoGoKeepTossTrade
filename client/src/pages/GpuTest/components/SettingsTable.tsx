import { ChangeEvent, Dispatch, SetStateAction, useCallback } from "react"
import { TestSettings } from "../types"

type SettingsTableProps = {
  settings: TestSettings
  setSettings: Dispatch<SetStateAction<TestSettings>>
}

export default function GpuTestSettingsTable({ settings, setSettings }: SettingsTableProps) {
  const setSettingsByKey = useCallback(
    (settingName: keyof TestSettings, value: any) => {
      setSettings(prevSettings => {
        const newSettings = { ...prevSettings, [settingName]: value } as TestSettings
        return newSettings
      })
    }, [])

  const settingRows = Object.keys(settings)
    .map((settingName, i) => {
      return (
        <TestSettingsTableRow
          label={settingName}
          dataSettingName={settingName as keyof TestSettings}
          value={(Array.isArray(settings[settingName as keyof TestSettings])
            ? (settings[settingName as keyof TestSettings] as []).join(", ")
            : settings[settingName as keyof TestSettings]
          ) ?? ""}
          handleInput={(event: ChangeEvent<HTMLInputElement>) => {
            setSettingsByKey(settingName as keyof TestSettings,
              // settingName as keyof TestSettings == "targetLevels"
              isNaN(+event.target.value)
                ? parseStringToNumArray(event.target.value, ",")
                : +event.target.value
            )
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
  dataSettingName: keyof TestSettings,
  handleInput: (event: ChangeEvent<HTMLInputElement>) => void
}

function TestSettingsTableRow(props: TestSettingsTableRowProps) {
  const { label, value, dataSettingName, handleInput } = props
  return <tr>
    <td>{label}</td>
    <td data-settingname={dataSettingName} style={{}}>
      <input type="number"
        onChange={handleInput}
        inputMode="numeric"
        style={{
          // border: "none",
          background: "transparent",
          textAlign: "center",
        }}
        value={Array.isArray(value)
          ? value.join(", ")
          : value
        } />
    </td>
  </tr>
}

function parseStringToNumArray(input: string, delimeter: string) {
  const nums = input.replace(/\s{2,}/g, " ")
    .split(delimeter)
    .map(value => {
      const num = parseInt(value)
      if (isNaN(num)) return
      return num
    })
    .filter(value => typeof value == 'number')
  return nums
}