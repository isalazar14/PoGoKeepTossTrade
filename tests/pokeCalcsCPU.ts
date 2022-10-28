export function getCalcCPMsAtCpLimit_CPU(
  cpLimit: number,
  pokeForms: PokeFormBaseStatsSet[],
  ivs: PokeIvSet[],
) {
  const atkIdx = 2,
    defIdx = 3,
    staIdx = 4;
  const atkIvIdx = 1,
    defIvIdx = 2,
    staIvIdx = 3;

  const calcCpms = Array(pokeForms.length);
  for (let pfIdx in pokeForms) {
    calcCpms[pfIdx] = Array(ivs.length);
    for (let ivIdx in ivs) {
      let a = pokeForms[pfIdx][atkIdx] + ivs[ivIdx][atkIvIdx];
      let d = pokeForms[pfIdx][defIdx] + ivs[ivIdx][defIvIdx];
      let s = pokeForms[pfIdx][staIdx] + ivs[ivIdx][staIvIdx];
      calcCpms[pfIdx][ivIdx] = Math.sqrt(
        ((cpLimit + 0.9999999) * 10) / (a * Math.sqrt(d) * Math.sqrt(s))
      );
    }
  }
  return calcCpms as number[][];
}

export function getTrueCpmsFromCalcCpms_CPU(calcCpms: number[][], cpms: PokeCpmSet[]) {
  const yLength = calcCpms.length; /* number of pokeforms (1 calcCPM set per pokemform) */
  const xLength = calcCpms[0].length; /* number of IV combos per pokeform */
  const lastCpmIdx = cpms.length - 1; /* starting point for reverse scan of CPMs (CPMs length depends on IV_BATCH size) */

  /* create array to hold results, length = # of pokeforms */
  const trueCpms = Array(yLength) as any;
  /* loop through pokeforms */
  for (let y = 0; y < yLength; y++) {
    /* for each pokeform, create nested array for trueCPM results */
    trueCpms[y] = Array(xLength) as PokeCpmSet[];
    /* loop through calcCPMs of current pokeform */
    for (let x = 0; x < xLength; x++) {
      // trueCpms[y][x] = cpms[0];
      /* for each calcCPM reverse scan CPMs to find max valid CPM (first CPM <= calcCPM) */
      for (let i = lastCpmIdx; i > -1; i--) {
        if (cpms[i][1] <= calcCpms[y][x]) {
          trueCpms[y][x] = cpms[i];
          break;
        }
      }
    }
  }
  return trueCpms;
}

/* looking for max cp / sp entries for given pokeform (via CPU) */
// prettier-ignore
  // console.log(cpmsFloatArray);
  // /* creating iv combos in CPU */
  // console.time("singleMonCpAtAllCpmIvCombos");
  // const aB = 198,
  //   dB = 189,
  //   sB = 190;
  // const cpmCount = calcParams.IV_BATCH_SIZE
  // const calcs = [];
  // let maxCp = 0;
  // let maxSp = 0;
  // let maxCpEntries = {};
  // let maxSpEntries = {};
  // for (let i = 0; i < cpmCount; i++) {
  //   for (let aI = 0; aI < 16; aI++) {
  //     for (let dI = 0; dI < 16; dI++) {
  //       for (let sI = 0; sI < 16; sI++) {
  //         // get CP
  //         const a = aB + aI,
  //           d = dB + dI,
  //           s = sB + sI;
  //         const cpmi = cpmsFloatArray[i];
  //         const cp0 = ((a * Math.sqrt(d) * Math.sqrt(s) * cpmi) ^ 2) / 10;
  //         const cp = Math.max(10, cp0 >> 0);
  //         // get SP
  //         const sp = (a * cpmi * d * cpmi * ((s * cpmi) >> 0)) / 1000;
  //         // const entry = {
  //         //   level: i / 2 + 1,
  //         //   a,
  //         //   d,
  //         //   s,
  //         //   cp,
  //         //   sp,
  //         // };
  //         const entry = [
  //           (i / 2 + 1),
  //           a,
  //           d,
  //           s,
  //           cp,
  //           sp,
  //         ];
  //         calcs.push(entry);
  //         // if (cp >= maxCp) {
  //         //   if (cp > maxCp) maxCpEntries = [entry];
  //         //   else maxCpEntries.push(entry);
  //         //   maxCp = cp;
  //         // }
  //         // if (cp >= maxCp) {
  //         //   if (cp > maxCp) maxCpEntries = [entry];
  //         //   else maxCpEntries.push(entry);
  //         //   maxCp = cp;
  //         // }
  //       }
  //     }
  //   }
  // }
  // console.timeEnd("singleMonCpAtAllCpmIvCombos"); // ~1s / 1000 reps of creating iv combos
  // console.log(calcs)
