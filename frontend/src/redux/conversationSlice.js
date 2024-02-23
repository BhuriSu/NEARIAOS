import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getConversations } from "../api/conversationApi"; // Update this import based on your API functions


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
      const response = await getConversations(); // Adjust this based on your actual API
      dispatch(loadConversationsSuccess(response.data)); 
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
    setConversations: (state, action) => {
      return action.payload; 
    },
    updateConversationMessages: (state, action) => {
      const { conversationId, newMessages } = action.payload;
      const conversationToUpdate = state.find((conversation) => conversation._id === conversationId);

      if (conversationToUpdate) {
        conversationToUpdate.messages = newMessages;
      }
    },
    updateConversationLastMessage: (state, action) => {
      const { conversationId, lastMessageAt } = action.payload;
      const conversationToUpdate = state.find((conversation) => conversation._id === conversationId);

      if (conversationToUpdate) {
        conversationToUpdate.lastMessageAt = lastMessageAt;
      }
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
  setConversations,
  updateConversationMessages,
  updateConversationLastMessage,
} = conversationSlice.actions;

export const selectConversations = (state) => state.conversation.conversations;
export const selectSender = (state) => state.conversation.sender;

// Export the reducer
export default conversationSlice.reducer;
