import React from 'react';
import { FaAngleDoubleLeft, FaAngleLeft, FaAngleRight, FaAngleDoubleRight } from 'react-icons/fa';

import { Btn, Nav } from './PaginationStyles';

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (p: number) => void;
}

const NotificationPagination: React.FC<Props> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <Nav>
      <Btn
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        aria-label="Primeira página"
      >
        <FaAngleDoubleLeft />
      </Btn>
      <Btn
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Página anterior"
      >
        <FaAngleLeft />
      </Btn>

      {/* mostrar até 5 páginas: currentPage -2 até +2 */}
      {Array.from({ length: totalPages }, (_, i) => i + 1)
        .filter(
          (p) =>
            p === 1 ||
            p === totalPages ||
            (p >= currentPage - 2 && p <= currentPage + 2)
        )
        .map((p, idx, arr) => {
          // insere "..." quando pular faixas
          const prev = arr[idx - 1];
          if (idx > 0 && p - prev! > 1) {
            return (
              <React.Fragment key={`gap-${p}`}>
                <span style={{ margin: '0 0.2rem', fontSize: '0.8rem' }}>…</span>
                <Btn
                  active={p === currentPage}
                  onClick={() => onPageChange(p)}
                >
                  {p}
                </Btn>
              </React.Fragment>
            );
          }
          return (
            <Btn
              key={p}
              active={p === currentPage}
              onClick={() => onPageChange(p)}
            >
              {p}
            </Btn>
          );
        })}

      <Btn
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Próxima página"
      >
        <FaAngleRight />
      </Btn>
      <Btn
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        aria-label="Última página"
      >
        <FaAngleDoubleRight />
      </Btn>
    </Nav>
  );
};

export default NotificationPagination;
