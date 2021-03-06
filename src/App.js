import React, { useState, useEffect } from "react";
// import axios from "axios";
import { Router } from "@reach/router";
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

  // useEffect(() => {
  //   Papa.parse("./data/pokemon.csv", {
  //     download: true,
  //     complete: (data) => {
  //       console.log(data);
  //       // setCsvData(data.data);
  //     },
  //   });
  // }, []);

  return (
    <div className="App">
      <h1>Ready</h1>
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
        
        {/* <Router>
          <CSVDragDrop
            path={"/"}
            // pokeListState={pokeListState}
            // setPokeListState={setPokeListState}
            // fieldState={fieldState}
            // setFieldState={setFieldState}
          />
          <CSVResults path={"results"} />
        </Router> */}
      </Context.Provider>
    </div>
  );
}

export default App;