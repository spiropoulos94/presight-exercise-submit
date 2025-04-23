import { useDispatch, useSelector } from 'react-redux';
import {
  processRequest,
  processAllRequests,
  selectRequestItems,
  resetAllItems,
  cancelAndResetAll,
} from '@/store/queueSlice';
import { AppDispatch } from '@/store';

/**
 * Custom hook that provides websocket queue functionality using Redux
 * but with a clean API that hides implementation details from components
 */
export const useRequestQueue = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Get queue state from Redux
  const requestItems = useSelector(selectRequestItems);

  // Send a single request
  const sendRequest = (itemIndex: number) => {
    dispatch(processRequest(itemIndex));
  };

  // Send all requests
  const sendAllRequests = () => {
    dispatch(processAllRequests());
  };

  // Reset all items & cancel server processing
  const resetAll = () => {
    dispatch(cancelAndResetAll());
  };

  return {
    requestItems,
    sendRequest,
    sendAllRequests,
    resetAll,
  };
};
