
"use client";

import { createContext, useContext } from "react";

export const PostContext = createContext({});

// Create the custom hook to use the context
export const usePostContext = () => useContext(PostContext);