import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const url = req.nextUrl;

  const publicPaths = ["/auth/login", "/auth/register"];
  if (publicPaths.includes(url.pathname)) {
    return NextResponse.next();
  }

  // If token missing, redirect
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // ✅ Don't verify here; just let them through
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/AddProjects",
    "/AddTestimonials",
    "/Projects",
    "/Queries",
    "/Testimonials",
    "/Users",
  ],
};
