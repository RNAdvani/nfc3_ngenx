"use client";
import StockChart from "@/components/charts/chart";
import { CardWithForm } from "@/components/Stocks/Card";
import { DataTableDemo } from "@/components/Stocks/DataTable";
import SearchBar from "@/components/Stocks/Search";
import { WatchListTable } from "@/components/Stocks/WatchList";
import { Input } from "@/components/ui/input";
// Import the new SearchBar component
import React from "react";

const Dashboard = () => {
  return (
    <div className='p-6 flex flex-col gap-2 w-full'>
        <div className='flex justify-end w-full'>
          <Input placeholder='Search Stocks' className='w-[15rem]' />
        </div>
        <div className='grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-4'>
            <CardWithForm  symbol='^NSEI' />
            <CardWithForm symbol='^BSESN' />
         
            <CardWithForm symbol='^NSEBANK' /> 
            <CardWithForm symbol='NVDA' />

        </div>
        <div className='grid gap-6 grid-cols-5'>
          <DataTableDemo />
        </div>
        <div className="flex-0.35">
          <div className="font-bold text-lg mb-2">Buys</div>
          <WatchListTable />
        </div>
      </div>
  );
};

export default Dashboard;
