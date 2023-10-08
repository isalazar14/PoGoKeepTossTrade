import * as duckdb from '@duckdb/duckdb-wasm';
import duckdb_wasm from '@duckdb/duckdb-wasm/dist/duckdb-mvp.wasm?url';
import mvp_worker from '@duckdb/duckdb-wasm/dist/duckdb-browser-mvp.worker.js?url';
import duckdb_wasm_eh from '@duckdb/duckdb-wasm/dist/duckdb-eh.wasm?url';
import eh_worker from '@duckdb/duckdb-wasm/dist/duckdb-browser-eh.worker.js?url';

const MANUAL_BUNDLES: duckdb.DuckDBBundles = {
  mvp: {
    mainModule: duckdb_wasm,
    mainWorker: mvp_worker,
  },
  eh: {
    mainModule: duckdb_wasm_eh,
    mainWorker: eh_worker,
  },
};
// Select a bundle based on browser checks
const bundle = await duckdb.selectBundle(MANUAL_BUNDLES);
// Instantiate the asynchronus version of DuckDB-wasm
const worker = new Worker(bundle.mainWorker!);
const logger = new duckdb.ConsoleLogger();
const db = new duckdb.AsyncDuckDB(logger, worker);
await db.instantiate(bundle.mainModule, bundle.pthreadWorker);
// await db.runQuery(1,
//   ` INSTALL sqlite;
//     LOAD sqlite;
// `)

// const dbFilePath = './sample.db'
const dbFilePath = './sample.duckdb'

// let c = await db.connect()
// await c?.query(`INSTALL sqlite;`)
// await c?.query(`LOAD sqlite;`)
// await c?.close()

const response = await fetch(dbFilePath);
const arrayBuffer = await response.arrayBuffer();
const uint8Array = new Uint8Array(arrayBuffer);
await db.registerFileBuffer(dbFilePath, uint8Array);

const dbConfig: duckdb.DuckDBConfig = {
  path: dbFilePath,
  accessMode: duckdb.DuckDBAccessMode.READ_WRITE,
  // /* Requires cross-origin isolation, https */
  // maximumThreads: navigator.hardwareConcurrency - 1,
}
await db.open(dbConfig)

let c = await db.connect()
// await c?.query(`ATTACH '/sample.db' (TYPE sqlite);`)

const results = await c?.query(`
  SELECT * FROM "pokemon"
`)

results.toArray().forEach(r => {
  console.log([...r])
})


await c.close()