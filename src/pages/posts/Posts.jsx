import React, { useEffect, useReducer, useState } from "react";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import Alert from "@mui/joy/Alert";
import Box from "@mui/joy/Box";
import { Reducer, postActions, postState } from "../../context/Reducer";
import { deletePost } from "../../actions/postFunctions/postActions";
import { db } from "../../firebase/firebase";
import Post from "./Post";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [state, dispatch] = useReducer(Reducer, postState);
  const { HANDLE_ERROR, SUBMIT_POST } = postActions;

  const getPosts = async () => {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, "posts"), orderBy("timestamp", "desc"))
      );
      if (querySnapshot.empty) {
        dispatch({
          type: HANDLE_ERROR,
          payload: "No posts available at the moment",
        });
        console.log("No posts available at the moment");
        return [];
      }
      const postsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return postsData;
    } catch (error) {
      dispatch({ type: HANDLE_ERROR, payload: error });
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.log(error);
        scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
      }
    };
    fetchPosts();
  }, []);

  return (
    <Box
      sx={{
        paddingTop: "64px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      {state?.error ? (
        <Alert color="danger">
          Something went wrong refresh and try again...
        </Alert>
      ) : (
        posts.map((item) => {
          return (
            <Post
              key={item?.id}
              profilePicture={item?.profilePicture}
              username={item?.username}
              uid={item?.uid}
              image={item?.image}
              documentId={item?.documentId}
              email={item?.email}
              text={item?.text}
              timestamp={item?.timestamp}
              deletePost={deletePost}
            />
          );
        })
      )}
    </Box>
  );
};

export default Posts;
