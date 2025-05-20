import React from 'react'

const AddButton = ({text}) => {
  return (
    <div className='navBtn1 h-fit w-fit bg-[#495a54] hover:bg-[#d88e6c] hover:text-[#00292e] py-2 px-4 rounded-2xl'>
      <button className='text-base'>Add {text}</button>
    </div>
  )
}

export default AddButton
