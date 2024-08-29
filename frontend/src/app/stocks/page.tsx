
"use client"
import StockChart from '@/components/charts/chart'
import { CardWithForm } from '@/components/Stocks/Card'
import { DataTableDemo } from '@/components/Stocks/DataTable'
import { WatchListTable } from '@/components/Stocks/WatchList'
import { Input } from '@/components/ui/input'
import React from 'react'


const Dashboard = () => {
  return (
    <div className='p-6 flex flex-col gap-2 w-full'>
        <div className='flex justify-end w-full'>
          <Input placeholder='Search Stocks' className='w-[15rem]' />
        </div>
        <div className='grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-4'>
            <CardWithForm  >
              <StockChart symbol='^NSEI' />
            </CardWithForm>
            <CardWithForm  >
              <StockChart symbol='^BSESN' />
            </CardWithForm>
            <CardWithForm  >
              <StockChart symbol='^NSEBANK' />
            </CardWithForm>
            <CardWithForm  >
              <StockChart symbol='NVDA' />
            </CardWithForm>
        </div>
        <div className='grid gap-6 grid-cols-5'>
          <DataTableDemo />
          <WatchListTable />
        </div>
    </div>
  )
}

export default Dashboard