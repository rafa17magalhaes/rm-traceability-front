import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaBars,
  FaRegBell,
  FaEnvelope,
  FaBuilding,
  FaIdBadge,
  FaExclamationCircle,
  FaHome,
} from 'react-icons/fa';

import { useAuth } from 'context/AuthContext';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import {
  fetchNotificationsThunk,
  markAsReadThunk,
} from 'store/slices/notificationsSlice';

import { EventDTO } from 'types/events';

import ChatSearch from 'features/Chat/components/ChatSearch';
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
  NotificationsContainer,
  NotificationTitle,
  NotificationItemHeader,
  NotificationItemDate,
  NotificationProductImage,
  NotificationListItem,
  NotificationContent,
  NotificationNoImage,
  NotificationBadge,
} from '../styles/headerStyles';


interface HeaderProps {
  onToggleSidebar?: () => void;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar, onLogout }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();

  const userDropdownRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      ) {
        setIsNotificationsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const { list: notificationsList, loading: notificationsLoading } = useAppSelector(
    (state) => state.notifications
  );

  useEffect(() => {
    if (isNotificationsOpen) {
      dispatch(fetchNotificationsThunk({ page: 1, size: 8 }));
    }
  }, [isNotificationsOpen, dispatch]);

  const notificationCount = notificationsList.filter((evt) => !evt.isRead).length;

  const handleNotificationClick = (evt: EventDTO) => {
    if (!evt.isRead) {
      dispatch(markAsReadThunk(evt.id));
    }
    navigate('/dashboard/eventos');
  };

  // Toggles
  const toggleUserMenu = () => setIsUserMenuOpen((prev) => !prev);
  const toggleNotifications = () => setIsNotificationsOpen((prev) => !prev);

  return (
    <HeaderContainerHeader>
      <TitleHeader>
        <IconButtonHeader onClick={onToggleSidebar}>
          <FaBars />
        </IconButtonHeader>
        <IconButtonHeader onClick={() => navigate('/dashboard')}>
          <FaHome />
        </IconButtonHeader>
        Painel de Controle
      </TitleHeader>

        {/*ChatSearch*/}
        <RightSideHeader>
         <ChatSearch />

        {/* Notificações */}
        <UserMenuContainer ref={notificationsRef}>
          <IconButtonHeader onClick={toggleNotifications} style={{ position: 'relative' }}>
            <FaRegBell />
            {notificationCount > 0 && <NotificationBadge>{notificationCount}</NotificationBadge>}
          </IconButtonHeader>

          {isNotificationsOpen && (
            <NotificationsContainer
              style={{
                minWidth: '340px',
                maxWidth: '400px',
                maxHeight: '500px',
                padding: '0.8rem',
              }}
            >
              <NotificationTitle>Notificações</NotificationTitle>
              <Divider />
              {notificationsLoading && (
                <div style={{ padding: '1rem', textAlign: 'center' }}>Carregando...</div>
              )}
              {!notificationsLoading && notificationsList.length === 0 && (
                <div style={{ padding: '1rem', textAlign: 'center', color: '#666' }}>
                  Nenhuma notificação
                </div>
              )}
              {!notificationsLoading &&
                notificationsList.map((evt) => {
                  const imageUrl =
                    evt.resource?.imageUrl || evt.code?.resource?.imageUrl;
                  return (
                    <NotificationListItem
                      key={evt.id}
                      onClick={() => handleNotificationClick(evt)}
                    >
                      {imageUrl ? (
                        <NotificationProductImage
                          src={imageUrl}
                          alt="Produto"
                          style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                        />
                      ) : (
                        <NotificationNoImage>Sem img</NotificationNoImage>
                      )}
                      <NotificationContent>
                        <NotificationItemHeader>
                          {!evt.isRead && (
                            <FaExclamationCircle
                              style={{ fontSize: '1rem', color: '#fa8c16' }}
                            />
                          )}
                          <span>Movimentação</span>
                        </NotificationItemHeader>

                        <p
                          style={{ margin: '0.2rem 0', fontSize: '0.85rem', color: '#444' }}
                        >
                          Código: <strong>{evt.code?.value}</strong>
                          {evt.resource?.name && (
                            <>
                              {' '}
                              - Produto: <strong>{evt.resource.name}</strong>
                            </>
                          )}{' '}
                          em{' '}
                          {evt.createdAt
                            ? new Date(evt.createdAt).toLocaleString()
                            : 'data não informada'}
                          .
                        </p>
                        <p
                          style={{ margin: '0.2rem 0', fontSize: '0.8rem', color: '#666' }}
                        >
                          Status: <strong>{evt.status?.name || '---'}</strong>
                        </p>
                        {evt.createdAt && (
                          <NotificationItemDate>
                            {new Date(evt.createdAt).toLocaleString()}
                          </NotificationItemDate>
                        )}
                      </NotificationContent>
                    </NotificationListItem>
                  );
                })}
              <Divider />
              <div style={{ textAlign: 'center' }}>
                <button
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#00509E',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    padding: '0.5rem 1rem',
                    borderRadius: '4px',
                    transition: 'background-color 0.2s ease',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = '#e6f0fa')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = 'transparent')
                  }
                  onClick={() => navigate('/dashboard/eventos')}
                >
                  Ver todas
                </button>
              </div>
            </NotificationsContainer>
          )}
        </UserMenuContainer>

        {/* Menu do usuário */}
        <UserMenuContainer ref={userDropdownRef}>
          <UserMenuButton onClick={toggleUserMenu}>
            <UserAvatar>
              {user?.name?.split(' ').map((p) => p[0]).join('').toUpperCase() || 'U'}
            </UserAvatar>
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
                  {user?.companyName || '---'}
                </InfoLine>
                <InfoLine>
                  <FaIdBadge className="icon" />
                  {user?.id ? user.id.slice(0, 6).toUpperCase() : '------'}
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
