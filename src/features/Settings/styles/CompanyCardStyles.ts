import styled from 'styled-components';

export const CompanyCardContainer = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 1.2rem;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

  /* Fundo quase sólido para manter legibilidade */
  background: #fff;
  color: #333;

  /* Se quiser leve glassmorphism ainda, mas sem sumir texto:
     background: rgba(255, 255, 255, 0.9);
     backdrop-filter: blur(4px);
     border: 1px solid rgba(0,0,0,0.05);
  */
`;

export const CardHeader = styled.div`
  margin-bottom: 0.8rem;
`;

export const CardTitle = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  color: #333;
  /* Se quiser destaque: 
     text-shadow: 0 0 3px rgba(0,0,0,0.1);
  */
`;

export const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

export const FieldRow = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const FieldLabel = styled.span`
  font-weight: 500;
  color: #444;
  width: 140px;
`;

export const FieldValue = styled.span`
  flex: 1;
  color: #333;
`;
