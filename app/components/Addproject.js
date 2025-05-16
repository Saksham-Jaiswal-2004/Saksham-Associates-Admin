"use client"
import React, { useState, useRef } from 'react';
import { addProject } from '../lib/AddProject'
import { Autocomplete } from "@react-google-maps/api";

const Addproject = () => {
  const [formData, setFormData] = useState({ title: "", category: "", time: "", location: "", description: "" });
  const [status, setStatus] = useState(null);
  const [location, setLocation] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!formData.title || !formData.category || !formData.time || !formData.location || !formData.description) {
        setStatus("❌ Please fill in all fields correctly.");
        return;
      }
      
      const response = await addProject(formData.title, formData.category, formData.time, formData.location, formData.description);
      if (response.success) {
        setStatus("Project added successfully!");
        alert("Project added successfully!");
        setFormData({title: '', category: '', time: '', location: '', description: '',});
      } else {
        console.log(formData);
        setStatus("Error adding project!");
        alert("Failed to add project!");
      }
    };

  const handleReset = () => {
    setFormData({
      title: '',
      category: '',
      time: '',
      location: '',
      description: '',
    });
    setStatus(null)
  };

  return (
    <div className='flex justify-center items-center w-full'>
      <form action="" className='flex flex-col my-0 p-10 w-[95%] gap-6'>
        <div className='flex flex-wrap w-full gap-10'>
          <div className='my-4 flex justify-start items-center gap-4 w-[40%]'>
            <label htmlFor="title">Title: </label>
            <input type="text" name='title' value={formData.title} onChange={handleChange} placeholder="Enter Project Title" className='input w-[70%] my-1' />
          </div>

          <div className='my-4 flex justify-start items-center gap-4 w-[40%]'>
            <label htmlFor="category">Category: </label>
            <select id="category" name='category' value={formData.category} onChange={handleChange} className='input rounded-md border border-[#e4ddcf] text-center w-[70%] my-1 p-1' >
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
            <label htmlFor="date">Month, Year: </label>
            <input type="month" name="time" id="time" value={formData.time} onChange={handleChange} placeholder='Enter Month and Year of completion' className='input w-[65%] my-1' />
          </div>

          <div className='my-4 flex justify-start items-center gap-4 w-[40%]'>
            <label htmlFor="location">Location: </label>
            <input type="text" name="location" id="location" value={formData.location} onChange={handleChange} placeholder='Enter Location' className='input w-[70%] my-1' />
          </div>
        </div>

        <div className='flex flex-wrap w-full gap-10'>
          {/* <div className='my-4 flex justify-start items-center gap-4 w-[40%]'>
            <label htmlFor="features">Features: </label>
            <input type="text" name='features' value={formData.features} onChange={handleChange} placeholder="Search Project's Features" className='input w-[70%] my-1' />
          </div> */}

          <div className='my-4 flex justify-start items-center gap-4 w-[40%]'>
            <label htmlFor="features">Images: </label>
            <input type="file" id="images" name="images[]" accept="image/*" className='input w-[70%] my-1' multiple></input>
          </div>
        </div>

        <div className='my-4 flex flex-col'>
          <label htmlFor="description">Description: </label>
          <textarea name="description" id="description" value={formData.description} onChange={handleChange} placeholder='Enter Description' className='input w-[70%] my-1'></textarea>
        </div>

        {status && <p className="mt-2 text-red-500 font-bold text-xl">{status}</p>}

        <div className='my-2 flex gap-5'>
          <button type='submit' onClick={handleSubmit} className='border px-3 rounded-lg hover:bg-[#fff]'>Add</button>
          <button type='reset' onClick={handleReset} className='border px-3 rounded-lg'>Reset</button>
        </div>
      </form>
    </div>
  )
}

export default Addproject
