import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { useAuth } from 'context/AuthContext';
import RequirePermission from 'routes/RequirePermission';

import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import ServicesGrid from '../components/ServicesGrid';
import NoPermissionPage from '../components/NoPermissionPage';

import ListCompaniesPage from 'features/Companies/pages/ListCompaniesPage';
import AddCompanyPage from 'features/Companies/pages/AddCompanyPage';
import UserManagementPage from 'features/Users/pages/UserManagementPage';
import ResourceManagementPage from 'features/Resources/pages/ResourceManagementPage';
import CodesRoutes from 'features/Codes/pages/CodesRoutes';
import CodesListPage from 'features/Codes/pages/CodesListPage';
import BulkGenerateCodesPage from 'features/Codes/pages/BulkGenerateCodesPage';
import CodeMovementPage from 'features/Codes/pages/CodeMovementPage';
import InventoryPage from 'features/Codes/pages/InventoryPage';
import EventsListPage from 'features/Events/pages/EventsListPage';
import AddStatusPage from 'features/Status/pages/AddStatusPage';
import ListStatusPage from 'features/Status/pages/ListStatusPage';
import TraceabilityPage from 'features/Traceability/pages/TraceabilityPage';
import SettingsPage from 'features/Settings/pages/SettingsPage';
import AiPage from 'features/Chat/pages/AiPage';

import { DashboardContainer, MainContent } from '../styles/dashboardStyles';

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
            {/* Rota padrão: ServicesGrid */}
            <Route index element={<ServicesGrid />} />

            {/* EMPRESAS */}
            <Route
              path="empresas"
              element={
                <RequirePermission permKey="empresas">
                  <ListCompaniesPage />
                </RequirePermission>
              }
            />
            <Route
              path="empresas/new"
              element={
                <RequirePermission permKey="empresas">
                  <AddCompanyPage />
                </RequirePermission>
              }
            />
            <Route
              path="empresas/edit/:id"
              element={
                <RequirePermission permKey="empresas">
                  <AddCompanyPage />
                </RequirePermission>
              }
            />

            {/* USUÁRIOS */}
            <Route
              path="usuarios/*"
              element={
                <RequirePermission permKey="usuarios">
                  <UserManagementPage />
                </RequirePermission>
              }
            />

            {/* PRODUTOS */}
            <Route
              path="recursos"
              element={
                <RequirePermission permKey="produtos">
                  <ResourceManagementPage />
                </RequirePermission>
              }
            />

            {/* CÓDIGOS */}
            <Route
              path="codigos/*"
              element={
                <RequirePermission permKey="codigos">
                  <CodesRoutes />
                </RequirePermission>
              }
            >
              <Route index element={<CodesListPage />} />
              <Route path="list" element={<CodesListPage />} />
              <Route
                path="bulk-generate"
                element={
                  <RequirePermission permKey="geracaoLote">
                    <BulkGenerateCodesPage />
                  </RequirePermission>
                }
              />
              <Route
                path="movements"
                element={
                  <RequirePermission permKey="movimentacoes">
                    <CodeMovementPage />
                  </RequirePermission>
                }
              />
              <Route
                path="inventory"
                element={
                  <RequirePermission permKey="inventario">
                    <InventoryPage />
                  </RequirePermission>
                }
              />
            </Route>

            {/* EVENTOS */}
            <Route
              path="eventos"
              element={
                <RequirePermission permKey="movimentacoes">
                  <EventsListPage />
                </RequirePermission>
              }
            />

            {/* STATUS */}
            <Route
              path="status"
              element={
                <RequirePermission permKey="status">
                  <ListStatusPage />
                </RequirePermission>
              }
            />
            <Route
              path="status/new"
              element={
                <RequirePermission permKey="status">
                  <AddStatusPage />
                </RequirePermission>
              }
            />
            <Route
              path="status/edit/:id"
              element={
                <RequirePermission permKey="status">
                  <AddStatusPage />
                </RequirePermission>
              }
            />

            {/* RASTREAMENTO */}
            <Route
              path="rastreamento"
              element={
                <RequirePermission permKey="rastreamento">
                  <TraceabilityPage />
                </RequirePermission>
              }
            />

            {/* CONFIGURAÇÕES */}
            <Route
              path="configuracoes"
              element={
                <RequirePermission permKey="configuracoes">
                  <SettingsPage />
                </RequirePermission>
              }
            />

            {/* CHAT AI */}
            <Route
              path="ai"
              element={
                <RequirePermission permKey="ai"> 
                  <AiPage />
                </RequirePermission>
              }
            />

            {/* Rota de Acesso Negado */}
            <Route path="acesso-negado" element={<NoPermissionPage />} />

            {/* Fallback */}
            <Route path="*" element={<ServicesGrid />} />
          </Routes>
        </div>
      </MainContent>
    </DashboardContainer>
  );
};

export default DashboardPage;
