"use client";

import { accepted_files } from "@/config/constants";
import ReactDropzone from "react-dropzone";
import { useToast } from "./ui/use-toast";

const DropZone = () => {
  const { toast } = useToast();
  function handleUpload() {}
  function handleHover() {}
  function handleExitHover() {}

  return (
    <ReactDropzone
      onDrop={handleUpload}
      onDragEnter={handleHover}
      onDragLeave={handleExitHover}
      accept={accepted_files}
      onError={() => {
        handleExitHover();
        toast({
          variant: "destructive",
          title: "Error uploading your file(s)",
          description: "Allowed Files: Audio, Video, and Images.",
          duration: 5000,
        });
      }}
    >
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
