import { db } from "@/app/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

export async function POST(req) {
  const { Email, Password } = await req.json();

  try {
    const usersRef = collection(db, "Users");
    const q = query(usersRef, where("Email", "==", Email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const snap = querySnapshot.docs[0];
    const userData = snap.data();

    if (userData.Password !== Password) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    if (!userData.admin) {
      return NextResponse.json({ error: "Access denied: Not an admin" }, { status: 403 });
    }

    const token = jwt.sign(
      { email: Email, role: userData.role || "user" },
      SECRET,
      { expiresIn: "1d" }
    );

    const res = NextResponse.json({ success: true });
    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });

    return res;

  } catch (error) {
    console.error("Login error:", error.message);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
