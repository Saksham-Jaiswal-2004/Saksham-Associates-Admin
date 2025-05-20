"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { addTestimonial } from "../lib/AddTest";

const AddTestimonial = () => {
  const [formData, setFormData] = useState({ name: "", rating: "", role: "", testimonial: "" });
  const [status, setStatus] = useState(null);
  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const folder = "Clients";
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.name === "rating" ? Number(e.target.value) : e.target.value
    });
  };

  const handleImgChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setPreviewUrls(files.map(file => URL.createObjectURL(file)));
  };

  const handleImageUpload = async ({ images, folder }) => {
    const urls = [];

    for (const image of images) {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("folder", folder);

      try {
        const response = await axios.post("/api/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        urls.push(response.data.url);
        urls.push(response.data.public_id);
      } catch (err) {
        console.error("Image upload failed:", err);
        setMessage("Image upload failed.");
        alert(err);
        return [];
      }
    }

    return urls;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.role || !formData.testimonial || formData.rating < 1 || formData.rating > 5) {
      setStatus("❌ Please fill in all fields correctly.");
      return;
    }

    if (images.length === 0) {
      setStatus("❌ Please upload an image.");
      return;
    }

    setMessage("Uploading image...");

    const uploadedUrls = await handleImageUpload({ images, folder });

    if (uploadedUrls.length === 0) {
      setStatus("❌ Failed to upload image. (No Uploaded URLs)");
      return;
    }

    const response = await addTestimonial(
      formData.name,
      formData.rating,
      formData.role,
      formData.testimonial,
      uploadedUrls[0],
      uploadedUrls[1],
    );

    if (response.success) {
      setStatus("✅ Testimonial added successfully!");
      alert("Testimonial added successfully!");
      handleReset();
    } else {
      setStatus("❌ Error adding testimonial!");
      alert("Failed to add testimonial!");
    }
  };

  const handleReset = () => {
    setFormData({ name: '', rating: "", role: '', testimonial: '' });
    setStatus(null);
    setMessage('');
    setImages([]);
    setPreviewUrls([]);
  };

  return (
    <div className='flex justify-center w-full'>
      <form onSubmit={handleSubmit} className='flex flex-col my-0 px-10 w-[50%]'>
        {previewUrls.length > 0 && (
          <div className="my-2 flex gap-3 flex-wrap w-[70%] justify-center items-center">
            {previewUrls.map((url, idx) => (
              <img key={idx} src={url} alt="preview" className="w-36 h-36 object-cover rounded-full" />
            ))}
          </div>
        )}

        <div className='my-4 flex justify-start items-center gap-4 w-[70%]'>
          <label htmlFor="image">Client Image: </label>
          <input type="file" id="image" name="image" onChange={handleImgChange} accept="image/*" className='input w-[70%] my-1' />
          {message && <label htmlFor="text" className='text-red-500'>{message}</label>}
        </div>

        <div className='my-4 flex flex-col'>
          <label htmlFor="name">Name: </label>
          <input type="text" name='name' value={formData.name} onChange={handleChange} placeholder="Enter Client's Name" className='input w-[70%] my-1' />
        </div>

        <div className='my-4 flex flex-col'>
          <label htmlFor="rating">Rating: </label>
          <input type="number" name="rating" id="rating" value={formData.rating} onChange={handleChange} placeholder='Enter Rating (1-5)' min="1" max="5" className='input w-[70%] my-1' />
        </div>

        <div className='my-4 flex flex-col'>
          <label htmlFor="role">Role: </label>
          <input type="text" name='role' value={formData.role} onChange={handleChange} placeholder="Enter Client's Job" className='input w-[70%] my-1' />
        </div>

        <div className='my-4 flex flex-col'>
          <label htmlFor="testimonial">Testimonial: </label>
          <textarea name="testimonial" id="testimonial" value={formData.testimonial} onChange={handleChange} placeholder='Enter Testimonial' className='input w-[70%] my-1'></textarea>
        </div>

        {status && <p className="my-2 text-lg">{status}</p>}

        <div className='my-2 flex gap-5'>
          <button type='submit' className='border formBtn rounded-lg'>Add</button>
          <button type="button" onClick={handleReset} className='border formBtn rounded-lg'>Reset</button>
        </div>
      </form>
    </div>
  );
};

export default AddTestimonial;