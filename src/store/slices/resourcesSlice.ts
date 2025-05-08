import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchAllResources,
  createResource,
  updateResource,
  removeResource,
} from 'api/resources';
import { ResourceDTO } from 'types/resources/ResourceDTO';
import { CreateResourceDTO } from 'types/resources/CreateResourceDTO';
import { UpdateResourceDTO } from 'types/resources/UpdateResourceDTO';

interface ResourcesState {
  list: ResourceDTO[];
  loading: boolean;
  error: string | null;
}

const initialState: ResourcesState = {
  list: [],
  loading: false,
  error: null,
};

export const fetchAllResourcesThunk = createAsyncThunk(
  'resources/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchAllResources();
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

export const createResourceThunk = createAsyncThunk(
  'resources/create',
  async (dto: CreateResourceDTO, { rejectWithValue }) => {
    try {
      const newResource = await createResource(dto);
      return newResource;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

export const updateResourceThunk = createAsyncThunk(
  'resources/update',
  async (
    { id, dto }: { id: string; dto: UpdateResourceDTO },
    { rejectWithValue },
  ) => {
    try {
      const updated = await updateResource(id, dto);
      return updated;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

export const removeResourceThunk = createAsyncThunk(
  'resources/remove',
  async (id: string, { rejectWithValue }) => {
    try {
      await removeResource(id);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

const resourcesSlice = createSlice({
  name: 'resources',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetchAll
    builder
      .addCase(fetchAllResourcesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAllResourcesThunk.fulfilled,
        (state, action: PayloadAction<ResourceDTO[]>) => {
          state.loading = false;
          state.list = action.payload;
        },
      )
      .addCase(fetchAllResourcesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // create
      .addCase(createResourceThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createResourceThunk.fulfilled,
        (state, action: PayloadAction<ResourceDTO>) => {
          state.loading = false;
          state.list.push(action.payload);
        },
      )
      .addCase(createResourceThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // update
      .addCase(updateResourceThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateResourceThunk.fulfilled,
        (state, action: PayloadAction<ResourceDTO>) => {
          state.loading = false;
          const index = state.list.findIndex((r) => r.id === action.payload.id);
          if (index >= 0) {
            state.list[index] = action.payload;
          }
        },
      )
      .addCase(updateResourceThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // remove
      .addCase(removeResourceThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        removeResourceThunk.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.list = state.list.filter((r) => r.id !== action.payload);
        },
      )
      .addCase(removeResourceThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default resourcesSlice.reducer;
