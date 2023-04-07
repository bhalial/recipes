import React, { useRef } from "react";

const SearchInput = ({ value, onChange }) => {
  const inputRef = useRef(null);

  const handleClearClick = () => {
    onChange(""); // Clear input value using the onChange handler
    inputRef.current.focus();
  };

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        className="border border-gray-300 rounded-lg py-2 pl-4 pr-12 focus:outline-none focus:border-blue-500"
        placeholder="Search..."
        value={value}
        onChange={(e) => onChange(e.target.value)} // Call the onChange handler with the input value
      />
      {value && ( // Render clear button only if input value is not empty
        <button
          className="absolute top-0 right-0 mt-3 mr-3 focus:outline-none"
          onClick={handleClearClick}
        >
          <svg
            className="h-6 w-6 text-gray-400 hover:text-gray-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-11.293a1 1 0 00-1.414 1.414L9 10.414l-1.293-1.293a1 1 0 00-1.414 1.414L7.586 12l-1.293 1.293a1 1 0 001.414 1.414L9 13.414l1.293 1.293a1 1 0 001.414-1.414L10.414 12l1.293-1.293a1 1 0 00-.707-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default SearchInput;
