import React from 'react'
import Link from 'next/link'

const page = () => {
  return (
    <div className='h-screen w-full flex items-center justify-center'>
      <div className='w-[86%] fixed top-12 right-0 p-4 bg-[#041c1e] shadow-2xl'>
        <h1 className='text-3xl'>Dashboard</h1>
      </div>

      <div className='flex justify-center items-center gap-8 w-[86%] fixed top-40 right-0 p-4'>

        <Link href="/Projects">
        <div className='card p-4 flex flex-col justify-center items-center'>
          <h1>Projects</h1>
        </div>
        </Link>

        <Link href="/Testimonials">
        <div className='card p-4 flex flex-col justify-center items-center'>
          <h1>Testimonials</h1>
        </div>
        </Link>

        <Link href="/">
        <div className='card p-4 flex flex-col justify-center items-center'>
          <h1>Registered Users</h1>
        </div>
        </Link>
      </div>
    </div>
  )
}

export default page