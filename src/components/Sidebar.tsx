// src/components/Sidebar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <div style={{
      width: 200,
      backgroundColor: '#f4f4f4',
      padding: '1rem',
      height: '100vh'
    }}>
      <h3>Menu</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/companies">Empresas</Link></li>
        <li><Link to="/users">Usuários</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
