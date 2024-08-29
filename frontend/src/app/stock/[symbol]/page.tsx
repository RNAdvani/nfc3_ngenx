"use client"
import React from 'react';
import { Button } from '@/components/ui/button';
import BigStockChart from '@/components/charts/big-chart';


interface Props {
  params: { symbol: string };
}

const SingleStockPage: React.FC<Props> = ({params}) => {
  const symbol = params.symbol;   
    
  return (
    <div className='w-full flex justify-center items-center'>
        <div className='flex w-full gap-2 overflow-hidden p-6 items-center'>
           <BigStockChart symbol={symbol} className='h-[25rem]' />
        </div>
          <Button className='mr-2'>Analyze</Button>
    </div>
  )
}

export default SingleStockPage