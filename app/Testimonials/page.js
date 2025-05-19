import React from 'react'
import Link from 'next/link'
import FetchTestimonials from '../components/FetchTestimonials'
import AddButton from '../components/AddButton'

const page = () => {
  return (
    <div className='h-fit w-full flex flex-col items-end justify-center'>
      <div className='w-[86%] fixed top-0 right-0 p-4 bg-[#041c1e] shadow-2xl flex justify-between'>
        <h1 className='text-3xl'>Testimonials</h1>

        <Link href="/AddTestimonials">
          <AddButton text="Testimonial"/>
        </Link>
      </div>

      <div className='w-[86%] mt-[4.2rem]'>
        <FetchTestimonials/>
      </div>
    </div>
  )
}

export default page
