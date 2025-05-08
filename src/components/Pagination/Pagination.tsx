import React from 'react';

import { PaginationContainer, PageButton } from './PaginationStyles';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

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
