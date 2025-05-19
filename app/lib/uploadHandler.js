// Convert file to base64
export const convertToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

// Main upload logic (no Firebase)
export const handleImageUpload = async ({ images, folder, setMessage, resetForm }) => {
  if (!folder.trim()) {
    setMessage('Please provide a folder name.');
    return null;
  }

  setMessage('Uploading...');

  try {
    const base64Images = await Promise.all(images.map(file => convertToBase64(file)));

    const res = await fetch('/pages/api/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ images: base64Images, folder }),
    });

    const { urls } = await res.json();

    setMessage('Upload successful!');
    resetForm();

    return urls; // ✅ Return the uploaded image URLs
  } catch (err) {
    console.error(err);
    setMessage('Upload failed.');
    return null; // ❌ Return null on failure
  }
};
