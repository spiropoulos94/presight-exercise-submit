import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUsers,
  fetchFilters,
  selectUsers,
  selectFilters,
  selectSelectedFilters,
  selectStatus,
  selectError,
  selectPagination,
  setSelectedFilters,
  setSearchQuery,
  resetFilters,
  setPage,
} from '@/store/usersSlice';
import { AppDispatch } from '@/store';

export const useUsers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector(selectUsers);
  const filters = useSelector(selectFilters);
  const selectedFilters = useSelector(selectSelectedFilters);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const pagination = useSelector(selectPagination);
  const isLoading = status === 'loading';

  useEffect(() => {
    // Load filters on component mount
    dispatch(fetchFilters());
  }, [dispatch]);

  useEffect(() => {
    // Fetch users whenever selected filters change or pagination changes
    dispatch(
      fetchUsers({
        ...selectedFilters,
        page: pagination.page,
        limit: pagination.perPage,
      }),
    );
  }, [dispatch, selectedFilters, pagination.page, pagination.perPage]);

  // Function to update filters
  const updateFilters = (newFilters: Partial<typeof selectedFilters>) => {
    dispatch(setSelectedFilters(newFilters));
    // Reset to page 1 when filters change
    dispatch(setPage(1));
  };

  // Function to set search query
  const setSearch = (query: string) => {
    dispatch(setSearchQuery(query));
    // Reset to page 1 when search changes
    dispatch(setPage(1));
  };

  // Function to clear all filters
  const clearFilters = () => {
    dispatch(resetFilters());
  };

  // Pagination functions
  const changePage = (newPage: number) => {
    dispatch(setPage(newPage));
  };

  return {
    // Data
    users,
    filters,
    selectedFilters,
    pagination,

    // Status
    isLoading,
    error,

    // Actions
    updateFilters,
    setSearch,
    clearFilters,
    changePage,
  };
};
