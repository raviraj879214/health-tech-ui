"use client";
import { useState } from "react";

export  function ComboBoxUI() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const items = [
    { name: "Australia", category: "Country", image: "/images/australia.png" },
    { name: "Brazil", category: "Country", image: "/images/brazil.png" },
    { name: "China", category: "Country", image: "/images/china.png" },
    { name: "Egypt", category: "Country", image: "/images/egypt.png" },
  ];

  const filtered = items.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-sm relative">
      <div className="relative">
        <input
          type="text"
          placeholder="Type a name"
          className="py-2.5 ps-10 pe-4 block w-full border border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 150)} // slight delay to allow click
        />
        <div className="absolute inset-y-0 left-0 flex items-center ps-3.5 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400 dark:text-white/60"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>
      </div>

      {isOpen && filtered.length > 0 && (
        <div className="absolute z-50 w-full bg-white border border-gray-200 rounded-lg mt-1 dark:bg-neutral-800 dark:border-neutral-700 max-h-60 overflow-auto">
          {filtered.map((item, index) => (
            <div
              key={index}
              className="flex items-center cursor-pointer py-2 px-4 text-sm text-gray-800 hover:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-700"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-6 h-6 rounded-full me-2.5 object-cover"
              />
              <div>
                <div>{item.name}</div>
                <div className="text-xs text-gray-500 dark:text-neutral-400">{item.category}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
