import React from 'react';
import styled from 'styled-components';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem 0;
`;

const PageButton = styled.button<{ active?: boolean }>`
  padding: 0.5rem 1rem;
  background-color: ${({ active }) => (active ? '#34495e' : '#fff')};
  color: ${({ active }) => (active ? '#fff' : '#34495e')};
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ active }) => (active ? '#2c3e50' : '#f0f0f0')};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Funções para navegação
  const goToFirst = () => onPageChange(1);
  const goToLast = () => onPageChange(totalPages);
  const goToPrev = () => onPageChange(currentPage - 1);
  const goToNext = () => onPageChange(currentPage + 1);

  return (
    <PaginationContainer>
      <PageButton onClick={goToFirst} disabled={currentPage === 1}>
        « Primeiro
      </PageButton>
      <PageButton onClick={goToPrev} disabled={currentPage === 1}>
        ‹ Anterior
      </PageButton>
      {pages.map((page) => (
        <PageButton
          key={page}
          active={page === currentPage}
          onClick={() => onPageChange(page)}
        >
          {page}
        </PageButton>
      ))}
      <PageButton onClick={goToNext} disabled={currentPage === totalPages}>
        Próximo ›
      </PageButton>
      <PageButton onClick={goToLast} disabled={currentPage === totalPages}>
        Último »
      </PageButton>
    </PaginationContainer>
  );
};

export default Pagination;
