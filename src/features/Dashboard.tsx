import React from 'react';
import Sidebar from '../components/Sidebar';

const Dashboard: React.FC = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '1rem' }}>
        <h1>Dashboard</h1>
      </div>
    </div>
  );
};

export default Dashboard;
