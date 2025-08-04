
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import User from "@/Model/UserData";
import connectionDb from "@/lib/Db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectionDb();

    const cookieStore = cookies(); 
    const token = cookieStore.get("token")?.value;
    console.log("Token From Cookie:", token);

    if (!token) {
      return NextResponse.json({ msg: "Token not provided", user: null }, { status: 401 });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded token:", decoded);
    } catch (error) {
      console.error("JWT error:", error.message); 
      return NextResponse.json({ msg: "Invalid token", user: null }, { status: 401 });
    }

    const userId = decoded.id || decoded._id;
    console.log("userId:", userId);

    const user = await User.findById(userId).select("-password");
    console.log("User from DB:", user);

    if (!user) {
      return NextResponse.json({ msg: "User not found", user: null }, { status: 404 });
    }

    return NextResponse.json({ msg: "User found", user, success: true });

  } catch (error) {
    console.error("Unexpected error:", error.message);
    return NextResponse.json({ msg: "Something went wrong", user: null }, { status: 500 });
  }
}
