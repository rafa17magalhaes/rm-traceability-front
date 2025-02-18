import styled from 'styled-components';

export const FormContainer = styled.div`
  background: #fff;
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
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

export const FieldSet = styled.fieldset`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

export const Legend = styled.legend`
  padding: 0 0.5rem;
  font-weight: 600;
  font-size: 1.1rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
`;

export const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

export const Label = styled.label`
  font-size: 0.95rem;
  color: #34495e;
  margin-bottom: 0.4rem;
`;

export const InputField = styled.input`
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #00509e;
  }
`;

export const CheckboxField = styled.input`
  margin-right: 0.5rem;
`;

export const HiddenFileInput = styled.input`
  display: none;
`;

export const FileInputLabel = styled.label`
  background: #00509e;
  color: #fff;
  border: none;
  padding: 0.5rem 1.8rem;  /* Menor altura/largura */
  border-radius: 4px;      /* Bordas levemente arredondadas */
  font-size: 0.95rem;      /* Texto menor */
  font-weight: 500;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  margin: 0.5rem auto;     /* Centraliza horizontalmente */
  transition: background 0.3s, transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);

  &:hover {
    background: #003a75;
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
    box-shadow: none;
  }
`;

export const PreviewImage = styled.img`
  max-width: 200px;
  border-radius: 8px;
  margin-top: 0.5rem;
`;

export const ButtonRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  justify-content: center;
`;

export const PrimaryButton = styled.button`
  background: #00509e;
  color: #fff;
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
  
  &:hover {
    background: #003a75;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const SecondaryButton = styled(PrimaryButton)`
  background: #fff;
  color: #00509e;
  border: 1px solid #00509e;

  &:hover {
    background: #f0f0f0;
    color: #00509e;
  }
`;

export const ErrorText = styled.p`
  color: #e74c3c;
  margin-top: 0.5rem;
  font-size: 0.9rem;
`;
