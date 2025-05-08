import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { EventDTO } from 'types/events';
import { findAllEvents, markEventAsRead, getUnreadCount } from 'api/events';
import { QueryParamsDTO } from 'types/pagination';

interface NotificationsState {
  list: EventDTO[];
  total: number;
  page: number;
  size: number;
  unreadCount: number;
  loading: boolean;
  error: string | null;
}

const initialState: NotificationsState = {
  list: [],
  total: 0,
  page: 1,
  size: 20,
  unreadCount: 0,
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

// marca como lida
export const markAsReadThunk = createAsyncThunk(
  'notifications/markAsRead',
  async (eventId: string, { rejectWithValue }) => {
    try {
      const updatedEvent = await markEventAsRead(eventId);
      return updatedEvent;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

// busca só a contagem de não-lidas
export const fetchUnreadCountThunk = createAsyncThunk(
  'notifications/fetchCount',
  async (_, { rejectWithValue }) => {
    try {
      const { count } = await getUnreadCount();
      return count;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchNotificationsThunk.pending, (s) => {
      s.loading = true;
      s.error = null;
    });
    b.addCase(
      fetchNotificationsThunk.fulfilled,
      (
        s,
        a: PayloadAction<{
          data: EventDTO[];
          total: number;
          page: number;
          size: number;
        }>,
      ) => {
        s.loading = false;
        s.list = a.payload.data;
        s.total = a.payload.total;
        s.page = a.payload.page;
        s.size = a.payload.size;
      },
    );
    b.addCase(fetchNotificationsThunk.rejected, (s, a) => {
      s.loading = false;
      s.error = a.payload as string;
    });

    b.addCase(markAsReadThunk.fulfilled, (s, a) => {
      // atualiza no list atual
      const idx = s.list.findIndex((e) => e.id === a.payload.id);
      if (idx !== -1) s.list[idx] = a.payload;
    });

    b.addCase(
      fetchUnreadCountThunk.fulfilled,
      (s, a: PayloadAction<number>) => {
        s.unreadCount = a.payload;
      },
    );
  },
});

export default notificationsSlice.reducer;
