import React from 'react'
import ValuesTab from './ValuesTab'
function Sidebar() {
  return (
    <div className='w-[240px] py-4 '>
      <div className='h-full bg-[#eee] p-[10px]'>
        <ValuesTab />
      </div>
    </div>
  )
}

export default Sidebar