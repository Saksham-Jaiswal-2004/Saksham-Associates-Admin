"use client"
import React, { useState, useRef } from 'react';
import { addTestimonial } from "../lib/AddTest";
import { handleImageUpload } from '../lib/uploadHandler';

const AddTestimonial = () => {
  const [formData, setFormData] = useState({ name: "", rating: "", role: "", testimonial: "" });
  const [status, setStatus] = useState(null);
  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const folder = "Clients"
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.role || !formData.testimonial || formData.rating < 1 || formData.rating > 5) {
      setStatus("❌ Please fill in all fields correctly.");
      return;
    }

     // Upload image and get URLs
    const uploadedUrls = await handleImageUpload({
      images,
      folder,
      setMessage,
      resetForm: handleReset,
    });

    console.log("Uploaded image URLs:", uploadedUrls);

    const response = await addTestimonial(formData.name, formData.rating, formData.role, formData.testimonial);

    if (response.success) {
      setStatus("Testimonial added successfully!");
      alert("Testimonial added successfully!");
      setFormData({ name: "", rating: "", role: "", testimonial: "" });
    } else {
      setStatus("Error adding testimonial!");
      alert("Failed to add testimonial!");
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      rating: "",
      role: '',
      testimonial: '',
    });
    setStatus(null);
    setImages([]);
    setPreviewUrls([]);
  };

  return (
    <div className='flex justify-center w-full'>
      <form action="" onSubmit={handleSubmit} className='flex flex-col my-0 px-10 w-[50%]'>
        <div className='my-4 flex justify-start items-center gap-4 w-[70%]'>
          <label htmlFor="features">Client Image: </label>
          <input type="file" id="image" name="image" onChange={handleImgChange} accept="image/*" className='input w-[70%] my-1'></input>
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

        <div className='my-2 flex gap-5'>
          <button type='submit' className='border px-3 rounded-lg'>Add</button>
          <button onClick={handleReset} className='border px-3 rounded-lg'>Reset</button>
        </div>

        {/* {status && <p className="mt-2">{status}</p>} */}
      </form>
    </div>
  )
}

export default AddTestimonial
