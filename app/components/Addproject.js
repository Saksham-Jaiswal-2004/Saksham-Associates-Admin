"use client"
import React, { useState, useRef } from 'react';

const Addproject = () => {
  const [formData, setFormData] = useState({ title: "", date: "", features: "", description: ""});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setFormData({
      title: '',
      date: '',
      features: '',
      description: '',
    });
  };

  return (
    <div className='flex justify-center w-full'>
      <form action="" className='flex flex-col my-0 p-10 w-[50%]'>
        <div className='my-4 flex flex-col'>
          <label htmlFor="title">Title: </label>
          <input type="text" name='title' value={formData.title} onChange={handleChange} placeholder="Enter Project Title"  className='input w-[70%] my-1'/>
        </div>

        <div className='my-4 flex flex-col'>
          <label htmlFor="date">Month, Year: </label>
          <input type="text" name="date" id="date" value={formData.date} onChange={handleChange} placeholder='Enter Month and Year of completion'  className='input w-[70%] my-1'/>
        </div>

        <div className='my-4 flex flex-col'>
          <label htmlFor="features">Features: </label>
          <input type="text" name='features' value={formData.features} onChange={handleChange} placeholder="Enter Project's Features" className='input w-[70%] my-1'/>
        </div>

        <div className='my-4 flex flex-col'>
          <label htmlFor="description">Description: </label>
          <textarea name="description" id="description" value={formData.description} onChange={handleChange} placeholder='Enter Description' className='input w-[70%] my-1'></textarea>
        </div>

        <div className='my-2 flex gap-5'>
          <button type='submit' className='border px-3 rounded-lg'>Add</button>
          <button type='reset' onClick={handleReset} className='border px-3 rounded-lg'>Reset</button>
        </div>
      </form>
    </div>
  )
}

export default Addproject
