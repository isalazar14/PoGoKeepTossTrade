import fs from "fs";
import path from "path";
import { Pokedex, Pokemon, PokeForm, Family, ElementType } from "./dex";
const gm: {}[] = require("../gameMaster.json");

const namesWithSpace: string[] = [
  "MR_MIME",
  "HO_OH",
  "MIME_JR",
  "MR_RIME",
  "PORYGON_Z",
];
const trivialFormMons: string[] = [
  "SHELLOS",
  "GASTRODON",
  "DEERLING",
  "SAWSBUCK",
  "BASCULIN",
  "ARCEUS",
  "BURMY",
  "CHERRIM" /*, CASTFORM, "GENESECT", KELDEO */,
];

const elementTypes = [
  "BUG",
  "DARK",
  "DRAGON",
  "ELECTRIC",
  "FAIRY",
  "FIGHTING",
  "FIRE",
  "FLYING",
  "GHOST",
  "GRASS",
  "GROUND",
  "ICE",
  "NORMAL",
  "POISON",
  "PSYCHIC",
  "ROCK",
  "STEEL",
  "WATER",
];
const typeNameNumMap: Map<string, number> = new Map(
  elementTypes.map((type, i) => [type, i + 1])
);
// const typeNumStringMap: Map<number, string> = new Map(
//   elementTypes.map((type, i) => [i + 1, type])
// );

const formNameNumMap: Map<string, number> = new Map([["", 1]]);
const formNumStringMap: Map<number, string> = new Map([[1, ""]]);

const famNameNumMap: Map<string, number> = new Map();
const famNumStringMap: Map<number, string> = new Map();

let pokemonREstring =
  "^V(?<dexNum>\\d{4})_POKEMON_(?<monFormName>" +
  /* need double backslash for compiled regex to have single slash */
  namesWithSpace.join("|") +
  /* explicitly stating names with spaces FIRST so that they match whole name instead of getting splitt on "_" */
  "|[A-Z]+)(_(?<form>\\w+))?$";
/* in all other cases, "_" after name indicates form */
const pokemonRE = new RegExp(pokemonREstring);
/* TODO: refactor dex to {pokemon, families?, meta, }
*/
const dex: Pokedex = new Map();
const dexMeta = {legendaries:[], mythicals:[],babies:[],shadows:[],megas:[], tradeEvos:[], unTradeables: []}
const dexErrors: {}[] = [];

/* TODO:
  refactor to use "pokemonId" and "form" properties instead of regex / namesWithSpaces
  - hasOwnProperty("pokemonId") to filter only pokemon
  - hasOwnProperty("form") -> form.split(pokemonId_) 
 */
console.time("gmParse");
gm.reduce((dex: Pokedex, entry: any) => {
  let match: RegExpExecArray | null;
  /* Check for mon entries, including mon_form */
  if ((match = pokemonRE.exec(entry.templateId)) !== null) {
    // console.log(`processing ${entry.templateId}`)
    const dexNum: number | undefined = parseInt(match.groups?.dexNum || "");
    // const monName: string|undefined  = match.groups?.monFormName;
    let form: string = match.groups?.form || "";
    let monNameId: string;
    try {
      
      let isHomeForm = /HOME/.test(form);
      let isNormal = form === "NORMAL";
      monNameId = entry.data.pokemonSettings?.pokemonId;
      let isTrivialFormMonEntry = trivialFormMons.find(
        (mon: string) => mon === monNameId
        );
      
      /* skip "HOME", "NORMAL", and trivial forms */
      if (form && (
        isHomeForm 
        || isNormal
        || isTrivialFormMonEntry 
        )) {
        return dex;
      }
      
      // /* skip trivial form entries (must be after filtering HOME forms bc they don't have pokemonId */
      // if (isTrivialFormMonEntry) return dex;
        
      /* TODO: add filters for exclusion
      3) non-trivial forms (forms have different stats -> TOSS non-form version, e.g. land vs sky shaymin) */
      /* check if pokemon exists in dex, add if new */
      if (!dex.has(dexNum)) {
        const famName =
          entry.data.pokemonSettings.familyId.split(
            "_FAMILY_"
          )[1]; /* get family name without "FAMILY_*/
        /* 3) non-trivial forms (forms have different stats -> TOSS non-form version, e.g. land vs sky shaymin) */
        let famNum: number | undefined = famNameNumMap.get(famName);
        if (famNum === undefined) {
          famNum = famNameNumMap.size + 1;
          famNameNumMap.set(famName, famNum);
          famNumStringMap.set(famNum, famName);
        }
        dex.set(dexNum, {
          name: monNameId,
          famId: famNum,
          fam: famName /* don't need to handle nidoran male/female */,
          forms: new Map<number, PokeForm>(),
        });
      }

      /* handle form string/num mapping */
      let formNum: number | undefined;
      if ((formNum = formNameNumMap.get(form)) === undefined) {
        formNum = formNameNumMap.size + 1;
        formNameNumMap.set(form, formNum);
        formNumStringMap.set(formNum, form);
      }

      let type1Str: ElementType =
        entry.data.pokemonSettings.type.split("POKEMON_TYPE_")[1];
      let type1Num = typeNameNumMap.get(type1Str) as number;

      /* add pokeform to dex */
      let pf: PokeForm = {
        atk: entry.data.pokemonSettings.stats.baseAttack,
        def: entry.data.pokemonSettings.stats.baseDefense,
        sta: entry.data.pokemonSettings.stats.baseStamina,
        types: [type1Num],
        // typeNames: [type1Str]
      };

      if (form !== "") pf.form = form;

      let type2Str: ElementType | undefined =
        entry.data.pokemonSettings.type2?.split("POKEMON_TYPE_")[1] ||
        undefined;
      if (type2Str !== undefined) {
        let type2Num: number = typeNameNumMap.get(type2Str) as number;
        pf.types?.push(type2Num);
        // pf.typeNames?.push(type2Str);
      }

      /* TODO: determine / extract SPECIAL FEATURES
      1) evoChain
        - parent 
          - entry.data.pokemonSettings.parentPokemonId
        - evolutions 
        - entry.data.pokemonSettings.evolutionIds[string]
        - entry.data.pokemonSettings.evolutionBranch[{
            evolution,
            form,
            candyCost,
            obPurificationEvolutionCandyCost
            noCandyCostViaTrade: true
          }]
          requirements*:
          - evolutionBranch [{
            ...
            genderRequirement: MALE/FEMALE
          }]
          *tyrogue family evo requirements not in GM, put in app code
          2) candy / dust costs
          a) evolution (regular/shadow/purified)
            - entry.data.pokemonSettings.candyToEvolve
          b) purfication
          - entry.data.pokemonSettings.thirdMove: {
            stardustToUnlock,
          candyToUnlock
        },
        8) hasTradeEvoDiscount 
          - entry.data.pokemonSettings.evolutionBranch[].noCandyCostViaTrade: true
      3) isBaby
        - no parentId (first in evo chain) && family != monName (family named )
        - BABIES/FAMILIES with family name == baby name
          tyrogue
          togepi
      4) isLegendary
        - entry.data.pokemonSettings.rarity": "POKEMON_RARITY_LEGENDARY"
      5) isMythical
        - entry.data.pokemonSettings.rarity": "POKEMON_RARITY_MYTHIC"
      6) hasShadow
          - entry.data.pokemonSettings.shadow: {
            purificationStardustNeeded,
            purificationCandyNeeded
          }
      7) isMega / hasMega
      9) buddy distance
        - entry.data.pokemonSettings.kmBuddyDistance
      10) noTrade:
        - entry.data.pokemonSettings.isTradable
      11) canFormChange
        - entry.data.pokemonSettings.formChange[{
							"availableForm": [
								"FURFROU_DEBUTANTE",
								"FURFROU_MATRON",
								"FURFROU_DANDY"
							],
							"candyCost": 25,
							"stardustCost": 10000
						}]
      */

      // if (entry.data.pokemonSettings.hasOwnProperty("")) {
      // }

      dex.get(dexNum)?.forms.set(formNum, pf);

      /* check/add mega evo */
      const megaEvos: any[] = entry.data.pokemonSettings.tempEvoOverrides;
      if (megaEvos) {
        for (let evo of megaEvos) {
          form = evo.tempEvoId.split("TEMP_EVOLUTION_")[1];
          let formNum: number | undefined = formNameNumMap.get(form);
          if (formNum === undefined) {
            formNum = formNameNumMap.size + 1;
            formNameNumMap.set(form, formNum);
            formNumStringMap.set(formNum, form);
          }

          let type1Str: ElementType =
            evo.typeOverride1.split("POKEMON_TYPE_")[1];
          let type1Num = typeNameNumMap.get(type1Str) as number;

          const pf: PokeForm = {
            atk: evo.stats.baseAttack,
            def: evo.stats.baseDefense,
            sta: evo.stats.baseStamina,
            types: [type1Num],
            // typeNames: [type1Str]
          };

          pf.form = form;

          let type2Str: ElementType | undefined =
            evo.typeOverride2?.split("POKEMON_TYPE_")[1] || undefined;
          if (type2Str !== undefined) {
            let type2Num: number = typeNameNumMap.get(type2Str) as number;
            pf.types?.push(type2Num);
            // pf.typeNames?.push(type2Str);
          }

          dex.get(dexNum)?.forms.set(formNum, pf);
        }
      }
      // console.log('-------------------')
    } catch (error) {
      if (dexErrors.length == 0) {
        console.error(entry.templateId);
        console.error("form", form);
        console.error("isHomeForm:", /HOME/.test(form));
        console.error(error);
      }
      dexErrors.push({
        entry: entry.templateId,
        error,
      });
    }
  }
  return dex;
}, dex);
console.log("finished processing game master");
console.timeEnd("gmParse");
// console.error("errors...", dexErrors);

/* TODO: determine evoStage / relStage within each family */

// console.log({
//   families: dex.families.length,
//   forms: dex.forms.length,
//   mons: dex.mons.length,
//   monForms: dex.monForms.length,
// });

function replacer(key: any, value: any) {
  if (value instanceof Map) {
    return {
      dataType: "Map",
      value: Array.from(value.entries()), // or with spread: value: [...value]
    };
  } else {
    return value;
  }
}

try {
  /* write errors as json file */
  console.time("writeErrors");
  fs.writeFileSync(
    path.join(__dirname, "/dexByPokemon.errors.json"),
    JSON.stringify(dexErrors, null, 2) /* readable*/
    // JSON.stringify(dex)) /* minified */
  );
  console.timeEnd("writeErrors");
} catch (err: any) {
  console.error(err);
}

try {
  /* write dex as json file */
  console.time("writeDex");
  fs.writeFileSync(
    path.join(__dirname, "/dexByPokemon.json"),
    JSON.stringify(dex, replacer, 2) /* readable*/
    // JSON.stringify(dex)) /* minified */
  );
  console.timeEnd("writeDex");
} catch (err: any) {
  console.error(err);
}

try {
  /* write forms as json file */
  console.time("writeForms");
  fs.writeFileSync(
    path.join(__dirname, "/dexByPokemon.forms.json"),
    JSON.stringify(formNameNumMap, replacer, 2) /* readable*/
    // JSON.stringify(dex)) /* minified */
  );
  console.timeEnd("writeForms");
} catch (err: any) {
  console.error(err);
}
