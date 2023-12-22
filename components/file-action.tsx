import { Action } from "@/types";
import { BiError } from "react-icons/bi";
import { ImSpinner3 } from "react-icons/im";
import { MdClose, MdDone } from "react-icons/md";
import ConversionFormatSelector from "./conversion-format-selector";
import FileInfoDisplay from "./file-info-display";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

type FileActionProps = {
  action: Action;
  isLoaded: boolean;
  onDelete: (action: Action) => void;
  onDownload: (action: Action) => void;
  updateAction: (file_name: string, to: string) => void;
};

const FileAction = ({
  action,
  isLoaded,
  onDelete,
  onDownload,
  updateAction,
}: FileActionProps) => {
  return (
    <div className="w-full py-4 space-y-2 lg:py-0 relative cursor-pointer rounded-xl border h-fit lg:h-20 px-4 lg:px-10 flex flex-wrap gap-x-4 lg:flex-nowrap items-center justify-between">
      {!isLoaded && (
        <Skeleton className="h-full w-full -ml-10 cursor-progress absolute rounded-xl" />
      )}

      <FileInfoDisplay action={action} />

      {action.is_error ? (
        <Badge variant="destructive" className="flex gap-2">
          <span>Error Converting File</span>
          <BiError />
        </Badge>
      ) : action.is_converted ? (
        <Badge variant="default" className="flex gap-2 bg-green-500">
          <span>Done</span>
          <MdDone />
        </Badge>
      ) : action.is_converting ? (
        <Badge variant="default" className="flex gap-2">
          <span>Converting</span>
          <span className="animate-spin">
            <ImSpinner3 />
          </span>
        </Badge>
      ) : (
        <ConversionFormatSelector action={action} updateAction={updateAction} />
      )}

      {action.is_converted ? (
        <Button variant="outline" onClick={() => onDownload(action)}>
          Download
        </Button>
      ) : (
        <span
          onClick={() => onDelete(action)}
          className="cursor-pointer hover:bg-gray-50 rounded-full h-10 w-10 flex items-center justify-center text-2xl text-gray-400"
        >
          <MdClose />
        </span>
      )}
    </div>
  );
};

export default FileAction;
