import styled from 'styled-components';

export const PageBackground = styled.div`
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, #eaf4fc 0%, #f8fbfe 100%);
`;

export const FormContainer = styled.div`
  max-width: 600px;
  margin: 3rem auto;
  padding: 2rem 2.5rem;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
`;

export const FormTitle = styled.h1`
  font-size: 1.8rem;
  margin-bottom: 2rem;
  text-align: center;
  color: #2c3e50;
  font-weight: 600;
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #34495e;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:focus {
    border-color: #00509e;
    box-shadow: 0 0 0 3px rgba(0, 80, 158, 0.15);
    outline: none;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  resize: vertical;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:focus {
    border-color: #00509e;
    box-shadow: 0 0 0 3px rgba(0, 80, 158, 0.15);
    outline: none;
  }
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  /* Se quiser alinhar à esquerda sem ocupar toda a largura */
  width: fit-content;

  input[type='checkbox'] {
    margin-right: 0.5rem;
    transform: scale(1.2);
    cursor: pointer;
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 0.8rem;
  background-color: #00509e;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    transform 0.1s ease;

  &:hover {
    background-color: #003f7f;
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;
