import React from 'react'
import Link from 'next/link'
import FetchProjects from '../components/FetchProjects'
import AddButton from '../components/AddButton'

const page = () => {
  return (
    <div className='h-fit w-full flex flex-col items-end justify-center'>
      <div className='w-[86%] p-4 bg-[#041c1e] shadow-2xl fixed top-0 flex justify-between'>
        <h1 className='text-3xl'>Projects</h1>

        <Link href="/AddProjects">
          <AddButton text="Project"/>
        </Link>
      </div>

      <div className='w-[86%] mt-[4.2rem]'>
        <FetchProjects />
      </div>
    </div>
  )
}

export default page
