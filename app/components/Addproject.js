"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { addProject } from '../lib/AddProject';

const Addproject = () => {
  const [formData, setFormData] = useState({ title: "", category: "", time: "", location: "", description: "" });
  const [status, setStatus] = useState(null);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [images, setImages] = useState([]);
  const [selectedThumbnailIndex, setSelectedThumbnailIndex] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImgChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setPreviewUrls(files.map(file => URL.createObjectURL(file)));
    setSelectedThumbnailIndex(0); // Default thumbnail is first
  };

  const handleImageUpload = async (folder = 'Projects') => {
    const formDataUpload = new FormData();
    images.forEach((img) => formDataUpload.append('images', img));
    formDataUpload.append('thumbnail', images[selectedThumbnailIndex]);
    formDataUpload.append('folder', folder);

    try {
      const response = await axios.post('/api/uploadProject', formDataUpload, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    } catch (err) {
      console.error('Upload failed:', err);
      setStatus('❌ Image upload failed');
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.category || !formData.time || !formData.location || !formData.description || !images.length || selectedThumbnailIndex === null) {
      setStatus("❌ Please fill in all fields and upload images.");
      return;
    }

    const uploadData = await handleImageUpload();

    if (!uploadData) return;

    try {
      const result = await addProject({
        ...formData,
        thumbnail: uploadData.images[0],
        images: uploadData.images.slice(1),
      });

      if (result.success) {
        setStatus("✅ Project added successfully!");
        alert("Project added successfully!");
        handleReset();
      } else {
        setStatus("❌ Failed to add project!");
        console.error("Upload error:", result.error);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setStatus("❌ Failed to add project!");
    }

  };

  const handleReset = () => {
    setFormData({ title: '', category: '', time: '', location: '', description: '' });
    setStatus(null);
    setImages([]);
    setPreviewUrls([]);
    setSelectedThumbnailIndex(null);
  };

  return (
    <div className='flex justify-center items-center w-full'>
      <form className='flex flex-col my-0 p-10 w-[95%] gap-6'>
        <div className='flex flex-wrap w-full gap-10'>
          <div className='my-4 flex justify-start items-center gap-4 w-[40%]'>
            <label htmlFor="title">Title: </label>
            <input type="text" name='title' value={formData.title} onChange={handleChange} placeholder="Enter Project Title" className='input w-[70%] my-1' />
          </div>

          <div className='my-4 flex justify-start items-center gap-4 w-[40%]'>
            <label htmlFor="category">Category: </label>
            <select id="category" name='category' value={formData.category} onChange={handleChange} className='input rounded-md border border-[#e4ddcf] text-center w-[70%] my-1 p-1'>
              <option value="" className='bg-[rgb(26,26,26)]'>Select Category</option>
              <option value="Residential" className='bg-[rgb(26,26,26)]'>Residential</option>
              <option value="Commercial" className='bg-[rgb(26,26,26)]'>Commercial</option>
              <option value="Hospitality" className='bg-[rgb(26,26,26)]'>Hospitality</option>
              <option value="Restraunts and Cafes" className='bg-[rgb(26,26,26)]'>Restraunts and Cafes</option>
              <option value="Retail Stores" className='bg-[rgb(26,26,26)]'>Retail Stores</option>
              <option value="Factories" className='bg-[rgb(26,26,26)]'>Factories</option>
            </select>
          </div>
        </div>

        <div className='flex flex-wrap w-full gap-10'>
          <div className='my-4 flex justify-start items-center gap-4 w-[40%]'>
            <label htmlFor="time">Handover: </label>
            <input type="month" name="time" value={formData.time} onChange={handleChange} className='input w-[65%] my-1' />
          </div>

          <div className='my-4 flex justify-start items-center gap-4 w-[40%]'>
            <label htmlFor="location">Location: </label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder='Enter Location' className='input w-[70%] my-1' />
          </div>
        </div>

        <div className='my-4 flex flex-col'>
          <label htmlFor="description">Description: </label>
          <textarea name="description" value={formData.description} onChange={handleChange} placeholder='Enter Description' className='input w-[70%] my-1'></textarea>
        </div>

        <div className='flex flex-wrap w-full gap-10'>
          <div className='my-4 flex justify-start items-center gap-4 w-[40%]'>
            <label htmlFor="images">Images: </label>
            <input type="file" id="images" name="images[]" accept="image/*" onChange={handleImgChange} className='input w-[70%] my-1' multiple />
          </div>
        </div>

        {previewUrls.length > 0 && (
          <div className="my-4 flex gap-4 flex-wrap w-full justify-center items-center">
            <p className='text-sm text-gray-500 w-full text-center'>Click an image to set as thumbnail.</p>

            {previewUrls.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt={`preview-${idx}`}
                className={`w-44 h-44 object-cover rounded-lg hover:scale-105 cursor-pointer border-4 ${selectedThumbnailIndex === idx ? 'thumbnailImg' : 'border-transparent'}`}
                onClick={() => setSelectedThumbnailIndex(idx)}
              />
            ))}
          </div>
        )}

        {status && <p className="mt-2 text-red-500 font-bold text-xl">{status}</p>}

        <div className='my-2 flex gap-5'>
          <button type='submit' onClick={handleSubmit} className='border formBtn rounded-lg'>Add</button>
          <button type='reset' onClick={handleReset} className='border formBtn rounded-lg'>Reset</button>
        </div>
      </form>
    </div>
  );
};

export default Addproject;
