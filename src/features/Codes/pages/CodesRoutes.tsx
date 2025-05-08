import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import styled from 'styled-components';

const NavBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  align-items: center;
`;

const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: #333;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.2s, color 0.2s;

  &:hover {
    background-color: #f0f0f0;
  }

  &.active {
    background-color: #0066cc;
    color: #fff;
    font-weight: bold;
  }
`;

const CodesRoutes: React.FC = () => {
  return (
    <>
      <NavBar>
        <StyledLink to="/dashboard/codigos/list">Listagem</StyledLink>
        <StyledLink to="/dashboard/codigos/bulk-generate">Geração em Lote</StyledLink>
        <StyledLink to="/dashboard/codigos/movements">Movimentações de Produtos</StyledLink>
        <StyledLink to="/dashboard/codigos/inventory">Inventário</StyledLink>
      </NavBar>

      <Outlet />
    </>
  );
};

export default CodesRoutes;
