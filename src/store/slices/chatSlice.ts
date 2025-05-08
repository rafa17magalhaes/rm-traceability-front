import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ChatDTO, ChatResponseDTO } from 'types/chat';
import { sendMessageToChatIntegration } from 'api/chatIntegration';

interface ChatState {
  messages: ChatResponseDTO[];
  loading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  messages: [],
  loading: false,
  error: null,
};

// Thunk para enviar mensagem
export const sendChatMessageThunk = createAsyncThunk(
  'chat/sendMessage',
  async (dto: ChatDTO, { rejectWithValue }) => {
    try {
      return await sendMessageToChatIntegration(dto);
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    clearChat(state) {
      state.messages = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendChatMessageThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendChatMessageThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.messages.push(action.payload); // Armazena a resposta no array
      })
      .addCase(sendChatMessageThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearChat } = chatSlice.actions;
export default chatSlice.reducer;
