/* credit https://github.com/Bunlong/react-papaparse/blob/v4.0.0/examples/CSVReaderClickAndDragUpload.tsx */
import React, { useState, CSSProperties } from 'react';
import { useCSVReader, lightenDarkenColor, formatFileSize } from 'react-papaparse';
import { CustomConfig } from 'react-papaparse/dist/model';
import { ParseResult } from 'papaparse'

const GREY = '#CCC';
const GREY_LIGHT = 'rgba(255, 255, 255, 0.4)';
const DEFAULT_REMOVE_HOVER_COLOR = '#A01919';
const REMOVE_HOVER_COLOR_LIGHT = lightenDarkenColor(
  DEFAULT_REMOVE_HOVER_COLOR,
  40
);
const GREY_DIM = '#686868';

const styles = {
  zone: {
    alignItems: 'center',
    border: `2px dashed ${GREY}`,
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    padding: 20,
  } as CSSProperties,
  file: {
    background: 'linear-gradient(to bottom, #EEE, #DDD)',
    borderRadius: 20,
    display: 'flex',
    height: 120,
    width: 120,
    position: 'relative',
    zIndex: 10,
    flexDirection: 'column',
    justifyContent: 'center',
  } as CSSProperties,
  info: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 10,
    paddingRight: 10,
  } as CSSProperties,
  size: {
    backgroundColor: GREY_LIGHT,
    borderRadius: 3,
    marginBottom: '0.5em',
    justifyContent: 'center',
    display: 'flex',
  } as CSSProperties,
  name: {
    backgroundColor: GREY_LIGHT,
    borderRadius: 3,
    fontSize: 12,
    marginBottom: '0.5em',
  } as CSSProperties,
  progressBar: {
    bottom: 14,
    position: 'absolute',
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
  } as CSSProperties,
  zoneHover: {
    borderColor: GREY_DIM,
  } as CSSProperties,
  default: {
    borderColor: GREY,
  } as CSSProperties,
  remove: {
    height: 23,
    position: 'absolute',
    right: 6,
    top: 6,
    width: 23,
  } as CSSProperties,
};

const csvReaderConfig: CustomConfig = {
  // worker: true,
  dynamicTyping: true,
  skipEmptyLines: 'greedy',
  // header: true,
  transformHeader: cleanHeader,
  error: handleParseError
}

export default function CSVReader() {
  const { CSVReader } = useCSVReader();
  const [zoneHover, setZoneHover] = useState(false);
  const [removeHoverColor, setRemoveHoverColor] = useState(
    DEFAULT_REMOVE_HOVER_COLOR
  );
  function handleUploadResults(results: ParseResult<any>) {
    console.log("---------------------------");
    console.log("File loaded successfully");
    const startTime = performance.now()
    if (csvReaderConfig.header) handleObjectResults(results)
    else (handleArrayResults(results))
    const endTime = performance.now()
    console.log(`Time to process ${results.data.length} rows:`, endTime-startTime, "ms")
    setZoneHover(false);
  }


  return (
    <CSVReader
      onUploadAccepted={handleUploadResults}
      onDragOver={(event: DragEvent) => {
        event.preventDefault();
        setZoneHover(true);
      }}
      onDragLeave={(event: DragEvent) => {
        event.preventDefault();
        setZoneHover(false);
      }}
      config={csvReaderConfig}
    >
      {
        (
          {
            getRootProps,
            acceptedFile,
            ProgressBar,
            getRemoveFileProps,
            Remove,
          }: any) => (
          <>
            <div
              {...getRootProps()}
              style={Object.assign(
                {},
                styles.zone,
                zoneHover && styles.zoneHover
              )}
            >
              {acceptedFile ? (
                <>
                  <div style={styles.file}>
                    <div style={styles.info}>
                      <span style={styles.size}>
                        {formatFileSize(acceptedFile.size)}
                      </span>
                      <span style={styles.name}>{acceptedFile.name}</span>
                    </div>
                    <div style={styles.progressBar}>
                      <ProgressBar />
                    </div>
                    <div
                      {...getRemoveFileProps()}
                      style={styles.remove}
                      onMouseOver={(event: Event) => {
                        event.preventDefault();
                        setRemoveHoverColor(REMOVE_HOVER_COLOR_LIGHT);
                      }}
                      onMouseOut={(event: Event) => {
                        event.preventDefault();
                        setRemoveHoverColor(DEFAULT_REMOVE_HOVER_COLOR);
                      }}
                    >
                      <Remove color={removeHoverColor} />
                    </div>
                  </div>
                </>
              ) : (
                'Drop CSV file here or click to upload'
              )}
            </div>
          </>
        )}
    </CSVReader>
  );
}

function cleanHeader(header: string, index?: number) {
  // console.log(header);
  // const cleanHeader = header.toLowerCase().split(" ").join("_").trim().replace();
  const reSpacesAndSlashes = /[\s/]/g
  const reParentheses_CaptureInnerText = /\((.)\)/g
  const cleanedHeader = header
    .trim()
    .toLowerCase()
    .replace(reSpacesAndSlashes, "_")
    .replace(reParentheses_CaptureInnerText, "$1")
  // console.log(cleanedHeader);
  return cleanedHeader
}

function handleArrayResults(results: ParseResult<any>) {
  console.log("Array Results");
  /* extract headers from first row, replace spaces with underscores, trim trailing whitespace; */
  // let headersArr = results[0].meta.fields.map(cleanHeader);
  const headers = results.data.shift().map(cleanHeader)
  console.log("Headers:", headers)
  console.log("Data", results);


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
}



function handleParseError(err, file) {
  console.error(err);
}