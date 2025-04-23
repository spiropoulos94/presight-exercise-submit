import React, { useEffect } from 'react';
import FilterSidebar from '@/components/features/users/FilterSidebar';
import { FiltersResponse } from 'shared';

interface MobileFilterDrawerProps {
  isOpen: boolean;
  filters: FiltersResponse;
  selectedFilters: {
    hobbies: string[];
    nationalities: string[];
  };
  onFilterChange: (filters: { hobbies: string[]; nationalities: string[] }) => void;
  onClearAll: () => void;
  onClose: () => void;
}

const MobileFilterDrawer: React.FC<MobileFilterDrawerProps> = ({
  isOpen,
  filters,
  selectedFilters,
  onFilterChange,
  onClearAll,
  onClose,
}) => {
  // Add effect to disable body scrolling when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Cleanup when component unmounts
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0  bg-opacity-10 backdrop-blur-[1px] z-20 transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        className={`absolute right-0 top-0 bottom-0 w-[320px] bg-white transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <FilterSidebar
          filters={filters}
          selectedFilters={selectedFilters}
          onFilterChange={onFilterChange}
          onClearAll={onClearAll}
          mobileOpen={isOpen}
          onMobileClose={onClose}
        />
      </div>
    </div>
  );
};

export default MobileFilterDrawer;
