// components/SearchBar.tsx
'use client';
import { useState } from 'react';

const SearchBar = ({ onSearch }: { onSearch: (term: string) => void }) => {
  const [term, setTerm] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch(term.trim());
    }
  };

  return (
    <input
      type="text"
      placeholder="Search by Name or NORAD ID"
      className="w-full p-2 border rounded mb-4"
      value={term}
      onChange={(e) => setTerm(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  );
};

export default SearchBar;
