import React, { useState, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import {
  ModuleKey,
  setUserPermissions,
  UserPermissions,
} from 'store/slices/permissionsSlice';
import { RootState } from 'store';

import {
  FormContainer,
  FormTitle,
  ModulesList,
  ModuleItem,
  ToggleContainer,
  ToggleSlider,
  ToggleLabel,
  ActionsRow,
} from '../styles/UserPermissionsFormStyles';

interface UserPermissionsFormProps {
  userId: string;
  userName: string;
  onClose: () => void;
}

// Lista de módulos
const MODULES: { key: ModuleKey; label: string }[] = [
  { key: 'empresas', label: 'Empresas' },
  { key: 'usuarios', label: 'Usuários' },
  { key: 'produtos', label: 'Produtos' },
  { key: 'codigos', label: 'Códigos' },
  { key: 'geracaoLote', label: 'Geração em Lote' },
  { key: 'movimentacoes', label: 'Movimentações' },
  { key: 'status', label: 'Status' },
  { key: 'rastreamento', label: 'Mapa de Rastreio' },
  { key: 'configuracoes', label: 'Configurações' },
  { key: 'inventario', label: 'Inventário' },
];

// Todas as permissões = true por padrão
const defaultPermissions: UserPermissions = {
  empresas: true,
  usuarios: true,
  produtos: true,
  codigos: true,
  geracaoLote: true,
  movimentacoes: true,
  status: true,
  rastreamento: true,
  configuracoes: true,
  inventario: true,
};

const UserPermissionsForm: React.FC<UserPermissionsFormProps> = ({
  userId,
  userName,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const existingPermissions = useAppSelector(
    (state: RootState) => state.permissions.data[userId]
  );

  // Estado local do form
  const [permissions, setPermissions] = useState<UserPermissions>({});

  useEffect(() => {
    if (existingPermissions) {
      setPermissions({ ...defaultPermissions, ...existingPermissions });
    } else {
      setPermissions({ ...defaultPermissions });
    }
  }, [existingPermissions]);

  // Alterna a permissão de um módulo
  const handleToggle = (moduleKey: ModuleKey) => {
    setPermissions((prev) => ({
      ...prev,
      [moduleKey]: !prev[moduleKey],
    }));
  };

  // Salva no Redux
  const handleSave = () => {
    dispatch(setUserPermissions({ userId, permissions }));
    onClose();
  };

  // Impede fechar modal clicando dentro do form
  const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <FormContainer onClick={stopPropagation}>
      <FormTitle>Permissões de Acesso - {userName}</FormTitle>

      <ModulesList>
        {MODULES.map((mod) => {
          const isActive = permissions[mod.key] || false;

          return (
            <ModuleItem key={mod.key}>
              <span>{mod.label}</span>
              <ToggleContainer>
                <ToggleSlider
                  $isActive={isActive}
                  onClick={() => handleToggle(mod.key)}
                />
                <ToggleLabel>{isActive ? 'Permitido' : 'Negado'}</ToggleLabel>
              </ToggleContainer>
            </ModuleItem>
          );
        })}
      </ModulesList>

      <ActionsRow>
        <button onClick={handleSave}>Salvar</button>
        <button onClick={onClose} style={{ marginLeft: '1rem' }}>
          Cancelar
        </button>
      </ActionsRow>
    </FormContainer>
  );
};

export default UserPermissionsForm;
