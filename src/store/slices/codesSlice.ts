import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { CodeDTO } from 'types/codes/CodeDTO';
import { CreateCodeDTO } from 'types/codes/CreateCodeDTO';
import { BulkGenerateCodesDTO } from 'types/codes/BulkGenerateCodesDTO';
import {
  fetchAllCodes,
  createCode,
  bulkGenerateCodes,
  changeCodeStatus,
  fetchInventoryCodes,
} from 'api/codes';
import { QueryParamsDTO, PaginationDTO } from 'types/pagination';

interface CodesState {
  list: CodeDTO[];
  total: number;
  page: number;
  size: number;
  loading: boolean;
  error: string | null;
}

const initialState: CodesState = {
  list: [],
  total: 0,
  page: 1,
  size: 20,
  loading: false,
  error: null,
};

export const fetchAllCodesThunk = createAsyncThunk(
  'codes/fetchAll',
  async (queryParams: QueryParamsDTO, { rejectWithValue }) => {
    try {
      const data: PaginationDTO<CodeDTO> = await fetchAllCodes(queryParams);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

export const fetchInventoryCodesThunk = createAsyncThunk(
  'codes/fetchInventory',
  async (queryParams: QueryParamsDTO, { rejectWithValue }) => {
    try {
      const data: PaginationDTO<CodeDTO> =
        await fetchInventoryCodes(queryParams);
      return data;
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
        (state, action: PayloadAction<PaginationDTO<CodeDTO>>) => {
          state.loading = false;
          state.list = action.payload.data;
          state.total = action.payload.total;
          state.page = action.payload.page;
          state.size = action.payload.size;
        },
      )
      .addCase(fetchAllCodesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // inventory
      .addCase(fetchInventoryCodesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchInventoryCodesThunk.fulfilled,
        (state, action: PayloadAction<PaginationDTO<CodeDTO>>) => {
          state.loading = false;
          state.list = action.payload.data;
          state.total = action.payload.total;
          state.page = action.payload.page;
          state.size = action.payload.size;
        },
      )
      .addCase(fetchInventoryCodesThunk.rejected, (state, action) => {
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
