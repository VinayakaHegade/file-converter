import { ImSpinner3 } from "react-icons/im";
import { Button } from "../ui/button";

type ConvertButton = {
  isConverting: boolean;
  isReady: boolean;
  convert: () => Promise<any>;
};

const ConvertButton = ({isConverting,isReady, convert }: ConvertButton) => {
  return (
    <Button
      size="lg"
      disabled={!isReady || isConverting}
      className="rounded-xl font-semibold relative py-4 text-md flex items-center w-44"
      onClick={convert}
    >
      {isConverting ? (
        <span className="animate-spin text-lg">
          <ImSpinner3 />
        </span>
      ) : (
        <span>Convert Now</span>
      )}
    </Button>
  );
};

export default ConvertButton;
