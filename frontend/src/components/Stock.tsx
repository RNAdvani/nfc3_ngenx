"use client"
import { useState, useEffect } from 'react';
import { StockPoint } from '@/types';
import StockChart from './charts/chart';
import axios from 'axios';
import { ANALYZE_STOCK, GET_TOP_GAINERS, SEARCH_STOCKS } from '@/apiUrl';

export default function Stock() {
  const [data, setData] = useState<StockPoint[]>([]);

  return (
    <div>
      <h1>Stock Data</h1>
    </div>
  );
}