import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import FilterVintageOutlinedIcon from "@mui/icons-material/FilterVintageOutlined";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ExitToAppOutlined from "@mui/icons-material/ExitToAppOutlined";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import useMediaQuery from "@mui/material/useMediaQuery";
import AddPost from "../posts/AddPost";
import Typography from "@mui/material/Typography";
import { AuthContext } from "../../context/AuthContext";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  mr: open ? 3 : "auto",
  minHeight: 48,
  px: 2.5,
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Sidebar() {
  const isTabletScreen = useMediaQuery("(min-width: 767px)");
  const isDesktopScreen = useMediaQuery("(min-width: 1200px)");
  const [open, setOpen] = useState(false);
  const { signOutUser, userData, currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (isDesktopScreen) {
      setOpen(true);
    } else if (isTabletScreen) {
      setOpen(false);
    } else {
      setOpen(false);
    }
  }, [open, isTabletScreen, isDesktopScreen]);
  console.log(userData, currentUser);
  return (
    currentUser && (
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Toolbar sx={{ zIndex: 88, position: "fixed" }}></Toolbar>
        <Drawer
          sx={{ position: "relative", zIndex: "3" }}
          variant="permanent"
          open={open}
        >
          <DrawerHeader sx={{ padding: "8px 20px", margin: "10px 0" }}>
            {open ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <FilterVintageOutlinedIcon sx={{ marginRight: "24px" }} />

                <Typography fontWeight={"bold"}>FrirstaGram</Typography>
              </Box>
            ) : (
              <FilterVintageOutlinedIcon />
            )}
          </DrawerHeader>
          <Divider />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <List>
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  LinkComponent={Link}
                  to={"/"}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <HomeRoundedIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Home"
                    sx={{ opacity: open ? 1 : 0, color: "#000" }}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  LinkComponent={Link}
                  to={"/notifications"}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <FavoriteBorderOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Notifications"
                    sx={{ opacity: open ? 1 : 0, color: "#000" }}
                  />
                </ListItemButton>
              </ListItem>
              <AddPost openSidebar={open} />
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  LinkComponent={Link}
                  to={"/explore"}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <SearchOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Explore"
                    sx={{ opacity: open ? 1 : 0, color: "#000" }}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  LinkComponent={Link}
                  to={`/profile/${userData?.uid}`}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <Avatar
                      src={userData?.profilePicture}
                      sx={{ width: 24, height: 24 }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary="Profile"
                    sx={{ opacity: open ? 1 : 0, color: "#000" }}
                  />
                </ListItemButton>
              </ListItem>
            </List>
            <List>
              <ListItemButton
                onClick={signOutUser}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <ExitToAppOutlined />
                </ListItemIcon>
              </ListItemButton>
            </List>
          </Box>
        </Drawer>
      </Box>
    )
  );
}
