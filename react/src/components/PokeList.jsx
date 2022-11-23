import React, { useContext } from "react";
import PokeTile from "./PokeTile";
import Context from "../context/Context";

const PokeList = () => {
  const { pokeListState, fieldState } = useContext(Context);
  return (
    <div>
      {pokeListState.map((mon, i) => {
        // // let dexNumber = mon[3];
        // // return isNaN(mon.data["Pokemon Number"]) ? (
        // console.log(mon);
        // console.log(mon.Name);
        // // return isNaN(mon.errors.length > 0) ? (
        // //   ""
        // // ) : (
        // // <PokeTile key={i} pokemon={mon} stats={pokeDB[dexNumber]} />
        return <PokeTile key={i} pokemon={mon} fieldState={fieldState} />;
        // );
      })}
    </div>
  );
};

export default PokeList;
