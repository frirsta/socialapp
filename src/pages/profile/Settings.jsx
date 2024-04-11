import { Box, Typography } from "@mui/material";
import React from "react";

const Settings = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography>Settings</Typography>
    </Box>
  );
};

export default Settings;
