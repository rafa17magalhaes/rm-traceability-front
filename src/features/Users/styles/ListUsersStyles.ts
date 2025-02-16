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

export const UserList = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
`;

export const UserCard = styled.li`
  background: #fff;
  border-radius: 8px;
  padding: 1rem 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  position: relative;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  }

  h2 {
    font-size: 1.4rem;
    color: #2c3e50;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1rem;
    color: #34495e;
  }
`;

export const EditButton = styled.button`
  background: none;
  border: none;
  color: #00509e;
  cursor: pointer;
  position: absolute;
  top: 1rem;
  right: 1rem;
  transition: color 0.3s;

  &:hover {
    color: #003a75;
  }
`;
