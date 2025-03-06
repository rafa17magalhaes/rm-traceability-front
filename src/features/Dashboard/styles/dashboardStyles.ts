import styled from 'styled-components';

export const DashboardContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #f4f7fa, #ffffff);
  font-family: 'Roboto', sans-serif;
`;

export const Logo = styled.img`
  width: 120px;
  height: auto;
`;

// Conteúdo principal com espaçamento e fundo branco
export const MainContent = styled.div<{ collapsed: boolean }>`
  margin-left: ${({ collapsed }) => (collapsed ? '80px' : '250px')};
  transition: margin-left 0.3s;
  min-height: 100vh;
  background: #ffffff;
  padding: 1.5rem;
`;

export const HeaderContainerHeader = styled.header`
  background: linear-gradient(90deg, #ffffff, #f8f9fa);
  padding: 1rem 2rem;
  border-bottom: 1px solid #ced4da;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 998;
`;

export const TitleHeader = styled.h1`
  margin: 0;
  font-size: 1.75rem;
  font-weight: 500;
  color: #333;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const IconButtonHeader = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-right: 1rem;
  font-size: 1.5rem;
  color: #00509e;
  transition: color 0.3s ease;
  &:hover {
    color: #003a75;
  }
`;

export const RightSideHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  font-size: 1rem;
  color: #333;
`;

export const LogoutButton = styled.button`
  background-color: #00509e;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #003a75;
  }
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 1.5rem;
`;

export const CardContainer = styled.div`
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  text-align: center;
  transition:
    transform 0.3s,
    box-shadow 0.3s;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  }
  h2 {
    margin: 0.8rem 0;
    font-size: 1.3rem;
    color: #333;
  }
  p {
    font-size: 1rem;
    color: #666;
  }
`;

export const IconWrapper = styled.div`
  color: #00509e;
  margin-bottom: 0.8rem;
`;

export const MoreButton = styled.button`
  background-color: #00509e;
  color: #fff;
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
  margin-top: 1rem;
  &:hover {
    background-color: #003a75;
  }
`;

/* SIDEBAR */
export const SidebarContainer = styled.div<{ collapsed: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: ${({ collapsed }) => (collapsed ? '80px' : '250px')};
  background-color: rgb(43, 52, 62);
  transition: width 0.3s;
  display: flex;
  flex-direction: column;
  overflow-x: hidden; /* Esconde a rolagem horizontal */
  box-shadow: 2px 0 12px rgba(0, 0, 0, 0.2);
  z-index: 999;
`;

export const MenuWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden; /* Esconde a rolagem horizontal */
  -webkit-overflow-scrolling: touch;
`;

export const FooterLogo = styled.div<{ collapsed: boolean }>`
  text-align: center;
  padding: 1rem;
  border-top: 1px solid #34495e;
  img {
    max-width: ${({ collapsed }) => (collapsed ? '50px' : '150px')};
    transition: max-width 0.3s;
  }
`;

export const MenuItem = styled.div<{ collapsed: boolean }>`
  display: flex;
  align-items: center;
  padding: 1rem;
  cursor: pointer;
  color: #ecf0f1;
  transition:
    background-color 0.3s,
    transform 0.3s;
  &:hover {
    background-color: #34495e;
    transform: scale(1.03);
  }
  svg {
    color: #ecf0f1;
    transition: color 0.3s;
  }
  span {
    margin-left: ${({ collapsed }) => (collapsed ? '0' : '1rem')};
    display: ${({ collapsed }) => (collapsed ? 'none' : 'inline')};
    font-size: 1rem;
  }
`;
