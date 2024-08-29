
import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns'; // Import the date adapter
import axios from 'axios';
import { GET_STOCK_DATA } from '@/apiUrl';

const BigStockChart= ({symbol,className}:{symbol:string,className?:string}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const [chartInstance, setChartInstance] = useState<Chart | null>(null);
  const [name,setName] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const period1 = Math.floor(Date.now() / 1000) - 86400; // 24 hours ago
        const period2 = Math.floor(Date.now() / 1000); // Now
        const interval = '2m';

        const res = await axios.get(
          `${GET_STOCK_DATA}?symbol=${symbol}&period1=${period1}&period2=${period2}&interval=${interval}`
        );

        const result = res.data.chart.result[0];
        const timestamps = result.timestamp.map((ts: number) => new Date(ts * 1000));
        const prices = result.indicators.quote[0].close;

        setName(result.meta.shortName)

        // Determine the line color based on price movement
        const isPriceIncreasing = prices[prices.length - 1] > prices[0];
        const lineColor = isPriceIncreasing ? 'rgba(75, 192, 192, 1)' : 'rgba(255, 0, 102, 1)'; // Default color if increasing, neon red if not

        if (chartRef.current) {
          const ctx = chartRef.current.getContext('2d');
          if (!ctx) return;

          if (chartInstance) {
            chartInstance.destroy();
          }

          const newChartInstance = new Chart(ctx, {
            type: 'line',
            data: {
              labels: timestamps,
              datasets: [
                {
                  label: '',
                  data: prices,
                  fill: true,
                  borderColor: lineColor,
                  backgroundColor: isPriceIncreasing
                    ? 'rgba(75, 192, 192, 0.2)' // Default background color if increasing
                    : 'rgba(255, 0, 102, 0.2)', // Neon red background if not
                  tension: 0.1,
                  pointRadius: 0, // Hide the data points
                },
              ],
            },
            options: {
              scales: {
                x: {
                  type: 'time',
                  display: true, // Hide x-axis
                },
                y: {
                  beginAtZero: false,
                  display: true, // Hide y-axis
                },
              },
              plugins: {
                legend: {
                  display: false, // Hide the legend
                },
                tooltip: {
                  enabled: true,
                },
              },
            },
          });

        //   setChartInstance(newChartInstance);
        }
      } catch (error) {
        console.error('Error creating chart:', error);
      }
    };

    fetchData();
  }, [chartInstance]);

  return (
    <div className={"w-full p-2 text-center  mx-auto mt-10"+ className}>
        <p className='text-[18px] font-semibold'>{name}</p>
      <canvas ref={chartRef} />
    </div>
  );
};

export default BigStockChart;
