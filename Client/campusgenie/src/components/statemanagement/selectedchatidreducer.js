// selectedChatIdSlice.js

import { createSlice } from "@reduxjs/toolkit";

const selectedChatIdSlice = createSlice({
  name: "selectedChatId",
  initialState: null,
  reducers: {
    setSelectedChatId: (state, action) => {
      return action.payload;
    },
  },
});

export const { setSelectedChatId } = selectedChatIdSlice.actions;
export default selectedChatIdSlice.reducer;
