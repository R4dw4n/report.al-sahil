import { HOST } from '@/app/api/axiosInstance'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { getBase64 } from '../uploadModal/UploadModal'
const handleSrc = async (file) => {
  console.log(await getBase64(file))
  return await getBase64(file);
}
function HeaderItem({ item }) {
  if(item.type === 'text') {
    return <h1 style={item?.style}>{item.value}</h1>
  }
  else if(item.type === 'images') {
      return <Image alt='image' src={HOST + "/storage/" + item?.image_path} width={150} height={150} />
  }
  else if(item.type == 'date') {
    const date = new Date().toDateString();
    return <h2 style={item?.style}>{date}</h2>
  }
  else return null;
}

export default HeaderItem