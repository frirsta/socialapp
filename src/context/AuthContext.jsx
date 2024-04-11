import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { db, storage, onAuthStateChanged, auth } from "../firebase/firebase";

export const AuthContext = createContext();

const Context = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [userData, setUserData] = useState();
  const provider = new GoogleAuthProvider();
  const collectionUserRef = collection(db, "users");
  const navigate = useNavigate();

  const signupUserWithEmailAndPassword = async (username, email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      const defaultProfileRef = ref(storage, "default/default_profile.png");
      const defaultProfilePicUrl = await getDownloadURL(defaultProfileRef);

      await addDoc(collectionUserRef, {
        uid: user?.uid,
        email: user?.email,
        username: username,
        providerId: "email/password",
        profilePicture: defaultProfilePicUrl,
      });
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const popup = await signInWithPopup(auth, provider);
      const user = popup?.user;
      const q = query(collectionUserRef, where("uid", "==", user?.uid));
      const docs = await getDocs(q);
      if (docs.empty) {
        const defaultProfileRef = ref(storage, "default/default_profile.png");
        const defaultProfilePicUrl = await getDownloadURL(defaultProfileRef);
        const defaultUsername = user?.email.split("@")[0];

        await addDoc(collectionUserRef, {
          uid: user?.uid,
          email: user?.email,
          username: defaultUsername,
          profilePicture: defaultProfilePicUrl,
          authProvider: popup?.providerId,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const loginWithEmailAndPassword = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
    }
  };

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error(error);
    }
  };

  const signOutUser = async () => {
    await signOut(auth);
  };

  const userStateChange = async () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const q = query(collectionUserRef, where("uid", "==", user?.uid));
        onSnapshot(q, (doc) => {
          setUserData(doc?.docs[0]?.data());
        });
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
  };

  useEffect(() => {
    userStateChange();
    if (currentUser || userData) {
      console.log("User is logged in", currentUser, userData);
      navigate("/");
    } else {
      console.log("User is not logged in", currentUser, userData);
    }
    return () => {
      userStateChange();
    };
  }, []);

  const initialState = {
    signupUserWithEmailAndPassword: signupUserWithEmailAndPassword,
    signInWithGoogle: signInWithGoogle,
    loginWithEmailAndPassword: loginWithEmailAndPassword,
    resetPassword: resetPassword,
    signOutUser: signOutUser,
    currentUser: currentUser,
    userData: userData,
  };

  return (
    <AuthContext.Provider value={initialState}>{children}</AuthContext.Provider>
  );
};

export default Context;
