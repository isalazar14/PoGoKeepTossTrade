const multipliers = [
  0.094,0.1351374318,0.16639787,0.192650919,0.21573247,0.2365726613,0.25572005,0.2735303812,0.29024988,0.3060573775,0.3210876,0.3354450362,0.34921268,0.3624577511,0.3752356,0.387592416,0.39956728,0.4111935514,0.4225,0.4329264091,0.44310755,0.4530599591,0.4627984,0.472336093,0.48168495,0.4908558003,0.49985844,0.508701765,0.51739395,0.5259425113,0.5343543,0.5426357375,0.5507927,0.5588305862,0.5667545,0.5745691333,0.5822789,0.5898879072,0.5974,0.6048236651,0.6121573,0.6194041216,0.6265671,0.6336491432,0.64065295,0.6475809666,0.65443563,0.6612192524,0.667934,0.6745818959,0.6811649,0.6876849038,0.69414365,0.70054287,0.7068842,0.7131691091,0.7193991,0.7255756136,0.7317,0.7347410093,0.7377695,0.7407855938,0.74378943,0.7467812109,0.74976104,0.7527290867,0.7556855,0.7586303683,0.76156384,0.7644860647,0.76739717,0.7702972656,0.7731865,0.7760649616,0.77893275,0.7817900548,0.784637,0.7874736075,0.7903,0.792803968,0.79530001,0.797800015,0.8003,0.802799995,0.8053,0.8078,0.81029999,0.812799985,0.81529999,0.81779999,0.82029999,0.82279999,0.82529999,0.82779999,0.83029999,0.83279999,0.83529999,0.83779999,0.84029999
];
const pokeForms = [
  { pokemonId: 1, formId: 1, baseAtk: 118, baseDef: 111, baseSta: 128 },
  { pokemonId: 2, formId: 1, baseAtk: 151, baseDef: 143, baseSta: 155 },
  { pokemonId: 3, formId: 1, baseAtk: 198, baseDef: 189, baseSta: 190 },
];

/**
 * Creates IV combinations (atk, def, sta) as 2D array:
 * [ [0,0,0] ... [15,15,15] ] 
 * @returns {Array<Array<Number>>} IV combos
 */
export function createIvCombosArray () {
  const ivs = Array(4096);
  let i = 0;
  for (let aI = 0; aI < 16; aI++) {
    for (let dI = 0; dI < 16; dI++) {
      for (let sI = 0; sI < 16; sI++) {
        ivs[i] = [i+1, aI, dI, sI];
        i++;
      }
    }
  }
  return ivs
}

export function createIvCombosObj () {
  const ivs = {};
  let i = 1;
  for (let a = 0; a < 16; a++) {
    for (let d = 0; d < 16; d++) {
      for (let s = 0; s < 16; s++) {
        ivs[i] = {
          atk:a,
          def:d,
          sta:s
        };
        i++;
      }
    }
  }
  return ivs
}

export function getIvComboKey(atk, def, sta){
  return ((atk * Math.pow(16,2)) + (def * 16) + sta + 1)
}



/**
 * @typedef {Object} ADF_Stats {Attack Defense Stamina}
 * @property {Number} atk Attack
 * @property {Number} def Defense
 * @property {Number} sta Stamina / HP
 *
 * @param {ADF_Stats} baseStats Species base stats
 * @param {ADF_Stats} ivs Individual stats
 * @returns {ADF_Stats} Total stats (base + IVs)
 */
function calcTotalStats(baseStats, ivs) {
  return {
    atk: baseStats.atk + ivs.atk,
    def: baseStats.def + ivs.def,
    sta: baseStats.sta + ivs.sta,
  };
}
function calcCP(stats, multiplier) {
  let cp = (stats.atk * Math.sqrt(stats.def) * Math.sqrt(stats.sta) * Math.pow(multiplier,2)) / 10;
  return Math.max(10, cp >> 0);
}
function calcStatProduct(totalStats, multiplier) {
  return ((totalStats.atk * multiplier) * (totalStats.def * multiplier) * ((totalStats.sta * multiplier) >> 0)) / 1000;
}
function getMultiplierByLevel(level) {
  let cpm = multipliers[level * 2 - 2];
  console.log(`level ${level}, cpm ${cpm}`);
  return cpm;
}
function getPokeForm(pokemonId, formId = 1) {
  let pokemon = pokeForms.filter(
    (p) => p.pokemonId == selectedPokemonId && p.formId == formId
  )[0];
  console.log(`pokemonId ${pokemonId}:\n`, pokemon);
  return pokemon;
}


{// not needed because looking up by doing the math (getIvComboKey function) is way faster)
// export function createNestedIvsObj() {
//   const obj = {};
//   for (let a = 0; a < 16; a++) {
//     obj[a] = {};
//     for (let d = 0; d < 16; d++) {
//       obj[a][d] = {};
//       for (let s = 0; s < 16; s++) {
//         obj[a][d][s] = null;
//       }
//     }
//   }
//   return obj
// }
// export function assignNestedIvsObjValue (nestedIvsObj, callback) {
//   // let ivLookup = createNestedIvsObj();
//   let i = 0
//   for (let a = 0; a < 16; a++) {
//     for (let d = 0; d < 16; d++) {
//       for (let s = 0; s < 16; s++) {
//         nestedIvsObj[a][d][s] = callback({atk:a, def:d, sta:s}, i);
//       }
//     }
//   }
//   return nestedIvsObj
// }
// export function createIvCombosObjLookup () {
//   const ivLookup = createNestedIvsObj();
//   const counterInit = (start)=> ((()=>{
//     let i = start;
//     return ()=>i++;
//   })())
//   const counter = counterInit(1);

//   assignNestedIvsObjValue(ivLookup, counter)
//   return ivLookup
// }
}

function test() {
  const calcStart = console.time("allIvsCpSpCalc");
  const selectedPokemonId = 2;
  const selectedLevel = 6;
  const ivFloor = 5;
  const selectedPokemon = getPokeForm(selectedPokemonId);
  const tradeResults = [];
  const multiplier = getMultiplierByLevel(selectedLevel);
  const multipliersToCheck = multipliers.filter((cpm) => cpm >= multiplier);
  for (let aIV = 0; aIV <= 15; aIV++) {
    for (let dIV = 0; dIV <= 15; dIV++) {
      for (let sIV = 0; sIV <= 15; sIV++) {
        let stats = calcTotalStats(pokeForms[2], {
          atkIv: aIV,
          defIv: dIV,
          staIv: sIV,
        });
        tradeResults.push({
          aIV,
          dIV,
          sIV,
          cp: calcCP(stats, multiplier),
          statProd: calcStatProduct(stats, multiplier),
        });
      }
    }
  }

  // console.log(calcCP(stats, multiplier))
  const calcEnd = console.timeEnd("allIvsCpSpCalc");
  // console.log(tradeResults);
  // console.log("pogoCalcFull took", (calcEnd-calcStart))
}