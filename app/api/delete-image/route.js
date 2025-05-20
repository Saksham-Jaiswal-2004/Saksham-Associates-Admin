// app/api/delete-image/route.js
import { NextResponse } from 'next/server';
import cloudinary from '../../lib/cloudinary';

export async function POST(req) {
  try {
    const { publicId } = await req.json();

    if (!publicId) {
      return NextResponse.json({ error: "Missing publicId" }, { status: 400 });
    }

    const result = await cloudinary.uploader.destroy(publicId);

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Cloudinary deletion failed:", error);
    return NextResponse.json({ error: "Image deletion failed" }, { status: 500 });
  }
}