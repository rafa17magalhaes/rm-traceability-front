import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { findAllEvents, createEvent, findEventsByCodeId, findEventsByStatusId } from 'api/events';
import { EventDTO } from 'types/events/EventDTO';
import { CreateEventDTO } from 'types/events/CreateEventDTO';

interface EventsState {
  list: EventDTO[];
  loading: boolean;
  error: string | null;
}

const initialState: EventsState = {
  list: [],
  loading: false,
  error: null,
};

export const fetchAllEventsThunk = createAsyncThunk(
  'events/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const data = await findAllEvents();
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const createEventThunk = createAsyncThunk(
  'events/create',
  async (dto: CreateEventDTO, { rejectWithValue }) => {
    try {
      const newEvent = await createEvent(dto);
      return newEvent;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchEventsByCodeIdThunk = createAsyncThunk(
  'events/fetchByCodeId',
  async (codeId: string, { rejectWithValue }) => {
    try {
      const data = await findEventsByCodeId(codeId);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchEventsByStatusIdThunk = createAsyncThunk(
  'events/fetchByStatusId',
  async (statusId: string, { rejectWithValue }) => {
    try {
      const data = await findEventsByStatusId(statusId);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetchAll
    builder
      .addCase(fetchAllEventsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllEventsThunk.fulfilled, (state, action: PayloadAction<EventDTO[]>) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAllEventsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // create
      .addCase(createEventThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEventThunk.fulfilled, (state, action: PayloadAction<EventDTO>) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(createEventThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // fetch by codeId
      .addCase(fetchEventsByCodeIdThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEventsByCodeIdThunk.fulfilled, (state, action: PayloadAction<EventDTO[]>) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchEventsByCodeIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // fetch by statusId
      .addCase(fetchEventsByStatusIdThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEventsByStatusIdThunk.fulfilled, (state, action: PayloadAction<EventDTO[]>) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchEventsByStatusIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default eventsSlice.reducer;
