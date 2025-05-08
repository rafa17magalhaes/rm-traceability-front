import styled from 'styled-components';

export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  margin-top: 1rem;

  table {
    /* Garante que as colunas respeitem as larguras definidas nos TH */
    table-layout: fixed;
    width: 100%;
    border-collapse: collapse;
    font-size: 0.95rem;
    color: #333; /* Ajuste a cor que desejar */
  }

  thead {
    background-color: #f3f4f6;
  }

  th,
  td {
    padding: 0.75rem 1rem;
    border-bottom: 1px solid #e5e7eb;
    text-align: left; /* Alinha todo o texto à esquerda */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* Se quiser zebragem no body */
  tbody tr:nth-child(even) {
    background-color: #fafafa;
  }

  tbody tr:hover {
    background-color: #f5f5f5;
  }
`;
