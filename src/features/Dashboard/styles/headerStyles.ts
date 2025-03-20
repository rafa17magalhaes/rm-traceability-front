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

// Container geral do Header
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
  width: 40px; /* Avatar maior */
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

export const UserMenuDropdown = styled.div`
  position: absolute;
  top: 2.8rem;
  right: 0;
  background-color: rgba(235, 235, 235, 0.95); /* Fundo cinza mais claro */
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

  /* Ícone maior e com margem */
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
