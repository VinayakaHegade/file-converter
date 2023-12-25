"use client";

import { accepted_files } from "@/config/constants";
import { Action } from "@/types";
import convertFile from "@/utils/convert";
import loadFfmpeg from "@/utils/load-ffmpeg";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { useEffect, useRef, useState } from "react";
import ReactDropzone from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import { LuFileSymlink } from "react-icons/lu";
import ConvertButton from "./action_buttons/convert-button";
import DownloadButton from "./action_buttons/download-button";
import ResetButton from "./action_buttons/reset-button";
import FileAction from "./file-action";
import { useToast } from "./ui/use-toast";

const DropZone = () => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const [actions, setActions] = useState<Action[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isConverting, setIsConverting] = useState<boolean>(false);

  const ffmpegRef = useRef<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (!actions.length) {
      setIsDone(false);
      setIsReady(false);
      setIsConverting(false);
    } else checkIsReady();
  }, [actions]);

  //functions
  async function load() {
    const ffmpegResponse: FFmpeg = await loadFfmpeg();
    ffmpegRef.current = ffmpegResponse;
    setIsLoaded(true);
  }

  function reset() {
    setIsDone(false);
    setActions([]);
    setIsReady(false);
    setIsConverting(false);
  }

  function download(action: Action) {
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = action.url;
    a.download = action.output;

    document.body.appendChild(a);
    a.click();

    // Clean up after download
    URL.revokeObjectURL(action.url);
    document.body.removeChild(a);
  }

  function downloadAll(): void {
    for (let action of actions) {
      !action.is_error && download(action);
    }
  }

  async function convert(): Promise<any> {
    let tmp_actions = actions.map((elt) => ({
      ...elt,
      is_converting: true,
    }));
    setActions(tmp_actions);
    setIsConverting(true);
    for (let action of tmp_actions) {
      try {
        const { url, outputFormat } = await convertFile(ffmpegRef.current, action);
        tmp_actions = tmp_actions.map((elt) =>
          elt === action
            ? {
                ...elt,
                is_converted: true,
                is_converting: false,
                url,
                outputFormat,
              }
            : elt
        );
        setActions(tmp_actions);
      } catch (err) {
        tmp_actions = tmp_actions.map((elt) =>
          elt === action
            ? {
                ...elt,
                is_converted: false,
                is_converting: false,
                is_error: true,
              }
            : elt
        );
        setActions(tmp_actions);
      }
    }
    setIsDone(true);
    setIsConverting(false);
  }

  function handleUpload(data: Array<any>): void {
    handleExitHover();
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

  function updateAction(file_name: String, to: String) {
    setActions(
      actions.map((action): Action => {
        if (action.file_name === file_name) {
          return {
            ...action,
            to,
          };
        }

        return action;
      })
    );
  }

  function deleteAction(action: Action): void {
    setActions(actions.filter((elt) => elt !== action));
  }

  function checkIsReady(): void {
    let tmp_is_ready = true;
    actions.forEach((action: Action) => {
      if (!action.to) tmp_is_ready = false;
    });
    setIsReady(tmp_is_ready);
  }

  if (actions.length > 0) {
    return (
      <section className="space-y-6">
        {actions.map((action: Action, index: number) => (
          <FileAction
            key={index}
            action={action}
            isLoaded={isLoaded}
            onDelete={deleteAction}
            onDownload={download}
            updateAction={updateAction}
          />
        ))}

        <div className="flex w-full justify-end">
          {isDone ? (
            <div className="space-y-4 w-fit">
              <DownloadButton actions={actions} downloadAll={downloadAll} />
              <ResetButton reset={reset} />
            </div>
          ) : (
            <ConvertButton
              isConverting={isConverting}
              isReady={isReady}
              convert={convert}
            />
          )}
        </div>
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
