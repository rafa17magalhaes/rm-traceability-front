import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  createCompany,
  findAllCompanies,
  findOneCompany,
  updateCompany,
  removeCompany,
} from 'api/companies';
import { CompanyDTO, CreateCompanyDTO } from 'types/companies';

interface CompaniesState {
  list: CompanyDTO[];
  currentCompany: CompanyDTO | null;
  loading: boolean;
  error: string | null;
}

const initialState: CompaniesState = {
  list: [],
  currentCompany: null,
  loading: false,
  error: null,
};

export const fetchAllCompanies = createAsyncThunk(
  'companies/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const data = await findAllCompanies();
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Erro ao buscar empresas');
    }
  },
);

export const fetchCompanyById = createAsyncThunk(
  'companies/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      const data = await findOneCompany(id);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Erro ao buscar empresa');
    }
  },
);

export const createCompanyThunk = createAsyncThunk(
  'companies/create',
  async (payload: { company: CreateCompanyDTO }, { rejectWithValue }) => {
    try {
      const response = await createCompany(payload.company);
      return response;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

export const updateCompanyThunk = createAsyncThunk(
  'companies/update',
  async (
    payload: { id: string; dto: Partial<CompanyDTO> },
    { rejectWithValue },
  ) => {
    try {
      const response = await updateCompany(payload.id, payload.dto);
      return response;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

export const removeCompanyThunk = createAsyncThunk(
  'companies/remove',
  async (id: string, { rejectWithValue }) => {
    try {
      await removeCompany(id);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Erro ao remover empresa');
    }
  },
);

const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetchAllCompanies
    builder
      .addCase(fetchAllCompanies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAllCompanies.fulfilled,
        (state, action: PayloadAction<CompanyDTO[]>) => {
          state.loading = false;
          state.list = action.payload;
        },
      )
      .addCase(fetchAllCompanies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // fetchCompanyById
      .addCase(fetchCompanyById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCompanyById.fulfilled,
        (state, action: PayloadAction<CompanyDTO>) => {
          state.loading = false;
          state.currentCompany = action.payload;
        },
      )
      .addCase(fetchCompanyById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.currentCompany = null;
      })
      // createCompanyThunk
      .addCase(createCompanyThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createCompanyThunk.fulfilled,
        (state, action: PayloadAction<CompanyDTO>) => {
          state.loading = false;
          state.list.push(action.payload);
        },
      )
      .addCase(createCompanyThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // updateCompanyThunk
      .addCase(updateCompanyThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateCompanyThunk.fulfilled,
        (state, action: PayloadAction<CompanyDTO>) => {
          state.loading = false;
          state.list = state.list.map((company) =>
            company.id === action.payload.id ? action.payload : company,
          );
        },
      )
      .addCase(updateCompanyThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // removeCompanyThunk
      .addCase(removeCompanyThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        removeCompanyThunk.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.list = state.list.filter((c) => c.id !== action.payload);
        },
      )
      .addCase(removeCompanyThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default companiesSlice.reducer;
