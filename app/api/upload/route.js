// app/api/upload/route.js
import { NextResponse } from 'next/server';
import cloudinary from '../../lib/cloudinary';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('image');
    const folder = formData.get('folder') || 'default_folder';

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Convert uploaded Blob to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload using cloudinary upload_stream
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ folder }, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }).end(buffer);
    });

    return NextResponse.json({ 
      url: result.secure_url, 
      public_id: result.public_id, 
    }, { status: 200 });

  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return NextResponse.json({ error: 'Upload failed', details: error.message }, { status: 500 });
  }
}
