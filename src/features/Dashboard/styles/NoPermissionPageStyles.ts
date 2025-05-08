import styled from 'styled-components';

export const Container = styled.div`
  max-width: 600px;
  margin: 4rem auto;
  padding: 2rem;
  text-align: center;

  /* Efeito de card / glass */
  background: rgba(255, 255, 255, 0.95);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(6px);

  @media (max-width: 768px) {
    margin: 2rem auto;
    padding: 1.5rem;
  }
`;

export const Title = styled.h2`
  color: #e53935; /* tom de vermelho */
  font-size: 1.8rem;
  margin-bottom: 1rem;
`;

export const Message = styled.p`
  color: #333;
  font-size: 1.05rem;
  line-height: 1.4;
  margin-bottom: 2rem;
`;

export const ActionsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

export const BackButton = styled.button`
  background: #1976d2;
  color: #fff;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  font-size: 0.95rem;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(25, 118, 210, 0.3);
  transition: background 0.3s ease;

  &:hover {
    background: #1565c0;
  }
`;
