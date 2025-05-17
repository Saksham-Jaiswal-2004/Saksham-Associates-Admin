import React from 'react'
import Link from 'next/link'
import FetchProjects from '../components/FetchProjects'
import AddButton from '../components/AddButton'

const page = () => {
  return (
    <div className='h-fit w-full flex flex-col items-end justify-center'>
      <div className='w-[86%] p-4 bg-[#041c1e] shadow-2xl fixed top-0'>
        <h1 className='text-3xl'>Projects</h1>
      </div>

      <div className='w-[86%] mt-[4.2rem]'>
        <FetchProjects/>
      </div>

      <Link href="/AddProjects">
        <AddButton/>
      </Link>
    </div>
  )
}

export default page
