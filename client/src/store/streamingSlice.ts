import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchStreamingText } from '../services/api';
import { RootState } from './index';

export interface StreamingState {
  text: string;
  isLoading: boolean;
  error: string | null;
  abortController: AbortController | null;
}

const initialState: StreamingState = {
  text: '',
  isLoading: false,
  error: null,
  abortController: null,
};

// Async thunk for streaming text
export const startStreamingText = createAsyncThunk<void, void>(
  'streaming/fetchText',
  async (_, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;

      // If already streaming, don't start a new streaming session
      if (state.streaming.isLoading) return;

      // Create a new abort controller
      const abortController = new AbortController();
      dispatch(setAbortController(abortController));
      dispatch(setLoading(true));

      await fetchStreamingText((textChunk, isComplete) => {
        dispatch(setText(textChunk));
        if (isComplete) {
          dispatch(setLoading(false));
          dispatch(setAbortController(null));
        }
      }, abortController.signal);
    } catch (err) {
      // Only handle non-abort errors
      if (err instanceof Error && err.name !== 'AbortError') {
        throw err;
      } else {
        // For AbortError, just set loading to false
        dispatch(setLoading(false));
      }
    } finally {
      const state = getState() as RootState;
      if (!state.streaming.isLoading) {
        dispatch(setAbortController(null));
      }
    }
  },
);

// Stop streaming thunk
export const stopStreamingText = createAsyncThunk<void, void>(
  'streaming/stopText',
  async (_, { dispatch, getState }) => {
    const state = getState() as RootState;
    if (state.streaming.abortController) {
      state.streaming.abortController.abort();
      dispatch(setAbortController(null));
      dispatch(setLoading(false));
    }
  },
);

const streamingSlice = createSlice({
  name: 'streaming',
  initialState,
  reducers: {
    setText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    resetText: (state) => {
      state.text = '';
    },
    setAbortController: (state, action: PayloadAction<AbortController | null>) => {
      state.abortController = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(startStreamingText.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Failed to fetch streaming text';
    });
  },
});

// Export actions and reducer
export const { setText, setLoading, resetText, setAbortController } = streamingSlice.actions;

// Selectors
export const selectStreamingText = (state: RootState) => state.streaming.text;
export const selectStreamingIsLoading = (state: RootState) => state.streaming.isLoading;
export const selectStreamingError = (state: RootState) => state.streaming.error;
export const selectStreamingAbortController = (state: RootState) => state.streaming.abortController;

export default streamingSlice.reducer;
