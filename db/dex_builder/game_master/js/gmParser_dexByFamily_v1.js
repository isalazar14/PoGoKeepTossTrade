// import * as gm from "../gameMaster.json"
/** @type Array */
const gm = require("../gameMaster.json");
const fs = require('fs');

/** regex for families: 
  (START)V\<famFirstMonId\>_FAMILY\_\<famName\>(END) */
const familyRE = /^V(?<dexNum>\d{1,4})_FAMILY_(?<famName>\w+)$/;

/** regex for forms:
  (START)FORMS\_V\<monId\>\_POKEMON\_\<monName\>(END) */
const formRE = /^FORMS_V(?<dexNum>\d{1,4})_POKEMON_(?<monName>\w+)$/;

/** regex for ANY pokemon (inc all forms, names with spaces; i.e. ("_" allowed IN/AFTER \<monName\>)) : 
  (START)V\<monId\>\_POKEMON\_\<monName\>(END) */
const anyMonRE = /^V(?<dexNum>\d{1,4})_POKEMON_(?<monName>\w+)$/;

/** regex for name with space (gets name and form (if any)) : 
  (START)<monNameWihSpace\[_\<form\>\]\>(END) */
const nameWithSpaceRE = /^(?<monName>[A-Z]+_[A-Z]+)(_(?<form>\w+))*$/; /* [A-Z] DOES NOT match "_", \w DOES */

/** regex for pokemon WITHOUT [form] OR [space in name, i.e. NO "_" IN/AFTER \<monName\>] : 
  (START)V\<monId\>\_POKEMON\_\<monName\>(END) */
const plainMonRE = /^V(?<dexNum>\d{1,4})_POKEMON_(?<monName>[A-Z]+)$/;

/** regex for pokemon entry WITH FORM extracted (everything following "_" after \<monName\> considered as \<form\>, inc names with spaces )): 
  (START)V\<monId\>\_POKEMON\_\<monName\>\_\<form\>(END) */
const monFormRE = /^V(?<dexNum>\d{1,4})_POKEMON_(?<monName>[A-Z]+)_(?<form>\w+)$/;

/** regex for pokemon ending in NORMAL (e.g. "_" allowed IN/AFTER \<monName\>):
  (START)V\<monId\>\_POKEMON\_\<monName\>(END) */
const normalMonRe = /^V(?<dexNum>\d{1,4})_POKEMON_(?<monName>\w+)_NORMAL$/;

// let famCount = 0;
// let formCount = 0;
// let monCount = 0;
// let monNormalCount = 0;
// let monFormCount = 0;

let namesWithSpaces = ["MR_MIME", "HO_OH", "MIME_JR", "MR_RIME", "PORYGON_Z"];

const dex = { families: [], forms: [], mons: [], monForms: [] };
gm.reduce((dex, asset, i) => {
  if (familyRE.test(asset.templateId)) { /* Check for family entries */
    dex.families.push(asset);
  } else if (formRE.test(asset.templateId)) { /* Check for form entries */
    dex.forms.push(asset);
  } else if (anyMonRE.test(asset.templateId)) { /* Check for mon entries, including mon_form */
    /* Check for plain mon entries */
    if (plainMonRE.test(asset.templateId)) {
      dex.mons.push(asset);
    } else {
      /* extract part after monName */
      let match = asset.templateId.match(nameWithSpaceRE);
      if (match) {
        let [monName, form] = match.groups;
        /* check if space in name */
        // let isNameWithSpace = namesWithSpaces.some(_name => _name == monName);
        let i = 0,
          isNameWithSpace = false;
        do {
          if (monName === namesWithSpaces[i]) {
            isNameWithSpace = true;
            /* check if mon has a form */
            if (form === undefined) {
              dex.mons.push(
                asset
              ); /* if no form, is regular mon -> add to mons */
            } else {
              dex.monForms.push(asset); /* if has form, add to monForms*/
            }
            return dex; /* stop if current monName is in name with spaces array */
          } else i++;
        } while (i < namesWithSpaces.length); /* loop until end of array */
      }
      dex.monForms.push(asset);
    }
  }
  return dex;
}, dex);

console.log({
  families: dex.families.length,
  forms: dex.forms.length,
  mons: dex.mons.length,
  monForms: dex.monForms.length,
});

try {
  fs.writeFileSync('dex.json', JSON.stringify(dex, null, 2))
  //file written successfully
} catch (err) {
  console.error(err)
}