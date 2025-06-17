import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = cookies(); // ✅ Already awaited internally
  cookieStore.set("token", "", {
    maxAge: 0,         // Expire immediately
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  return new Response(JSON.stringify({ message: "Logged out" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
