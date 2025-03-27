import React, { useState, useRef, useEffect } from 'react';
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
import { useNavigate } from 'react-router-dom';
import { EventDTO } from 'types/events';

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

  // Referências para fechar dropdowns ao clicar fora
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  // Dropdown states
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Redux notifications
  const { list: notificationsList, loading: notificationsLoading } =
    useAppSelector((state) => state.notifications);

  // Fecha dropdowns ao clicar fora
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

  // Quando abrir as notificações, buscar as últimas 8
  useEffect(() => {
    if (isNotificationsOpen) {
      dispatch(fetchNotificationsThunk({ page: 1, size: 8 }));
    }
  }, [isNotificationsOpen, dispatch]);

  // Contagem de não lidas
  const notificationCount = notificationsList.filter((evt) => !evt.isRead).length;

  // Ao clicar na notificação, marca como lido e navega
  const handleNotificationClick = (evt: EventDTO) => {
    if (!evt.isRead) {
      dispatch(markAsReadThunk(evt.id));
    }
    navigate('/dashboard/eventos');
  };

  // Toggles
  const toggleUserMenu = () => setIsUserMenuOpen((prev) => !prev);
  const toggleNotifications = () => setIsNotificationsOpen((prev) => !prev);

  // Iniciais do usuário
  const initials =
    user?.name
      ?.split(' ')
      .map((p) => p[0])
      .join('')
      .toUpperCase() || 'U';

  // Matrícula
  const matricula = user?.id ? user.id.slice(0, 6).toUpperCase() : '------';
  // Empresa
  const companyName = user?.companyName || '---';

  return (
    <HeaderContainerHeader>
      <TitleHeader>
        {/* Ícone para abrir/fechar sidebar */}
        <IconButtonHeader onClick={onToggleSidebar}>
          <FaBars />
        </IconButtonHeader>

        {/* Ícone para voltar ao dashboard */}
        <IconButtonHeader onClick={() => navigate('/dashboard')}>
          <FaHome />
        </IconButtonHeader>

        Painel de Controle
      </TitleHeader>

      <RightSideHeader>
        {/* Ícone do sino com badge */}
        <UserMenuContainer ref={notificationsRef}>
          <IconButtonHeader
            onClick={toggleNotifications}
            style={{ position: 'relative' }}
          >
            <FaRegBell />
            {notificationCount > 0 && (
              <NotificationBadge>{notificationCount}</NotificationBadge>
            )}
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

              {/* Carregando */}
              {notificationsLoading && (
                <div style={{ padding: '1rem', textAlign: 'center' }}>
                  Carregando...
                </div>
              )}

              {/* Sem notificações */}
              {!notificationsLoading && notificationsList.length === 0 && (
                <div style={{ padding: '1rem', textAlign: 'center', color: '#666' }}>
                  Nenhuma notificação
                </div>
              )}

              {/* Lista de notificações */}
              {!notificationsLoading &&
              notificationsList.map((evt) => {
                // Lógica de fallback para a imagem
                const imageUrl = evt.resource?.imageUrl || evt.code?.resource?.imageUrl;

                return (
                  <NotificationListItem
                    key={evt.id}
                    onClick={() => handleNotificationClick(evt)}
                  >
                    {/* Se existir imageUrl, mostra a imagem; caso contrário, placeholder */}
                    {imageUrl ? (
                      <NotificationProductImage
                        src={imageUrl}
                        alt="Produto"
                        style={{
                          width: '50px',
                          height: '50px',
                          objectFit: 'cover',
                        }}
                      />
                    ) : (
                      <NotificationNoImage>Sem img</NotificationNoImage>
                    )}

                    <NotificationContent>
                      <NotificationItemHeader>
                        {!evt.isRead && (
                          <FaExclamationCircle style={{ fontSize: '1rem', color: '#fa8c16' }} />
                        )}
                        <span>Movimentação</span>
                      </NotificationItemHeader>

                      <p style={{ margin: '0.2rem 0', fontSize: '0.85rem', color: '#444' }}>
                        Código: <strong>{evt.code?.value}</strong>
                        {evt.resource?.name && (
                          <> - Produto: <strong>{evt.resource.name}</strong></>
                        )}{' '}
                        em{' '}
                        {evt.createdAt
                          ? new Date(evt.createdAt).toLocaleString()
                          : 'data não informada'}
                        .
                      </p>

                      <p style={{ margin: '0.2rem 0', fontSize: '0.8rem', color: '#666' }}>
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

              {/* Botão "Ver todas" */}
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

        {/* MENU DO USUÁRIO */}
        <UserMenuContainer ref={userDropdownRef}>
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
