import { useState } from "react";
import { Link } from "react-router-dom";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AddBoxSharpIcon from "@mui/icons-material/AddBoxSharp";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import FavoriteSharpIcon from "@mui/icons-material/FavoriteSharp";
import Avatar from "@mui/material/Avatar";
export default function BottomNavbar() {
  const [value, setValue] = useState("recents");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        maxWidth: "100vw",
      }}
      value={value}
      onChange={handleChange}
    >
      <BottomNavigationAction
        LinkComponent={Link}
        to={"/"}
        value="home"
        icon={<HomeSharpIcon />}
      />
      <BottomNavigationAction
        LinkComponent={Link}
        to={"/explore"}
        value="explore"
        icon={<SearchSharpIcon />}
      />
      <BottomNavigationAction
        LinkComponent={Link}
        to={"/create"}
        value="create"
        icon={<AddBoxSharpIcon />}
      />
      <BottomNavigationAction
        LinkComponent={Link}
        to={"/notifications"}
        value="notifications"
        icon={<FavoriteSharpIcon />}
      />
      <BottomNavigationAction
        LinkComponent={Link}
        to={"/profile"}
        value="profile"
        icon={<Avatar sx={{ width: 24, height: 24 }} />}
      />
    </BottomNavigation>
  );
}
