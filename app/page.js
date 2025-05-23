"use client";
import React, { useEffect, useState } from "react";
import { db } from "../app/lib/firebase";
import { collection, getCountFromServer } from "firebase/firestore";
import Link from 'next/link'

const Page = () => {

  const [testimonialCount, setTestimonialCount] = useState(null);
  const [userCount, setUserCount] = useState(null);
  const [projectCount, setProjectCount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const testimonialSnap = await getCountFromServer(collection(db, "Testimonials"));
        setTestimonialCount(testimonialSnap.data().count);

        const userSnap = await getCountFromServer(collection(db, "Queries"));
        setUserCount(userSnap.data().count);

        const projectSnap = await getCountFromServer(collection(db, "Projects"));
        setProjectCount(projectSnap.data().count);
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className='h-screen flex items-start justify-start flex-col ml-[12.2rem] right-0 fixed w-[86%]'>
      <div className='w-full flex justify-between p-4 bg-[#041c1e] shadow-2xl'>
        <h1 className='text-3xl'>Admin Dashboard</h1>

        <div className="flex z-[999] w-fit gap-2">
          <Link href="/AddTestimonials">
            <div className='navBtn1 h-fit w-fit bg-[#495a54] hover:bg-[#d88e6c] hover:text-[#00292e] py-2 px-3 rounded-2xl'>
              <button className='text-base'>Add Testimonial</button>
            </div>
          </Link>
          <Link href="/AddProjects">
            <div className='h-fit w-fit bg-[#495a54] hover:bg-[#d88e6c] hover:text-[#00292e] py-2 px-3 rounded-2xl'>
              <button className='text-base'>Add Projects</button>
            </div>
          </Link>
        </div>
      </div>

      <div className='flex justify-center items-start gap-4 w-full p-4'>

        <Link href="/Projects">
          <div className='card p-4 flex flex-col justify-start items-start'>
            <h1 className="text-[1em]">Total Projects:</h1>
            <p className="text-7xl w-full flex justify-center items-center h-full">{projectCount !== null ? projectCount : <span className="loader text-[20rem]"></span>}</p>
          </div>
        </Link>

        <Link href="/Testimonials">
          <div className='card p-4 flex flex-col justify-start items-start'>
            <h1 className="text-[1em]">Testimonials Registered:</h1>
            <p className="text-7xl w-full flex justify-center items-center h-full">{testimonialCount !== null ? testimonialCount : <span className="loader text-[20rem]"></span>}</p>
          </div>
        </Link>

        <Link href="/User">
          <div className='card p-4 flex flex-col justify-start items-start'>
            <h1 className="text-[1em]">Queries Asked:</h1>
            <p className="text-7xl w-full flex justify-center items-center h-full">{userCount !== null ? userCount : <span className="loader text-[20rem]"></span>}</p>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Page