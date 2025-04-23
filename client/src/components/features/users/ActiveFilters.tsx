import React from 'react';
import { Box, Typography } from '@/components/ui';
import { CloseIcon } from '@/components/ui/icons';

interface ActiveFiltersProps {
  hobbies: string[];
  nationalities: string[];
  onRemoveHobby: (hobby: string) => void;
  onRemoveNationality: (nationality: string) => void;
  className?: string;
}

const ActiveFilters: React.FC<ActiveFiltersProps> = ({
  hobbies,
  nationalities,
  onRemoveHobby,
  onRemoveNationality,
  className = '',
}) => {
  if (hobbies.length === 0 && nationalities.length === 0) {
    return null;
  }

  return (
    <Box className={`mb-6 ${className}`}>
      <Typography variant="body2" color="secondary" className="mb-2">
        Active filters:
      </Typography>
      <Box className="flex flex-wrap gap-2">
        {hobbies.map((hobby) => (
          <span
            key={hobby}
            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center"
          >
            {hobby}
            <button
              onClick={() => onRemoveHobby(hobby)}
              className="ml-2 text-blue-500 hover:text-blue-700"
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          </span>
        ))}
        {nationalities.map((nationality) => (
          <span
            key={nationality}
            className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm flex items-center"
          >
            {nationality}
            <button
              onClick={() => onRemoveNationality(nationality)}
              className="ml-2 text-purple-500 hover:text-purple-700"
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          </span>
        ))}
      </Box>
    </Box>
  );
};

export default ActiveFilters;
