import styled from 'styled-components';

export const SettingsContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa, #ffffff);
  color: #333;
  padding: 2rem 1rem;
`;

export const SettingsContent = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

export const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
`;

export const CompanyCardWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

/** Seção estilo "vidro" suave */
export const CardSection = styled.section`
  backdrop-filter: blur(8px);
  background: rgba(255, 255, 255, 0.65);
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
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
