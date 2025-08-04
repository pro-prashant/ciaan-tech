
import connectionDb from "@/lib/Db";
import Post from "@/Model/PostData";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {

    await connectionDb();

   
    const body = await req.json();
    const { post } = body;

    
    if (!post || post.trim() === "") {
      return NextResponse.json(
        { success: false, msg: "Post content is required" },
        { status: 400 }
      );
    }

   
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, msg: "Unauthorized. Token missing" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

  
    const createdPost = await Post.create({
      post,
      user: userId,
    });

 
    

    
    return NextResponse.json(
      {
        success: true,
        msg: "Post created successfully",
        post: createdPost,
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("🔥 POST ERROR:", error);
    return NextResponse.json(
      { success: false, msg: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
