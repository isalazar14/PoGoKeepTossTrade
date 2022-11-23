import React from "react";
import PokeList from "./PokeList";
import FieldBar from "./FieldBar";

const CSVResults = (props) => {
  return (
    <div className="row">
      {/* <FieldBar fieldState={fieldState} setFieldState={setFieldState} /> */}
      {/* <div className="col-2 mx-2 bg-dark">
        <FieldBar />
      </div> */}
      <div className="col">
        <PokeList
        // pokeListState={pokeListState}
        // pokeDB={pokeDB}
        // fieldState={fieldState}
        // setFieldState={setFieldState}
        />
      </div>
    </div>
  );
};

export default CSVResults;
