import { useReducer, useState, useContext, useEffect, useRef } from "react";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useFormik } from "formik";
import * as yup from "yup";
import { Reducer, postActions, postState } from "../../context/Reducer";
import { db, storage } from "../../firebase/firebase";
import { AuthContext } from "../../context/AuthContext";

export const useAddPost = () => {
  const { userData, currentUser } = useContext(AuthContext);
  const [showExitConfirmation, setShowExitConfirmation] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [state, dispatch] = useReducer(Reducer, postState);
  const { HANDLE_ERROR } = postActions;
  const text = useRef("");
  const collectionRef = collection(db, "posts");
  const postRef = doc(collection(db, "posts"));
  const document = postRef.id;

  const handleOpenModal = (value) => {
    setOpenModal(value);
  };

  const handleCloseModal = () => {
    setShowExitConfirmation(false);
    setImage(null);
    setFile(null);
    setProgress(0);
    formik.resetForm();
    setOpenModal(false);
  };

  const handleExit = () => {
    if (formik.values.text || file) {
      setShowExitConfirmation(true);
    } else {
      handleCloseModal();
    }
  };

  const handleReturn = () => {
    setShowExitConfirmation(false);
  };

  const metadata = {
    contentType: [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/svg+xml",
    ],
  };
  const handleUpload = (e) => {
    e.preventDefault();
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    if (formik.isValid) {
      try {
        if (file) {
          await submitImage();
        }
        await setDoc(postRef, {
          documentId: document,
          uid: currentUser?.uid || userData?.uid,
          profilePicture:
            currentUser?.profilePicture || userData?.profilePicture,
          username: currentUser?.username || userData?.username,
          email: currentUser?.email || userData?.email,
          image: image,
          text: formik.values.text,
          timestamp: serverTimestamp(),
        });
        handleCloseModal();
      } catch (err) {
        dispatch({ type: HANDLE_ERROR });
        alert(err.message);
      }
    } else {
      dispatch({ type: HANDLE_ERROR });
    }
  };

  const submitImage = async () => {
    const fileType = metadata.contentType.includes(file["type"]);
    if (!file) return;
    if (fileType) {
      try {
        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(
          storageRef,
          file,
          metadata.contentType
        );
        await uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progress);
          },
          (error) => {
            alert(error);
          },
          async () => {
            await getDownloadURL(uploadTask.snapshot.ref).then(
              (downloadURL) => {
                setImage(downloadURL);
              }
            );
          }
        );
      } catch (err) {
        dispatch({ type: HANDLE_ERROR });
        alert(err.message);
      }
    }
  };

  useEffect(() => {}, [collectionRef]);
  const initialValues = {
    text: "",
  };

  const validationSchema = yup.object({
    text: yup.string().max("250", "Max 250 characters"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    handleSubmitPost,
  });

  return {
    dispatch,
    handleUpload,
    submitImage,
    handleSubmitPost,
    handleCloseModal,
    handleOpenModal,
    handleExit,
    handleReturn,
    formik,
    state,
    progress,
    text,
    file,
    image,
    currentUser,
    userData,
    openModal,
    showExitConfirmation,
  };
};
