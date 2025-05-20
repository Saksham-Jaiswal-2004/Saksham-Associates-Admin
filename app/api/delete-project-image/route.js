// app/api/delete-project-image/route.js
import { NextResponse } from 'next/server';
import cloudinary from '../../lib/cloudinary';

export async function POST(request) {
  try {
    const { publicIds } = await request.json();

    const deletePromises = publicIds.map((id) =>
      cloudinary.uploader.destroy(id)
    );

    await Promise.all(deletePromises);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Cloudinary deletion failed:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
