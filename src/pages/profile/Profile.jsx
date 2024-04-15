import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/joy/Box";
import ProfileCard from "../../components/profile/ProfileCard";
import { db } from "../../firebase/firebase";
import PostFollowerCount from "../../components/profile/PostFollowerCount";

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
      <ProfileCard />
      {isMobileScreen && <PostFollowerCount />}
    </Box>
  );
};

export default Profile;
