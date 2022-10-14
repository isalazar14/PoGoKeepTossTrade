import { readRemoteFile } from "react-papaparse";

/**
 * Promise wrapper for papaparse readRemoteFile
 * @param {String} url Url of local or remote file (local files must be in project heirarchy)
 * @param {Object} options Options for file read operation. See react-papaparse documentation. Defaults: {worker: true, download: true, dynamicTyping: true, skipEmptyLines: true}. 'complete' and 'error' options not changeable
 * @returns Resolves with read file results, or rejects with error
 */
export default function readCsv (url, options = {}) {
  const _options = {
    worker: true,
    dynamicTyping: true,
    skipEmptyLines: true,
  }
  if (options) Object.keys(options).forEach(key=> _options[key] = options[key])

  return new Promise((resolve, reject) => {
    _options.complete = (results) => resolve(results);
    _options.error = (err) => reject(err);
    readRemoteFile(url, _options);
  })
} 