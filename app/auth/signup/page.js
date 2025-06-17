'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify(form),
    });

    if (res.ok) router.push("/");
    else alert("Signup failed");
  }

  return (
    <form onSubmit={handleSubmit} className="w-full h-screen flex flex-col gap-4 justify-center items-center">
      <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button type="submit" className="border hover:bg-black/20 px-3 py-1">Signup</button>
    </form>
  );
}