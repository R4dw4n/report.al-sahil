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
    const [src, setSrc] = useState('');
    useEffect(() => {
      handleSrc(item.fileList[0].originFileObj).then((result) => setSrc(result));
    }, [])
    
    if(src)
      return <Image alt='image' src={src} width={150} height={150} />
  }
  else if(item.type == 'date') {
    const date = new Date().toDateString();
    return <h2 style={item?.style}>{date}</h2>
  }
  else return null;
}

export default HeaderItem