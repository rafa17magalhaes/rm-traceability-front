import styled, { keyframes } from 'styled-components';

export const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Spinner = styled.div`
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top: 3px solid #fff;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  animation: ${spin} 1s linear infinite;
  margin-right: 8px;
`;

export const ButtonStyled = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  /* Gradiente suave */
  background: linear-gradient(135deg, #00509e 0%, rgb(4, 62, 121) 100%);
  color: #fff;
  padding: 0.6rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: 600;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  transition:
    background 0.3s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    background: linear-gradient(135deg, #00509e 0%, rgb(6, 38, 69) 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background: #999;
    box-shadow: none;
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
`;
