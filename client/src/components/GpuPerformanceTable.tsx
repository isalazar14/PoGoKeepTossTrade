import { GpuTestResultSet } from "../pages/GpuTest"

type GpuPerformanceTableProps = {
  results: GpuTestResultSet
}
export default function GpuPerformanceTable({
  results: {
    getMaxValidCPMsAndStats,
    sortSPs,
    calcPercentSPs,
  }}: GpuPerformanceTableProps)  {

  return (
    <>
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
            <td>{getMaxValidCPMsAndStats?.cpu}</td>
            <td>{getMaxValidCPMsAndStats?.gpu}</td>
            <td>{getMaxValidCPMsAndStats?.cpuFallback ?? ""}</td>
          </tr>
          <tr id="sortSPs">
            <td>Sort SPs</td>
            <td>{sortSPs?.cpu}</td>
            <td>{sortSPs?.gpu}</td>
            <td>{sortSPs?.cpuFallback ?? ""}</td>
          </tr>
          <tr id="spPercent">
            <td>Calculate SP%</td>
            <td>{calcPercentSPs?.cpu}</td>
            <td>{calcPercentSPs?.gpu}</td>
            <td>{calcPercentSPs?.cpuFallback}</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}