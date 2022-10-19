import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
// import reportWebVitals from 'web-vitals';
import readCsv from "./util/csvReaderPromise";
import DbWorker from "workerize-loader!./util/dbWorker.js"; // eslint-disable-line import/no-webpack-loader-syntax
// import GpuWorker from "workerize-loader!./util/gpuWorker.js"; // eslint-disable-line import/no-webpack-loader-syntax


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log)

// readCsv('http://localhost:8000/data/pokemon_forms.csv').then(data=>console.log(data))

// const gpuWorker = new GpuWorker('./util/gpuWorker');
// gpuWorker.runTest();

// require('./util/db') // install database
// .catch(err=> console.error(err));


// const dbWorker = new DbWorker();
// dbWorker.getCsv("pokemon");
// // console.log(dbWorker)
// dbWorker.onmessage = (e) => {
//   // console.log(e);
//   switch (e.data.action) {
//     case "log":
//     case "error":
//       console[e.data.action](e.data.msg);
//       break;

//     case "alert":
//       alert(e.data.msg);
//       break;

//     default:
//       // console.log("received msg from dbWorker, but no action specified")
//       console.log(e.data);
//       break;
//   }
// };

// dbWorker.initDB();
// dbWorker.logDbTables()
// .then(data=>console.log(data))
// .catch(err=>console.error(err));