import styled from 'styled-components';

export const TableContainer = styled.div`
  padding: 1.5rem;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  margin: 0 auto;
  max-width: 1200px;
`;

export const TableTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #2c3e50;
  font-weight: 600;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: background-color 0.2s ease;

  tr:nth-child(even) {
    background-color: #f8f8f8;
  }

  tr:hover {
    background-color: #f0f0f0;
  }
`;

export const TableHeaderCell = styled.th`
  background-color: #34495e;
  padding: 16px;
  text-align: center;
  border-bottom: 3px solid #2c3e50;
  font-weight: bold;
  color: #ecf0f1;
  font-size: 1.1rem;
`;

export const TableCell = styled.td`
  padding: 16px;
  text-align: center;
  border-bottom: 1px solid #ddd;
  font-size: 1rem;
  color: #555;
`;

export const NoDataText = styled.span`
  color: #999;
  font-style: italic;
  font-size: 1rem;
`;
