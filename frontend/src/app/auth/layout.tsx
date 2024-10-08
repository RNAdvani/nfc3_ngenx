import React, { ReactNode } from 'react'

const Layout = ({children}:{children:ReactNode}) => {
  return (
    <div className='h-screen flex justify-center items-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-500 to-[#2d6a4f]'>
        {children}
    </div>
  )
}

export default Layout