import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chatCount',
  initialState: {
    chatCount: 0,
  },
  reducers: {
    incrementChatCount: (state) => {
      state.chatCount += 1;
    },
    resetChatCount: (state) => {
      state.chatCount = 0;
    },
  },
});

export const { incrementChatCount, resetChatCount } = chatSlice.actions;
export default chatSlice.reducer;
