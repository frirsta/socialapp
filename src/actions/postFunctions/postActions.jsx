import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

export const deletePost = async (user, uid, documentId) => {
  try {
    if (user?.uid === uid) {
      await deleteDoc(doc(db, "posts", documentId));
    } else {
      alert("You can only delete your own posts");
    }
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = async (user, uid, documentId, text) => {
  try {
    if (user?.uid === uid) {
      await updateDoc(doc(db, "posts", documentId), {
        text: text,
      });
    } else {
      alert("You can only update your own posts");
    }
  } catch (error) {
    console.log(error);
  }
};
