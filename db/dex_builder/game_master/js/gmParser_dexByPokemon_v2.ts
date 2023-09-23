import fs from "fs";
import path from "path";
import axios from "axios";
import { Pokedex, Pokemon, PokeForm, Family, ElementType } from "./types/dex";

//#region CONSTS
// const regionForms: string[] = ["ALOLA", "GALARIAN", "HISUIAN"]
const trivialFormMons: string[] = [
  "PIKACHU",
  "UNOWN",
  "SPINDA",
  "BURMY",
  "CHERRIM",
  "SHELLOS",
  "GASTRODON",
  "ARCEUS",
  "BASCULIN",
  "DEERLING",
  "SAWSBUCK",
  "PYROAR" /* FEMALE */,
  "FURFROU",
  "MEOWSTIC" /* FEMALE */,
  "FRILLISH" /* FEMALE */,
  "JELLICENT" /* FEMALE */,
  // ,"CASTFORM",
  // "KELDEO"
];

const nonTrivialFormMons: string[] = [
  "ROTOM",
  "GIRATINA",
  "SHAYMIN",
  "DARMANITAN",
  "TORNADUS",
  "THUNDERUS",
  "LANDORUS",
  "MELOETTA",
  "GENESECT",
  "PUMPKABOO",
  "GOURGEIST",
  "HOOPA",
  "TOXTRICITY",
  "ZACIAN",
  "ZAMAZENTA",
  "KYUREM",
  "INDEEDEE",
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
const typeNameIdMap: Map<ElementType, number> = new Map(
  elementTypes.map((type, i) => [type as ElementType, i + 1])
);
const typeNumStringMap: Map<number, string> = new Map(
  elementTypes.map((type, i) => [i + 1, type])
);

const pokemonNameIdMap: Map<string, number> = new Map();

const formNameIdMap: Map<string | null, number> = new Map([[null, 1]]);
const formIdNamegMap: Map<number, string | null> = new Map([[1, null]]);

const famNameIdMap: Map<string, number> = new Map();
const famIdNameMap: Map<number, string> = new Map();

/* TODO: refactor dex to {pokemon, families?, meta, } */
const dexMeta = {
  legendaries: new Map(),
  mythicals: new Map(),
  babies: new Map(),
  shadows: new Map(),
  megas: new Map(),
  tradeEvos: new Map(),
  unTradeables: new Map(),
};
const dexErrors: { [key: string]: string }[] = [];
//#endregion

//#region FUNCTIONS / HELPERS
function createStringNumMapPairEntries(
  strKeyMap: Map<string | null, number>,
  numKeyMap: Map<number, string | null>,
  strKey: string | null
): number {
  let numKey = strKeyMap.size + 1;
  strKeyMap.set(strKey, numKey);
  numKeyMap.set(numKey, strKey);
  return numKey;
}

function createStringNumMapPairEntriesSafe(
  strKeyMap: Map<string | null, number>,
  numKeyMap: Map<number, string | null>,
  key: string | null
): { val: number | null; isNew?: boolean } {
  let val,
    isNew = false;
  // { val: undefined, isNew: false };
  if (strKeyMap.has(key)) {
    val = strKeyMap.get(key) as number;
  } else {
    val = createStringNumMapPairEntries(strKeyMap, numKeyMap, key);
    isNew = true;
  }
  return { val, isNew };
}

function stringifyMap(key: any, value: any) {
  if (value instanceof Map) {
    return {
      dataType: "Map",
      value: Array.from(value.entries()), // or with spread: value: [...value]
    };
  } else {
    return value;
  }
}

function parseMapString(key: any, value: any) {
  if (typeof value === "object" && value !== null) {
    if (value.dataType === "Map") {
      return new Map(value.value);
    }
  }
  return value;
}

async function getGameMaster(
  gmSourceType: "url" | "path",
  path?: string,
  url?: string
): Promise<Array<{ [key: string]: any }>> {
  let gm: any[];
  return new Promise(async (resolve, reject) => {
    if (gmSourceType === "path") {
      if (path === undefined) {
        throw new Error("No file path provided");
      }
      try {
        gm = require(path);
        resolve(gm)
      } catch (error) {
        console.error(error);
        Error("Could not access file at path provided");
        reject("Could not access file at path provided")
      }
    } else if (gmSourceType === "url") {
      if (url === undefined) {
        reject("No url provided")
        throw new Error("No url provided");
      }
      try {
        let res: any = await axios.get(url).then((res) => res.data);
        gm = res.data;
        resolve(gm)
      } catch (error) {
        Error("Could not get GameMaster from provided");
        console.error(error);
        reject("Could not get GameMaster from provided")
      }
    }
  });
}

/**
 * Looks
 */
function processFamilyEntry(entry: any): void {
  let famName: string = entry.data.pokemonFamily.familyId.split(
    "_FAMILY_"
  )[1] as string;
  createStringNumMapPairEntries(famNameIdMap, famIdNameMap, famName);
  let megaMon: string | undefined =
    entry.data.pokemonFamily.megaEvolvablePokemonId;
  if (megaMon !== undefined) {
    dexMeta.megas.set(megaMon, null);
  }
}

function processFormEntry(entry: any, dex: Pokedex): void {
  let monName = entry.data.formSettings.pokemon as string;
  let dexNum = +entry.templateId.slice(7, 11);
  let mon = new Pokemon();
  mon.name = monName;
  let hasSingleForm =
    !entry.data.formSettings.hasOwnProperty("forms") ||
    entry.data.formSettings.forms.length === 1;
  let isTrivialFormMonEntry =
    trivialFormMons.findIndex((mon: string) => mon === monName) >= 0;
  if (hasSingleForm || isTrivialFormMonEntry) {
    mon.forms.set(1, new PokeForm());
  } else {
    let forms = entry.data.formSettings.forms as { form: string }[];
    let filteredForms: string[] = [];
    forms.reduce((forms: string[], formEntry) => {
      let isYearForm = /\d{4}/.test(formEntry.form);
      if (isYearForm) {
        return forms;
      } else {
        forms.push(formEntry.form.split(monName + "_")[1]);
        return forms;
      }
    }, filteredForms);
    if (filteredForms.length === 1) {
      mon.forms.set(1, new PokeForm());
    } else {
      filteredForms.forEach((form) => {
        let { val: formId } = createStringNumMapPairEntriesSafe(
          formNameIdMap,
          formIdNamegMap,
          form
        );
        let pf = new PokeForm();
        pf.form = form;
        mon.forms.set(formId as number, pf);
      });
    }
  }
  pokemonNameIdMap.set(monName, dexNum);
  dex.set(dexNum, mon);
}

function addPokeFormToDex(
  dexMon: Pokemon,
  formName: string | null,
  gmStats: { baseAttack: number; baseDefense: number; baseStamina: number },
  // gmTypes: { type1: string; type2?: string }
  [gmType1, gmType2]: [string, (string | undefined)?]
): // gmType1: string,
  // gmType2?: string
  void {
  let type1Str = gmType1.split("POKEMON_TYPE_")[1] as ElementType;
  let type1Id = typeNameIdMap.get(type1Str) as number;
  let types: [number, number?] = [type1Id];

  if (gmType2 !== undefined) {
    let type2Str = gmType2.split("POKEMON_TYPE_")[1] as ElementType;
    let type2Num: number = typeNameIdMap.get(type2Str) as number;
    types.push(type2Num);
  }

  /* handle form string/num mapping */
  // let { val: formId } = getIdFromStringNumMapPair(
  //   formNameIdMap,
  //   formIdNamegMap,
  //   formName
  // );

  let formId = formNameIdMap.get(formName) as number;

  /* build pokeform */
  let pf: PokeForm = {
    form: formName,
    atk: gmStats.baseAttack,
    def: gmStats.baseDefense,
    sta: gmStats.baseStamina,
    types,
  };
  dexMon.forms.set(formId as number, pf);
}

function processPokeFormEntry(entry: any, dex: Pokedex): void {
  //#region SKIP NON POKEFORMS / UNRELEASED POKEFORMS
  /* "camera" prop missing for non-pokeforms, empty for unreleased pokeforms */
  let isNotPokeForm: boolean =
    Object.keys(entry.data.pokemonSettings?.camera || {}).length === 0;
  if (isNotPokeForm) {
    return;
  }
  //#endregion

  //#region GET NAME, DEXNUM, FORM
  let monName: string = entry.data.pokemonSettings.pokemonId as string;
  const dexNum = +entry.templateId.slice(1, 5);
  let form: string | null =
    entry.data.pokemonSettings.form?.split(monName + "_")[1] || null;
  let formId = formNameIdMap.get(form);
  //#endregion

  //#region SKIP UNWANTED FORMS /* Now being hanled by processFormEntry() */
  let dexMon = dex.get(dexNum) as Pokemon;
  if (form !== null) {
    if (dexMon.forms.has(formId as number) === false) {
      return;
    }
    //#region OLD WAY OF SKIPPING UNWANTED FORMS
    //   /* check if normal form */
    //   let isNormal = form === "NORMAL";
    //   let isTrivialFormMonEntry =
    //     trivialFormMons.findIndex((mon: string) => mon === monName) > 0;
    //   let isYearForm = /\d{4}/.test(form);
    //   if (
    //     isNormal ||
    //     isTrivialFormMonEntry ||
    //     // || (isFemale && monName !== "INDEEDEE")
    //     isYearForm
    //   ) {
    //     return;
    //   }
    // } else {
    //   /* filter out non-form version of non-trivial form mons
    //         (forms have different stats
    //           -> TOSS non-form version, e.g. land vs sky shaymin)
    //         TODO: refactor???
    //           A)  ditch nonTrivalFormMons array,
    //               compare form stats / types
    //           B)  keep nonTrivialFormMons array,
    //               prune dex after finished parsing
    //               (nonTrivialFormMons.forEach())
    //               -> could do this for trivialFormMons too
    //         */
    //   let isNonTrivialFormMonEntry =
    //     nonTrivialFormMons.findIndex((mon: string) => mon === monName) >= 0;
    //   if (isNonTrivialFormMonEntry === false) {
    //     return;
    //   }
    //#endregion
  }
  //#endregion

  //#region PROCESS POKEFORM ENTRY

  //#region HANDLE NEW POKEMON (add family info)
  if (dexMon.famId === undefined) {
    const [, famName] =
      entry.data.pokemonSettings.familyId.split(
        "_FAMILY_"
      ); /* get family name without "FAMILY_* (using deconstruction to get index 1)/
    /* 3) non-trivial forms (forms have different stats -> TOSS non-form version, e.g. land vs sky shaymin) */
    // let famNum: number | undefined = famNameNumMap.get(famName);
    const famId = famNameIdMap.get(famName);
    // if (famId.isNew) {
    (dexMon.famId = famId as number),
      (dexMon.fam = famName); /* don't need to handle nidoran male/female */
    // }
  }
  //#endregion

  let {
    stats,
    type: type1,
    type2,
    tempEvoOverrides: megaEvos,
  } = entry.data.pokemonSettings;
  addPokeFormToDex(dexMon as Pokemon, form, stats, [type1, type2]);

  //#region EXTRACT META DATA / SPECIAL FEATURES
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
  //#endregion

  //#region CHECK/ADD MEGA EVO */
  if (megaEvos !== undefined) {
    for (let evo of megaEvos) {
      let {
        tempEvoId,
        stats,
        typeOverride1: type1,
        typeOverride1: type2,
      } = evo;
      let form = tempEvoId.split("TEMP_EVOLUTION_")[1] as string;
      createStringNumMapPairEntriesSafe(formNameIdMap, formIdNamegMap, form);
      addPokeFormToDex(dexMon as Pokemon, form, stats, [type1, type2]);
    }
  }
  //#endregion

  // console.log('-------------------')
  // } catch (error) {
  //   if (dexErrors.length == 0) {
  //     console.error(entry.templateId);
  //     console.error("form", form);
  //     console.error("isHomeForm:", /HOME/.test(form));
  //     console.error(error);
  //   }
  //   dexErrors.push({
  //     entry: entry.templateId,
  //     error,
  //   });
  // }
  //#endregion
}

function parseGM_buildDex(gameMaster: any[]) {
  let dex: Pokedex = new Map();
  for (let entry of gameMaster) {
    //#region PROCESS FAMILIES
    if (entry.data.hasOwnProperty("pokemonFamily")) {
      processFamilyEntry(entry);
    }
    //#endregion
    //#region PROCESS FORMS: ADD MONS AND FORMS TO DEX, REMOVE TRIVIAL FORMS
    else if (entry.data.hasOwnProperty("formSettings")) {
      processFormEntry(entry, dex);
    }
    //#endregion
    //#region PROCESS POKEFORMS: POPULATE DEX DATA
    else {
      processPokeFormEntry(entry, dex);
    }
    //#endregion
  }
  return dex;
}

//#region MAIN (PARSE, BUILD DEX)
(async () => {
  const gameMasterPath = path.join(__dirname, "../gameMaster_2023_09_19.json");
  console.time("gmLoad");
  let gm = await getGameMaster('path', gameMasterPath)
  console.timeEnd("gmLoad");
  console.time("gmParse");
  let dex = parseGM_buildDex(gm);
  // console.log("finished processing game master");
  console.timeEnd("gmParse");

  // console.error("errors...", dexErrors);

  /* TODO: 
    fix forms
      - mons with megas should have "NORMAL" form
      - MEWTWO_A -> MEWTWO_ARMORED
    
    determine evoStage / relStage within each family
  
    Verify dex data
      - all mons have a family
  */

  // console.log({
  //   families: dex.families.length,
  //   forms: dex.forms.length,
  //   mons: dex.mons.length,
  //   monForms: dex.monForms.length,
  // });
  //#endregion

  //#region WRITE TO FILE/S
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
      JSON.stringify(dex, stringifyMap, 2) /* readable*/
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
      JSON.stringify(formNameIdMap, stringifyMap, 2) /* readable*/
      // JSON.stringify(dex)) /* minified */
    );
    console.timeEnd("writeForms");
  } catch (err: any) {
    console.error(err);
  }
  //#endregion
})()