"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { MdDashboard } from "react-icons/md";
import { GoProjectSymlink } from "react-icons/go";
import { MdRateReview } from "react-icons/md";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import { FaClipboardUser } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { MdChevronRight } from "react-icons/md";

const SideNav = () => {

  const pathname = usePathname();
  const userName = "Madhu J.";

  return (
    <div className='h-screen fixed top-0 left-0 bg-[rgb(26,26,26)] w-[14%] flex flex-col items-center'>
      <div className='mt-2'>
        <img src="/images/SALogoGreen.png" alt="Logo" className='w-[60px] h-auto rounded-xl' />
      </div>

      <ul className='my-8 flex flex-col gap-2 justify-center items-start text-left w-full px-2 text-lg'>
        <li><Link href="\" className={`relative cursor-pointer sideNavBtn px-2 py-1 w-full flex items-center gap-2 ${pathname === "/" ? "active" : ""}`}><MdDashboard /> Dashboard <MdChevronRight className='absolute right-0 mr-2'/></Link></li>
        <li><Link href="\Projects" className={`relative cursor-pointer sideNavBtn px-2 py-1 w-full flex items-center gap-2 ${pathname === "/Projects" || pathname === "/AddProjects" ? "active" : ""}`}><GoProjectSymlink /> Projects <MdChevronRight className='absolute right-0 mr-2'/></Link></li>
        <li><Link href="\Testimonials" className={`relative cursor-pointer sideNavBtn px-2 py-1 w-full flex items-center gap-2 ${pathname === "/Testimonials" || pathname === "/AddTestimonials" ? "active" : ""}`}><MdRateReview /> Testimonials <MdChevronRight className='absolute right-0 mr-2'/></Link></li>
        <li><Link href="\Queries" className={`relative cursor-pointer sideNavBtn px-2 py-1 w-full flex items-center gap-2 ${pathname === "/Queries" ? "active" : ""}`}><MdOutlineQuestionAnswer /> Queries <MdChevronRight className='absolute right-0 mr-2'/></Link></li>
        <li><Link href="\Users" className={`relative cursor-pointer sideNavBtn px-2 py-1 w-full flex items-center gap-2 ${pathname === "/Users" ? "active" : ""}`}><FaClipboardUser /> Users <MdChevronRight className='absolute right-0 mr-2'/></Link></li>
      </ul>

      <div className='userAvatar flex justify-center items-center gap-6 absolute bottom-0'>
        <div className="avatar w-[30%]">
          {/* <Image src="https://p7.hiclipart.com/preview/419/473/131/computer-icons-user-profile-login-user-thumbnail.jpg" alt='User' height={200} width={200}></Image> */}
          <img src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png" alt=""  className='w-[100%] h-auto rounded-full'/>
        </div>

        <p>{userName? userName : "Login/Signup"}</p>
      </div>
    </div>
  )
}

export default SideNav
