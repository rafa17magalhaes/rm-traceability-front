import styled from 'styled-components';

export const SearchContainer = styled.div`
  margin-bottom: 1.5rem;

  .searchRow {
    display: flex;
    gap: 1rem;

    input {
      flex: 1;
      padding: 0.6rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 1rem;
      color: #333;
      &:focus {
        outline: none;
        border-color: #00509e;
        box-shadow: 0 0 0 2px rgba(0, 80, 158, 0.2);
      }
    }

    button {
      padding: 0 1.5rem;
      border-radius: 4px;
      background-color: #00509e;
      color: #fff;
      font-weight: 500;
      transition: background-color 0.2s;
      &:hover {
        background-color: #003f7d;
      }
    }
  }

  .resourceRow {
    display: flex;
    align-items: center;
    margin-top: 1rem;
    gap: 1rem;
    background-color: #f8f8f8;
    padding: 0.5rem;
    border-radius: 4px;

    img {
      width: 50px;
      height: 50px;
      object-fit: cover;
      border-radius: 4px;
    }

    strong {
      font-size: 1rem;
      color: #333;
    }
  }
`;
