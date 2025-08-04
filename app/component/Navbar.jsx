
"use client";
import React, { useState } from "react";
import { MdMenu } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const navigate = useRouter();
   const handleLogout = async () => {
  try {
    const result = await axios.post("/api/authentication/logout", {}, {
      withCredentials: true,
    });
          toast.success("Logout Successfully",result);
          navigate.push("/login");
    console.log("Handle Logout Successfully", result.data);
  } catch (error) {
    toast.error(error);
    console.error("Logout Failed:", error);
     
  } 
}
  return (
    <div className="flex items-center justify-between bg-white px-6 py-4 shadow-md sticky top-0 z-50">
      {/* Logo */}
      <motion.h2
        className="text-3xl font-extrabold text-blue-700 tracking-wide"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        CIAAN
      </motion.h2>

      {/* Menu Icon */}
      <motion.div
        whileTap={{ scale: 0.9 }}
        className="relative"
      >
        <MdMenu
          className="text-4xl cursor-pointer text-blue-700"
          onClick={() => setMenu(prev => !prev)}
        />

        {/* Animated Dropdown Menu */}
        <AnimatePresence>
          {menu && (
            <motion.ul
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="absolute right-0 mt-2 bg-blue-700 text-white rounded-xl shadow-lg py-3 px-6 space-y-2 z-20"
            >
              <motion.li
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer hover:text-yellow-300"
                onClick={handleLogout}
              >
                Logout
              </motion.li>
              <motion.li
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer hover:text-yellow-300"
                 onClick={()=>navigate.push("/profile")} >
                Profile
              </motion.li>
            </motion.ul>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Navbar;
