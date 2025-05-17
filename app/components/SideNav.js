import React from 'react'
import Link from 'next/link'
import { MdDashboard } from "react-icons/md";
import { GoProjectSymlink } from "react-icons/go";
import { MdRateReview } from "react-icons/md";
import { FaClipboardUser } from "react-icons/fa6";

const SideNav = () => {
  return (
    <div className='h-screen fixed top-0 left-0 bg-[rgb(26,26,26)] w-[14%] flex flex-col items-center'>
      <div className='mt-2'>
        <img src="/images/SALogoGreen.png" alt="Logo" className='w-[60px] h-auto rounded-xl'/>
      </div>

      <ul className='my-8 flex flex-col gap-2 justify-center items-start text-left w-full px-2 text-lg'>
        <li><Link href="\" className='cursor-pointer hover:text-[#d88e6c] px-2 py-1 w-full flex items-center gap-2'><MdDashboard /> Dashboard</Link></li>
        <li><Link href="\Projects" className='cursor-pointer hover:text-[#d88e6c] px-2 py-1 w-full flex items-center gap-2'><GoProjectSymlink /> Projects</Link></li>
        <li><Link href="\Testimonials" className='cursor-pointer hover:text-[#d88e6c] px-2 py-1 w-full flex items-center gap-2'><MdRateReview /> Testimonials</Link></li>
        <li><Link href="\User" className='cursor-pointer hover:text-[#d88e6c] px-2 py-1 w-full flex items-center gap-2'><FaClipboardUser /> User Data</Link></li>
      </ul>
    </div>
  )
}

export default SideNav
