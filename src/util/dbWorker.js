import Dexie from "dexie";
import db from '../util/db'
// console.log(db)


export const initDB = async () => {
  // db = await import('./db');
  // console.log("db after init, from dbworker",db);
  return
}

export const logDbTables = () => {return db._allTables};