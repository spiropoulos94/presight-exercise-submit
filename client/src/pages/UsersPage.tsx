import { useState, useEffect } from 'react';
import { useUsers } from '@/hooks/useUsers';
import {
  UsersList,
  FilterSidebar,
  SearchBar,
  ActiveFilters,
  PageHeader,
  MobileFilterButton,
  MobileFilterDrawer,
} from '@/components/features/users';

const UsersPage = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Using our custom hook instead of local state and API calls
  const {
    users,
    filters,
    selectedFilters,
    pagination,
    isLoading,
    error,
    updateFilters,
    setSearch,
    clearFilters,
    changePage,
  } = useUsers();

  // Calculate if there are more users to load
  const hasMore = users.length < pagination.total;

  // Update isMobile on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // Handle filter changes
  const handleFilterChange = (filters: { hobbies: string[]; nationalities: string[] }) => {
    updateFilters(filters);
  };

  // Clear all filters including main search
  const clearAllFilters = () => {
    clearFilters();
  };

  // Handle removing a single hobby filter
  const handleRemoveHobby = (hobby: string) => {
    const updatedHobbies = selectedFilters.hobbies.filter((h) => h !== hobby);
    updateFilters({ hobbies: updatedHobbies });
  };

  // Handle removing a single nationality filter
  const handleRemoveNationality = (nationality: string) => {
    const updatedNationalities = selectedFilters.nationalities.filter((n) => n !== nationality);
    updateFilters({ nationalities: updatedNationalities });
  };

  // Toggle mobile filter drawer
  const toggleMobileFilter = () => {
    setMobileFilterOpen(!mobileFilterOpen);
  };

  // Load more users for infinite scrolling
  const loadMoreUsers = () => {
    changePage(pagination.page + 1);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Mobile filter button */}
      {isMobile && <MobileFilterButton onClick={toggleMobileFilter} />}

      {/* Mobile filter drawer */}
      {isMobile && (
        <MobileFilterDrawer
          isOpen={mobileFilterOpen}
          filters={filters}
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
          onClearAll={clearAllFilters}
          onClose={() => setMobileFilterOpen(false)}
        />
      )}

      {/* Desktop layout */}
      <div className="flex flex-1">
        {/* Desktop filter sidebar */}
        {!isMobile && (
          <div className="w-[280px] sticky top-0 h-screen overflow-y-auto bg-white shadow-md">
            <FilterSidebar
              filters={filters}
              selectedFilters={selectedFilters}
              onFilterChange={handleFilterChange}
              onClearAll={clearAllFilters}
            />
          </div>
        )}

        {/* Main content */}
        <div className="flex-1 p-4 sm:p-6">
          <PageHeader title="Users" subtitle="Browse and filter users by various criteria" />

          <SearchBar value={selectedFilters.search} onChange={handleSearchChange} />

          <ActiveFilters
            hobbies={selectedFilters.hobbies}
            nationalities={selectedFilters.nationalities}
            onRemoveHobby={handleRemoveHobby}
            onRemoveNationality={handleRemoveNationality}
          />

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-md mb-4">
              Error loading users: {error}
            </div>
          )}

          <UsersList
            users={users}
            loading={isLoading}
            hasMore={hasMore}
            loadMore={loadMoreUsers}
            total={pagination.total}
          />
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
