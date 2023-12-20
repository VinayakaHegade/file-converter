"use client";

import { accepted_files } from "@/config/constants";
import { Action } from "@/types";
import { useState } from "react";
import ReactDropzone from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import { LuFileSymlink } from "react-icons/lu";
import { useToast } from "./ui/use-toast";
import { Skeleton } from "./ui/skeleton";

const DropZone = () => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const [actions, setActions] = useState<Action[]>([]);
  const [files, setFiles] = useState<Array<any>>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  const { toast } = useToast();

  function handleUpload(data: Array<any>): void {
    handleExitHover();
    setFiles(data);
    const temp: Action[] = data.map((file: any) => {
      return {
        file_name: file.name,
        file_size: file.size,
        from: file.name.slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2),
        to: null,
        file_type: file.type,
        file,
        is_converted: false,
        is_converting: false,
        is_error: false,
      };
    });
    setActions(temp);
  }

  function handleHover(): void {
    setIsHover(true);
  }

  function handleExitHover(): void {
    setIsHover(false);
  }

  //  const load = async () => {
  //   const ffmpegResponse: FFmpeg = await loadFfmpeg();
  //   ffmpegRef.current = ffmpegResponse;
  //   setIsLoaded(true);
  // };


  if(actions.length) {
    return (
      <section className="space-y-6">
        {actions.map((action: Action, index: number) => (
          <div
            key={index}
            className="w-full py-4 space-y-2 lg:py-0 relative cursor-pointer rounded-xl border h-fit lg:h-20 px-4 lg:px-10 flex flex-wrap lg:flex-nowrap items-center justify-between"
          >
            {!isLoaded && (
              <Skeleton className="h-full w-full -ml-10 cursor-progress absolute rounded-xl" />
            )}
          </div>
        ))}
      </section>
    );
  }

  return (
    <ReactDropzone
      onDrop={handleUpload}
      onDragEnter={handleHover}
      onDragLeave={handleExitHover}
      accept={accepted_files}
      onDropRejected={() => {
        handleExitHover();
        toast({
          variant: "destructive",
          title: "Error uploading your file(s)",
          description: "Allowed Files: Audio, Video, and Images.",
          duration: 5000,
        });
      }}
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
        <section
          {...getRootProps()}
          className=" bg-gray-50 h-72 lg:h-80 xl:h-96 rounded-3xl shadow-sm border-2 border-dashed cursor-pointer flex items-center justify-center"
        >
          <input {...getInputProps()} />
          <div className="space-y-4 text-gray-500">
            {isHover ? (
              <>
                <div className="justify-center flex text-6xl">
                  <LuFileSymlink />
                </div>
                <h3 className="text-center font-medium text-2xl">
                  Yes, right there
                </h3>
              </>
            ) : (
              <>
                <div className="justify-center flex text-6xl">
                  <FiUploadCloud />
                </div>
                <h3 className="text-center font-medium text-2xl">
                  Click, or drop your files here
                </h3>
              </>
            )}
          </div>
        </section>
      )}
    </ReactDropzone>
  );
};

export default DropZone;
