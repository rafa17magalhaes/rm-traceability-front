import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { EventDTO } from 'types/events';
import { findAllEvents } from 'api/events';
import { QueryParamsDTO } from 'types/pagination';

interface NotificationsState {
  list: EventDTO[];
  loading: boolean;
  error: string | null;
}

const initialState: NotificationsState = {
  list: [],
  loading: false,
  error: null,
};

export const fetchNotificationsThunk = createAsyncThunk(
  'notifications/fetch',
  async (queryParams: QueryParamsDTO, { rejectWithValue }) => {
    try {
      const data = await findAllEvents(queryParams);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNotificationsThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchNotificationsThunk.fulfilled,
      (
        state,
        action: PayloadAction<{
          data: EventDTO[];
          total: number;
          page: number;
          size: number;
        }>,
      ) => {
        state.loading = false;
        state.list = action.payload.data;
      },
    );
    builder.addCase(fetchNotificationsThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default notificationsSlice.reducer;
