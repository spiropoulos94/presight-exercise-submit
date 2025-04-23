import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User, UserFilters, FiltersResponse } from 'shared';
import { RootState } from './index';
import { getUsersApi, getFiltersApi } from '../services/api';

export interface UsersState {
  users: User[];
  filters: FiltersResponse;
  selectedFilters: {
    hobbies: string[];
    nationalities: string[];
    search: string;
  };
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  pagination: {
    page: number;
    perPage: number;
    total: number;
  };
}

const initialState: UsersState = {
  users: [],
  filters: {
    hobbies: [],
    nationalities: [],
  },
  selectedFilters: {
    hobbies: [],
    nationalities: [],
    search: '',
  },
  status: 'idle',
  error: null,
  pagination: {
    page: 1,
    perPage: 10,
    total: 0,
  },
};

interface FetchUsersParams extends UserFilters {
  page?: number;
  limit?: number;
}

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (params: FetchUsersParams = {}, { rejectWithValue }) => {
    try {
      const { page = 1, limit = 10, ...filters } = params;
      const response = await getUsersApi(page, limit, filters);
      return {
        users: response.data,
        total: response.total || response.data.length,
        page,
      };
    } catch (err: any) {
      const error = err as Error;
      return rejectWithValue(error.message || 'Failed to fetch users');
    }
  },
);

export const fetchFilters = createAsyncThunk(
  'users/fetchFilters',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getFiltersApi();
      return data;
    } catch (err: any) {
      const error = err as Error;
      return rejectWithValue(error.message || 'Failed to fetch filters');
    }
  },
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSelectedFilters: (state, action: PayloadAction<Partial<typeof state.selectedFilters>>) => {
      state.selectedFilters = {
        ...state.selectedFilters,
        ...action.payload,
      };
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.selectedFilters.search = action.payload;
    },
    resetFilters: (state) => {
      state.selectedFilters = initialState.selectedFilters;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        fetchUsers.fulfilled,
        (state, action: PayloadAction<{ users: User[]; total: number; page: number }>) => {
          state.status = 'succeeded';

          // If this is the first page, replace the array
          // Otherwise, append the new users
          if (action.payload.page === 1) {
            state.users = action.payload.users;
          } else {
            // Append new users to the existing array
            state.users = [...state.users, ...action.payload.users];
          }

          state.pagination.total = action.payload.total;
        },
      )
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || 'Failed to fetch users';
      })
      .addCase(fetchFilters.fulfilled, (state, action) => {
        state.filters = action.payload;
      });
  },
});

// Actions
export const { setSelectedFilters, setSearchQuery, resetFilters, setPage } = usersSlice.actions;

// Selectors
export const selectUsers = (state: RootState) => (state as { users: UsersState }).users.users;
export const selectFilters = (state: RootState) => (state as { users: UsersState }).users.filters;
export const selectSelectedFilters = (state: RootState) =>
  (state as { users: UsersState }).users.selectedFilters;
export const selectStatus = (state: RootState) => (state as { users: UsersState }).users.status;
export const selectError = (state: RootState) => (state as { users: UsersState }).users.error;
export const selectPagination = (state: RootState) =>
  (state as { users: UsersState }).users.pagination;
export const selectIsLoading = (state: RootState) =>
  (state as { users: UsersState }).users.status === 'loading';

export default usersSlice.reducer;
