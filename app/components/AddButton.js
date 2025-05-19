import React from 'react'

const AddButton = ({text}) => {
  return (
    <div className='h-fit w-fit bg-[#495a54] hover:bg-[#d88e6c] hover:text-[#00292e] py-1 px-3 rounded-2xl'>
      <button className='text-lg'>Add {text}</button>
    </div>
  )
}

export default AddButton
