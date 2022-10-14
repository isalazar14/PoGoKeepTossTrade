import React, { useContext } from "react";
import { CSVReader } from "react-papaparse";
import { navigate } from "@reach/router";
import Context from "../context/Context";
import DbWorker from "workerize-loader!../util/dbWorker.js"; // eslint-disable-line import/no-webpack-loader-syntax

const CVSDragDrop = () => {
  const { setPokeListState, setFieldState } = useContext(Context);
  const db = new DbWorker();
  
  const cleanHeaders = (header) => {
    // console.log(header);
    // const cleanHeader = header.toLowerCase().split(" ").join("_").trim().replace();
    const cleanHeader = header.toLowerCase().replace(/\s/g,"_").replace(/\((.)\)/g,"$1l");
    console.log(cleanHeader);
    return cleanHeader
  }
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
    console.log("time to convert data obj to arr", objToArrEnd - objToArrStart);
    console.log("headers array", headersArr)
    console.log("headers object", headersObj)
    console.log("data array", dataArr)
    // save array of pokemon data to pokelist state
    setPokeListState(dataRows);
    console.log("---------------------------");
    navigate("results");
  };

  const handleOnError = (err, file, inputElem, reason) => {
    console.error(err);
  };

  const handleOnRemoveFile = (data) => {
    console.log("---------------------------");
    console.log("File removed");
    console.log(data);
    console.log("---------------------------");
  };
  
  
  const handleOnFileLoad = (data) => {
    console.log("---------------------------");
    console.log("File loaded");
    console.log(data);
    db.saveUserData(data)
    // setPokeListState(data);
    console.log("---------------------------");
  };
  const handleComplete = (results) => {
    console.log(results);
  }


  return (
    <CSVReader
      // onDrop={handleOnDrop}
      onFileLoad={handleOnFileLoad}
      onError={handleOnError}
      addRemoveButton
      onRemoveFile={handleOnRemoveFile}
      config={{ header: true, dynamicTyping: true, skipEmptyLines: true, 
        // worker: true,
        transformHeader: cleanHeaders,
        // complete: handleOnFileLoad
      }}
    >
      <span>Drop CSV file here or click to upload.</span>
    </CSVReader>
  );
};

export default CVSDragDrop;
