import { useLocation } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";

import Button from "./Button";

import { useState } from "react";
import { c2p_logo } from "../assets";

const Header = () => {
  const pathname = useLocation();
  const [openNavigation, setOpenNavigation] = useState(false);

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

  const handleClick = () => {
    if (!openNavigation) return;

    enablePageScroll();
    setOpenNavigation(false);
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50  border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ${
        openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"
      }`}
    >
      <div className="flex items-center justify-between px-5 lg:px-7.5 xl:px-10 max-lg:py-4 py-5">
        <a
          className="w-[12rem] xl:mr-8 flex flex-row items-center justify-center gap-2"
          href="#hero"
        >
          <img
            src={c2p_logo}
            width={40}
            height={40}
            alt="connect2pet_logo"
            className="text-white"
          />
          <p className="text-xl">onnect2Pet</p>
        </a>

        {/* <Button className="hidden lg:flex" href="#login">
          Sign in
        </Button>

        <Button
          className="ml-auto lg:hidden"
          px="px-3"
          onClick={toggleNavigation}
        ></Button> */}
      </div>
    </div>
  );
};

export default Header;
