/* for use with bundler (e.g webpack), or node */
// import { GPU, IGPUKernelSettings, IGPUSettings } from "gpu.js";
/* for browser
  use gpu-browser.js when testing plain HTML (i.e. not bundled)
  get types for intellisense. not included in gpu-browser. */
import { GPU } from "../node_modules/gpu.js/dist/gpu-browser";
import { IGPUKernelSettings, IGPUSettings, IKernelRunShortcutBase, KernelFunction, Texture } from "gpu.js";

export function createKernel<KernelType extends KernelFunction>(
  gpu: GPU,
  kernelFn: Function,
  kernelSettings?: IGPUKernelSettings
):((...args: Parameters<KernelType>) =>
ReturnType<KernelType>[]
| ReturnType<KernelType>[][]
| ReturnType<KernelType>[][][]
| Texture
| void
)
& IKernelRunShortcutBase {
  return gpu.createKernel(kernelFn, kernelSettings);
}

export function calcCP(
  pokeForms: PokeFormBaseStatsSet[],
  ivs: PokeIvSet[],
  cpms: number[]
) {
  // prettyier-ignore /* GPU.createKernel notes */
  {
    /**
     * dimensions in .setOutput() are in [x, y, z] order,
     * and correspond to the length of the arrays in the respective thread (this.thread._).
     * multidimensional output will be nested in reverse order:
     * if output is [x,y] -> result will be [y[x]] -> array of length y, with nested arrays of length x
     * if output is [x,y,z] -> result will be [z[y[x]]] -> array of length z, with nested arrays of length y, which also has nested arrays of length x
     **/
    // prettyier-ignore
    /**
     * I want output as [pokemonForms[ivs[cpms]]] so...
     * pokeForms  -> this.thread.z
     * ivs        -> this.thread.y
     * cpms       -> this.thread.x
     **/
    // prettyier-ignore
    /**
     * pokeForms[this.thread.z][2] -> atkBase
     * pokeForms[this.thread.z][3] -> defBase
     * pokeForms[this.thread.z][3] -> staBase
     * ivs[this.thread.y][1] -> atkIv
     * ivs[this.thread.y][2] -> defIv
     * ivs[this.thread.y][3] -> staIv
     * cpms[this.thread.x] -> cpm
     **/
    // prettyier-ignore
    // function calcCp (atk, def, sta, cpm) {
    //   // atk, def, sta are base+IV
    //   return Math.max(10,
    //   ((a * Math.sqrt(d) * Math.sqrt(s) * cpm*cpm )  / 10) >> 0
    // )}
  }
  const atkBaseIdx = 2;
  const defBaseIdx = 3;
  const staBaseIdx = 4;
  const atkIvIdx = 1;
  const defIvIdx = 2;
  const staIvIdx = 3;

  const { x, y, z } = this.thread;
  /* 
          x -> iterator for pokeform
          y -> iterator for IVs
          z -> iterator for CPMs
         */
  const a = pokeForms[z][atkBaseIdx] + ivs[y][atkIvIdx];
  const d = pokeForms[z][defBaseIdx] + ivs[y][defIvIdx];
  const s = pokeForms[z][staBaseIdx] + ivs[y][staIvIdx];
  const cpm = cpms[x];
  const cp = Math.max(
    10,
    ((a * Math.sqrt(d) * Math.sqrt(s) * cpm * cpm) / 10) >> 0
  );
  const sp = ((a * cpm * d * cpm * (s * cpm)) >> 0) / 1000;
  // return [a,Math.sqrt(d),Math.sqrt(s),cpm*cpm] //
  // return [pokeForms[this.thread.z][2], ivs[this.thread.y][1], cpms[this.thread.x]]
  return [pokeForms[z][0], cpm, cp, sp];
}

export function calcCpmsAtCpLimit(
  cpLimit: number,
  pokeForms: PokeFormBaseStatsSet[],
  ivs: PokeIvSet
) {
  const atkBaseIdx = 2,
    defBaseIdx = 3,
    staBaseIdx = 4;
  const atkIvIdx = 1,
    defIvIdx = 2,
    staIvIdx = 3;

  const { x, y } = this.thread;
  /* 
        x -> iterator for pokeform
        y -> iterator for IVs
       */
  const a = pokeForms[y][atkBaseIdx] + ivs[x][atkIvIdx];
  const d = pokeForms[y][defBaseIdx] + ivs[x][defIvIdx];
  const s = pokeForms[y][staBaseIdx] + ivs[x][staIvIdx];
  const calcCpm = Math.sqrt(
    ((cpLimit + 0.9999999) * 10) / (a * Math.sqrt(d) * Math.sqrt(s))
  );
  // debugger;
  return calcCpm;
}

/** Given calculated CPMs, get index of max valid CPMs/levels  */
export function getTrueCpmIdxsFromCalcCpms(calcCpms, cpms) {
  const startIdx = cpms.length - 1;
  for (let i = startIdx; i > -1; i--) {
    /* go through CPMs in reverse until valid CPM found */
    if (cpms[i] <= calcCpms[this.thread.y][this.thread.x]) return i;
  }
  return 0;
}

export function getTrueCpmsFromCpmIdxs(cpmIdxs, cpms) {
  return cpms[cpmIdxs[this.thread.y][this.thread.x]];
}

/**
 * @param {*} calcCpms
 * @param {[level: number, cpm: number][]} cpms 2D array, nested items must be [level, CPM]
 * @param {*} lastCpmIdx
 * @param {boolean} returnCPM If true, result includes CPMs. If returnLevel is also true, result is 2D array
 * @param {boolean} returnLevel If true, result includes level. If returnCPM is also true, result is 2D array
 * @returns
 */
export function getMaxValidCpms(
  calcCpms: number[][],
  cpms: PokeCpmSet[],
  returnCPM: boolean,
  returnLevel: boolean
) {
  // debugger;
  if (!returnCPM && !returnLevel) return 
  const { x, y } = this.thread;
  /*  x -> curent pokeform idx  |  y -> current IVs idx */
  let i = cpms.length - 1 /* idx of last CPM */;
  while (i > -1 && calcCpms[y][x] < cpms[i][1]) {
    i--;
  }
  if (returnCPM && returnLevel) return cpms[i]
  const resultIdx = returnLevel ? 0 : 1;
  return cpms[i][resultIdx]; // return level
  /* For Debugging: 
      [current calcCPM, i, first cpm < calcCPM, corresponding level] */
  // return [calcCpms[y][x], i, cpms[i][1], cpms[i][0]]
}