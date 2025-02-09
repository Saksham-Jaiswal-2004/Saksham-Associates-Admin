"use client";
import React, { useEffect, useState } from "react";
import { db } from "../app/lib/firebase";
import { collection, getCountFromServer } from "firebase/firestore";
import Link from 'next/link'

const page = () => {

  const [testimonialCount, setTestimonialCount] = useState(null);
  const [userCount, setUserCount] = useState(null);
  const [projectCount, setProjectCount] = useState(null);

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
    <div className='h-screen w-full flex items-center justify-center'>
      <div className='w-[86%] fixed top-12 right-0 p-4 bg-[#041c1e] shadow-2xl'>
        <h1 className='text-3xl'>Dashboard</h1>
      </div>

      <div className='flex justify-center items-center gap-8 w-[86%] fixed top-40 right-0 p-4'>

        <Link href="/Projects">
        <div className='card p-4 flex flex-col justify-evenly items-center'>
          <h1 className="text-lg">Projects Added</h1>
          <p className="text-4xl">{projectCount !== null ? projectCount : "Loading..."}</p>
        </div>
        </Link>

        <Link href="/Testimonials">
        <div className='card p-4 flex flex-col justify-evenly items-center'>
          <h1 className="text-lg">Testimonials Registered</h1>
          <p className="text-4xl">{testimonialCount !== null ? testimonialCount : "Loading..."}</p>
        </div>
        </Link>

        <Link href="/User">
        <div className='card p-4 flex flex-col justify-evenly items-center'>
          <h1 className="text-lg">Queries Asked</h1>
          <p className="text-4xl">{userCount !== null ? userCount : "Loading..."}</p>
        </div>
        </Link>
      </div>
    </div>
  )
}

export default page