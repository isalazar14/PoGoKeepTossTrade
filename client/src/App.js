import React, { useState, useEffect } from "react";
// import axios from "axios";
import { Router, Link } from "@reach/router";
import Context from "./context/Context";
import CSVDragDrop from "./components/CSVDragDrop";
import CSVResults from "./components/CSVResults";
import Papa from "papaparse";
import "./App.css";
import "./data/pokemon.csv";

function App() {
  const [pokeListState, setPokeListState] = useState([]);
  const [fieldState, setFieldState] = useState({});
  const [pokeDB, setPokeDB] = useState();

  // const [csvData, setCsvData] = useState();

  return (
    <div className="App">
      <Link to="/">Home</Link>
      
      {/* <FileUploadForm /> */}
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
        <Router>
          <CSVDragDrop
            path={"/"}
            // pokeListState={pokeListState}
            // setPokeListState={setPokeListState}
            // fieldState={fieldState}
            // setFieldState={setFieldState}
          />
          <CSVResults path={"results"} />
        </Router>
      </Context.Provider>
      {/* <div className="spinner-border" role="status">
        <span className="visually-hidden"></span>
      </div> */}
    </div>
  );
}

export default App;
