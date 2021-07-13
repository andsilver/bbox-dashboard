import { createSlice } from '@reduxjs/toolkit';

export const lotterySlice = createSlice({
  name: 'lottery',
  initialState: {
    capacity: 0,
    balance: 0
  },
  reducers: {
    setLotteryCapacity: (state, action) => {
      state.capacity = action.payload;
    }
  }
});

export const { setLotteryCapacity } = lotterySlice.actions;
export default lotterySlice.reducer;
