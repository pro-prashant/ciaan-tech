
"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';


const Signup = () => {

 const router = useRouter();
 const [data,setData] = useState({
    name:"",
    email:"",
    password:"",
 })

 const handleOnchange = (e)=>{
       const {name,value} = e.target;
       setData(prev=>({...prev,[name]:value}));
 }
 const onSubmit = async(e)=>{
     try{
        e.preventDefault();
      const response = await axios.post(`/api/authentication/register`,data,{withCredentials:true});
      toast.success(response?.data?.message || "Signup Successfully");
      console.log(response.data);
        router.push("login");
     }catch(error){
          toast.error(error?.response?.data?.message || "Something went wrong");
          console.log(error);
     }
 }
  return (
     <motion.div 
      className="max-w-md mx-auto mt-20 p-8 bg-white shadow-2xl rounded-2xl"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2 
        className="text-3xl font-bold text-center text-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        🚀 Welcome to CIAAN CYBER
      </motion.h2>

      <form  className="mt-10 space-y-6" onSubmit={onSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleOnchange}
            required
            className="w-full px-4 py-2 mt-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleOnchange}
            required
            className="w-full px-4 py-2 mt-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={handleOnchange}
            required
            className="w-full px-4 py-2 mt-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Create a password"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full py-2 mt-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition cursor-pointer"
        >
          Sign Up
        </motion.button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => router.push("login")}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Log in
          </span>
        </p>
      </form>
    </motion.div>
  )
}

export default Signup
