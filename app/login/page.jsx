
"use client"
import axios from 'axios';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

const Login = () => {
  
    const router = useRouter();
     const [data,setData] = useState({
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
            console.log(data);
            const response = await axios.post(`/api/authentication/login`,data,{withCredentials:true});
              toast.success(response?.data?.message || "Login Successfully");
            console.log(response);
             setTimeout(() => {
             router.push('/');
             router.refresh();
              }, 400);;
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
          Login
        </motion.button>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <span
            onClick={() => router.push("/register")}
            className="text-blue-500 hover:underline cursor-pointer"
          >
           Signup
          </span>
        </p>
      </form>
    </motion.div>
  )
}

export default Login
