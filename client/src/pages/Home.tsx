import { useEffect, useState } from "react";
import { CustomConfig } from "react-papaparse/dist/model";
import CSVDropDropUpload from "../components/CSVDragDropUpload";

export default function Home() {
  const [state, setState] = useState<any>(null)
  useEffect(() => console.log("STATE UPDATED", state), [state])
  
  const readPokeGenieCsvConfig: CustomConfig = {
    // worker: true,
    dynamicTyping: true,
    skipEmptyLines: 'greedy',
    header: true,
    // transformHeader: cleanHeader,
    error: handleParseError
  }
  
  function handlePokeGenieResults(headers: string[], data: any[][]) {
      // const startTime = performance.now()
     /* TODO: 
        - PROCESS POKEGENIE DATA
        - WHY IS HEADERS COMING IN UNDEFINED */
      const snakeHeaders = headers.map(rawHeader => cleanHeader(rawHeader))
      // const endTime = performance.now()
      // console.log(`Time to process ${data.length} rows:`, endTime-startTime, "ms")
      setState({headers,snakeHeaders,data})
  }
  return (
    <CSVDropDropUpload 
      config={readPokeGenieCsvConfig}
      handleResults={handlePokeGenieResults}
    />
  )
}


function cleanHeader(rawHeader: string, index?: number) {
  // console.log(header);
  /* replace spaces with underscores, trim trailing whitespace, remove parentheses */
  const reSpacesAndSlashes = /[\s/]/g
  const reParentheses_CaptureInnerText = /\((.)\)/g
  const cleanedHeader = rawHeader
    .trim()
    .toLowerCase()
    .replace(reSpacesAndSlashes, "_")
    .replace(reParentheses_CaptureInnerText, "$1")
  // console.log(cleanedHeader);
  return cleanedHeader
}


function handleArrayResults(results: ParseResult<any>) {
  // /* convert headers array into object, with all fields set as true 
 // Enable this section to allow users to turn on and off the fields they want to see */
 // let headersObj = {};
 // headersArr.forEach((field) => (headersObj[field] = true));
 // /* add headers to fieldState */
 // setFieldState(headersObj); // 

 // /* reducer function to extract 'data' object from csv parsed rows, and filter out blank rows */
 // let reducer = (rows, row) => {
 //   if (row.errors.length === 0) {
 //     // console.log("no errors", row.data);
 //     rows.push(row.data);
 //   }
 //   return rows;
 // };
 // let dataRows = data.reduce(reducer, []);
 // let dataArr = []
 // let objToArrStart = console.time("objToArr")
 // // dataRows.forEach((row)=>dataArr.push(Object.keys(row).map(key=>row[key])))
 // dataRows.forEach((row) => dataArr.push(Object.values(row)))
 // let objToArrEnd = console.timeEnd("objToArr")
 // console.log("time to convert data obj to arr", objToArrEnd - objToArrStart);
 // console.log("headers array", headers)
 // console.log("headers object", headersObj)
 // console.log("data array", dataArr)
 // /* save array of pokemon data to pokelist state */
 // // setPokeListState(dataRows);
 // console.log("---------------------------");
 // // navigate("results");
}

function handleObjectResults(results: ParseResult<any>) {
 console.log("Object Results");

 const headers = results.meta.fields
 const { data } = results
 console.log("Headers:", headers)
 console.log("Data:", data)
 return { headers, data }
}

function handleParseError(err, file) {
 console.error(err);
}