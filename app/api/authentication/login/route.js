
import User from "@/Model/UserData";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import connectionDb from "@/lib/Db";

const isProd = process.env.NODE_ENV === "production";

const cookieOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60,
  path: "/",
};

export async function POST(req) {
  try {
    await connectionDb();

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ msg: "Email and Password required" }, { status: 400 });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ msg: "Invalid User" }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json({ msg: "Invalid Password" }, { status: 401 });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const response = NextResponse.json({
      msg: "Login Successful",
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });

    response.cookies.set("token", token, cookieOptions);

    return response;
  } catch (error) {
    console.log("Login Error:", error);
    return NextResponse.json({ msg: "Login failed", success: false }, { status: 500 });
  }
}
