import React from 'react';

const SearchForm = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="flex justify-center  mt-5">
      <form className="flex items-center bg-gray-100 w-full bg-gray-200 rounded-lg h-12   py-2 shadow-md">
        <button type="submit">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="text-gray-500">
            <path fill="none" d="M0 0h24v24H0z"/>
            <path d="M10 2a8 8 0 105.293 14.293l5.61 5.61 1.414-1.414-5.61-5.61A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z"/>
          </svg>
        </button>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-transparent outline-none text-gray-700 placeholder-gray-500 w-full"
          placeholder="Search your links"
        />
      </form>
    </div>
  );
};

export default SearchForm;
