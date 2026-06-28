import React from 'react'

const AddButton = ({text}) => {
  return (
    <div className='navBtn1 inline-flex h-fit w-fit items-center justify-center rounded-full border border-[rgba(224,220,207,0.12)] px-4 py-2 text-sm font-semibold text-[var(--deep-green)] shadow-[0_16px_30px_rgba(216,142,108,0.15)] transition hover:-translate-y-0.5'>
      <button className='text-sm'>Add {text}</button>
    </div>
  )
}

export default AddButton
