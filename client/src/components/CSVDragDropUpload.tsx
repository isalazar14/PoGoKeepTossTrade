/* credit https://github.com/Bunlong/react-papaparse/blob/v4.0.0/examples/CSVReaderClickAndDragUpload.tsx */
import { useState, CSSProperties } from 'react';
import { useCSVReader, lightenDarkenColor, formatFileSize } from 'react-papaparse';
import { CustomConfig } from 'react-papaparse/dist/model';
import { ParseResult } from 'papaparse'

const GREY = '#CCC';
const GREY_DIM = '#686868';
const GREY_LIGHT = 'rgba(255, 255, 255, 0.4)';
const DEFAULT_REMOVE_HOVER_COLOR = '#A01919';
const REMOVE_HOVER_COLOR_LIGHT = lightenDarkenColor(
  DEFAULT_REMOVE_HOVER_COLOR,
  40
);

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

type GeneralObject = {
  [key: string]: any
}

type CSVDropDropUploadProps = {
  config?: CustomConfig
  // handleArrayResults?(headers, data: any[]): void
  // handleObjectResults?(headers, data: any[]): void
  handleResults?(headers: string[], data: any[][] | GeneralObject[]): void
}

export default function CSVDropDropUpload({ config, handleResults }: CSVDropDropUploadProps) {
  const { CSVReader } = useCSVReader();
  const [zoneHover, setZoneHover] = useState(false);
  const [removeHoverColor, setRemoveHoverColor] = useState(
    DEFAULT_REMOVE_HOVER_COLOR
  );
  function handleUploadAccepted(results: ParseResult<any>) {
    console.log("---------------------------");
    console.log("File loaded successfully");
    const { headers, data } = getHeadersAndData(results, config?.header ?? false)
    const startTime = performance.now()
    // if (config.header) {
    //   if (!handleObjectResults) throw new Error("'header' set to true without 'handleObjectResults' callback");
    //   handleObjectResults(headers, data)
    // } else {
    //   if (!handleArrayResults) throw new Error("'header' set to false without 'handlArrayResults' callback");
    //   handleArrayResults(headers, data)
    // }
    if (handleResults) handleResults(headers, data)
    const endTime = performance.now()
    console.log(`Time to process ${results.data.length} rows:`, endTime - startTime, "ms")
    setZoneHover(false);
  }


  return (
    <CSVReader
      onUploadAccepted={handleUploadAccepted}
      onDragOver={(event: DragEvent) => {
        event.preventDefault();
        setZoneHover(true);
      }}
      onDragLeave={(event: DragEvent) => {
        event.preventDefault();
        setZoneHover(false);
      }}
      config={config}
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

function getHeadersAndData(results: ParseResult<any>, areHeadersSeparate: boolean) {
  console.log("Results", results);
  /* ENTRIES AS OBJECTS */
  let headers
  let data: any[]
  if (areHeadersSeparate) {
    console.log("Object Results");
    headers = results.meta.fields
    data = results.data
  } else {
    /* ENTRIES AS ARRAYS */
    console.log("Array Results");
    /* extract headers from first row */
    headers = results.data.shift()
    data = results.data
  }
 
  console.log("Headers:", headers)
  console.log("Data", data);
  return { headers, data }
}