import React from 'react'
import AddTestimonial from '../components/AddTestimonial'

const page = () => {
  return (
    <div className='h-fit w-full flex flex-col items-end justify-center'>
      <div className='w-[86%] fixed top-12 right-0 p-4 bg-[#041c1e] shadow-2xl'>
        <h1 className='text-3xl'>Add New Testimonial</h1>
      </div>

      <div className='w-[86%] right-0 mt-28'>
        <AddTestimonial/>
      </div>
    </div>
  )
}

export default page
