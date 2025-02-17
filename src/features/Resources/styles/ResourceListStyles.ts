import styled from 'styled-components';

export const ListContainer = styled.div`
  padding: 2rem;
  background: #f4f7f9;
  min-height: 100vh;
`;

export const ListTitle = styled.h1`
  font-size: 2.2rem;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 2rem;
`;

export const AddResourceContainer = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
`;

export const AddButton = styled.button`
  background-color: #00509e;
  color: #fff;
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
  display: inline-flex;   /* permite alinhar ícone e texto lado a lado */
  align-items: center;    /* centraliza verticalmente */
  gap: 0.5rem;            /* espaço entre ícone e texto */

  &:hover {
    background-color: #003a75;
  }
`;

export const ResourceList = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
`;

export const ResourceCard = styled.li`
  background: #fff;
  border-radius: 8px;
  padding: 1.2rem 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);

    .edit-icon {
      opacity: 1; /* Mostra o ícone com destaque ao pairar */
    }
  }

  h2 {
    font-size: 1.4rem;
    color: #2c3e50;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1rem;
    color: #34495e;
    margin-bottom: 0.4rem;
  }

  /* Ícone de edição no canto superior direito */
  .edit-icon {
    position: absolute;
    top: 0.8rem;
    right: 0.8rem;
    font-size: 1.2rem;
    color: #00509e;
    cursor: pointer;
    opacity: 0.7;
    transition: color 0.2s, opacity 0.2s;

    &:hover {
      color: #003a75;
    }
  }
`;
