import { useMediaQuery } from "@mui/material";
import React from "react";
import BottomNavbar from "./BottomNavbar";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const isMobileScreen = useMediaQuery("(max-width:600px)");
  return <> {isMobileScreen ? <BottomNavbar /> : <Sidebar />}</>;
};

export default Navbar;
