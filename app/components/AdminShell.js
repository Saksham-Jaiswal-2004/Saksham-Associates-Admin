"use client";

import { usePathname } from "next/navigation";
import SideNav from "./SideNav";
import Navbar from "./Navbar";

export default function AdminShell({ children }) {
  const pathname = usePathname();

  if (pathname?.startsWith("/auth")) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[var(--deep-green)] text-[var(--beige)]">
      <SideNav />
      <div className="min-h-screen lg:pl-72">
        <Navbar />
        <main className="mx-auto w-full max-w-[1600px] px-4 pb-10 pt-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}