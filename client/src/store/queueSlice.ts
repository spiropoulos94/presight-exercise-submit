import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { processRequestApi, cancelAllRequestsApi } from '../services/api';
import { QueueResult, RequestItem } from 'shared';
import { RootState } from './index';

export interface QueueState {
  requestItems: RequestItem[];
  error: string | null;
}

const initialState: QueueState = {
  requestItems: Array(20)
    .fill(null)
    .map((_, index) => ({
      id: index,
      status: 'idle',
      result: null,
      requestId: null,
    })),
  error: null,
};

// Process a single request
export const processRequest = createAsyncThunk(
  'queue/processRequest',
  async (itemIndex: number, { getState, dispatch, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const item = state.queue.requestItems[itemIndex];

      // Don't re-send if already pending or complete
      if (item.status !== 'idle') return;

      // Update status to pending
      dispatch(updateItemStatus({ index: itemIndex, status: 'pending' }));

      // Make API call
      const { requestId, status } = await processRequestApi();

      // Return data for the reducer
      return {
        itemIndex,
        requestId,
        status,
      };
    } catch (err) {
      const error = err as Error;
      return rejectWithValue({
        itemIndex,
        error: error.message || 'Unknown error',
      });
    }
  },
);

// Process all idle requests
export const processAllRequests = createAsyncThunk(
  'queue/processAllRequests',
  async (_, { getState, dispatch }) => {
    const state = getState() as RootState;

    state.queue.requestItems.forEach((item, index) => {
      if (item.status === 'idle') {
        dispatch(processRequest(index));
      }
    });
  },
);

// Cancel all requests and reset UI
export const cancelAndResetAll = createAsyncThunk(
  'queue/cancelAndResetAll',
  async (_, { dispatch }) => {
    try {
      // Tell the server to cancel all pending requests
      await cancelAllRequestsApi();

      // Reset the UI state
      dispatch(resetAllItems());
    } catch (err) {
      console.error('Failed to cancel requests on server:', err);
      // Still reset the UI even if server communication fails
      dispatch(resetAllItems());
    }
  },
);

const queueSlice = createSlice({
  name: 'queue',
  initialState,
  reducers: {
    updateItemStatus: (
      state,
      action: PayloadAction<{ index: number; status: RequestItem['status'] }>,
    ) => {
      const { index, status } = action.payload;
      if (state.requestItems[index]) {
        state.requestItems[index].status = status;
      }
    },
    updateItem: (state, action: PayloadAction<{ index: number; data: Partial<RequestItem> }>) => {
      const { index, data } = action.payload;
      if (state.requestItems[index]) {
        state.requestItems[index] = {
          ...state.requestItems[index],
          ...data,
        };
      }
    },
    completeRequest: (state, action: PayloadAction<QueueResult>) => {
      const { requestId, result } = action.payload;
      const index = state.requestItems.findIndex((item) => item.requestId === requestId);

      if (index !== -1) {
        state.requestItems[index] = {
          ...state.requestItems[index],
          status: 'complete',
          result,
        };
      }
    },
    resetAllItems: (state) => {
      state.requestItems = initialState.requestItems;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(processRequest.fulfilled, (state, action) => {
        if (action.payload) {
          const { itemIndex, requestId, status } = action.payload;
          state.requestItems[itemIndex] = {
            ...state.requestItems[itemIndex],
            requestId,
            status,
          };
        }
      })
      .addCase(processRequest.rejected, (state, action) => {
        const payload = action.payload as { itemIndex: number; error: string };
        if (payload) {
          state.requestItems[payload.itemIndex] = {
            ...state.requestItems[payload.itemIndex],
            status: 'idle',
            error: payload.error,
          };
        }
      });
  },
});

// Export actions and reducer
export const { updateItemStatus, updateItem, completeRequest, resetAllItems } = queueSlice.actions;

// Selectors
export const selectRequestItems = (state: RootState) => state.queue.requestItems;
export const selectQueueError = (state: RootState) => state.queue.error;

export default queueSlice.reducer;
