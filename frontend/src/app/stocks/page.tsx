"use client";
import StockChart from "@/components/charts/chart";
import { CardWithForm } from "@/components/Stocks/Card";
import { DataTableDemo } from "@/components/Stocks/DataTable";
import SearchBar from "@/components/Stocks/Search";
import { WatchListTable } from "@/components/Stocks/WatchList";
// Import the new SearchBar component
import React from "react";

const Dashboard = () => {
  return (
    <div className="p-6 flex flex-col gap-2 w-full">
      <div className="flex justify-end w-full">
        <SearchBar /> {/* Use the new SearchBar component */}
      </div>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        <CardWithForm>
          <StockChart symbol="^NSEI" />
        </CardWithForm>
        <CardWithForm>
          <StockChart symbol="^BSESN" />
        </CardWithForm>
        <CardWithForm>
          <StockChart symbol="^NSEBANK" />
        </CardWithForm>
        <CardWithForm>
          <StockChart symbol="NVDA" />
        </CardWithForm>
      </div>
      <div className="mt-6 flex gap-6">
        <div className="flex-1">
          <div className="font-bold text-lg mb-2">Watchlist</div>
          <DataTableDemo />
        </div>
        <div className="flex-0.35">
          <div className="font-bold text-lg mb-2">Buys</div>
          <WatchListTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
