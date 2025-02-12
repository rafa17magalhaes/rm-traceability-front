import styled from 'styled-components';

export const DashboardContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  background: #f4f7fa;
`;

 export const Logo = styled.img`
  width: 100px;
  height: auto;
`;

export const LogoutButton = styled.button`
  background-color: transparent;
  color: #00509e;
  border: 1px solid #00509e;
  border-radius: 4px;
  padding: 0.4rem 0.8rem;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;

  &:hover {
    background-color: #00509e;
    color: #fff;
  }
`;

export const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const HeaderContainer = styled.header`
  background-color: #f8f9fa;
  /* fixando a altura do header em 60px */
  height: 60px;
  padding: 0 2rem; /* Removi padding vertical pra não somar altura extra */
  border-bottom: 1px solid #ced4da;

  display: flex;
  align-items: center;   /* centraliza verticalmente */
  justify-content: space-between;
  box-sizing: border-box;
`;

export const HeaderContainerHeader = styled.header`
  background-color: #f8f9fa;
  padding: 1rem 2rem;
  border-bottom: 1px solid #ced4da;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TitleHeader = styled.h1`
  margin: 0;
  font-size: 1.25rem;
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
  font-size: 1.2rem;
`;

export const RightSideHeader = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  padding: 1.5rem;
`;

export const CardContainer = styled.div`
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }

  h2 {
    margin: 0.8rem 0;
    font-size: 1.2rem;
    color: #333;
  }

  p {
    font-size: 0.95rem;
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
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 1rem;

  &:hover {
    background-color: #003a75;
  }
`;

export const SidebarContainer = styled.div<{ collapsed: boolean }>`
  background-color: #f0f2f5;
  min-height: 100vh;
  width: ${({ collapsed }) => (collapsed ? '80px' : '250px')};
  transition: width 0.3s;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
`;

export const MenuWrapper = styled.div`
  margin-top: 2rem;
`;

export const MenuItem = styled.div<{ collapsed: boolean }>`
  display: flex;
  align-items: center;
  padding: 1rem;
  cursor: pointer;
  color: #333;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e2e6ea;
  }

  span {
    margin-left: ${({ collapsed }) => (collapsed ? '0' : '1rem')};
    display: ${({ collapsed }) => (collapsed ? 'none' : 'inline')};
  }
`;

export const FooterLogo = styled.div<{ collapsed: boolean }>`
  text-align: center;
  padding: 1rem;

  img {
    max-width: ${({ collapsed }) => (collapsed ? '50px' : '150px')};
    transition: max-width 0.3s;
  }
`;