import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import BottomNavbar from "./BottomNavbar";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const isMobileScreen = useMediaQuery("(max-width:767px)");
  return <> {isMobileScreen ? <BottomNavbar /> : <Sidebar />}</>;
};

export default Navbar;
