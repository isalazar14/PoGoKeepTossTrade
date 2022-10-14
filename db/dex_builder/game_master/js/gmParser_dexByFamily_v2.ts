import fs from 'fs';
import './dex';
const gm: {}[] = require("../gameMaster.json");


/** regex for families: 
  {START}V<famFirstMonId>_FAMILY_<famName>{END} */
const familyRE = /^V(?<dexNum>\d{4})_FAMILY_(?<famName>\w+)$/;

let namesWithSpace = ["MR_MIME", "HO_OH", "MIME_JR", "MR_RIME", "PORYGON_Z"];
let pokemonREstring =
  "^V(?<dexNum>\\d{4})_POKEMON_(?<monName>" /* need double backslash for compiled RE to have single slash */
  + namesWithSpace.join("|") /* explicitly stating names with spaces FIRST so that they match whole name instead of splitting on "_" */
  + "|[A-Z]+)(_(?<form>\\w+))?$"; /* in all other cases, "_" after name indicates form */
const pokemonRE = new RegExp(pokemonREstring);


const dex = { families: {} };
gm.reduce((dex: any, entry:any, i) => {
  let match: RegExpExecArray;
  /* Check for family entries */
  if ((match = familyRE.exec(entry.templateId)) !== null) {
    // const {dexNum, famName} = match.groups;
    const { dexNum } = match.groups;
    /* switched to getting famName from familyId 
       to account for Nidoran male/female having same templateId */
    const famName = entry.data.pokemonFamily.familyId.split("_FAMILY_")[1];

    if (!dex.families.hasOwnProperty(famName)) {
      // dex.families[famName] = new Family(+dexNum, asset.data.pokemonFamily);
      dex.families[famName] = new Family();
    }
    dex.families[famName].num = +dexNum; /* "+" converts num-string to int */
    dex.families[famName].summary = entry.data.pokemonFamily;

    // } else 
    // /* Check for form entries */
    //if ((val = formRE.exec(asset.templateId)) != null) { 
    //   dex.forms.push(asset);

  } else
    /* Check for mon entries, including mon_form */
    if ((match = pokemonRE.exec(entry.templateId)) !== null) {
      const { dexNum, monName } = match.groups;
      const form = match.groups.form || 'None';
      if (!/^HOME/.test(form)) { /* ignore HOME_FORM_REVERSION / HOME_REVERSION */
        const famName = entry.data.pokemonSettings.familyId.split("_FAMILY_")[1] /* get family name without "FAMILY_*/
        const monId = entry.data.pokemonSettings.pokemonId;

        /* TODO: add filters for exclusion
        1) _normal (except megas)
        2) trivial forms (forms all have same stats -> KEEP non-form version, e.g. blue vs red Basculin)
        3) non-trivial forms (forms have different stats -> TOSS non-form version, e.g. land vs sky shaymin) */
        if (!dex.families.hasOwnProperty(famName)) {
          dex.families[famName] = new Family();
        }
        if (!dex.families[famName].members[monId]) {
          const mon = new Pokemon();
          // mon.pokemonId = monId;
          mon.num = +dexNum;
          dex.families[famName].members[monId] = mon;
        }
        
        const pf = new PokeForm();
        // pf.form = form;
        pf.data = entry.data.pokemonSettings;
        dex.families[famName].members[monId].forms[form] = pf;
        /* TODO: extract DATA
        1) stats
        2) evolutions
        3) types
        4) candy / dust costs
          a) evolution (regular/shadow/purified)
          b) purfication
  
  
        /* TODO: determine / extract SPECIAL FEATURES
        1) isBaby
        2) isLegendary
        3) isMythical
        4) hasShadow
        5) isMega / hasMega
        6) hasTradeEvoDiscount */
      }
    }
  return dex;
}, dex);

/* TODO: determine evoStage / relStage within each family */

// console.log({
//   families: dex.families.length,
//   forms: dex.forms.length,
//   mons: dex.mons.length,
//   monForms: dex.monForms.length,
// });

try { /* write dex as json file */
  /* readable*/
  fs.writeFileSync('dex_v2.json', JSON.stringify(dex, null, 2));
  /* minified */
  // fs.writeFileSync('dex_v2.json', JSON.stringify(dex));
} catch (err) {
  console.error(err);
}