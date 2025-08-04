
import connectionDb from "@/lib/Db";
import Post from "@/Model/PostData";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectionDb();

    const post = await Post.find().populate("user", "name email");

    if (!post || post.length === 0) {
      return NextResponse.json({ msg: "No posts found", success: false });
    }

    return NextResponse.json({
      msg: "Post fetched successfully",
      success: true,
      post,
    });

  } catch (error) {
    console.error("🔥 GET ERROR:", error);
    return NextResponse.json({
      msg: "Server Error",
      success: false,
      error: error.message,
    });
  }
}
