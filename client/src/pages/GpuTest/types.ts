import { IKernelFunctionThis } from 'gpu.js'

export type PokeIv = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15
export type PokeIvSet = [iv_id: number, atkIV: PokeIv, defIV: PokeIv, staIV: PokeIv];
export type PokeCpmSet = [level: number, cpm: number];
export type PokeformBaseStats = [
  pokemonId: number,
  formId: number,
  baseAtk: number,
  baseDef: number,
  baseSta: number
];
export type PokeformTotalStats = { tAtk: number, tDef: number, tSta: number }
export type PokeformTotalStatsArray = [tAtk: number, tDef: number, tSta: number]

export type PokeformCsvResults = {
  pfHeaders: string[] | undefined
  pokeforms: PokeformBaseStats[]
}

export type TestSettings = {
  pfBatchSize?: number | undefined,
  ivBatchSize?: number | undefined,
  cpLimits?: number[] | undefined,
  ivFloor?: PokeIv | undefined,
  maxLevel?: number | undefined,
  targetLevels?: number[] | undefined
}
export type TestName =
  'getMaxValidCPMsAndStats' |
  'sortSPs' |
  'calcPercentSPs'

export type TestMethod = 'gpu' | 'cpu' | 'cpuFallback'

export type TestStatus = "notStarted" | "running" | "complete"

/* FOR **SEPARATE** TEST STATUS AND RESULT  */
// export type TestMethodSummary = Record<TestMethod, number>

// export type TestMethodStatus = Record<TestMethod, TestStatus | undefined>

// export type TestMethodResults = Record<TestMethod, number | undefined>

// export type TestSet = Record<TestName, TestMethodResults | undefined>


/* FOR **UNIFIED** TEST STATUS AND RESULT  */
export type TestData = {
  status: TestStatus | undefined
  result: number | undefined
}

export type TestMethodData = Record<TestMethod, TestData>

export type TestState = Record<TestName, TestMethodData>


export type PerformanceTableRowProps = {
  testDisplayName: string
  data: TestMethodData
}

export type PerformanceTableCellProps = {
  testStatus: TestStatus
  result?: number
}

export type PerformanceTableProps = {
  testState: TestState
}

export type GpuTestWorkerTask = 'gpuWarmup' | 'runTest' | 'textureLoop'

export type GpuTestWorkerTaskPayload = {
  testSettings: TestSettings,
  pokeforms: PokeformBaseStats[]
}

export type GpuTestWorkerTaskProps = {
  task: GpuTestWorkerTask
  payload?: GpuTestWorkerTaskPayload
}

export interface GpuTestWorkerTaskMessage extends MessageEvent {
  data: GpuTestWorkerTaskProps
}

export type GpuTestWorkerResultProps = {
  testName: TestName
  method: TestMethod
  result: number
}

export interface GpuTestWorkerResponse extends MessageEvent {
  data: GpuTestWorkerResultProps
}

export type PokeformFilterOption =
  // { limit: number, pIdRange?: never, pfSelection?: never } |
  // { limit?: never, pIdRange: [pIdStart: number, pIdEnd: number], pfSelection?: never } |
  // { limit?: never, pIdRange?: never, pfSelection: [pokemonId: number, formId: number][] }
  { range: [pIdStart: number, pIdEnd: number], selection?: never } |
  { range?: never, selection: [pokemonId: number, formId: number][] }

// export type TimeTestProps<T extends (...args: any[]) => any> = {
//   calcName: string
//   fn: T
//   silent?: boolean
//   logPerformance?: boolean
//   logResult?: boolean
// }

export interface IGpuPokeConstants {
  ivCount: number
}

export type GpuPokeThis =
  IKernelFunctionThis & {
    constants: IGpuPokeConstants
  }