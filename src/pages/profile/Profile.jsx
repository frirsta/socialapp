import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import useMediaQuery from "@mui/material/useMediaQuery";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Typography from "@mui/joy/Typography";
import Divider from "@mui/joy/Divider";
import Box from "@mui/joy/Box";
import { updateProfilePicture } from "../../actions/profileFunctions/profileFunctions";
import { db } from "../../firebase/firebase";
import ProfileCard from "../../components/profile/ProfileCard";
import PostFollowerCount from "../../components/profile/PostFollowerCount";
import ProfilePostGallery from "../../components/profile/ProfilePostGallery";
import Grid from "@mui/joy/Grid";
import ProfileGallerySaved from "../../components/profile/ProfileGallerySaved";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const isMobileScreen = useMediaQuery("(max-width:900px)");
  const { id } = useParams();

  const getProfileData = async () => {
    const q = query(collection(db, "users"), where("uid", "==", id));
    await onSnapshot(q, (doc) => {
      setProfileData(doc.docs[0].data());
    });
  };
  useEffect(() => {
    getProfileData();
    console.log(profileData);
  }, [id]);
  return (
    <Box>
      <Grid sx={{ textAlign: "center", margin: "10px" }}>
        <Typography>Username</Typography>
      </Grid>
      <Divider />
      <ProfileCard handleUpdateProfile={updateProfilePicture} />
      {isMobileScreen && <PostFollowerCount />}
      <ProfileGallerySaved />
      <ProfilePostGallery />
    </Box>
  );
};

export default Profile;
