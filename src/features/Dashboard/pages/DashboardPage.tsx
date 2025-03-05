import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { DashboardContainer, MainContent } from '../styles/dashboardStyles';
import ServicesGrid from '../components/ServicesGrid';
import { useAuth } from 'context/AuthContext';

// Páginas de Companies
import ListCompaniesPage from 'features/Companies/pages/ListCompaniesPage';
import AddCompanyPage from 'features/Companies/pages/AddCompanyPage';

// Página gerenciamento de usuários
import UserManagementPage from 'features/Users/pages/UserManagementPage';

// Página Produtos
import ResourceManagementPage from 'features/Resources/pages/ResourceManagementPage';

// Página de Códigos
import CodesRoutes from 'features/Codes/pages/CodesRoutes';
import CodesListPage from 'features/Codes/pages/CodesListPage';
import BulkGenerateCodesPage from 'features/Codes/pages/BulkGenerateCodesPage';
import CodeMovementPage from 'features/Codes/pages/CodeMovementPage';

// Listagem de Eventos
import EventsListPage from 'features/Events/pages/EventsListPage';

// Status
import AddStatusPage from 'features/Status/pages/AddStatusPage';
import ListStatusPage from 'features/Status/pages/ListStatusPage';

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
      <Sidebar collapsed={sidebarCollapsed} />
      <MainContent collapsed={sidebarCollapsed}>
      <Header onToggleSidebar={handleToggleSidebar} onLogout={handleLogout} />
        <div style={{ padding: '1.5rem' }}>
          <Routes>
            {/* Rota padrão: exibe os cards (ServicesGrid) */}
            <Route index element={<ServicesGrid />} />

            {/* EMPRESAS */}
            <Route path="empresas" element={<ListCompaniesPage />} />
            <Route path="empresas/new" element={<AddCompanyPage />} />
            <Route path="empresas/edit/:id" element={<AddCompanyPage />} />

            {/* USUÁRIOS */}
            <Route path="usuarios/*" element={<UserManagementPage />} />

            {/* PRODUTOS */}
            <Route path="recursos" element={<ResourceManagementPage />} />

            {/* CODIGO */}
            <Route path="codigos/*" element={<CodesRoutes />}>
              <Route index element={<CodesListPage />} />
              <Route path="list" element={<CodesListPage />} />
              <Route path="bulk-generate" element={<BulkGenerateCodesPage />} />
              <Route path="movements" element={<CodeMovementPage />} />
            </Route>

            {/*Listagem Eventos*/}
            <Route path="eventos" element={<EventsListPage />} />

            {/* STATUS */}
            <Route path="status" element={<ListStatusPage />} />
            <Route path="status/new" element={<AddStatusPage />} />
            <Route path="status/edit/:id" element={<AddStatusPage />} />

            {/* Fallback */}
            <Route path="*" element={<ServicesGrid />} />
          </Routes>
        </div>
      </MainContent>
    </DashboardContainer>
  );
};

export default DashboardPage;
