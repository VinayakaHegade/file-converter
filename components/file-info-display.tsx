import { Action } from "@/types";
import bytesToSize from "@/utils/bytes-to-size";
import compressFileName from "@/utils/compress-file-name";
import fileToIcon from "@/utils/file-to-icon";

type FileInfoDisplayProps = {
  action: Action;
};

const FileInfoDisplay = ({ action }: FileInfoDisplayProps) => {
  return (
    <div className="flex gap-4 items-center">
      <span className="text-2xl text-orange-600">
        {fileToIcon(action.file_type)}
      </span>
      <div className="flex items-center gap-1 md:w-96">
        <span className="text-md font-medium overflow-x-hidden">
          {compressFileName(action.file_name)}
        </span>
        <span className="text-gray-400 text-sm">
          ({bytesToSize(action.file_size)})
        </span>
      </div>
    </div>
  );
};

export default FileInfoDisplay;
