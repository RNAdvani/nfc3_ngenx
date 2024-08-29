import Sidebar from '@/components/dashboard/sidebar'
import React, { ReactNode } from 'react'

const Layout = ({children}:{children:ReactNode}) => {
  return (
    <div className='h-screen flex '>
        <Sidebar />
        <div className='overflow-y-scroll no-scrollbar'>
          {children}
        </div>
    </div>
  )
}

export default Layout