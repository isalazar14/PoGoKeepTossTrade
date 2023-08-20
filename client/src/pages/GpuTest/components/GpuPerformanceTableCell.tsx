import { GpuPerformanceTableCellProps, TestData } from "../types"

export default function GpuPerformanceTableCell({ status, result }: TestData) {

  return (
    <td>
      {
        status == "running" &&
        <div className="d-flex justify-content-center">
          <div className="spinner-border spinner-border-sm" role="status"></div>
        </div>
      }

      {status == 'complete' && result}
    </td>
  )
}