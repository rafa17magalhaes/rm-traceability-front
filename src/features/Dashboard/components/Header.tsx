import React from 'react';
import { FaBars } from 'react-icons/fa';
import { HeaderContainerHeader, IconButtonHeader, LogoutButton, RightSideHeader, TitleHeader } from '../styles/dashboardStyles';

interface HeaderProps {
  onToggleSidebar?: () => void;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar, onLogout }) => {
  return (
    <HeaderContainerHeader>
      <TitleHeader>
        <IconButtonHeader onClick={onToggleSidebar}>
          <FaBars />
        </IconButtonHeader>
        Menu
      </TitleHeader>

      <RightSideHeader>
        <div>Notificações</div>
        <div>Usuário</div>
        
        <LogoutButton onClick={onLogout}>
          Logout
        </LogoutButton>
      </RightSideHeader>
    </HeaderContainerHeader>
  );
};

export default Header;
