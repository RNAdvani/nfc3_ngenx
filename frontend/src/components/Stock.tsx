"use client"
import { useState, useEffect } from 'react';
import { StockPoint } from '@/types';
import StockChart from './charts/char';

export default function Stock() {
  const [data, setData] = useState<StockPoint[]>([]);

//   useEffect(() => {
//     async function fetchData() {
//       const response = await fetch('/api/stock?symbol=RELIANCE.NS');
//       const result = await response.json();
      
//       // Adjust mapping based on actual data structure
//       const formattedData: StockPoint[] = result?.chart?.result[0]?.indicators?.quote[0]?.close.map((close: number, index: number) => ({
//         date: result.chart.result[0].timestamp[index],
//         close,
//       }));

//       console.log(result)
      
//     //   setData(formattedData);

//     }

//     fetchData()
//     // const interval = setInterval(()=>{
//     //     fetchData()
//     // },10)

//     // return ()=>clearInterval(interval)
//   }, []);

  return (
    <div>
      <h1>Stock Data</h1>
      <StockChart symbol='NQ=F'  />
    </div>
  );
}