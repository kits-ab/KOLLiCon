import { configureStore } from '@reduxjs/toolkit';
import sentCheckReducer from './sentCheckSlice';

const store = configureStore({
  reducer: {
    sentCheck: sentCheckReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
