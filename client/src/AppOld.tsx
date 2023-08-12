/* COULD NOT GET THIS TO RUN AFTER SWITCHING TO VITE WITH REACT ROUTER v6
  COPIED ESSENTIAL PARTS TO APP.TSX PROVIDED BY VITE SETUP.
  KEPT THIS FOR REFERENCE OF PREVIOUS STATE, CONTEXT, AND ROUTES
    UNTIL THEY'RE IMPLEMENTED IN NEW APP.TSX
 */

import { useState } from "react";
// import axios from "axios";
// import { Router, Link } from "@reach/router";
import { Link, Routes, Route } from "react-router-dom";
import Context from "./context/Context";
import CSVDragDrop from "./components/CSVDragDrop";
import CSVResults from "./components/CSVResults";
import FileUploadForm from "./components/FileUploadForm";
// import Papa from "papaparse";
import "./App.css";
// import "./data/pokemon.csv";

function App() {
  const [pokeListState, setPokeListState] = useState([]);
  const [fieldState, setFieldState] = useState({});
  const [pokeDB, setPokeDB] = useState();

  // const [csvData, setCsvData] = useState();

  // const routes: RouteObject[] = [
  //   {

  //   }
  // ]

  return (
    <div className="App">
      <p>App</p>
      <Link to="/">Home</Link>

      <FileUploadForm />
      <Context.Provider
        value={{
          pokeListState,
          setPokeListState,
          fieldState,
          setFieldState,
          pokeDB,
          setPokeDB,
        }}
      >
        {/* <Router> */}
        <Routes>
          <Route path={"/"} element={
            <CSVDragDrop
            // path={"/"}
            // pokeListState={pokeListState}
            // setPokeListState={setPokeListState}
            // fieldState={fieldState}
            // setFieldState={setFieldState}
            />}
          />
          <Route path={"results"} element = {<CSVResults />} />
        </Routes>
        {/* </Router> */}
      </Context.Provider>
      {/* <div className="spinner-border" role="status">
        <span className="visually-hidden"></span>
      </div> */}
    </div>
  );
}

export default App;
