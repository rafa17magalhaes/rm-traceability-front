import styled, { keyframes } from 'styled-components';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const primaryColor = '#00509E';

// =========== Cabeçalho e Botões ===========
export const HeaderContainerHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  background-color: #fff;
  padding: 0 1rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

export const TitleHeader = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 1.2rem;
  color: #333;
`;

export const IconButtonHeader = styled.button`
  background: none;
  border: none;
  margin-right: 0.8rem;
  font-size: 1.2rem;
  cursor: pointer;
  color: #555;
  transition: color 0.2s ease;

  &:hover {
    color: #000;
  }
`;

export const RightSideHeader = styled.div`
  display: flex;
  align-items: center;
`;

export const LogoutButton = styled.button`
  background-color: ${primaryColor};
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.45rem 1rem;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #003b78;
  }
`;

export const UserMenuContainer = styled.div`
  position: relative;
  margin-left: 1rem;
`;

export const UserMenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

export const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  background-color: ${primaryColor};
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 1rem;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

// =========== Dropdown do Usuário ===========
export const UserMenuDropdown = styled.div`
  position: absolute;
  top: 2.8rem;
  right: 0;
  background-color: rgba(235, 235, 235, 0.95);
  backdrop-filter: blur(4px);
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  min-width: 230px;
  padding: 0.75rem;
  z-index: 999;
  animation: ${fadeInUp} 0.2s ease forwards;

  &::before {
    content: '';
    position: absolute;
    top: -8px;
    right: 25px;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 8px solid rgba(235, 235, 235, 0.95);
  }
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.75rem;
`;

export const InfoLine = styled.span`
  display: flex;
  align-items: center;
  font-size: 0.88rem;
  color: #666;
  margin: 0.2rem 0;

  &.username {
    font-size: 1rem;
    color: #333;
    font-weight: 600;
    margin-bottom: 0.3rem;
  }

  .icon {
    margin-right: 7px;
    font-size: 1.7rem;
    color: #777;
  }
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ddd;
  margin: 0.5rem 0;
`;

// =========== Dropdown de Notificações ===========
export const NotificationItem = styled.div`
  background-color: #fafafa;
  border-radius: 4px;
  padding: 0.5rem 0.6rem;
  margin-bottom: 0.5rem;

  &:hover {
    background-color: #f0f0f0;
  }

  p {
    margin: 0.2rem 0;
    font-size: 0.85rem;
    color: #666;
  }

  .notiIcon {
    margin-right: 5px;
    font-size: 1rem;
    color: #fa8c16;
  }
`;

export const NotificationsContainer = styled.div`
  position: absolute;
  top: 2.8rem;
  right: 0;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(4px);
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  min-width: 320px;
  max-height: 500px;
  overflow-y: auto;
  padding: 0.75rem;
  z-index: 999;
  animation: ${fadeInUp} 0.2s ease forwards;
`;

export const NotificationTitle = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
`;

export const NotificationItemHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.2rem;
  font-size: 0.9rem;
  color: #333;
  font-weight: bold;
`;

export const NotificationItemDate = styled.small`
  display: block;
  font-size: 0.75rem;
  color: #999;
  margin-top: 0.2rem;
`;

export const NotificationBadge = styled.span`
  position: absolute;
  top: -4px;
  right: -4px;
  background-color: #ff4d4f;
  color: #fff;
  border-radius: 50%;
  font-size: 0.7rem;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NotificationListItem = styled.div`
  cursor: pointer;
  display: flex;
  align-items: flex-start;
  gap: 0.8rem;
  padding: 0.6rem;
  margin-bottom: 0.6rem;
  border-radius: 6px;
  background-color: #fafafa;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export const NotificationContent = styled.div`
  flex: 1;
`;

export const NotificationProductImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
`;

export const NotificationNoImage = styled.div`
  width: 50px;
  height: 50px;
  background-color: #ddd;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  color: #666;
`;
