import { GpuPerformanceTableRowProps } from "../types";
import GpuPerformanceTableCell from "./GpuPerformanceTableCell";

export default function GpuPerformanceTableRow({ testDisplayName, data }: GpuPerformanceTableRowProps) {

  return (
    <tr>
      <td>{testDisplayName}</td>
      {
      Object.values(data).map((method, i) =>
        <GpuPerformanceTableCell status={method.status} result={method.result} key={Object.keys(data)[i]}/>
      )
      }
    </tr>
  )
}