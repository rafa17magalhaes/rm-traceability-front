import React from 'react';
import { NoDataText, StyledTable, TableCell, TableContainer, TableHeaderCell, TableTitle } from './GenericListStyles';


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
}

const GenericList = <T extends unknown>({
  title,
  data,
  columns,
  loading,
  error,
}: GenericListProps<T>) => {
  if (loading) return <p>Carregando...</p>;
  if (error) return <p style={{ color: 'red' }}>Erro: {error}</p>;

  return (
    <TableContainer>
      <TableTitle>{title}</TableTitle>
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
    </TableContainer>
  );
};

export default GenericList;
