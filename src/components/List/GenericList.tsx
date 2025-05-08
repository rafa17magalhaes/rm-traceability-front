import React from 'react';

import Pagination from 'components/Pagination/Pagination';
import {
  NoDataText,
  StyledTable,
  TableCell,
  TableContainer,
  TableHeaderCell,
  TableTitle,
} from './GenericListStyles';

export interface ColumnDefinition<T> {
  header: string;
  render: (item: T) => React.ReactNode;
}

interface GenericListProps<T> {
  title: string;
  data: T[];
  columns: ColumnDefinition<T>[];
  loading?: boolean;
  error?: string | null;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  totalItems?: number;
}

const GenericList = <T extends unknown>({
  title,
  data,
  columns,
  loading,
  error,
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
}: GenericListProps<T>) => {
  if (loading) return <p>Carregando...</p>;
  if (error) return <p style={{ color: 'red' }}>Erro: {error}</p>;

  // Verifica se há mais de uma página
  const hasMultiplePages = totalPages && totalPages > 1;

  return (
    <TableContainer>
      <TableTitle>{title}</TableTitle>

      {/* Exibe total de registros e paginação no topo */}
      {typeof totalItems === 'number' && (
        <div
          style={{
            marginBottom: '1rem',
            textAlign: 'center',
            fontSize: '0.9rem',
            fontWeight: 500,
          }}
        >
          Mostrando {data.length} de {totalItems} registros
        </div>
      )}

      {hasMultiplePages && currentPage && totalPages && onPageChange && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}

      <StyledTable>
        <thead>
          <tr>
            {columns.map((col, idx) => (
              <TableHeaderCell key={idx}>{col.header}</TableHeaderCell>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, idx) => (
              <tr key={idx}>
                {columns.map((col, colIdx) => (
                  <TableCell key={colIdx}>{col.render(item)}</TableCell>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <TableCell colSpan={columns.length}>
                <NoDataText>Nenhum registro encontrado</NoDataText>
              </TableCell>
            </tr>
          )}
        </tbody>
      </StyledTable>

      {/* Exibe paginação no rodapé */}
      {hasMultiplePages && currentPage && totalPages && onPageChange && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </TableContainer>
  );
};

export default GenericList;
