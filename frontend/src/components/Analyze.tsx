"use client"
import { ANALYZE_STOCK } from '@/apiUrl';
import axios from 'axios';
import { Loader2, X } from 'lucide-react';
import React, { useEffect, useState } from 'react'

const Analyze = ({symbol,hanldeClose}:{symbol:string,hanldeClose():void}) => {
    const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
        setLoading(true)
        try {
            const response = await axios.get(`${ANALYZE_STOCK}?symbol=${symbol}`);
            console.log(response.data)       
        } catch (error) {
            console.error(error)
        }
        setLoading(false)
    }

    fetchData()

  }, []);
  return (
    <div className='relative min-h-[10rem]' >
    <div className='flex justify-center items-center h-full'>
        {loading ? <Loader2 className='h-10 w-10 text-black' /> : <p className='text-black'>Analyzed</p>}
    </div>

    <button disabled={loading} className="absolute right-4 top-1 rounded-full border h-8 w-8 flex justify-center items-center" onClick={hanldeClose}>
        <X className='h-5 w-5 text-black' />
    </button>
    </div>
  )
}

export default Analyze