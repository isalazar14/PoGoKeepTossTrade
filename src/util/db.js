import Dexie from "dexie";
import { readRemoteFile } from "react-papaparse";

const _dbName = "Pokedex";
const dataUrl = "http://localhost:8000/data";
const dbTablesConfig = {
  families: "family_id,evo_cost_seq_id",
  pokemon: "pokemon_id,family_id",
  forms: "form_id,form_name",
  pokemon_forms: "[pokemon_id+form_id]",
  levels: "level_id,multiplier",
  iv_combos: "iv_id,atk_iv,def_iv,sta_iv",
  evo_stages: "stage_abs",
  evo_costs: "[evo_cost_seq_id+stage_rel]",
  evo_cost_seqs: "evo_cost_seq_id",
  pokemon_form_types: "++id,[pokemon_id+form_id],type_id",
  types: "type_id",
  user_data: "id,pokemon_id,form_id,form_name,catch_date",
};

const t0 = performance.now();
// const t0_createDB = performance.now();
const db = new Dexie(_dbName);

// const t1_createTables = performance.mark();
db.version(1).stores(dbTablesConfig);

// const t2_startPopulate = performance.now();
db.on("populate", async () => {
  const populateTableFromCsv = async (table) => {
    return new Promise((resolve, reject) => {
      readRemoteFile(`${dataUrl}/${table}.csv`, {
        worker: true,
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        error: (err) => {
          console.error(err);
          reject({ readRemoteFileError: err });
        },
        complete: (results) => {
          // console.log(results.data);
          if (results.data && db[table]) {
            db[table]
              .bulkAdd(results.data)
              .then((lastKey) => resolve({ table, lastKey }));
          } else {
            console.log(`${table}.csv data undefined`);
          }
          // catching bulk errors will automatically commit successful entries
          // .catch((err) => console.error(err));
        },
      });
    });
  };
  console.log("populating db");
  // Object.keys(dbTablesConfig).forEach((table) => populateTableFromCsv(table));
  await Promise.all(
    populateTableFromCsv("families"),
    populateTableFromCsv("pokemon"),
    populateTableFromCsv("forms"),
    populateTableFromCsv("pokemon_forms"),
    populateTableFromCsv("levels"),
    populateTableFromCsv("iv_combos"),
    populateTableFromCsv("evo_stages"),
    populateTableFromCsv("evo_costs"),
    populateTableFromCsv("evo_cost_seqs"),
    populateTableFromCsv("pokemon_form_types"),
    populateTableFromCsv("types")
  );
  const t1 = performance.now();
  console.log(`db creation + csv loading time: ${t1 - t0} ms`);
  console.log("ready to create derived tables")
});
db.on("ready", () => {
});
db.open();

export default db;
