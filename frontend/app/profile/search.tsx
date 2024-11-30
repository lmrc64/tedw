'use client';

import { useState } from "react";
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export function SearchInput({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);

    if (value.length >= 0) {
      onSearch(value); // Llama a la función recibida como prop
    }
  };

  return (
    <div className="relative ml-auto flex-1 md:grow-0">
      <Search className="absolute left-2.5 top-[.75rem] h-4 w-4 text-muted-foreground" />
      <Input
        name="q"
        type="search"
        placeholder="Search..."
        onChange={handleInputChange}
        value={query}
        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
      />
    </div>
  );
}

