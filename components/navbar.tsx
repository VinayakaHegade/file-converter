import Image from "next/image";
import Link from "next/link";
import { BsGithub } from "react-icons/bs";
import MobileNav from "./mobile-nav";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <nav className="w-full backdrop-blur-md bg-opacity-30 z-50 fixed h-24 flex justify-between items-center py-10 px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-24 bg-blue-200">
      <Link href="/" className="flex justify-between items-center gap-3">
        <Image
          alt="logo"
          className="cursor-pointer w40"
          src="/images/logo.svg"
          height={50}
          width={50}
        />
        <h1 className="text-3xl font-semibold">Convio</h1>
      </Link>
      
      <div className="gap-1 md:gap-2 lg:gap-4 hidden md:flex">
        <Link href="/">
          <Button variant="ghost" className="font-semibold ">
            Home
          </Button>
        </Link>
        <Link href="/about">
          <Button variant="ghost" className="font-semibold ">
            About
          </Button>
        </Link>
        <Link href="/privacy-policy">
          <Button variant="ghost" className="font-semibold ">
            Privacy Policy
          </Button>
        </Link>
      </div>

      <Link href="https://github.com/VinayakaHegade/file-converter">
        <Button
          variant="default"
          className="rounded-full w-fit bg-blue-500 gap-2 items-center hidden md:flex"
          size="lg"
        >
          <span>Github Repo</span>
          <span className="text-sl">
            <BsGithub />
          </span>
        </Button>
      </Link>

      <MobileNav />
    </nav>
  );
};

export default Navbar;
