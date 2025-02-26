import styled from 'styled-components';

interface ToggleSwitchProps {
  active: boolean;
}

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
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

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
  transition:
    transform 0.3s,
    box-shadow 0.3s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);

    .edit-icon {
      opacity: 1;
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

  .edit-icon {
    position: absolute;
    top: 0.8rem;
    right: 0.8rem;
    font-size: 1.2rem;
    color: #00509e;
    cursor: pointer;
    opacity: 0.7;
    transition:
      color 0.2s,
      opacity 0.2s;

    &:hover {
      color: #003a75;
    }
  }
`;

export const ToggleSwitch = styled.button<ToggleSwitchProps>`
  position: relative;
  width: 40px;
  height: 18px;
  border-radius: 9px;
  background-color: ${(props) => (props.active ? '#00cc00' : '#cc0000')};
  border: none;
  cursor: pointer;
  padding: 2px;
  transition: background-color 0.3s;
  outline: none;
`;

export const ToggleThumb = styled.div<ToggleSwitchProps>`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: #fff;
  transition: transform 0.3s;
  transform: ${(props) =>
    props.active ? 'translateX(22px)' : 'translateX(2px)'};
`;

export const ToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.5rem;
`;

export const Thumbnail = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 8px;
  margin-bottom: 1rem;
  object-fit: cover;
`;
