import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: 'chatIds',
  initialState: [], // Initialize with an empty array
  reducers: {
    setChatIds: (state, action) => {
      return action.payload; // Replace the state with the action payload
    },
  },
});


export const { setChatIds } = chatSlice.actions;
export default chatSlice.reducer;

