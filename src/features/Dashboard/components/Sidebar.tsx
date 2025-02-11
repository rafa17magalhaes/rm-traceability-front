import React from 'react';
import { FaHome, FaChartBar, FaCog } from 'react-icons/fa';
import { FooterLogo, MenuItem, MenuWrapper, SidebarContainer } from '../styles/dashboardStyles';

interface SidebarProps {
  collapsed?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed = false }) => {
  return (
    <SidebarContainer collapsed={collapsed}>
      <MenuWrapper>
        <MenuItem collapsed={collapsed}>
          <FaHome />
          <span>Dashboard</span>
        </MenuItem>
        <MenuItem collapsed={collapsed}>
          <FaChartBar />
          <span>Relatórios</span>
        </MenuItem>
        <MenuItem collapsed={collapsed}>
          <FaCog />
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
