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
  fetchUnreadCountThunk,
} from 'store/slices/notificationsSlice';
import { EventDTO } from 'types/events';
import ChatSearch from 'features/Chat/components/ChatSearch';
import NotificationPagination from 'components/Pagination/NotificationPagination';
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
  NotificationListItem,
  NotificationProductImage,
  NotificationNoImage,
  NotificationContent,
  NotificationItemHeader,
  NotificationItemDate,
  NotificationBadge,
} from '../styles/headerStyles';

const PAGE_SIZE = 20;

interface HeaderProps {
  onToggleSidebar?: () => void;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar, onLogout }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();

  const notificationsRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const {
    list: notificationsList,
    total,
    page,
    unreadCount,
    loading: notificationsLoading,
  } = useAppSelector((s) => s.notifications);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  useEffect(() => {
    dispatch(fetchUnreadCountThunk());
  }, [dispatch]);

  useEffect(() => {
    if (isNotificationsOpen) {
      dispatch(fetchNotificationsThunk({ page, size: PAGE_SIZE }));
      dispatch(fetchUnreadCountThunk());
    }
  }, [isNotificationsOpen, page, dispatch]);

  // fecha dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(e.target as Node)
      ) {
        setIsNotificationsOpen(false);
      }
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(e.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNotificationClick = async (evt: EventDTO) => {
    if (!evt.isRead) {
      await dispatch(markAsReadThunk(evt.id));
      dispatch(fetchUnreadCountThunk());
      dispatch(fetchNotificationsThunk({ page, size: PAGE_SIZE }));
    }
    setIsNotificationsOpen(false);
    navigate('/dashboard/eventos');
  };

  const handlePageChange = (newPage: number) => {
    dispatch(fetchNotificationsThunk({ page: newPage, size: PAGE_SIZE }));
  };

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

      <RightSideHeader>
        <ChatSearch />

        <UserMenuContainer ref={notificationsRef}>
          <IconButtonHeader
            onClick={() => setIsNotificationsOpen((o) => !o)}
            style={{ position: 'relative' }}
          >
            <FaRegBell />
            {unreadCount > 0 && (
              <NotificationBadge>{unreadCount}</NotificationBadge>
            )}
          </IconButtonHeader>

          {isNotificationsOpen && (
            <NotificationsContainer>
              <NotificationTitle>Notificações</NotificationTitle>
              <Divider />

              {notificationsLoading && (
                <div style={{ padding: '1rem', textAlign: 'center' }}>
                  Carregando...
                </div>
              )}

              {!notificationsLoading && notificationsList.length === 0 && (
                <div
                  style={{
                    padding: '1rem',
                    textAlign: 'center',
                    color: '#666',
                  }}
                >
                  Nenhuma notificação
                </div>
              )}

              {!notificationsLoading &&
                notificationsList.map((evt) => {
                  const img =
                    evt.resource?.imageUrl || evt.code?.resource?.imageUrl;
                  return (
                    <NotificationListItem
                      key={evt.id}
                      onClick={() => handleNotificationClick(evt)}
                    >
                      {img ? (
                        <NotificationProductImage src={img} alt="Produto" />
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
                        <p style={{ margin: '0.2rem 0' }}>
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
                        <p style={{ margin: '0.2rem 0', color: '#666' }}>
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
              <NotificationPagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
              <Divider />
              <div style={{ textAlign: 'center', padding: '0.5rem 0' }}>
                <button
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#00509E',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                  }}
                  onClick={() => navigate('/dashboard/eventos')}
                >
                  Ver todas
                </button>
              </div>
            </NotificationsContainer>
          )}
        </UserMenuContainer>

        <UserMenuContainer ref={userDropdownRef}>
          <UserMenuButton onClick={() => setIsUserMenuOpen((u) => !u)}>
            <UserAvatar>
              {user?.name
                ?.split(' ')
                .map((p) => p[0])
                .join('')
                .toUpperCase() || 'U'}
            </UserAvatar>
          </UserMenuButton>
          {isUserMenuOpen && (
            <UserMenuDropdown>
              <UserInfo>
                <InfoLine className="username">{user?.name}</InfoLine>
                <InfoLine>
                  <FaEnvelope className="icon" /> {user?.email}
                </InfoLine>
                <InfoLine>
                  <FaBuilding className="icon" /> {user?.companyName || '---'}
                </InfoLine>
                <InfoLine>
                  <FaIdBadge className="icon" />{' '}
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
