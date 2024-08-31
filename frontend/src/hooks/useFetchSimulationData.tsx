// hooks/useFetchSimulationData.ts
"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SimulationData } from '../types';

const useFetchSimulationData = () => {
  const [data, setData] = useState<SimulationData | null>(null); // Use SimulationData type

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<SimulationData>('http://localhost:8000/simulate');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return data;
};

export default useFetchSimulationData;
