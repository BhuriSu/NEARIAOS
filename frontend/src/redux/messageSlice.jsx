import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sender: { username: "DefaultUser" }, 
  message: {
    direction: "to", 
    content: "Default Message Content",
  },
  content: "",
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    updateMessage: (state, action) => {
      state.message = action.payload;
    },
    setMessages: (state, action) => {
      return action.payload; 
    },
    setContent: (state, action) => {
      state.content = action.payload;
    },
    setSender: (state, action) => {
      state.sender = action.payload;
    },
    clearContent: (state) => {
      state.content = "";
    },
  },
});

export const { updateMessage, setMessages, setContent, setSender, clearContent } = messageSlice.actions;
export default messageSlice.reducer;