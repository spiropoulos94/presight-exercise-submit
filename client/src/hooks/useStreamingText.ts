import { useDispatch, useSelector } from 'react-redux';
import {
  startStreamingText,
  stopStreamingText,
  selectStreamingText,
  selectStreamingIsLoading,
  selectStreamingError,
} from '@/store/streamingSlice';
import { AppDispatch } from '@/store';

/**
 * Custom hook that provides streaming text functionality using Redux
 * but with a clean API that hides implementation details from components
 */
export const useStreamingText = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Get streaming state from Redux
  const text = useSelector(selectStreamingText);
  const isLoading = useSelector(selectStreamingIsLoading);
  const error = useSelector(selectStreamingError);

  // Start streaming text
  const refreshText = () => {
    dispatch(startStreamingText());
  };

  // Cancel streaming
  const cancelStreaming = () => {
    dispatch(stopStreamingText());
  };

  return {
    text,
    isLoading,
    error,
    refreshText,
    cancelStreaming,
  };
};
