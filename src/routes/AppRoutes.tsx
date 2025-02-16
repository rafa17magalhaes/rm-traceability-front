import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from 'features/Login';
import { DashboardPage } from 'features/Dashboard';
import NotFound from 'features/NotFound';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<LoginPage />} />

        {/* Rotas do Dashboard (subrotas definidas dentro de DashboardPage) */}
        <Route path="/dashboard/*" element={<DashboardPage />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
