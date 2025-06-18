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
      // router.push("/");
      router.push('/').then(() => window.location.reload());
    } else {
      const error = await res.json();
      alert(`Login failed: ${error.error || "Unknown error"}`);
    }
  }

  return (
    <div className="w-full h-screen flex justify-center items-center flex-col">
      <form onSubmit={handleSubmit} className="w-fit h-fit border flex flex-col gap-4 justify-center items-center px-10 py-6 rounded-xl">
        <h2 className="text-3xl mb-10">Admin Login</h2>
        <input placeholder="Email" onChange={e => setForm({ ...form, Email: e.target.value })} className="input w-[350px]" required />
        <input type="password" placeholder="Password" onChange={e => setForm({ ...form, Password: e.target.value })} className="input input w-[350px]" required />
        <button type="submit" className="border hover:bg-black/20 px-3 py-1 rounded-lg mt-4">Login</button>
      </form>
    </div>
  );
}