'use client'
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function RoutGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname()
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // console.log(pathname)
  useEffect(() => {
    // console.log(['/login'].some(link => link === pathname))
    if(localStorage.getItem("token") != null || ['/login'].some(link => link === pathname)){
      setIsLoggedIn(true);
      // console.log('HI')
    }

    else {
      router.push('/login')
    }
  }, [pathname])
  // console.log(isLoggedIn)
  if(!isLoggedIn)
    return null;

  return (
    <>
    {children}
    </>
  )
}

export default RoutGuard