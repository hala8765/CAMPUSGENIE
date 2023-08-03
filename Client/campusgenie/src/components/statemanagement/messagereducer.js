import { createSlice } from '@reduxjs/toolkit';

// Chat messages slice
const messagesSlice = createSlice({
  name: 'messages',
  initialState: [], // Initial state for chat messages
  reducers: {
    addMessage: (state, action) => {
      state.push(action.payload); // Add a new message to the state
    },
    // Other chat message related reducers if needed
  },
});

export const { addMessage } = messagesSlice.actions;
export const messagesReducer = messagesSlice.reducer;