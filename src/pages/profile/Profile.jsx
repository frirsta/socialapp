import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
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
  return <div>{profileData?.username}</div>;
};

export default Profile;
