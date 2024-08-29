"use client"
import Link from 'next/link'
import React from 'react'
import Dashboard from '../Icons/Dashborard'
import { usePathname } from 'next/navigation'
import Analytics from '../Icons/GraphIcon'

const Sidebar = () => {
  const pathName = usePathname();

  return (
    <div className='flex flex-col gap-2 lg:w-[20%] shadow-right-darkgreen p-3'>
        <h2 className='text-[28px] font-bold p-4 px-4'>Penny Wise</h2>
        <div className='flex flex-col gap-1'>
        <Link href={`/dashboard`} className={`${pathName === "/dashboard" ? "bg-mediumgreen text-white" : ""} duration-150 flex font-normal text-[14px] p-3 items-center gap-2  rounded-xl`} >
            <Dashboard isActive={pathName === "/dashboard"} /> Dashboard
        </Link>
        <Link href={`/stocks`} className={`${pathName === "/stocks" ? "bg-mediumgreen text-white" : ""} duration-150 flex font-normal text-[14px] p-3 items-center gap-2  rounded-xl`} >
            <Analytics isActive={pathName === "/stocks"} /> Stocks
        </Link>
        </div>
    </div>
  )
}

export default Sidebar