import Link from "next/link";
import { FiMenu } from "react-icons/fi";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "./ui/sheet";

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger className="block md:hidden p-3">
        <span className="text-2xl">
          <FiMenu />
        </span>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetDescription className="w-full space-y-3">
            <Link href="/">
              <Button variant="link" className="font-semibold w-full ">
                Home
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="link" className="font-semibold w-full">
                About
              </Button>
            </Link>
            <Link href="https://github.com/VinayakaHegade/file-converter">
              <Button variant="link" className="font-semibold w-full">
                Github
              </Button>
            </Link>
            <Link href="/privacy-policy">
              <Button variant="link" className="font-semibold w-full">
                Privacy Policy
              </Button>
            </Link>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
