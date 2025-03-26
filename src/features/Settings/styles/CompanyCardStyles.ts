import styled from 'styled-components';

export const CompanyCardContainer = styled.div`
  width: 100%;
  max-width: 400px;
  border-radius: 12px;
  overflow: hidden;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  color: #333;
`;

export const CardHeader = styled.div`
  background: linear-gradient(135deg, #00509e, #043e79);
  padding: 1rem;
  display: flex;
  align-items: center;
`;

export const CardTitle = styled.h3`
  margin: 0;
  font-size: 1.3rem;
  color: #fff;
  font-weight: 600;
`;

export const CardBody = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const FieldRow = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.4rem;
`;

export const FieldLabel = styled.span`
  width: 130px;
  font-weight: 600;
  color: #444;
`;

export const FieldValue = styled.span`
  color: #333;
  flex: 1;
`;
