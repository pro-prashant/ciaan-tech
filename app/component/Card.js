
import { motion } from 'framer-motion'
import React from 'react'

const Card = ({postItem,index}) => {
  return (
     <motion.div key={index}
            
              variants={{
                hidden: { opacity: 0, y: 10 }, 
                visible: { opacity: 1, y: 0 },
              }}
              className="bg-white border rounded-2xl p-5 shadow-md hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-lg text-gray-800">{postItem?.user?.name ?? "Anonymous"}</h3>
                <span className="text-sm text-gray-400">{new Date(postItem?.createdAt).toLocaleString()}</span>
              </div>
              <p className="text-gray-700">{postItem.post}</p>
            </motion.div>
  )
}

export default Card
