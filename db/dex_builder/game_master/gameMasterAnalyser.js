/**
 * For now, just a way to manually check game master templateIds for unique vs numbered repeating entries (currently only entries with "V####"; does not capture other numbering schemes).
 * 
 * Eventually would like to determine/extract all repeating categories, including the ones that vary by text (e.g. "COMBAT_LEAGUE_<leagueName>")
 * 
 * Ultimately would like to compare new game master versions against previous one, to help determine if parser needs updating.
 */
const fs = require("fs");

const gm = require("./gameMaster.json");

let templateIds = new Set();

let numberedTemplates = new Set();

let reNumberedEntry = /V\d{4}/;
let relowerCase = /[a-z]/;

for (let { templateId } of gm) {
  let hasLowerCase = relowerCase.test(templateId);
  if (hasLowerCase) continue;
  let vNumber = reNumberedEntry.exec(templateId);
  if (vNumber) {
    templateId = templateId.split(vNumber).join("V<id>");
    numberedTemplates.add(templateId);
  } else {
    templateIds.add(templateId);
  }
}

// console.log(numberedTemplates);

fs.writeFile(
  "gameMasterTemplateIds_unique.json",
  JSON.stringify(Array.from(templateIds)),
  (err) => {
    if (err) throw err;
    console.log("saved unique templateIds to file");
  }
);

fs.writeFile(
  "gameMasterTemplateIds_numbered.json",
  JSON.stringify(Array.from(numberedTemplates)),
  (err) => {
    if (err) throw err;
    console.log("saved numbered templateIds to file");
  }
);