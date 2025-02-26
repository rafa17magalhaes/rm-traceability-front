import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  findAllStatus,
  createStatus,
  updateStatus,
  removeStatus,
  findActiveStatus,
} from 'api/status';
import { StatusDTO } from 'types/status/StatusDTO';
import { CreateStatusDTO } from 'types/status/CreateStatusDTO';
import { UpdateStatusDTO } from 'types/status/UpdateStatusDTO';

interface StatusesState {
  list: StatusDTO[];
  loading: boolean;
  error: string | null;
}

const initialState: StatusesState = {
  list: [],
  loading: false,
  error: null,
};

export const fetchAllStatusesThunk = createAsyncThunk(
  'statuses/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const data = await findAllStatus();
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

export const fetchActiveStatusesThunk = createAsyncThunk(
  'statuses/fetchActive',
  async (_, { rejectWithValue }) => {
    try {
      const data = await findActiveStatus();
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

export const createStatusThunk = createAsyncThunk(
  'statuses/create',
  async (dto: CreateStatusDTO, { rejectWithValue }) => {
    try {
      const newStatus = await createStatus(dto);
      return newStatus;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

export const updateStatusThunk = createAsyncThunk(
  'statuses/update',
  async (
    { id, dto }: { id: string; dto: UpdateStatusDTO },
    { rejectWithValue },
  ) => {
    try {
      const updatedStatus = await updateStatus(id, dto);
      return updatedStatus;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

export const removeStatusThunk = createAsyncThunk(
  'statuses/remove',
  async (id: string, { rejectWithValue }) => {
    try {
      await removeStatus(id);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

const statusesSlice = createSlice({
  name: 'statuses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetchAll
    builder
      .addCase(fetchAllStatusesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAllStatusesThunk.fulfilled,
        (state, action: PayloadAction<StatusDTO[]>) => {
          state.loading = false;
          state.list = action.payload;
        },
      )
      .addCase(fetchAllStatusesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // fetchActive
      .addCase(fetchActiveStatusesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchActiveStatusesThunk.fulfilled,
        (state, action: PayloadAction<StatusDTO[]>) => {
          state.loading = false;
          state.list = action.payload;
        },
      )
      .addCase(fetchActiveStatusesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // create
      .addCase(createStatusThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createStatusThunk.fulfilled,
        (state, action: PayloadAction<StatusDTO>) => {
          state.loading = false;
          state.list.push(action.payload);
        },
      )
      .addCase(createStatusThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // update
      .addCase(updateStatusThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateStatusThunk.fulfilled,
        (state, action: PayloadAction<StatusDTO>) => {
          state.loading = false;
          const index = state.list.findIndex((s) => s.id === action.payload.id);
          if (index >= 0) {
            state.list[index] = action.payload;
          }
        },
      )
      .addCase(updateStatusThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // remove
      .addCase(removeStatusThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        removeStatusThunk.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.list = state.list.filter((s) => s.id !== action.payload);
        },
      )
      .addCase(removeStatusThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default statusesSlice.reducer;
