import React, { useContext } from "react";
import { CSVReader } from "react-papaparse";
import { navigate } from "@reach/router";
import Context from "../context/Context";

const CVSDragDrop = () => {
  const { setPokeListState, setFieldState } = useContext(Context);
  const handleOnDrop = (data) => {
    console.log("---------------------------");
    console.log("File dropped in");
    console.log(data);
    // extract headers from first row, replace spaces with underscores, trim trailing whitespace;
    let headersArr = data[0].meta.fields.map((field) =>
      field.split(" ").join("_").trim()
    );
    // convert headers array into object, with all fields set as true
    let headersObj = {};
    headersArr.forEach((field) => (headersObj[field] = true));
    //add headers to fieldState
    setFieldState(headersObj);

    // reducer function to extract 'data' object from csv parsed rows, and filter out blank rows
    let reducer = (rows, row) => {
      if (row.errors.length === 0) {
        // console.log("no errors", row.data);
        rows.push(row.data);
      }
      return rows;
    };
    let dataRows = data.reduce(reducer, []);
    let dataArr = []
    let objToArrStart = console.time("objToArr")
    // dataRows.forEach((row)=>dataArr.push(Object.keys(row).map(key=>row[key])))
    dataRows.forEach((row)=>dataArr.push(Object.values(row)))
    let objToArrEnd = console.timeEnd("objToArr")
    console.log(objToArrEnd - objToArrStart);
    console.log(headersArr)
    console.log(headersObj)
    console.log(dataArr)
    // save array of pokemon data to pokelist state
    setPokeListState(dataRows);
    console.log("---------------------------");
    navigate("results");
  };

  const handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  };

  const handleOnRemoveFile = (data) => {
    console.log("---------------------------");
    console.log("File removed");
    console.log(data);
    console.log("---------------------------");
  };

  // const handleOnFileLoad = (data) => {
  //   console.log("---------------------------");
  //   console.log("File loaded");
  //   // console.log(data);
  //   setPokeListState(data);
  //   console.log("---------------------------");
  // };

  return (
    <CSVReader
      onDrop={handleOnDrop}
      onError={handleOnError}
      addRemoveButton
      onRemoveFile={handleOnRemoveFile}
      // onFileLoad={handleOnFileLoad}
      config={{ header: true, dynamicTyping: true }}
    >
      <span>Drop CSV file here or click to upload.</span>
    </CSVReader>
  );
};

export default CVSDragDrop;
