import React, { useState, useRef, useEffect } from 'react';
import { FaBars, FaBell, FaEnvelope, FaBuilding, FaIdBadge } from 'react-icons/fa';
import { useAuth } from 'context/AuthContext';
import {
  HeaderContainerHeader,
  TitleHeader,
  IconButtonHeader,
  RightSideHeader,
  UserMenuContainer,
  UserMenuButton,
  UserMenuDropdown,
  UserInfo,
  LogoutButton,
  UserAvatar,
  Divider,
  InfoLine,
} from '../styles/headerStyles';

interface HeaderProps {
  onToggleSidebar?: () => void;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar, onLogout }) => {
  const { user } = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    }

    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isUserMenuOpen]);

  const toggleUserMenu = () => {
    setIsUserMenuOpen((prev) => !prev);
  };

  const initials = user?.name
    ?.split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase() || 'U';

  const matricula = user?.id ? user.id.slice(0, 6).toUpperCase() : '------';
  const companyName = user?.companyName || '---';

  return (
    <HeaderContainerHeader>
      <TitleHeader>
        <IconButtonHeader onClick={onToggleSidebar}>
          <FaBars />
        </IconButtonHeader>
        Painel de Controle
      </TitleHeader>

      <RightSideHeader>
        <IconButtonHeader>
          <FaBell />
        </IconButtonHeader>

        <UserMenuContainer ref={dropdownRef}>
          <UserMenuButton onClick={toggleUserMenu}>
            <UserAvatar>{initials}</UserAvatar>
          </UserMenuButton>

          {isUserMenuOpen && (
            <UserMenuDropdown>
              <UserInfo>
                <InfoLine className="username">{user?.name}</InfoLine>
                <InfoLine>
                  <FaEnvelope className="icon" />
                  {user?.email}
                </InfoLine>
                <InfoLine>
                  <FaBuilding className="icon" />
                  {companyName}
                </InfoLine>
                <InfoLine>
                  <FaIdBadge className="icon" />
                  {matricula}
                </InfoLine>
              </UserInfo>

              <Divider />

              <LogoutButton onClick={onLogout}>Sair</LogoutButton>
            </UserMenuDropdown>
          )}
        </UserMenuContainer>
      </RightSideHeader>
    </HeaderContainerHeader>
  );
};

export default Header;
