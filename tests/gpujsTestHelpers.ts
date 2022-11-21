/* for back end stuff */
// import { GPU } from "gpu.js";
/* for browser */
import { GPU } from "../node_modules/gpu.js/dist/gpu-browser"; 
import { parse } from "papaparse";

export function getPokeForms(
  filePath: string,
  options?: {
    preview?: number;
    pIdRange?: [start: number, end: number];
    pfSelection?: string[] /* "{pId},{fId}" */;
  }
) {
  /* CANNOT USE ASYNC/AWAIT BECAUSE 'parse' FUNCTION RETURNS 'void'. 
  MUST USE 'complete' CALLBACK */
  if (
    (options?.pIdRange && options?.pfSelection) ||
    (options?.pIdRange && options?.preview) ||
    (options?.preview && options?.pfSelection)
  )
    throw new Error("Cannot use more than one option at a time");

  return new Promise<{ headers: string[]; data: PokeFormBaseStatsSet[] }>(
    (resolve, reject) => {
      parse(filePath, {
        download: true,
        // header: true, // will turn results into objects with headers (from results 1st row) as properties
        dynamicTyping: true,
        skipEmptyLines: true,
        preview: options?.preview ? options.preview + 1 : 0,
        complete: (parseResults) => {
					/* First row is headers */
          let [headers] = parseResults.data as unknown as string[][];
					/* Remaining rows are pokeforms */
          let [, ...data] = parseResults.data as unknown as PokeFormBaseStatsSet[];
          let result = { headers, data };
          // if (options?.preview) {
          //   /* no options OR preview option set -> pass through results */
          //   result.data = parseResults.data as PokeFormBaseStatsSet[];
          // } else 
          if (options?.pIdRange) {
            /* range option set -> get all rows with matching pId, including multiple forms */
            result.data = data.filter(
              (pf) =>
                pf[0] >= options.pIdRange![0] && pf[0] <= options.pIdRange![1]
            );
          } else if (options?.pfSelection) {
            /* selection option set -> get all rows with matching [pId, fId] */
            let selection = options.pfSelection.reduce(
              (map, pf, i) => map.set(pf, true),
              new Map<string, any>()
            );
            let rowCount = parseResults.data.length;
            let remaining = options.pfSelection.length;
            let i = 0;
            let filteredPFs: PokeFormBaseStatsSet[] = [];
            while (remaining > 0 && i < rowCount) {
              if (
                selection.has(
                  `${data[i][0]},${data[i][1]}`
                )
              ) {
                filteredPFs.push(data[i]);
                remaining--;
              }
              i++;
            }
            result.data = filteredPFs;
          }
          resolve(result);
          return;
        },
        error: (error) => reject(error),
      });
    }
  );
}

export function displayHardwareSupport() {
  /* adding gpu features table to DOM */
  let timeEl = document.querySelector("#timeNow");
  if (timeEl != undefined) {
    timeEl.innerHTML = new Date().toLocaleTimeString();
    setInterval(() => {
      timeEl!.innerHTML = new Date().toLocaleTimeString();
    }, 1000);
  }
  let cpuEl = document.querySelector("#cpuCores");
  if (cpuEl != undefined) {
    cpuEl.innerHTML = `CPU, total threads: ${navigator.hardwareConcurrency}`;
  }

  const gpuFeatures = [
    "GPU",
    "Kernel Map",
    "Offscreen Canvas",
    "WebGL",
    "WebGL 2",
    "Headless GL",
    "Canvas",
    "GPU HTML Image Array",
    "Single Precision",
  ];

  const gpuSupportTable = document.querySelector("table#gpuSupport");
  // gpuFeatures.forEach(f=>console.log(f, GPU[f]));
  gpuFeatures.forEach((f) => {
    let row = document.createElement("tr");
    let featureGetter = `is${f.split(" ").join("")}Supported`;
    let isSupported = GPU[featureGetter];
    if (!isSupported) row.classList.add("notSupported");
    row.innerHTML = `<td>${f}</td><td>${isSupported}</td>`;
    document.querySelector("table#gpuSupport > tbody")?.appendChild(row);
    gpuSupportTable?.querySelector("tbody")?.appendChild(row);
    gpuSupportTable?.removeAttribute("hidden");
  });
}

export function addCalcTimeRow(operation) {
  const calcTimeRow = document.createElement("tr");
  calcTimeRow.innerHTML = `<td>${operation}</td>  <td></td> <td></td> <td></td>`;
  calcTimeRow.id = operation.toLowerCase().split(" ").join("-");
  const calcTimeTableBody = document.querySelector("table#performance > tbody");
  return calcTimeTableBody!.appendChild(calcTimeRow);
}
export function getCalcTimeRowCell(
  rowEl: HTMLTableRowElement,
  colName: "operation" | "cpu" | "gpu" | "gpuC"
) {
  let idx = { cpu: 1, gpu: 2, gpuCpu: 3 };
  // return document.querySelector(`table#performance tr#${rowId} > td:nth-child(${idx[col]})`)
  return rowEl.children[idx[colName]] as HTMLElement;
}

export function runCalcPerfTest(
  calcName: string,
  calc: {
    fn: Function;
    fnArgs: any[];
    fnOptions?: { [key: string]: any };
  },
  options?: {
    useWorker?: true;
    silentRun?: true;
    logPerformance?: false | "full";
    logResult?: boolean;
    renderPerformance?: {
      targetEL: HTMLElement;
      appendToEl?: HTMLElement;
      appendChildToEl?: HTMLElement;
    };
    renderResult?: {
      targetEL: HTMLElement;
      appendToEl?: HTMLElement;
      appendChildToEl?: HTMLElement;
    };
  }
) {
  // let { useWorker, silentRun, logPerformance, logResult } = options
  // {targetEl, appendToEl, appendChildToEl}
  if (!options?.silentRun)
    console.log(
      `%c~ ~ ~ Running ${calcName} ~ ~ ~`,
      "background-color:cornflowerblue;"
    );

  if (options != undefined) {
    if (options.renderPerformance) {
      options.renderPerformance.targetEL.classList.toggle("running-calc");
      // prettire-ignore
      options.renderPerformance.targetEL.innerHTML = `<div class="d-flex justify-content-center">
                                                          <div class="spinner-border spinner-border-sm" role="status"></div>
                                                        </div>`;
      if (options.renderPerformance.appendToEl)
        options.renderPerformance.appendToEl.append(
          options.renderPerformance.targetEL
        );
      else if (options.renderPerformance.appendChildToEl)
        options.renderPerformance.appendChildToEl.appendChild(
          options.renderPerformance.targetEL
        );
    }
  }
  if (options?.useWorker) {
  }

  performance.mark(calcName);
  let calcResult = calc.fn.apply(null, calc.fnArgs);
  let perfMeasure = performance.measure(calcName);
  performance.clearMarks(calcName);

  if (options != undefined) {
    if (!options.logPerformance == false) {
      /* Log performance duration by default. Explicitly disable or switch to 'full' */
      if (options.logPerformance == "full")
        console.log(`${calcName} performance:\n`, perfMeasure);
      else
        console.log(
          `${calcName} duration: ${Math.round(
            perfMeasure.duration
          ).toLocaleString()} ms`
        );
    }
    if (!options.logResult == false)
    /* Log calc result by default. Explicitly disable */
      console.log(`${calcName} result:\n`, calcResult);
    if (options.renderPerformance) {
      /* Do not render performance by default */
      options.renderPerformance.targetEL.innerHTML = Math.round(
        perfMeasure.duration
      ).toLocaleString();
      options.renderPerformance.targetEL.classList.toggle("running-calc");
    }
  }
  if (!options?.silentRun) console.info(`%c* * * Finished ${calcName} * * *`, "background-color:orange; color:black");
  return { calcResult, perfMeasure };
}
