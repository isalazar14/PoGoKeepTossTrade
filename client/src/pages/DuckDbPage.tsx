import { useEffect, useState } from 'react';
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

// let c = await db.connect()
// await c?.query(`SET autoload_known_extensions=true;
//                 SET autoinstall_known_extensions=true;`)

// const dexFilePath = 'sample.duckdb'
// const dexFilePath = 'sample.parquet'
const dexFilePath = 'sample.csv'

const response = await fetch(dexFilePath);
await db.registerFileText(dexFilePath, await response.text());

// const resArrayBuffer = await response.arrayBuffer();
// const resUint8Array = new Uint8Array(resArrayBuffer);
// await db.registerFileBuffer(dexFilePath, resUint8Array);
// const dbConfig: duckdb.DuckDBConfig = {
//   path: dexFilePath,
//   accessMode: duckdb.DuckDBAccessMode.READ_WRITE,
//   // /* Requires cross-origin isolation, https */
//   // maximumThreads: navigator.hardwareConcurrency - 1,
// }

// await db.open(dbConfig)

// const results = await c?.query(`INSTALL sqlite;
//                 LOAD sqlite;
//                 FROM duckdb_extensions();`)

let c = await db.connect()
// await c?.query(`ATTACH '/sample.db' (TYPE sqlite);`)

await c?.query(`create table pokemon as from read_csv_auto('sample.csv');`)
const results = await c?.query(`SELECT * FROM "pokemon";`)
// const results = await c?.query(`SELECT * FROM read_parquet('${dexFilePath}');`)

await c.close()

results.toArray().forEach(r => {
  console.log(r.toArray())
})

// results.toArray().forEach(r => {
//   console.log(r.toJSON())
// })



// const duckDbWorker = new Worker(new URL('../util/duckdb_wasm_dbLoader.ts', import.meta.url))
// duckDbWorker.postMessage('run')


export default function DuckDbPage(props) {
  // useEffect(() => {

  //   return () => duckDbWorker.terminate()
  // }, [])

  return (
    <div>
      <h1>DuckDB</h1>
      <p>
        This is the duckdb page.
      </p>
    </div>
  )

}