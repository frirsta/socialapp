import React from "react";
import { BrowserRouter } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/joy/Box";
import Context from "./context/AuthContext";
import Navbar from "./components/navbar/Navbar";
import Base from "./Base";

function App() {
  const isMobileScreen = useMediaQuery("(max-width: 767px)");
  const isTabletScreen = useMediaQuery("(min-width: 767px)");
  const isDesktopScreen = useMediaQuery("(min-width: 1200px)");
  return (
    <BrowserRouter>
      <Context>
        <Navbar />
        <Box
          sx={{
            width: isDesktopScreen
              ? "calc(100% - 240px)"
              : isTabletScreen
              ? "calc(100% - 64px)"
              : "100%s",
            marginLeft: "auto",
            padding: isTabletScreen ? "30px 20px 0 20px" : "0",
          }}
        >
          <Box
            sx={{
              overflowX: "hidden",
              maxWidth: "935px",
              margin: "0 auto",
              display: "flex",
            }}
          >
            <Base />
          </Box>
        </Box>
      </Context>
    </BrowserRouter>
  );
}

export default App;
