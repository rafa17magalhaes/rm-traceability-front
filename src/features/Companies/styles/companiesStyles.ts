import styled from 'styled-components';

export const FormContainer = styled.div`
  background: #fff;
  max-width: 900px;
  margin: 2rem auto;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
`;

export const FormTitle = styled.h1`
  text-align: center;
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
`;

export const Section = styled.section`
  margin-bottom: 1.5rem;
  padding: 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
`;

export const SectionHeader = styled.h2`
  font-size: 1.3rem;
  color: #34495e;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 0.25rem;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 0.75rem;
  margin-bottom: 0.75rem;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 0.95rem;
  color: #34495e;
`;

export const InputField = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 0.95rem;
  margin-top: 0.5rem;
  transition: border-color 0.3s;

  &:focus {
    border-color: #00509e;
    outline: none;
  }
`;

export const SubmitButton = styled.button`
  background: #00509e;
  color: #fff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  display: block;
  margin: 1.5rem auto 0 auto;
  transition: background 0.3s;

  &:hover {
    background: #003a75;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const ErrorText = styled.p`
  color: #e74c3c;
  font-size: 0.85rem;
  margin-top: 0.5rem;
`;

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

export const CompanyList = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
`;

export const CompanyCard = styled.li`
  background: #fff;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.15);
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
