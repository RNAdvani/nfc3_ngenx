import NewSidebar from '@/components/sidebar/NewSidebar'
import React, { ReactNode } from 'react'

const Layout = ({children}:{children:ReactNode}) => {
  return (
    <div className='h-screen flex w-full'>
        <NewSidebar />
        <div className='overflow-y-scroll w-full no-scrollbar'>
          {children}
        </div>
    </div>
  )
}

export default Layout