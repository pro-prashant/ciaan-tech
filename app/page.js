
"use client";
import { motion } from "framer-motion";
import { useContext } from "react";
import Card from "./component/Card";
import Navbar from "./component/Navbar";
import { PostContext } from "./context/PostContext";

export default function Home() {
  const {
    postData,
    setPostData,
    getPost,
    setGetPost,
    handleGetPost,
    handlePostData,
    loading, 
  } = useContext(PostContext);

  return (
    <>
      <Navbar />
      <motion.div
        className="max-w-3xl mx-auto mt-10 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <motion.div
          className="mb-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-4xl font-extrabold text-blue-700 tracking-tight">
            🌐 CIAAN Community Feed
          </h1>
          <p className="text-gray-500 mt-2 text-base">
            Share your thoughts with the tech community.
          </p>
        </motion.div>

        {/* Create Post Form */}
        <motion.div
          className="bg-white p-6 rounded-2xl shadow-xl mb-6"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <textarea
            rows={4}
            className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="What's on your mind?"
            value={postData}
            onChange={(e) => setPostData(e.target.value)}
          ></textarea>
          <div className="flex justify-end mt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-xl font-semibold transition"
              onClick={handlePostData}
            >
              Post
            </motion.button>
          </div>
        </motion.div>

        {/* Render Posts */}
        <motion.div
          className="space-y-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          {loading ? (
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
              <p className="ml-2 text-blue-600 font-medium">Loading posts...</p>
            </div>
          ) : Array.isArray(getPost) && getPost.length > 0 ? (
            getPost.map((postItem) => (
              <Card postItem={postItem} key={postItem._id} />
            ))
          ) : (
            <p className="text-center text-gray-500">No posts found.</p>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}
