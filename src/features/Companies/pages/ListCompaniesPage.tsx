import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from 'store';
import { fetchAllCompanies } from 'store/slices/companiesSlice';
import { ListContainer, ListTitle, CompanyList, CompanyCard } from '../styles/companiesStyles';

const ListCompaniesPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list, loading, error } = useSelector((state: RootState) => state.companies);

  useEffect(() => {
    dispatch(fetchAllCompanies());
  }, [dispatch]);

  return (
    <ListContainer>
      <ListTitle>Empresas Cadastradas</ListTitle>
      {loading && <p style={{ textAlign: 'center' }}>Carregando...</p>}
      {error && <p style={{ color: 'red', textAlign: 'center' }}>Erro: {error}</p>}
      {!loading && !error && (
        <>
          {list.length === 0 ? (
            <p style={{ textAlign: 'center' }}>Nenhuma empresa cadastrada.</p>
          ) : (
            <CompanyList>
              {list.map((c) => (
                <CompanyCard key={c.id}>
                  <h2>{c.name}</h2>
                  <p>{c.trade} | {c.document}</p>
                </CompanyCard>
              ))}
            </CompanyList>
          )}
        </>
      )}
    </ListContainer>
  );
};

export default ListCompaniesPage;
