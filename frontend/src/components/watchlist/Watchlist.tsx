"use client"
import React, { useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import BigStockChart from '@/components/charts/big-chart';
import { DialogHandle } from '@/types';
import { useDialog } from '@/hooks/useDialog';
import CustomDialog from '@/components/CustomDialog';
import Analyze from '@/components/Analyze';
import { MinusCircleIcon, PlusCircleIcon } from 'lucide-react';
import axios from 'axios';
import { ADD_TO_WATCHLIST, GET_WATCHLIST, REMOVE_FROM_WATCHLIST } from '@/apiUrl';

const Watchlist = ({stock,userId}:{stock:string,userId:string}) => {
    const dialogRef = React.useRef<DialogHandle>(null);
    const [isInWatchList,setIsInWatchList] = React.useState(false);
  
    const [handleOpenDialog,handleCloseDialog] = useDialog(dialogRef);
  
    
    
    const handleAddToWatchList = useCallback(async()=>{
        try {
          const res = await axios.post(ADD_TO_WATCHLIST,{stock,userId});
          setIsInWatchList(true);
        } catch (error) {
          console.log(error);
        }
    },[])
  
    const handleRemoveFromWatchList = useCallback(async()=>{
      try {
        const res = await axios.post(REMOVE_FROM_WATCHLIST,{stock,userId});
        setIsInWatchList(false);
      } catch (error) {
        console.log(error);
      }
    }
    ,[])
    const getWatchList = useCallback(async()=>{
      try {
        const res =await axios.get(`${GET_WATCHLIST}${userId}`);
        if(res.data?.watchlist?.stocks?.includes(stock)){
          setIsInWatchList(true);
        }
      } catch (error) {
        console.log(error);
      }
    },[handleAddToWatchList,handleRemoveFromWatchList])
  
    useEffect(()=>{
      getWatchList();
    },[handleAddToWatchList,handleRemoveFromWatchList])
  
  return (
    <div className='w-full flex flex-col justify-center items-center'>
          <div className='w-full flex gap-2 justify-end p-2'>
            <Button onClick={handleOpenDialog} className='bg-darkgreen'>Analyze</Button>
            <Button onClick={()=>{
              if(isInWatchList){
                handleRemoveFromWatchList();
              }else{
                handleAddToWatchList();
              }
            }} className='bg-darkgreen flex gap-2'>{isInWatchList ?  <MinusCircleIcon /> :<PlusCircleIcon />   } WatchList</Button>
          </div>
        <div className='flex w-full gap-2 overflow-hidden p-6 items-center'>
           <BigStockChart symbol={stock} className='h-[25rem]' />
        </div>
          <CustomDialog ref={dialogRef} preventDefault>
            <Analyze hanldeClose={handleCloseDialog} symbol={stock} />
          </CustomDialog>
    </div>
  )
}

export default Watchlist