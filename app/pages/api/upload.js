import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { images, folder } = req.body;

    if (!images || !Array.isArray(images) || images.length === 0) {
      return res.status(400).json({ error: 'No images provided' });
    }

    try {
      const uploadedUrls = [];

      for (let base64 of images) {
        const uploadResponse = await cloudinary.uploader.upload(base64, {
          folder: folder || 'Default',
        });
        uploadedUrls.push(uploadResponse.secure_url);
      }

      res.status(200).json({ urls: uploadedUrls });
    } catch (error) {
      res.status(500).json({ error: 'Upload failed', details: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
