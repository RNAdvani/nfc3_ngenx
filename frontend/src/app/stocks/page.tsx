import { Input } from '@/components/ui/input'
import React from 'react'

const Dashboard = () => {
  return (
    <div className='p-6 flex flex-col gap-2 w-full'>
        <div className='flex justify-end w-full'>
          <Input placeholder='Search Stocks' className='w-[15rem]' />
        </div>
    </div>
  )
}

export default Dashboard