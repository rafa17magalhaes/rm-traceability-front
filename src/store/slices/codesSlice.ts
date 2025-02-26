import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { CodeDTO } from 'types/codes/CodeDTO';
import { CreateCodeDTO } from 'types/codes/CreateCodeDTO';
import { BulkGenerateCodesDTO } from 'types/codes/BulkGenerateCodesDTO';
import {
  fetchAllCodes,
  createCode,
  bulkGenerateCodes,
  changeCodeStatus,
} from 'api/codes';

interface CodesState {
  list: CodeDTO[];
  loading: boolean;
  error: string | null;
}

const initialState: CodesState = {
  list: [],
  loading: false,
  error: null,
};

export const fetchAllCodesThunk = createAsyncThunk(
  'codes/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchAllCodes();
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

export const createCodeThunk = createAsyncThunk(
  'codes/create',
  async (dto: CreateCodeDTO, { rejectWithValue }) => {
    try {
      return await createCode(dto);
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

export const bulkGenerateCodesThunk = createAsyncThunk(
  'codes/bulkGenerate',
  async (dto: BulkGenerateCodesDTO, { rejectWithValue }) => {
    try {
      return await bulkGenerateCodes(dto);
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

// thunk para mudar o status do código e registrar o evento
export const changeCodeStatusThunk = createAsyncThunk(
  'codes/changeStatus',
  async (
    params: {
      id: string;
      dto: {
        statusId: string;
        observation?: string;
        resourceId?: string;
      };
    },
    { rejectWithValue },
  ) => {
    try {
      return await changeCodeStatus(params.id, params.dto);
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

const codesSlice = createSlice({
  name: 'codes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetchAll
    builder
      .addCase(fetchAllCodesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAllCodesThunk.fulfilled,
        (state, action: PayloadAction<CodeDTO[]>) => {
          state.loading = false;
          state.list = action.payload;
        },
      )
      .addCase(fetchAllCodesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // create
      .addCase(createCodeThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createCodeThunk.fulfilled,
        (state, action: PayloadAction<CodeDTO>) => {
          state.loading = false;
          state.list.push(action.payload);
        },
      )
      .addCase(createCodeThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // bulkGenerate
      .addCase(bulkGenerateCodesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        bulkGenerateCodesThunk.fulfilled,
        (state, action: PayloadAction<CodeDTO[]>) => {
          state.loading = false;
          state.list.push(...action.payload);
        },
      )
      .addCase(bulkGenerateCodesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // changeCodeStatus
      .addCase(changeCodeStatusThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        changeCodeStatusThunk.fulfilled,
        (state, action: PayloadAction<CodeDTO>) => {
          state.loading = false;
          state.list = state.list.map((code) =>
            code.id === action.payload.id ? action.payload : code,
          );
        },
      )
      .addCase(changeCodeStatusThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default codesSlice.reducer;
