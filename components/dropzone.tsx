"use client";

import ReactDropzone from "react-dropzone";

const DropZone = () => {
  return (
    <ReactDropzone>
      {({ getRootProps, getInputProps }) => (
        <section>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag and drop some files here, or click to select files</p>
          </div>
        </section>
      )}
    </ReactDropzone>
  );
};

export default DropZone;
