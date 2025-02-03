import React from 'react'
import ThemeToggle from './ThemeToggle'

const Navbar = () => {
  return (
    <div className='fixed top-0 right-0 bg-[#1a1a1a] w-[86%] flex justify-between items-center py-3 px-4 z-40'>
      <h1 className='text-xl'>Saksham Associates</h1>

      <h1 className='text-xl'>Admin Dashboard</h1>

      <div className='mx-3'>
        <ThemeToggle/>
      </div>
    </div>
  )
}

export default Navbar
