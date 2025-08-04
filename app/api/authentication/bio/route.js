
import connectionDb from "@/lib/Db";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/Model/UserData";

export async function PUT(req) {
  try {
    await connectionDb();

    
    const { bio } = await req.json();

    if (!bio) {
      return NextResponse.json({ msg: "Bio not found" }, { status: 400 });
    }

  
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
    }


    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id || decoded._id;


    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { bio: bio || "" },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ msg: "User not found" }, { status: 404 });
    }


    return NextResponse.json({ message: "Bio updated", user: updatedUser });

  } catch (err) {
    console.error("❌ PUT error:", err.message);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
