import styled from 'styled-components';

export const InventoryContainer = styled.div`
  margin-top: 1rem;
`;

export const SummaryCard = styled.div`
  width: fit-content;
  margin: 0 auto 1.5rem auto;
  padding: 1.2rem 2.4rem;
  background: linear-gradient(135deg, #34495e 0%, #4b647c 100%);
  color: #fff;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  font-weight: 500;
  font-size: 1.1rem;
  text-align: center;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }

  .summaryTitle {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.4rem;
    margin-bottom: 0.4rem;
    font-weight: bold;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  }

  .summarySubtitle {
    font-size: 1rem;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  }
`;
