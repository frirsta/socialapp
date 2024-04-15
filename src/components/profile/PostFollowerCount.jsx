import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Grid from "@mui/joy/Grid";
import Box from "@mui/joy/Box";

const PostFollowerCount = () => {
  const isMobileScreen = useMediaQuery("(max-width:900px)");
  return isMobileScreen ? (
    <Sheet
      sx={{
        bgcolor: "background.level1",
        borderRadius: "sm",
        p: 1.5,
        my: 5,
        display: "flex",
        justifyContent: "space-between",
        textAlign: "center",
        gap: 2,
        "& > Box": { flex: 1 },
      }}
    >
      <Box sx={{ width: "30%" }}>
        <Typography level="body-xs" fontWeight="lg">
          Posts
        </Typography>
        <Typography fontWeight="lg">34</Typography>
      </Box>
      <Box sx={{ width: "30%" }}>
        <Typography level="body-xs" fontWeight="lg">
          Followers
        </Typography>
        <Typography fontWeight="lg">980</Typography>
      </Box>
      <Box sx={{ width: "30%" }}>
        <Typography level="body-xs" fontWeight="lg">
          Following
        </Typography>
        <Typography fontWeight="lg">8.9</Typography>
      </Box>
    </Sheet>
  ) : (
    <Grid xs={9} sx={{ display: "flex", justifyContent: "flex-end" }}>
      <Grid xs={4}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row-reverse",
            alignItems: "center",
            justifyContent: "flex-end",
            textAlign: "left",
          }}
        >
          <Typography
            level="body-xs"
            fontWeight="lg"
            sx={{ marginLeft: "6px" }}
          >
            Posts
          </Typography>
          <Typography fontWeight="lg">34</Typography>
        </Box>
      </Grid>
      <Grid xs={4}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row-reverse",
            alignItems: "center",
            justifyContent: "flex-end",
            textAlign: "left",
          }}
        >
          <Typography
            level="body-xs"
            fontWeight="lg"
            sx={{ marginLeft: "6px" }}
          >
            Followers
          </Typography>
          <Typography fontWeight="lg">980</Typography>
        </Box>
      </Grid>
      <Grid xs={4}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row-reverse",
            alignItems: "center",
            justifyContent: "flex-end",
            textAlign: "left",
          }}
        >
          <Typography
            level="body-xs"
            fontWeight="lg"
            sx={{ marginLeft: "6px" }}
          >
            Following
          </Typography>
          <Typography fontWeight="lg">8.9</Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default PostFollowerCount;
