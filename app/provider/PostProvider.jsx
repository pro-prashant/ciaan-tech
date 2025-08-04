
"use client";
import React, { useEffect, useState } from "react";
import { PostContext } from "../context/PostContext";
import axios from "axios";
import { toast } from "react-toastify";

function PostProvider({ children }) {
  const [postData, setPostData] = useState("");
  const [getPost, setGetPost] = useState([]);
  const [loading, setLoading] = useState(false);

  const handlePostData = async () => {
    if (!postData.trim()) return;

    try {
      const response = await axios.post(
        `/api/post/createPost`,
        { post: postData },
        { withCredentials: true }
      );
      console.log(response.data);
      toast.success(response?.data?.message || "Post Created");
      setPostData(""); 
      await handleGetPost(); 
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      console.log(error);
    }
  };

  const handleGetPost = async () => {
    setLoading(true); 
    try {
      const response = await axios.get(`/api/post/getPost`, {
        withCredentials: true,
      });
      console.log(response.data);
      setGetPost(response.data.post || []); 
    } catch (error) {
      console.log(error);
      toast.error("Failed to load posts");
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    handleGetPost();
  }, []);

  const value = {
    postData,
    setPostData,
    getPost,
    setGetPost,
    handleGetPost,
    handlePostData,
    loading,
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
}

export default PostProvider;
