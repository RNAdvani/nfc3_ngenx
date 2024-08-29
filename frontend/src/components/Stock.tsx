"use client"
import { useState, useEffect } from 'react';
import { StockPoint } from '@/types';
import StockChart from './charts/char';
import axios from 'axios';
import { GET_TOP_GAINERS, SEARCH_STOCKS } from '@/apiUrl';

export default function Stock() {
  const [data, setData] = useState<StockPoint[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`${SEARCH_STOCKS}?q=${"rel"}`);
     console.log(response.data)

    }

    fetchData()

  }, []);



  return (
    <div>
      <h1>Stock Data</h1>
      <StockChart symbol='NQ=F'  />
    </div>
  );
}