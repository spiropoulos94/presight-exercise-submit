import { configureStore, Middleware } from '@reduxjs/toolkit';
import usersReducer from './usersSlice';
import streamingReducer from './streamingSlice';
import queueReducer from './queueSlice';
import { socket } from '../services/api';
import { SocketEvents, QueueResult } from 'shared';
import { completeRequest } from './queueSlice';

// Socket middleware to handle websocket events
const socketMiddleware: Middleware = (store) => {
  // Setup socket event listeners when the middleware is created
  socket.on(SocketEvents.REQUEST_COMPLETE, (data: QueueResult) => {
    console.log('Socket received request complete:', data);
    store.dispatch(completeRequest(data));
  });

  // The middleware itself doesn't need to do anything special with actions
  return (next) => (action) => next(action);
};

// Create the store
export const store = configureStore({
  reducer: {
    users: usersReducer,
    streaming: streamingReducer,
    queue: queueReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Needed for Socket.io objects
    }).concat(socketMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
