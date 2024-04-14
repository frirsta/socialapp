import Box from "@mui/material/Box";
import React from "react";
import Posts from "../posts/Posts";

const Home = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Posts />
    </Box>
  );
};

export default Home;
