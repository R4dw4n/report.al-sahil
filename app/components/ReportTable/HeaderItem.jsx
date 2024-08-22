import { HOST } from '@/app/api/axiosInstance'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { getBase64 } from '../uploadModal/UploadModal'
const handleSrc = async (file) => {
  console.log(await getBase64(file))
  return await getBase64(file);
}
function HeaderItem({ item }) {
  if (item.type === 'text') {
    return <h1 style={item?.style} className='w-full h-full p-2 flex justify-center items-center rounded-2xl '>{item.value}</h1>
  }
  else if (item.type === 'images') {
    return <Image alt='image' src={HOST + "/storage/" + item?.image_path} width={80} height={80} className='w-full h-full  flex justify-center items-center rounded-2xl ' />
  }
  else if (item.type == 'date') {
    const date = new Date().toDateString();
    return <h2 style={item?.style} className='w-full h-full p-2 flex justify-center items-center rounded-2xl '>{date}</h2>
  }
  else return null;
}

export default HeaderItem