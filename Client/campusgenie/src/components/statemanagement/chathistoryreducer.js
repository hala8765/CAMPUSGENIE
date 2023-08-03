import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chathistory",
  initialState: [],
  reducers: {
    appendChatHistory: (state, action) => {
      return [...state, ...action.payload];
    },
  },
});

export const { appendChatHistory } = chatSlice.actions;
export default chatSlice.reducer;
