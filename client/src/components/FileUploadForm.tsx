import React, { useState } from "react";

const FileUploadForm = () => {
  const [uploadedFile, setUploadedFile] = useState(null);

  const setFile = (e) => {
    setUploadedFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(uploadedFile);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group files">
        <label htmlFor="pokelist">Upload Pokegenie file: </label>
        <input type="file" name="pokelist" onChange={setFile} />
      </div>
      <button>Upload</button>
    </form>
  );
};

export default FileUploadForm;
