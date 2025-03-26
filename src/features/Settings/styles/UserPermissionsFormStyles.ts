import styled from 'styled-components';

interface ToggleSliderProps {
  $isActive: boolean;
}

/** Contêiner do formulário (modal) */
export const FormContainer = styled.div`
  background: rgba(255, 255, 255, 0.09);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(12px);
  border-radius: 10px;
  padding: 1.5rem;
  width: 420px;
  max-height: 80vh;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
`;

export const FormTitle = styled.h3`
  margin: 0 0 1rem;
  font-size: 1.2rem;
  color: #fff;
  text-align: center;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.2);
`;

export const ModulesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 1rem;
`;

export const ModuleItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-size: 0.95rem;
    color: #f0f0f0;
    flex: 1;
  }
`;

export const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;

/** Switch, usando gradient e glow em tons de azul */
export const ToggleSlider = styled.div<ToggleSliderProps>`
  width: 42px;
  height: 22px;
  border-radius: 22px;
  cursor: pointer;
  position: relative;
  transition: background 0.3s ease;
  flex-shrink: 0;

  background: ${({ $isActive }) =>
    $isActive ? 'linear-gradient(135deg, #00509e, #2563eb)' : '#555'};
  box-shadow: ${({ $isActive }) =>
    $isActive ? '0 0 10px rgba(59, 130, 246, 0.6)' : 'none'};

  &:before {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 18px;
    height: 18px;
    background: #fff;
    border-radius: 50%;
    transition: transform 0.3s ease;
    transform: ${({ $isActive }) => ($isActive ? 'translateX(20px)' : 'none')};
  }
`;

export const ToggleLabel = styled.span`
  font-size: 0.85rem;
  color: #f0f0f0;
  min-width: 60px;
  text-align: right;
  text-shadow: 0 0 3px rgba(255, 255, 255, 0.2);
`;

export const ActionsRow = styled.div`
  text-align: center;
  margin-top: 1rem;

  button {
    padding: 0.5rem 1rem;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.9rem;
    margin: 0 0.4rem;
    min-width: 80px;
    transition: background 0.3s ease;
    border: none;
    color: #fff;

    &:hover {
      filter: brightness(1.1);
    }

    /* Botão "Salvar": gradiente azul */
    &:first-child {
      background: linear-gradient(135deg, #00509e 0%, rgb(4, 62, 121) 100%);
      box-shadow: 0 0 8px rgba(59, 130, 246, 0.4);
    }

    /* Botão "Cancelar": gradiente cinza */
    &:last-child {
      background: linear-gradient(135deg, #9ca3af, #6b7280);
      box-shadow: 0 0 8px rgba(156, 163, 175, 0.4);
    }
  }
`;
