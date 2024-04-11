import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ref, getDownloadURL } from "firebase/storage";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { db, storage, onAuthStateChanged, auth } from "../firebase/firebase";
import { getFirebaseErrorMessage } from "../components/error/ErrorMessages";

export const AuthContext = createContext();

const Context = ({ children }) => {
  const [error, setError] = useState(null);
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
    } catch (error) {
      setError(getFirebaseErrorMessage(error.code));
      console.log(error);
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
      setError(getFirebaseErrorMessage(error.code));
      console.log(error.message);
    }
  };

  const loginWithEmailAndPassword = async (email, password) => {
    try {
      signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(getFirebaseErrorMessage(error.code));
      console.log(error.message);
    }
  };

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      setError(getFirebaseErrorMessage(error.code));
      console.log(error.message);
    }
  };

  const signOutUser = async () => {
    await signOut(auth);
    setCurrentUser(null);
    setUserData(null);
    navigate("/signin");
  };

  const changePassword = async (newPassword) => {
    if (!currentUser) {
      setError("No user logged in");
      return;
    }

    try {
      await updatePassword(currentUser, newPassword);
      console.log("Password updated successfully.");
    } catch (error) {
      if (error.code === "auth/requires-recent-login") {
        setError("Please re-authenticate to change your password.");
      } else {
        setError(getFirebaseErrorMessage(error.code));
      }
      console.error(error);
    }
  };

  const reauthenticate = async (email, currentPassword) => {
    const credential = EmailAuthProvider.credential(email, currentPassword);
    try {
      await reauthenticateWithCredential(currentUser, credential);
      console.log("Re-authentication successful.");
    } catch (error) {
      setError(getFirebaseErrorMessage(error.code));
      console.error(error);
    }
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const q = query(collectionUserRef, where("uid", "==", user.uid));
        onSnapshot(q, (doc) => {
          setUserData(doc.docs[0]?.data());
        });
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
        setUserData(null);
      }
    });

    return unsubscribe;
  }, []);

  const initialState = {
    signupUserWithEmailAndPassword: signupUserWithEmailAndPassword,
    signInWithGoogle: signInWithGoogle,
    loginWithEmailAndPassword: loginWithEmailAndPassword,
    resetPassword: resetPassword,
    signOutUser: signOutUser,
    changePassword: changePassword,
    reauthenticate: reauthenticate,
    currentUser: currentUser,
    userData: userData,
    error: error,
  };

  return (
    <AuthContext.Provider value={initialState}>{children}</AuthContext.Provider>
  );
};

export default Context;
