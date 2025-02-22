import styled from 'styled-components';

export const TableContainer = styled.div`
  padding: 1rem;
  background-color: #fdfdfd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  max-width: 1200px;
`;

export const TableTitle = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-align: center;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s ease;

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  tr:hover {
    background-color: #f3f3f3;
  }
`;

export const TableHeaderCell = styled.th`
  background-color: #eee;
  padding: 12px;
  text-align: center;
  border-bottom: 2px solid #ddd;
  font-weight: bold;
`;

export const TableCell = styled.td`
  padding: 12px;
  text-align: center;
  border-bottom: 1px solid #ddd;
`;

export const NoDataText = styled.span`
  color: #999;
  font-style: italic;
`;
