import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaBuilding,
  FaUserFriends,
  FaCog,
  FaBoxes,
  FaQrcode,
  FaHistory,
  FaClipboardCheck,
  FaExchangeAlt,
  FaClone,
  FaBoxOpen,
  FaMapMarkerAlt,
  FaHome,
} from 'react-icons/fa';

import { useAuth } from 'context/AuthContext';
import { useAppSelector } from 'store/hooks';
import { RootState } from 'store';
import { ModuleKey } from 'store/slices/permissionsSlice';

import {
  FooterLogo,
  MenuItem,
  MenuWrapper,
  SidebarContainer,
} from '../styles/dashboardStyles';

const defaultPermissions: Record<ModuleKey, boolean> = {
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

interface SidebarProps {
  collapsed?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed = false }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const storedPermissions = useAppSelector(
    (state: RootState) => state.permissions.data[user?.id || ''] || {}
  );
  const finalPermissions: Record<ModuleKey, boolean> = {
    ...defaultPermissions,
    ...storedPermissions,
  };

  const isVisible = (permKey: ModuleKey) => finalPermissions[permKey] !== false;

  return (
    <SidebarContainer collapsed={collapsed}>
      <MenuWrapper>
        {/* NOVO ITEM PARA O DASHBOARD */}
        <MenuItem collapsed={collapsed} onClick={() => navigate('/dashboard')}>
          <FaHome size={20} />
          <span>Dashboard</span>
        </MenuItem>

        {isVisible('empresas') && (
          <MenuItem collapsed={collapsed} onClick={() => navigate('/dashboard/empresas')}>
            <FaBuilding size={20} />
            <span>Empresas</span>
          </MenuItem>
        )}
        {isVisible('usuarios') && (
          <MenuItem collapsed={collapsed} onClick={() => navigate('/dashboard/usuarios')}>
            <FaUserFriends size={20} />
            <span>Usuários</span>
          </MenuItem>
        )}
        {isVisible('produtos') && (
          <MenuItem collapsed={collapsed} onClick={() => navigate('/dashboard/recursos')}>
            <FaBoxes size={20} />
            <span>Produtos</span>
          </MenuItem>
        )}
        {isVisible('codigos') && (
          <MenuItem collapsed={collapsed} onClick={() => navigate('/dashboard/codigos')}>
            <FaQrcode size={20} />
            <span>Códigos</span>
          </MenuItem>
        )}
        {isVisible('geracaoLote') && (
          <MenuItem
            collapsed={collapsed}
            onClick={() => navigate('/dashboard/codigos/bulk-generate')}
          >
            <FaClone size={20} />
            <span>Geração em Lote</span>
          </MenuItem>
        )}
        {isVisible('movimentacoes') && (
          <>
            <MenuItem collapsed={collapsed} onClick={() => navigate('/dashboard/eventos')}>
              <FaHistory size={20} />
              <span>Últimas Movimentações</span>
            </MenuItem>
            <MenuItem
              collapsed={collapsed}
              onClick={() => navigate('/dashboard/codigos/movements')}
            >
              <FaExchangeAlt size={20} />
              <span>Movimentar Produtos</span>
            </MenuItem>
          </>
        )}
        {isVisible('inventario') && (
          <MenuItem
            collapsed={collapsed}
            onClick={() => navigate('/dashboard/codigos/inventory')}
          >
            <FaBoxOpen size={20} />
            <span>Inventário</span>
          </MenuItem>
        )}
        {isVisible('status') && (
          <MenuItem collapsed={collapsed} onClick={() => navigate('/dashboard/status')}>
            <FaClipboardCheck size={20} />
            <span>Status</span>
          </MenuItem>
        )}
        {isVisible('rastreamento') && (
          <MenuItem
            collapsed={collapsed}
            onClick={() => navigate('/dashboard/rastreamento')}
          >
            <FaMapMarkerAlt size={20} />
            <span>Mapa de Rastreio</span>
          </MenuItem>
        )}
        {isVisible('configuracoes') && (
          <MenuItem
            collapsed={collapsed}
            onClick={() => navigate('/dashboard/configuracoes')}
          >
            <FaCog size={20} />
            <span>Configurações</span>
          </MenuItem>
        )}
      </MenuWrapper>

      <FooterLogo collapsed={collapsed}>
        <img src="/RM-traceability-logo.png" alt="Logo" />
      </FooterLogo>
    </SidebarContainer>
  );
};

export default Sidebar;
