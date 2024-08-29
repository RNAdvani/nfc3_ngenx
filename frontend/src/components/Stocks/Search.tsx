// components/SearchBar.tsx

import React, { useCallback, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { SEARCH_STOCKS } from "@/apiUrl";
import axios from "axios";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logged out");
  };

  const handleSearch = useCallback(async()=>{
      try {
        const res = await axios.get(SEARCH_STOCKS, {
          params: {
            q:query,
          },
        });
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
  },[query])

  useEffect(()=>{
    if(query){
      handleSearch();
    }
  },[query])

  return (
    <div className=" top-4 right-4 flex items-center space-x-4 p-2">
      <div className="relative w-full max-w-xs">
        <Input
          type="text"
          onChange={handleChange}
          placeholder="Search..."
          className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#000c08] text-white"
        />
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 4a7 7 0 100 14 7 7 0 000-14zm6.293 12.707a1 1 0 00-1.414-1.414A8.978 8.978 0 0018 11a8.978 8.978 0 00-2.121-5.293 1 1 0 10-1.415 1.415A6.978 6.978 0 0116 11a6.978 6.978 0 01-1.293 4.293z"
            />
          </svg>
        </span>
      </div>
      <button
        onClick={handleLogout}
        className="bg-[#18342b] hover:bg-lightgreen duration-300 hover:text-background text-white font-semibold py-2 px-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Logout
      </button>
    </div>
  );
};

export default SearchBar;
