import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { CodeDTO } from 'types/codes/CodeDTO';
import { CreateCodeDTO } from 'types/codes/CreateCodeDTO';
import { BulkGenerateCodesDTO } from 'types/codes/BulkGenerateCodesDTO';
import { fetchAllCodes, createCode, bulkGenerateCodes } from 'api/codes';

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

// Thunk para buscar todos os códigos
export const fetchAllCodesThunk = createAsyncThunk(
  'codes/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchAllCodes();
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Thunk para criar 1 código
export const createCodeThunk = createAsyncThunk(
  'codes/create',
  async (dto: CreateCodeDTO, { rejectWithValue }) => {
    try {
      return await createCode(dto);
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Thunk para gerar códigos em lote
export const bulkGenerateCodesThunk = createAsyncThunk(
  'codes/bulkGenerate',
  async (dto: BulkGenerateCodesDTO, { rejectWithValue }) => {
    try {
      return await bulkGenerateCodes(dto);
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const codesSlice = createSlice({
  name: 'codes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchAll
      .addCase(fetchAllCodesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCodesThunk.fulfilled, (state, action: PayloadAction<CodeDTO[]>) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAllCodesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // create
      .addCase(createCodeThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCodeThunk.fulfilled, (state, action: PayloadAction<CodeDTO>) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(createCodeThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // bulkGenerate
      .addCase(bulkGenerateCodesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bulkGenerateCodesThunk.fulfilled, (state, action: PayloadAction<CodeDTO[]>) => {
        state.loading = false;
        // adiciona os novos códigos ao final da lista
        state.list.push(...action.payload);
      })
      .addCase(bulkGenerateCodesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default codesSlice.reducer;
