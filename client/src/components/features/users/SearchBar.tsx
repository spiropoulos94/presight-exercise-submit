import React from 'react';
import { Box, TextField } from '@/components/ui';

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, className = '' }) => {
  return (
    <Box className={`mb-6 ${className}`}>
      <TextField
        placeholder="Search by name..."
        value={value}
        onChange={onChange}
        className="w-full max-w-md"
      />
    </Box>
  );
};

export default SearchBar;
