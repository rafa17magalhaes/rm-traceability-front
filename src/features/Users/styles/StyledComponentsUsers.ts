import styled from 'styled-components';

export const FormContainer = styled.div`
  background: #fff;
  max-width: 600px;
  margin: 2rem auto;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
`;

export const FormTitle = styled.h1`
  text-align: center;
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Section = styled.section`
  margin-bottom: 1.5rem;
  padding: 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 0.75rem;
  margin-bottom: 0.75rem;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 0.95rem;
  color: #34495e;
`;

export const InputField = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 0.95rem;
  margin-top: 0.5rem;
  transition: border-color 0.3s;

  &:focus {
    border-color: #00509e;
    outline: none;
  }
`;

export const SubmitButton = styled.button`
  background: #00509e;
  color: #fff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  display: block;
  margin: 1.5rem auto 0 auto;
  transition: background 0.3s;

  &:hover {
    background: #003a75;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const ErrorText = styled.p`
  color: #e74c3c;
  font-size: 0.85rem;
  margin-top: 0.5rem;
`;
