import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Button from "@mui/joy/Button";
import Box from "@mui/joy/Box";
import Grid from "@mui/joy/Grid";
import Avatar from "@mui/joy/Avatar";
import Typography from "@mui/joy/Typography";
import PostFollowerCount from "./PostFollowerCount";

const ProfileCard = () => {
  const isMobileScreen = useMediaQuery("(max-width:600px)");
  const isTabletScreen = useMediaQuery("(min-width:900px)");
  return (
    <Box
      sx={{
        margin: "30px 10px 10px 10px",
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <Grid
        xs={12}
        sm={12}
        md={12}
        spacing={2}
        container
        sx={{
          flexGrow: 1,
          display: "flex",
        }}
        alignItems={{ xs: "center", sm: "flex-start" }}
        justifyContent={{ xs: "center", sm: "flex-start", md: "center" }}
      >
        <Grid
          xs={4}
          md={0}
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          {isMobileScreen ? (
            <Avatar sx={{ width: "77px", height: "77px" }} />
          ) : (
            <Avatar sx={{ height: "150px", width: "150px" }} />
          )}
        </Grid>
        <Grid
          xs={8}
          sm={7}
          lg={5}
          spacing={1}
          container
          sx={{
            flexGrow: 1,
            display: "flex",
          }}
          justifyContent={{ xs: "flex-start", md: "flex-end" }}
          alignItems={{ xs: "center", md: "flex-start" }}
        >
          <Grid md={2} xs={12}>
            <Typography fontWeight="bold">Username</Typography>
          </Grid>
          <Grid md={3} xs={6}>
            <Button size="sm" sx={{ width: "100%" }}>
              Edit Profile
            </Button>
          </Grid>
          <Grid md={3} xs={6}>
            <Button size="sm" sx={{ width: "100%" }}>
              2
            </Button>
          </Grid>
          <Grid md={3} xs={12}>
            <Button size="sm" sx={{ width: "100%" }}>
              3
            </Button>
          </Grid>
          {isTabletScreen && <PostFollowerCount />}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfileCard;
