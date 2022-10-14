import db from '../util/db'
import readCsv from './csvReaderPromise'

export const initDB = async () => {
  // db = await import('./db');
  // console.log("db after init, from dbworker",db);
  return
}

export const logDbTables = () => {return db._allTables};

const cleanPokeGenieData = data => {

}

export const saveUserData = csvResults => {
  const t0 = performance.now()
  db.user_data.bulkPut(csvResults.map(row=>{
    // rename properties to be used for IDB index
    row.data.id = row.data.index;
    row.data.pokemon_id = row.data.pokemon_number;

    delete row.data.index;
    delete row.data.pokemon_number;

    return row.data
  }))
  .then((lastKey)=>{
    const t1 = performance.now();
    console.log(`saved pokegenie. Last entry id: ${lastKey}`)
    console.log(`Timing: ${t1 - t0} ms`);
  })
}