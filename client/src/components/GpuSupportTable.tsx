import { GPU } from "gpu.js";
import './GpuSupportTable.css'
// type GpuSupportTableProps = {
//   GPU: GPU
// }
type GpuFeature = {
  propertyName: string
  displayText: string,
}


const gpuFeatures: GpuFeature[] = [
  {
    propertyName: "isGPUSupported",
    displayText: "GPU",
  },
  {
    propertyName: "isKernelMapSupported",
    displayText: "Kernel Map",
  },
  {
    propertyName: "isCanvasSupported",
    displayText: "Canvas",
  },
  {
    propertyName: "isOffscreenCanvasSupported",
    displayText: "Offscreen Canvas",
  },
  {
    propertyName: "isWebGLSupported",
    displayText: "WebGL",
  },
  {
    propertyName: "isWebGL2Supported",
    displayText: "WebGL 2",
  },
  {
    propertyName: "isHeadlessGLSupported",
    displayText: "Headless GL",
  },
  {
    propertyName: "isGPUHTMLImageArraySupported",
    displayText: "HTML Image Array",
  },
  {
    propertyName: "isSinglePrecisionSupported",
    displayText: "Single Precision",
  }
];
export default function GpuSupportTable() {

  return (
    <>
      <h2>GPU Support</h2>
      <table id="gpuSupport">
        <thead>
          <tr>
            <th>Feature</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>

          {gpuFeatures.map((feature, i) =>
            <GpuSupportTableRow feature={feature} key={i}/>
          )}

        </tbody>
      </table>
    </>
  )
}

type GpuSupportTableRowProp = {
  feature: GpuFeature
}

function GpuSupportTableRow({ feature }: GpuSupportTableRowProp) {
  return (
    <tr className={GPU[feature.propertyName] ? undefined : "notSupported"}>
      <td>{feature.displayText}</td>
      <td>{GPU[feature.propertyName] && "Supported"}</td>
    </tr>
  )
}