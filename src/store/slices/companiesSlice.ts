import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { createCompany, findAllCompanies, removeCompany } from 'api/companies';
import { CompanyDTO, CreateCompanyDTO } from 'types/companies';
import { CreateUserDTO } from 'types/users';

interface CompaniesState {
  list: CompanyDTO[];
  loading: boolean;
  error: string | null;
}

const initialState: CompaniesState = {
  list: [],
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
  }
);

export const createCompanyThunk = createAsyncThunk(
    'companies/create',
    async (payload: { company: CreateCompanyDTO; user: CreateUserDTO }, { rejectWithValue }) => {
      try {
        const response = await createCompany(payload.company); 
        return response;
      } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || err.message);
      }
    }  );
  

export const removeCompanyThunk = createAsyncThunk(
  'companies/remove',
  async (id: string, { rejectWithValue }) => {
    try {
      await removeCompany(id);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Erro ao remover empresa');
    }
  }
);

const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      // fetchAll
      .addCase(fetchAllCompanies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCompanies.fulfilled, (state, action: PayloadAction<CompanyDTO[]>) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAllCompanies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // create
      .addCase(createCompanyThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCompanyThunk.fulfilled, (state, action: PayloadAction<CompanyDTO>) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(createCompanyThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // remove
      .addCase(removeCompanyThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeCompanyThunk.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.list = state.list.filter((c) => c.id !== action.payload);
      })
      .addCase(removeCompanyThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default companiesSlice.reducer;
