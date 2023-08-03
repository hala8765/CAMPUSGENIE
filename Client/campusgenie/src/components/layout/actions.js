// actions.js

// Action type
export const SEND_MESSAGE = "SEND_MESSAGE";

// Action creator
export const sendMessage = (message) => {
  return {
    type: SEND_MESSAGE,
    payload: message,
  };
};
