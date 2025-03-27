import styled from 'styled-components';

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin: 1.5rem 0;
`;

export const PageButton = styled.button<{ active?: boolean }>`
  padding: 0.5rem 1rem;
  background-color: ${({ active }) => (active ? '#00509e' : '#fff')};
  color: ${({ active }) => (active ? '#fff' : '#00509e')};
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ active }) => (active ? '#043e79' : '#f0f0f0')};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
