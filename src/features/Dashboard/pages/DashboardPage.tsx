import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { DashboardContainer, MainContent } from '../styles/dashboardStyles';
import ServicesGrid from '../components/ServicesGrid';
import { useAuth } from 'context/AuthContext';

// Páginas de Users
import ListUsersPage from 'features/Users/pages/ListUsersPage';
import AddUserPage from 'features/Users/pages/AddUserPage';

// Páginas de Companies
import ListCompaniesPage from 'features/Companies/pages/ListCompaniesPage';
import AddCompanyPage from 'features/Companies/pages/AddCompanyPage';

const DashboardPage: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleToggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <DashboardContainer>
      {/* Barra lateral */}
      <Sidebar collapsed={sidebarCollapsed} />

      {/* Conteúdo principal */}
      <MainContent>
        {/* Header */}
        <Header onToggleSidebar={handleToggleSidebar} onLogout={handleLogout} />

        {/* Aqui é onde exibiremos as rotas filhas (telas do dashboard) */}
        <div style={{ padding: '1.5rem' }}>
          <Routes>
            {/* Rota padrão: exibe os cards (ServicesGrid) */}
            <Route index element={<ServicesGrid />} />
            
            {/* EMPRESAS */}
            <Route path="empresas" element={<ListCompaniesPage />} />
            <Route path="empresas/new" element={<AddCompanyPage />} />

            {/* USUÁRIOS */}
            <Route path="usuarios" element={<ListUsersPage />} />
            <Route path="usuarios/new" element={<AddUserPage />} />

            <Route path="*" element={<ServicesGrid />} />
          </Routes>
        </div>
      </MainContent>
    </DashboardContainer>
  );
};

export default DashboardPage;
