'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import '../../globals.css'

export default function Login() {
  const [form, setForm] = useState({ Email: "", Password: "" });
  const router = useRouter();

  async function handleSubmit(e) {
  e.preventDefault();
  const res = await fetch("/api/login", {
    method: "POST",
    body: JSON.stringify(form),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include"
  });

  if (res.ok) {
    alert("Login Success!");
    router.push("/");
  } else {
    const error = await res.json();
    alert(`Login failed: ${error.error || "Unknown error"}`);
  }
}

  return (
    <form onSubmit={handleSubmit} className="w-full h-screen flex flex-col gap-4 justify-center items-center">
      <input placeholder="Email" onChange={e => setForm({ ...form, Email: e.target.value })} className="input"/>
      <input type="password" placeholder="Password" onChange={e => setForm({ ...form, Password: e.target.value })} className="input"/>
      <button type="submit" className="border hover:bg-black/20 px-3 py-1">Login</button>
    </form>
  );
}