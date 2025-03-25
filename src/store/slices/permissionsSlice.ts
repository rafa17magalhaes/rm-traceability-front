import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ModuleKey =
  | 'empresas'
  | 'usuarios'
  | 'produtos'
  | 'codigos'
  | 'geracaoLote'
  | 'movimentacoes'
  | 'status'
  | 'rastreamento'
  | 'configuracoes'
  | 'inventario';

export interface UserPermissions {
  [module: string]: boolean;
}

interface PermissionsState {
  data: Record<string, UserPermissions>;
}

const initialState: PermissionsState = {
  data: {},
};

export const permissionsSlice = createSlice({
  name: 'permissions',
  initialState,
  reducers: {
    setUserPermissions: (
      state,
      action: PayloadAction<{ userId: string; permissions: UserPermissions }>,
    ) => {
      const { userId, permissions } = action.payload;
      state.data[userId] = permissions;
    },
    toggleUserModule: (
      state,
      action: PayloadAction<{ userId: string; module: ModuleKey }>,
    ) => {
      const { userId, module } = action.payload;
      if (!state.data[userId]) {
        state.data[userId] = {};
      }
      const oldVal = state.data[userId][module] || false;
      state.data[userId][module] = !oldVal;
    },
  },
});

export const { setUserPermissions, toggleUserModule } =
  permissionsSlice.actions;
export default permissionsSlice.reducer;
