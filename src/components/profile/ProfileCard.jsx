import React, { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Button from "@mui/joy/Button";
import Box from "@mui/joy/Box";
import Grid from "@mui/joy/Grid";
import Avatar from "@mui/joy/Avatar";
import Tooltip from "@mui/joy/Tooltip";
import PostFollowerCount from "./PostFollowerCount";
import Link from "@mui/joy/Link";
import { AuthContext } from "../../context/AuthContext";

const ProfileCard = ({
  username,
  uid,
  followers,
  posts,
  following,
  handleUpdateProfile,
  user,
}) => {
  const isMobileScreen = useMediaQuery("(max-width: 767px)");
  const isTabletScreen = useMediaQuery("(min-width: 900px)");
  const [file, setFile] = useState(null);
  // const { currentUser } = useContext(AuthContext);
  return (
    <Box
      sx={{
        width: "100%",
        margin: isMobileScreen ? "10px 0 30px 0" : "60px 0 60px 0",
        display: "flex",
        flexDirection: "column",
      }}
      justifyContent={{ xs: "center", sm: "flex-start" }}
      alignItems={{ xs: "center", sm: "flex-start" }}
    >
      <Grid
        xs={12}
        sm={12}
        md={12}
        spacing={1}
        container
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
        alignItems={{ xs: "center", md: "flex-start" }}
        justifyContent={{ xs: "flex-start", sm: "flex-start" }}
      >
        <Grid
          xs={2}
          container
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            height: "120px",
            margin: isMobileScreen ? "0 15px" : "0 50px",
          }}
        >
          {isMobileScreen ? (
            user?.uid === uid ? (
              <Link
                component="button"
                onClick={() => handleUpdateProfile(user, file)}
              >
                <Avatar sx={{ width: "77px", height: "77px" }} />
              </Link>
            ) : (
              <Avatar sx={{ width: "77px", height: "77px" }} />
            )
          ) : user?.uid === uid ? (
            <Link
              component="button"
              onClick={() => handleUpdateProfile(user, file)}
            >
              {" "}
              <Avatar sx={{ height: "150px", width: "150px" }} />
            </Link>
          ) : (
            <Avatar sx={{ height: "150px", width: "150px" }} />
          )}
        </Grid>
        {user?.uid === uid ? (
          <Grid
            xs={8}
            md={12}
            spacing={1}
            container
            sx={{
              maxWidth: isMobileScreen ? "300px" : "500px",
              flexGrow: 2,
            }}
          >
            <Grid xs={12}>Username1</Grid>
            <Grid md={4} xs={6}>
              <Button size="sm" sx={{ width: "100%", maxWidth: "40vw" }}>
                Edit Profile
              </Button>
            </Grid>
            <Grid md={4} xs={6}>
              <Button size="sm" sx={{ width: "100%", maxWidth: "40vw" }}>
                Settings
              </Button>
            </Grid>
            <Grid md={4} xs={12}>
              <Button size="sm" sx={{ width: "100%" }}>
                Edit profile
              </Button>
            </Grid>
            {isTabletScreen && <PostFollowerCount />}
          </Grid>
        ) : (
          <Grid
            xs={8}
            sm={7}
            lg={5}
            spacing={1}
            container
            sx={{
              maxWidth: "250px",
              flexGrow: 1,
              display: "flex",
            }}
            justifyContent={{ xs: "flex-start", md: "flex-end" }}
            alignItems={{ xs: "center", md: "flex-start" }}
          >
            <Grid md={3} xs={6}>
              <Button size="sm" sx={{ width: "100%" }}>
                Follow
              </Button>
            </Grid>
            <Grid md={3} xs={6}>
              <Tooltip title="Coming soon!" variant="plain">
                <Button size="sm" sx={{ width: "100%" }}>
                  Message
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default ProfileCard;
