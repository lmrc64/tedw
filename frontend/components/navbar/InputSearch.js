import { useEffect, useState } from "react";

export default function Search( {onSearch} ) {
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);

    if (value.length >= 5) {
      onSearch(value);
    }
  };

  return (
    <div className="relative flex">
      <input
        type="search"
        className="font-primary font-extrabold relative m-0 block flex-auto rounded border border-solid border-purple-700 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base leading-[1.6] text-surface outline-none transition duration-200 ease-in-out placeholder:text-purple-900 focus:z-[3] focus:border-primary focus:shadow-inset focus:outline-none motion-reduce:transition-none dark:border-white/10 dark:text-white dark:placeholder:text-neutral-200 dark:autofill:shadow-autofill dark:focus:border-primary"
        placeholder="Search"
        aria-label="Search"
        value={query}
        onChange={handleInputChange}
      />
      <span
        className="flex items-center whitespace-nowrap px-3 py-[0.25rem] text-surface dark:border-neutral-400 dark:text-white [&>svg]:h-5 [&>svg]:w-5"
        id="button-addon2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </span>
    </div>
  );
}
