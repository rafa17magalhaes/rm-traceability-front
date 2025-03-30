import React from 'react';
import { useNavigate } from 'react-router-dom';

import LoginForm from '../components/LoginForm';
import Layout from '../components/Layout';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <LoginForm onSuccess={() => navigate('/dashboard')} />
    </Layout>
  );
};

export default LoginPage;
