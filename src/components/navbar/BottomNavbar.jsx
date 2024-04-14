import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FavoriteSharpIcon from "@mui/icons-material/FavoriteSharp";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import BottomNavigation from "@mui/material/BottomNavigation";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import Avatar from "@mui/material/Avatar";
import { AuthContext } from "../../context/AuthContext";
import AddPost from "../posts/AddPost";

export default function BottomNavbar() {
  const { currentUser, userData } = useContext(AuthContext);
  const [value, setValue] = useState("home");

  console.log(currentUser, userData);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    currentUser && (
      <BottomNavigation
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          maxWidth: "100vw",
          zIndex: 1000,
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
        <AddPost />
        <BottomNavigationAction
          LinkComponent={Link}
          to={"/notifications"}
          value="notifications"
          icon={<FavoriteSharpIcon />}
        />
        <BottomNavigationAction
          LinkComponent={Link}
          to={`/profile/${userData?.uid}`}
          value="profile"
          icon={
            <Avatar
              src={userData?.profilePicture}
              sx={{ width: 24, height: 24 }}
            />
          }
        />
      </BottomNavigation>
    )
  );
}
