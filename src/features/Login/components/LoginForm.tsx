import React, { useState } from 'react';

import { login as loginApi } from '../services/authService';
import { useLogin } from '../hooks/useLogin';

import LoadingButton from 'components/Button/LoadingButton';
import { validateEmail } from '../validate/loginValidation';
import { Container, Title, Form, Label, Input, ErrorMessage } from '../styles/loginStyles';

interface LoginFormProps {
  onSuccess: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const login = useLogin();

  const handleSubmit = async () => {
    setError(null);

    if (!validateEmail(email)) {
      setError('Email inválido');
      return;
    }

    setLoading(true);
    try {
      const data = await loginApi(email, password);
      if (data.accessToken) {
        await login(data.accessToken, data.user);
        onSuccess();
      } else {
        setError('Credenciais inválidas');
      }
    } catch (err) {
      setError('Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Login</Title>
      <Form>
        <div>
          <Label>Email:</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <Label>Senha:</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <LoadingButton
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          loadingDelay={1500}
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </LoadingButton>
      </Form>
    </Container>
  );
};

export default LoginForm;
