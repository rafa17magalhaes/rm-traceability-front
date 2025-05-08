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

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.5rem 0;
`;

export const Btn = styled.button<{ active?: boolean }>`
  background: ${({ active }) => (active ? '#00509E' : 'transparent')};
  color: ${({ active }) => (active ? '#fff' : '#00509E')};
  border: 1px solid #00509e;
  border-radius: 3px;
  padding: 0.2rem 0.4rem;
  margin: 0 0.15rem;
  font-size: 0.8rem;
  cursor: pointer;
  min-width: 1.8rem;
  text-align: center;
  transition:
    background 0.2s,
    color 0.2s;

  &:disabled {
    opacity: 0.4;
    cursor: default;
  }
`;
