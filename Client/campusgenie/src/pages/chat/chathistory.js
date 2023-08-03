import axios from "axios";

export const getChatHistory = (chatId, accessToken) => {
  return axios.get("http://localhost:8000/api/history", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      chatId: chatId,
    },
  });
};
