import React from 'react';
import { FaBuilding, FaUserFriends, FaCog, FaBoxes } from 'react-icons/fa';
import { FooterLogo, MenuItem, MenuWrapper, SidebarContainer } from '../styles/dashboardStyles';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  collapsed?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed = false }) => {
  const navigate = useNavigate();

  return (
    <SidebarContainer collapsed={collapsed}>
      <MenuWrapper>
        <MenuItem collapsed={collapsed} onClick={() => navigate('/dashboard/empresas')}>
          <FaBuilding size={20} />
          <span>Empresas</span>
        </MenuItem>

        <MenuItem collapsed={collapsed} onClick={() => navigate('/dashboard/usuarios')}>
          <FaUserFriends size={20} />
          <span>Usuários</span>
        </MenuItem>

        <MenuItem collapsed={collapsed} onClick={() => navigate('/dashboard/recursos')}>
          <FaBoxes size={20} />
          <span>Produtos</span>
        </MenuItem>

        <MenuItem collapsed={collapsed} onClick={() => navigate('/dashboard/configuracoes')}>
          <FaCog size={20} />
          <span>Configurações</span>
        </MenuItem>
      </MenuWrapper>
      <FooterLogo collapsed={collapsed}>
        <img src="/RM-traceability-logo.png" alt="Logo" />
      </FooterLogo>
    </SidebarContainer>
  );
};

export default Sidebar;
