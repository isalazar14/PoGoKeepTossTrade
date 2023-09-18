/* taken from duck db discord https://discord.com/channels/909674491309850675/921100929984503858/1002461897444053023 
  but seemingly derived from official docs https://duckdb.org/2021/10/29/duckdb-wasm.html
*/

import * as duckdb from '@duckdb/duckdb-wasm';
import duckdb_wasm from '@duckdb/duckdb-wasm/dist/duckdb-mvp.wasm?url';
import mvp_worker from '@duckdb/duckdb-wasm/dist/duckdb-browser-mvp.worker.js?url';
import duckdb_wasm_next from '@duckdb/duckdb-wasm/dist/duckdb-eh.wasm?url';
import eh_worker from '@duckdb/duckdb-wasm/dist/duckdb-browser-eh.worker.js?url';

// select a bundle based on browser checks
const bundle = await duckdb.selectBundle({
    mvp: {
        mainModule: duckdb_wasm,
        mainWorker: mvp_worker,
    },
    eh: {
        mainModule: duckdb_wasm_next,
        mainWorker: eh_worker
    },
});

// init async duckdb-wasm
const worker = new Worker(bundle.mainWorker);
const logger = new duckdb.ConsoleLogger();
const db = new duckdb.AsyncDuckDB(logger, worker);
await db.instantiate(bundle.mainModule, bundle.pthreadWorker);

// open duckdb file served from backend
const basePath = "http://path/to/my.duckdb"
await db.registerFileURL(path);
await db.open({ path });

// establish connection
const con = await db.connect();