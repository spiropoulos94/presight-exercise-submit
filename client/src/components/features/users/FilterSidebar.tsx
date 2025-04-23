import { useState, useEffect } from 'react';
import { FiltersResponse } from 'shared';
import { Box, Button, Typography, IconButton } from '@/components/ui';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { CloseIcon } from '@/components/ui/icons';

interface FilterSidebarProps {
  filters: FiltersResponse;
  selectedFilters: {
    hobbies: string[];
    nationalities: string[];
  };
  onFilterChange: (filters: { hobbies: string[]; nationalities: string[] }) => void;
  onClearAll?: () => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

const FilterSidebar = ({
  filters,
  selectedFilters,
  onFilterChange,
  onClearAll,
  mobileOpen,
  onMobileClose,
}: FilterSidebarProps) => {
  const { hobbies = [], nationalities = [] } = filters || {};
  const { hobbies: selectedHobbies, nationalities: selectedNationalities } = selectedFilters;
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [hobbySearch, setHobbySearch] = useState('');
  const [nationalitySearch, setNationalitySearch] = useState('');

  // Update isMobile on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sort hobbies and nationalities alphabetically
  const sortedHobbies = [...hobbies].sort((a, b) => a.localeCompare(b));
  const sortedNationalities = [...nationalities].sort((a, b) => a.localeCompare(b));

  // Filter by search
  const filteredHobbies = sortedHobbies.filter((hobby) =>
    hobby.toLowerCase().includes(hobbySearch.toLowerCase()),
  );

  const filteredNationalities = sortedNationalities.filter((nationality) =>
    nationality.toLowerCase().includes(nationalitySearch.toLowerCase()),
  );

  const handleHobbyChange = (hobby: string) => {
    const updatedHobbies = selectedHobbies.includes(hobby)
      ? selectedHobbies.filter((h) => h !== hobby)
      : [...selectedHobbies, hobby];

    onFilterChange({
      ...selectedFilters,
      hobbies: updatedHobbies,
    });
  };

  const handleNationalityChange = (nationality: string) => {
    const updatedNationalities = selectedNationalities.includes(nationality)
      ? selectedNationalities.filter((n) => n !== nationality)
      : [...selectedNationalities, nationality];

    onFilterChange({
      ...selectedFilters,
      nationalities: updatedNationalities,
    });
  };

  const handleClearAll = () => {
    // Clear search fields
    setHobbySearch('');
    setNationalitySearch('');
    // Call parent clear function if provided
    if (onClearAll) {
      onClearAll();
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Filters</CardTitle>
          {onClearAll && (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearAll}
                className={`${selectedHobbies.length === 0 && selectedNationalities.length === 0 ? 'opacity-50' : ''}`}
              >
                Clear
              </Button>
              {onMobileClose && isMobile && (
                <IconButton onClick={onMobileClose} size="small">
                  <CloseIcon />
                </IconButton>
              )}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {/* Hobbies filters */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-500 mb-2">TOP HOBBIES</h4>
          <input
            type="text"
            placeholder="Search hobbies..."
            value={hobbySearch}
            onChange={(e) => setHobbySearch(e.target.value)}
            className="w-full p-2 mb-3 border border-gray-300 rounded text-sm"
          />
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {filteredHobbies.length > 0 ? (
              filteredHobbies.map((hobby) => (
                <div key={hobby} className="flex items-center cursor-pointer">
                  <input
                    id={`hobby-${hobby}`}
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    checked={selectedHobbies.includes(hobby)}
                    onChange={() => handleHobbyChange(hobby)}
                  />
                  <label htmlFor={`hobby-${hobby}`} className="ml-2 text-sm text-gray-700">
                    {hobby}
                  </label>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No hobbies found</p>
            )}
          </div>
        </div>

        {/* Nationalities filters */}
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-2">NATIONALITIES</h4>
          <input
            type="text"
            placeholder="Search nationalities..."
            value={nationalitySearch}
            onChange={(e) => setNationalitySearch(e.target.value)}
            className="w-full p-2 mb-3 border border-gray-300 rounded text-sm"
          />
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {filteredNationalities.length > 0 ? (
              filteredNationalities.map((nationality) => (
                <div key={nationality} className="flex items-center cursor-pointer">
                  <input
                    id={`nationality-${nationality}`}
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    checked={selectedNationalities.includes(nationality)}
                    onChange={() => handleNationalityChange(nationality)}
                  />
                  <label
                    htmlFor={`nationality-${nationality}`}
                    className="ml-2 text-sm text-gray-700"
                  >
                    {nationality}
                  </label>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No nationalities found</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterSidebar;
