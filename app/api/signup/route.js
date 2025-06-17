import { db } from "@/app/lib/firebase";
import { ref, get, set } from "firebase/database";
import bcrypt from "bcryptjs";
import { signToken } from "@/app/lib/auth";
import { cookies } from "next/headers";

export async function POST(req) {
  const { name, email, password } = await req.json();
  const userRef = ref(db, `Users/${btoa(email)}`);
  const existing = await get(userRef);

  if (existing.exists()) {
    return new Response(JSON.stringify({ message: "User exists" }), {
      status: 400,
    });
  }

  const hashed = await bcrypt.hash(password, 10);
  await set(userRef, { name, email, password: hashed });

  const token = signToken({ email });
  cookies().set("token", token, { httpOnly: true, path: "/", maxAge: 60 * 60 * 24 * 7 });

  return new Response(JSON.stringify({ message: "Signup success" }), { status: 200 });
}