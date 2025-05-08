import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { createUser, findAllUsers, removeUser, updateUser } from 'api/users';
import { CreateUserDTO, UpdateUserDTO, UserDTO } from 'types/users';

interface UsersState {
  list: UserDTO[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  list: [],
  loading: false,
  error: null,
};

export const fetchAllUsers = createAsyncThunk(
  'users/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const data = await findAllUsers();
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

export const createUserThunk = createAsyncThunk(
  'users/create',
  async (dto: CreateUserDTO, { rejectWithValue }) => {
    try {
      const newUser = await createUser(dto);
      return newUser;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

export const updateUserThunk = createAsyncThunk(
  'users/update',
  async (
    { id, dto }: { id: string; dto: UpdateUserDTO },
    { rejectWithValue },
  ) => {
    try {
      const updated = await updateUser(id, dto);
      return updated;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

export const removeUserThunk = createAsyncThunk(
  'users/remove',
  async (id: string, { rejectWithValue }) => {
    try {
      await removeUser(id);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchAll
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAllUsers.fulfilled,
        (state, action: PayloadAction<UserDTO[]>) => {
          state.loading = false;
          state.list = action.payload;
        },
      )
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // create
      .addCase(createUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createUserThunk.fulfilled,
        (state, action: PayloadAction<UserDTO>) => {
          state.loading = false;
          state.list.push(action.payload);
        },
      )
      .addCase(createUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // update
      .addCase(updateUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateUserThunk.fulfilled,
        (state, action: PayloadAction<UserDTO>) => {
          state.loading = false;
          const index = state.list.findIndex((u) => u.id === action.payload.id);
          if (index >= 0) {
            state.list[index] = action.payload;
          }
        },
      )
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // remove
      .addCase(removeUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        removeUserThunk.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.list = state.list.filter((u) => u.id !== action.payload);
        },
      )
      .addCase(removeUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default usersSlice.reducer;
