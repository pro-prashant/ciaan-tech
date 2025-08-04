
"use client";
import { PostContext } from "@/app/context/PostContext";
import axios from "axios";
import { motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { toast } from "react-toastify";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [edit, setEdit] = useState("");

  const { getPost, setGetPost } = useContext(PostContext);

  const handleFetchUser = async () => {
    try {
      const response = await axios.get(`/api/authentication/profile`, {
        withCredentials: true,
      });
      const result = response.data.user;
      console.log("✅ User Fetched:", result);
      setUserData(result);
    } catch (error) {
      console.error("❌ Error fetching user:", error.message);
    }
  };

  const handleUpdateUser = async () => {
    try {
      const response = await axios.put(
        "/api/authentication/bio",
        { bio: edit },
        { withCredentials: true }
      );
      toast.success(response?.data?.message || "Updated Successfully");
      setUserData(response.data.user);
      setShowEdit(false);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetchUser();
  }, []);

  return (
    <motion.div
      className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* User Info */}
      <motion.div
        className="flex items-center gap-4 mb-6"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xl font-bold">
          {userData?.name?.charAt(0).toUpperCase() ?? "?"}
        </div>
        <div>
          <h2 className="text-2xl font-semibold">{userData?.name ?? "User Name"}</h2>
          <p className="text-gray-500">{userData?.email ?? "Email not available"}</p>
        </div>
      </motion.div>

      {/* Bio Section */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-lg font-medium">📝 Bio Add and Edit</h3>
          <button
            className="text-blue-600 hover:text-blue-800 transition cursor-pointer"
            title="Edit Bio"
            onClick={() => setShowEdit((prev) => !prev)}
          >
            <FiEdit2 size={20} className="shadow-sm border-2 border-white" />
          </button>
        </div>

        {showEdit && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-between gap-2"
          >
            <input
              type="text"
              value={edit}
              onChange={(e) => setEdit(e.target.value)}
              placeholder="Add and Edit your bio"
              className="border-black border-2 rounded w-[50%] h-10 px-2"
            />
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              onClick={handleUpdateUser}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Save
            </motion.button>
          </motion.div>
        )}

        {!showEdit && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-700 whitespace-pre-line"
          >
            {userData?.bio || "No bio added yet."}
          </motion.p>
        )}
      </div>

      {/* User Posts */}
      <div>
        <h3 className="text-lg font-medium mb-2">🗂 Your Posts</h3>
        <div className="space-y-4">
          {getPost?.length > 0 ? (
            getPost
              .filter((post) => post.user._id === userData?._id)
              .map((post, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  className="border p-4 rounded-lg shadow-md hover:shadow-lg transition"
                >
                  <p>{post.post}</p>
                  <p className="text-sm text-gray-400 mt-2">
                    🕒 {new Date(post.createdAt).toLocaleString()}
                  </p>
                </motion.div>
              ))
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-500"
            >
              No posts yet.
            </motion.p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
