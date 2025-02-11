import styled from 'styled-components';

interface SidebarProps {
  collapsed?: boolean;
}

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

export const ContentGrid = styled.div`
  flex: 1;
  padding: 1.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  background-color: #e9ecef;
  border-radius: 8px;
`;

export const CardContainer = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

h2 {
  margin: 0.5rem 0;
  font-size: 1.3rem;  // um pouco maior
  color: #333;
}

  p {
    margin: 0;
    font-size: 1rem;
    color: #00509e;
  }
`;

export const IconWrapper = styled.div`
  background-color: #d6e4f0; 
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin: 0 auto 1rem; 
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    color: #00509e;
  }
`;

export const MoreButton = styled.button`
  background-color: #00509e;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 0.75rem;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #00376e;
  }
`;

export const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem; /* espaçamento vertical entre os itens */
`;

export const MenuItem = styled.div<{ collapsed?: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background 0.2s ease;
  padding: 0.75rem 0;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
  }
  
  svg {
    margin-right: ${({ collapsed }) => (collapsed ? '0' : '8px')};
  }

  span {
    display: ${({ collapsed }) => (collapsed ? 'none' : 'inline')};
    white-space: nowrap;
  }
`;

export const FooterLogo = styled.div<{ collapsed?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ collapsed }) => (collapsed ? 'center' : 'flex-start')};
  padding: 1rem 0;
  
  img {
    /* Ajuste o tamanho do logo aqui */
    width: 110px;
    height: auto;
  }

  /* Se quiser texto ao lado do logo (quando expandido), inclua uma <span> */
  span {
    display: ${({ collapsed }) => (collapsed ? 'none' : 'inline')};
    margin-left: 8px;
    font-weight: bold;
  }
`;

export const SidebarContainer = styled.aside<SidebarProps>`
  background-color: #00509e;
  color: #fff;
  display: flex;
  flex-direction: column;    /* Vertical */
  justify-content: space-between; /* Espaço entre top e bottom */
  padding: 1rem;
  transition: width 0.3s ease;
  width: ${({ collapsed }) => (collapsed ? '70px' : '240px')};
  
  /* Se quiser a sidebar ocupando toda a altura da tela */
  height: 100vh;
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