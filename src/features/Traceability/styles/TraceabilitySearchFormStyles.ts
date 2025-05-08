import styled from 'styled-components';

export const SearchContainer = styled.div`
  margin-bottom: 1.5rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .searchRow {
    max-width: 400px;
    width: 100%;
    margin: 0 auto;

    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: center;

    input {
      width: 250px;
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
      padding: 0.7rem 1.8rem;
      border-radius: 4px;
      border: none;
      background: linear-gradient(135deg, #00509e 0%, #003f7d 100%);
      color: #fff;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.2s;

      &:hover {
        background-color: #003f7d;
      }
    }
  }

  .resourceRow {
    margin-top: 1rem;
    background-color: #f8f8f8;
    padding: 1rem;
    border-radius: 4px;
    max-width: 400px;
    width: 100%;
    text-align: center;

    /* Leve sombra para dar destaque */
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 70px;
      height: 70px;
      object-fit: cover;
      border-radius: 4px;
      margin-bottom: 0.5rem;
    }

    strong {
      font-size: 1rem;
      color: #333;
    }
  }
`;
