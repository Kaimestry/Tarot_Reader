import React from "react";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  onChange?: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search...",
  className = "",
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e.target.value);
  };

  return (
    <div className={`relative w-full ${className}`}>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="relative flex items-center group"
      >
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-5 h-5 transition-colors text-muted group-focus-within:text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="search"
          onChange={handleChange}
          placeholder={placeholder}
          className="block w-full py-2.5 pl-10 pr-4 text-sm transition-all border rounded-xl outline-none
                     bg-surface text-main border-divider placeholder:text-muted
                     focus:ring-2 focus:ring-primary focus:border-primary"
        />
      </form>
    </div>
  );
};

export default SearchBar;
