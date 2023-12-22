import { Action } from "@/types";
import { Button } from "../ui/button";
import { HiOutlineDownload } from "react-icons/hi";

type DownloadButtonProps = {
    actions: Action[];
    downloadAll: () => void
}

const DownloadButton = ({actions, downloadAll}: DownloadButtonProps) => {
    return (
      <Button
        size="lg"
        className="rounded-xl font-semibold relative py-4 text-md flex gap-2 items-center w-full"
        onClick={downloadAll}
      >
        {actions.length > 1 ? "Download All" : "Download"}
        <HiOutlineDownload />
      </Button>
    );
}

export default DownloadButton;
