import React, { useState, useRef, useEffect } from 'react';
import {
  FaBars,
  FaRegBell,
  FaEnvelope,
  FaBuilding,
  FaIdBadge,
  FaExclamationCircle,
} from 'react-icons/fa';
import { useAuth } from 'context/AuthContext';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { fetchNotificationsThunk } from 'store/slices/notificationsSlice';
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
  NotificationItem,
  NotificationBadge,
  NotificationItemHeader,
  NotificationItemDate,
  NotificationProductImage,
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

  // Estado do menu do usuário
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  // Estado do menu de notificações
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Pega a lista de notificações do slice notifications
  const { list: notificationsList, loading: notificationsLoading } = useAppSelector(
    (state) => state.notifications
  );

  // Armazena localmente quais IDs ainda não foram "clicados"
  const [unreadIds, setUnreadIds] = useState<string[]>([]);

  // Ao clicar fora, fecha ambos os menus
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Fecha menu de usuário
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
      // Fecha menu de notificações
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

  // Quando abrir o menu de notificações, busca as últimas 8
  useEffect(() => {
    if (isNotificationsOpen) {
      dispatch(fetchNotificationsThunk({ page: 1, size: 8 }));
    }
  }, [isNotificationsOpen, dispatch]);

  // Quando terminar de carregar as notificações, definimos todas como não lidas (exemplo)
  useEffect(() => {
    if (
      isNotificationsOpen &&
      !notificationsLoading &&
      notificationsList.length > 0 &&
      unreadIds.length === 0
    ) {
      // Só marca como não lidos se ainda estiver vazio
      const newIds = notificationsList.map((evt) => evt.id);
      setUnreadIds(newIds);
    }
  }, [isNotificationsOpen, notificationsLoading, notificationsList, unreadIds]);
  
  // Contagem de não lidas
  const notificationCount = unreadIds.length;

  // Ao clicar na notificação, marca como lida e vai para /dashboard/eventos
  const handleNotificationClick = (evt: EventDTO) => {
    // Remove do array local
    setUnreadIds((prev) => prev.filter((id) => id !== evt.id));
    // Redireciona
    navigate('/dashboard/eventos');
  };

  // Toggles
  const toggleUserMenu = () => setIsUserMenuOpen((prev) => !prev);
  const toggleNotifications = () => setIsNotificationsOpen((prev) => !prev);

  // Iniciais do usuário
  const initials = user?.name
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
        <IconButtonHeader onClick={onToggleSidebar}>
          <FaBars />
        </IconButtonHeader>
        Painel de Controle
      </TitleHeader>

      <RightSideHeader>
        {/* Ícone do sino com badge */}
        <UserMenuContainer ref={notificationsRef}>
          <IconButtonHeader onClick={toggleNotifications} style={{ position: 'relative' }}>
            <FaRegBell /> {/* Sino outline */}
            {notificationCount > 0 && (
              <NotificationBadge>{notificationCount}</NotificationBadge>
            )}
          </IconButtonHeader>

          {isNotificationsOpen && (
            <NotificationsContainer
              style={{
                minWidth: '320px',
                maxHeight: '500px',
              }}
            >
              <NotificationTitle>Notificações</NotificationTitle>
              <Divider />

              {notificationsLoading && (
                <div style={{ padding: '0.5rem' }}>Carregando...</div>
              )}

              {!notificationsLoading && notificationsList.length === 0 && (
                <div style={{ padding: '0.5rem' }}>Nenhuma notificação</div>
              )}

              {!notificationsLoading &&
                notificationsList.map((evt) => {
                  const isUnread = unreadIds.includes(evt.id);

                  return (
                    <NotificationItem
                      key={evt.id}
                      onClick={() => handleNotificationClick(evt)}
                      style={{ cursor: 'pointer' }}
                    >
                      <NotificationItemHeader>
                        {/* Ícone "!" apenas se estiver não lido */}
                        {isUnread && <FaExclamationCircle className="notiIcon" />}
                        <strong>{evt.code?.value || 'Código'}</strong>
                      </NotificationItemHeader>

                      {/* Imagem do produto */}
                      {evt.resource?.imageUrl && (
                        <NotificationProductImage
                          src={evt.resource.imageUrl}
                          alt="Produto"
                        />
                      )}

                      {/* Mensagem genérica */}
                      <p style={{ margin: '0.2rem 0', fontSize: '0.85rem' }}>
                        Movimentação com o código <strong>{evt.code?.value}</strong>
                        {evt.resource?.name && (
                          <> - produto <strong>{evt.resource.name}</strong></>
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
                    </NotificationItem>
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
                  }}
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
