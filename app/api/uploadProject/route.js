import { NextResponse } from 'next/server';
import cloudinary from '../../lib/cloudinary';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('images'); // All uploaded images
    const thumbnail = formData.get('thumbnail'); // Separate thumbnail file
    const folder = formData.get('folder') || 'projects';

    if (!thumbnail || files.length === 0) {
      return NextResponse.json({ error: 'Images or thumbnail missing' }, { status: 400 });
    }

    // Upload thumbnail first
    const thumbnailBuffer = Buffer.from(await thumbnail.arrayBuffer());

    const thumbnailResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ folder }, (error, result) => {
        if (error) return reject(error);
        resolve({
          url: result.secure_url,
          public_id: result.public_id,
          is_thumbnail: true,
        });
      }).end(thumbnailBuffer);
    });

    // Exclude thumbnail if it's accidentally included in files array
    const filteredFiles = files.filter(file => file.name !== thumbnail.name);

    const imageUploadPromises = filteredFiles.map(async (file) => {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder }, (error, result) => {
          if (error) return reject(error);
          resolve({
            url: result.secure_url,
            public_id: result.public_id,
            is_thumbnail: false,
          });
        }).end(buffer);
      });
    });

    const imageResults = await Promise.all(imageUploadPromises);

    return NextResponse.json({
      images: [thumbnailResult, ...imageResults], // Order: thumbnail first
    }, { status: 200 });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed', details: error.message }, { status: 500 });
  }
}