import styled from 'styled-components';

export const CodesContainer = styled.div`
  padding: 1rem;
  background-color: #fdfdfd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin: 0 auto;
  max-width: 1200px; /* opcional, para limitar largura */
`;

export const CodesTitle = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  text-align: center;
`;

export const Subtitle = styled.h2`
  font-size: 1rem;
  color: #666;
  margin-bottom: 1rem;
  text-align: center;
`;

export const FormCard = styled.div`
  background-color: #fff;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  margin: 0 auto 1rem auto;
  max-width: 600px;
  text-align: center;
`;

export const GenerateForm = styled.form`
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
  margin-bottom: 1rem;
`;

export const InputField = styled.input`
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 150px;
  text-align: center;
`;

export const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #0066cc;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #005bb5;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const MessageContainer = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  font-weight: 500;
`;

export const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
`;

export const Spinner = styled.div`
  width: 24px;
  height: 24px;
  border: 4px solid #f3f3f3; /* Cor de fundo */
  border-top: 4px solid #3498db; /* Cor da barra animada */
  border-radius: 50%;
  animation: spin 1s linear infinite;

  /* Keyframe para girar */
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const CodesTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  /* Listrado nas linhas */
  tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  /* Efeito hover */
  tr:hover {
    background-color: #f3f3f3;
  }

  transition: background-color 0.2s ease;
`;

export const CodesTh = styled.th`
  background-color: #eee;
  padding: 12px;
  text-align: center;
  border-bottom: 2px solid #ddd;
  font-weight: bold;
`;

export const CodesTd = styled.td`
  padding: 12px;
  text-align: center;
  border-bottom: 1px solid #ddd;
`;

export const NoDataText = styled.span`
  color: #999;
  font-style: italic;
`;

export const ModalBackdrop = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background-color: rgba(0, 0, 0, 0.5);

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: zoom-out;
`;

export const ModalImage = styled.img`
  width: 400px;
  height: 400px;
  background-color: #fff;
  padding: 10px;
  border-radius: 8px;
`;

