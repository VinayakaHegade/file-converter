import { Button } from "../ui/button";

type ResetButtonProps = {
  reset: () => void;
};

const ResetButton = ({ reset }: ResetButtonProps) => {
  return (
    <Button size="lg" onClick={reset} variant="outline" className="rounded-xl">
      Convert Another File(s)
    </Button>
  );
};

export default ResetButton;
