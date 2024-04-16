import React, { useState } from "react";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import GridOnOutlinedIcon from "@mui/icons-material/GridOnOutlined";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const ProfileGallerySaved = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Tabs
      sx={{ width: "100%", padding: "10px 0", maxWidth: "unset" }}
      value={value}
      onChange={handleChange}
      aria-label="Posts and saved posts tabs"
    >
      <Tab
        sx={{ width: "50%", maxWidth: "unset" }}
        icon={<GridOnOutlinedIcon />}
        aria-label="Posts"
      />

      <Tab
        sx={{ width: "50%", maxWidth: "unset" }}
        icon={<BookmarkBorderOutlinedIcon />}
        aria-label="Saved posts"
      />
    </Tabs>
  );
};

export default ProfileGallerySaved;
