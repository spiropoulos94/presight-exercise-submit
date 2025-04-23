import React from 'react';
import { Box, IconButton } from '@/components/ui';
import { FilterListIcon } from '@/components/ui/icons';

interface MobileFilterButtonProps {
  onClick: () => void;
}

const MobileFilterButton: React.FC<MobileFilterButtonProps> = ({ onClick }) => {
  return (
    <Box className="fixed bottom-4 right-4 z-10">
      <IconButton
        onClick={onClick}
        color="primary"
        className="bg-blue-500 text-white shadow-lg hover:bg-blue-600"
      >
        <FilterListIcon />
      </IconButton>
    </Box>
  );
};

export default MobileFilterButton;
