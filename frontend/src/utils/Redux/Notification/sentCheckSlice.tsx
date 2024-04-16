import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SentCheckState {
  value: boolean;
}

const initialState: SentCheckState = {
  value: false,
};

const sentCheckSlice = createSlice({
  name: 'sentCheck',
  initialState,
  reducers: {
    setSentCheck: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { setSentCheck } = sentCheckSlice.actions;
export default sentCheckSlice.reducer;
