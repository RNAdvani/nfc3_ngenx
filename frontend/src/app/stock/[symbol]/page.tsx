"use client"
import React from 'react';
import { Button } from '@/components/ui/button';
import BigStockChart from '@/components/charts/big-chart';
import { DialogHandle } from '@/types';
import { useDialog } from '@/hooks/useDialog';
import CustomDialog from '@/components/CustomDialog';
import Analyze from '@/components/Analyze';
import { Loader2 } from 'lucide-react';


interface Props {
  params: { symbol: string };
}

const SingleStockPage: React.FC<Props> = ({params}) => {

  const dialogRef = React.useRef<DialogHandle>(null);

  const [handleOpenDialog,handleCloseDialog] = useDialog(dialogRef);

  const symbol = params.symbol;   
    
  return (
    <div className='w-full flex justify-center items-center'>
        <div className='flex w-full gap-2 overflow-hidden p-6 items-center'>
           <BigStockChart symbol={symbol} className='h-[25rem]' />
        </div>
          <Button onClick={handleOpenDialog} className='bg-darkgreen mr-2'>Analyze</Button>
          <CustomDialog ref={dialogRef} preventDefault>
            <Analyze hanldeClose={handleCloseDialog} symbol={symbol} />
          </CustomDialog>
    </div>
  )
}

export default SingleStockPage