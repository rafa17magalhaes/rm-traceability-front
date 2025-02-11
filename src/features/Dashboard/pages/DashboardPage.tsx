import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext'; 
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { DashboardContainer, MainContent } from '../styles/dashboardStyles';
import ServicesGrid from '../components/ServicesGrid';

const DashboardPage: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleToggleSidebar = () => {
    setSidebarCollapsed(prev => !prev);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <DashboardContainer>
      <Sidebar collapsed={sidebarCollapsed} />

      <MainContent>
        <Header 
          onToggleSidebar={handleToggleSidebar}
          onLogout={handleLogout}
        />

      <div style={{ padding: '1.5rem' }}>
        <h1>Services</h1>
        <ServicesGrid />
      </div>
      </MainContent>
    </DashboardContainer>
  );
};

export default DashboardPage;
