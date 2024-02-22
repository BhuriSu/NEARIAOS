import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getConversations } from "../api/conversationApi"; // Update this import based on your API functions

// Define the initial state for conversations
const initialState = {
  conversations: [],
  sender: null,
  loading: false,
  error: null,
};

// Define the asynchronous thunk to load conversations
export const loadConversations = createAsyncThunk(
  "conversation/loadConversations",
  async (_, { dispatch }) => {
    try {
      // Assuming you have an API function to fetch conversations
      const response = await getConversations(); // Adjust this based on your actual API
      dispatch(loadConversationsSuccess(response.data)); // Assuming the data structure is { conversations: [...] }
    } catch (error) {
      dispatch(loadConversationsFailure(error.message));
    }
  }
);

// Create a slice with reducers and the async thunk
const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    loadConversationsSuccess: (state, action) => {
      state.conversations = action.payload.conversations;
      state.loading = false;
      state.error = null;
    },
    loadConversationsFailure: (state, action) => {
      state.conversations = [];
      state.loading = false;
      state.error = action.payload;
    },
    setSender: (state, action) => {
      state.sender = action.payload;
    },

    // Add other reducers for handling conversation-related actions
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadConversations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(
        (action) =>
          action.type.endsWith("/rejected") &&
          action.meta.arg === "conversation/loadConversations",
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        }
      );
  },
});

// Export the async thunk and reducer actions
export const {
  loadConversationsSuccess,
  loadConversationsFailure,
  setSender,
} = conversationSlice.actions;

export const selectConversations = (state) => state.conversation.conversations;
export const selectSender = (state) => state.conversation.sender;

// Export the reducer
export default conversationSlice.reducer;
