// components/SearchBar.jsx
import React, { useState } from "react";
import { Search } from "lucide-react";

/**
 * A reusable search bar component for the top header.
 * It includes an input field and a search icon.
 */
const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    // You could add more complex search logic here, like filtering a list.
    console.log(`Search term updated: ${event.target.value}`);
  };

  return (
    <div className="flex-grow flex justify-center px-4">
      <div className="relative w-full max-w-xl">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={16}
        />
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full pl-10 pr-4 py-1 rounded-md bg-zinc-700 text-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        />
      </div>
    </div>
  );
};

export default SearchBar;
