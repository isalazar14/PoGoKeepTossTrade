import Dexie from "dexie";
import readCsv  from "./csvReaderPromise";
import {createIvCombosArray, createIvCombosObj, createIvCombosObjLookup} from './pogoCalcs'


const DB_NAME = "poGoDex";
const DATA_SOURCE_URL = "http://localhost:8000/data";
// const DATA_SOURCE_URL = "../data/pokemon.csv";

const dbTablesConfig = {
  families: "family_id,evo_cost_seq_id",
  pokemon: "pokemon_id,[family_id+stage_rel]",
  forms: "form_id,form_name",
  pokemon_forms: "[pokemon_id+form_id]",
  levels: "level,multiplier",
  iv_combos: "iv_id,atk_iv,def_iv,sta_iv",
  evo_stages: "stage_abs",
  evo_costs: "[evo_cost_seq_id+stage_rel]",
  evo_cost_seqs: "evo_cost_seq_id",
  pokemon_form_types: "++id,[pokemon_id+form_id],type_id",
  types: "type_id",
  user_data: "id,pokemon_id,form_id,form_name,catch_date",
};

// Object.keys(dbTablesConfig)
// .forEach(key=>readRemoteFile(`${DATA_SOURCE_URL}/${key}.csv`,{complete:data=>console.log(data), error: err=>console.error(err)}))

const db = new Dexie(DB_NAME);

db.version(1).stores(dbTablesConfig);
// const ivsArr_t0 = performance.now()
// const ivsArr = createIvCombosArray()
// console.log("ivsArr", ivsArr);
// const ivsArr_t1 = performance.now()
// console.log(`create ivsArr: ${ivsArr_t1- ivsArr_t0} ms`)

// const ivsObj_t0 = performance.now()
// const ivsObj = createIvCombosObj()
// // console.log("ivsObj", ivsObj);
// const ivsObj_t1 = performance.now()
// console.log(`create ivsObj: ${ivsObj_t1- ivsObj_t0} ms`)


// const t2_startPopulate = performance.now();
db.on("populate", async (tx) => {
  console.log("populating db");
  // Object.keys(dbTablesConfig).forEach((table) => populateTableFromCsv(table));
  const t0 = performance.now();
  await Promise.all(
    populateDbTableFromCsvData("families"),
    populateDbTableFromCsvData("pokemon"),
    populateDbTableFromCsvData("forms"),
    populateDbTableFromCsvData("pokemon_forms"),
    populateDbTableFromCsvData("levels"),
    populateDbTableFromCsvData("iv_combos"),
    populateDbTableFromCsvData("evo_stages"),
    populateDbTableFromCsvData("evo_costs"),
    populateDbTableFromCsvData("evo_cost_seqs"),
    populateDbTableFromCsvData("pokemon_form_types"),
    populateDbTableFromCsvData("types")
  );
  const t1 = performance.now();
  console.log(`db creation + csv loading time: ${t1 - t0} ms`);
  console.log("ready to create derived tables")

  /** get max / min CP for each pokeform, for GL and UL
   * -----------------------------------*/
  // calc cpm @ 1500 / 2500

  
  db.table('pokemon_forms').get()

});
// db.on("ready", () => {
// });
db.open();

export default db;

async function populateDb (tableName, data) {
  if (!data) throw new Error(`Error: No data to add to db`);
  // console.log(data)
  const lastKey = await db[tableName].bulkAdd(data);
  // .then(lastKey=> {
  console.log(`Added new table to db`,({ tableName, lastKey }));
  return Promise.resolve(lastKey);
  // })
}

async function populateDbTableFromCsvData (tableName) {
  /** Must be used inside a Dexie transaction, because it uses bulkAdd.
   * Catching bulk errors will automatically commit successful entries.
   * To prevent this, catch the errors in the transaction, instead of the bulkAdd().
  */
  if (!db[tableName]) throw new Error(`Error: ${tableName} does not exist in db`);

  return new Promise(async (resolve, reject) => {
    // readRemoteFile(`${DATA_SOURCE_URL}/${tableName}.csv`,{header:true, worker:true, skipEmptyLines: true, complete:populateDb, error: err=>console.error(err)})
    // .catch((err) => console.error(err))
    try {
      const csvData = await readCsv(`${DATA_SOURCE_URL}/${tableName}.csv`,{header:true});
      const lastKey = await populateDb(tableName, csvData.data);
      resolve(lastKey);
      // .then(lastKey=> resolve(lastKey))
    } catch (err) {
      reject(err)
    }
  })
  

};


