import styled from 'styled-components';

export const SettingsContainer = styled.div`
  min-height: 100vh;
  background: #f7f8fa; /* Fundo claro */
  color: #333; /* Texto escuro */
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SettingsContent = styled.div`
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
`;

export const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
`;

export const CompanyCardWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  width: 100%;
`;

export const CardSection = styled.section`
  background: #ffffff;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  width: 100%;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);

  display: flex;
  justify-content: center;
  align-items: center;
`;
