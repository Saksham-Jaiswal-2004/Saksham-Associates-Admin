import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AdminShell from "./components/AdminShell";

const SECRET = process.env.JWT_SECRET;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Admin - Saksham Associates",
  description: "Admin Panel for Saksham Associates website",
  icons: {
    icon: "/images/SALOGO.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--deep-green)] text-[var(--beige)]`}>
        <AdminShell>{children}</AdminShell>
      </body>
    </html>
  );
}
