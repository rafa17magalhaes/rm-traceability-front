import styled from 'styled-components';

export const Container = styled.div`
  max-width: 700px;
  margin: 2rem auto;
  padding: 2rem 2.5rem;
  background: linear-gradient(135deg, #fdfdfd 0%, #eef2f7 100%);
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  color: #2c3e50;
  font-weight: 600;
`;

export const FormRow = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #34495e;
`;

export const InputField = styled.input`
  padding: 0.75rem;
  border: 1px solid #cbd5e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
  &:focus {
    border-color: #4a90e2;
    outline: none;
  }
`;

export const SelectField = styled.select`
  padding: 0.75rem;
  border: 1px solid #cbd5e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
  &:focus {
    border-color: #4a90e2;
    outline: none;
  }
`;

export const TextareaField = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #cbd5e0;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 80px;
  resize: vertical;
  transition: border-color 0.2s;
  &:focus {
    border-color: #4a90e2;
    outline: none;
  }
`;

export const ErrorText = styled.p`
  color: #e74c3c;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  text-align: center;
`;

export const AddedCodesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
`;

export const CodeChip = styled.div`
  background: rgba(36, 65, 83, 0.42);
  color: #fff;
  padding: 0.5rem 0.7rem;
  border-radius: 16px;
  display: inline-flex;
  align-items: center;
  font-size: 1rem;
`;

export const QRImage = styled.img`
  width: 80px;
  height: 80px;
  margin-right: 0.75rem;
  border-radius: 5px;
  object-fit: cover;
`;

export const RemoveButton = styled.button`
  background: transparent;
  border: none;
  color: #fff;
  margin-left: 0.5rem;
  cursor: pointer;
  font-size: 1.2rem;
`;

export const Spacer = styled.div`
  height: 1rem;
`;

export const ProductPreviewContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 0.75rem;

  img {
    width: 130px;
    height: 130px;
    border-radius: 10px;
    object-fit: cover;
  }
`;
