import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import React from "react";
import { useNavigate } from "react-router-dom";
import { db, storage, onAuthStateChanged } from "../firebase/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

export const AuthContext = createContext();
const Context = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [userData, setUserData] = useState();
  const navigate = useNavigate();
  const collectionUserRef = collection(db, "users");
  const provider = new GoogleAuthProvider();

  const createUserWithEmailAndPassword = async (email, password, username) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const defaultProfileRef = ref(storage, "default/default_profile.png");
      const defaultProfilePicUrl = await getDownloadURL(defaultProfileRef);

      await addDoc(collectionUserRef, {
        uid: user?.uid,
        email: user?.email,
        username: username,
        providerId: "email/password",
        profilePicture: defaultProfilePicUrl,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const popup = await signInWithPopup(auth, provider);
      const user = popup.user;
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

  const signInWithEmailAndPassword = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
    }
  };

  const sendPasswordResetEmail = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error(error);
    }
  };

  const signOut = async () => {
    await signOut(auth);
  };

  const onAuthStateChanged = async () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const q = query(collectionUserRef, where("uid", "==", user?.uid));
        await onSnapshot(q, (doc) => {
          setUserData(doc?.docs[0]?.data());
        });
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
        setUserData(null);
        navigate("/");
      }
    });
  };
  useEffect(() => {
    onAuthStateChanged();
    if (currentUser || userData) {
      navigate("/");
    } else {
      navigate("/signin");
    }
  }, []);
  const initialState = {
    createUserWithEmailAndPassword: createUserWithEmailAndPassword,
    signInWithGoogle: signInWithGoogle,
    signInWithEmailAndPassword: signInWithEmailAndPassword,
    sendPasswordResetEmail: sendPasswordResetEmail,
    signOut: signOut,
    currentUser: currentUser,
    userData: userData,
  };

  return (
    <AuthContext.Provider value={initialState}>{children}</AuthContext.Provider>
  );
};

export default Context;
