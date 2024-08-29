import Sidebar from '@/components/dashboard/sidebar'
import React, { ReactNode } from 'react'

const Layout = ({children}:{children:ReactNode}) => {
  return (
    <div className='h-screen flex'>
        <Sidebar />
        {children}
    </div>
  )
}

export default Layout