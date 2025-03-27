import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { useNavigate } from 'react-router-dom';
import { fetchAllCompanies } from 'store/slices/companiesSlice';
import GenericList, { ColumnDefinition } from 'components/List/GenericList';
import { ListContainer, ListTitle, AddButton } from '../styles/companiesStyles';
import { BaseCompanyDTO } from 'types/companies';
import { FaPlus, FaEdit } from 'react-icons/fa';
import Pagination from 'components/Pagination/Pagination';

const ListCompaniesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { list, loading, error } = useAppSelector((state) => state.companies);

  // PAGINAÇÃO
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    dispatch(fetchAllCompanies());
  }, [dispatch]);

  const columns: ColumnDefinition<BaseCompanyDTO>[] = [
    {
      header: 'Nome',
      render: (company) => company.name,
    },
    {
      header: 'Nome Fantasia',
      render: (company) => company.trade,
    },
    {
      header: 'Documento',
      render: (company) => company.document,
    },
    {
      header: 'Data de Criação',
      render: (company) =>
        company.createdAt
          ? new Date(company.createdAt).toLocaleString('pt-BR')
          : 'Sem data',
    },
    {
      header: 'Ações',
      render: (company) => (
        <button
          onClick={() => navigate(`/dashboard/empresas/edit/${company.id}`)}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
          title="Editar"
        >
          <FaEdit size={16} color="#00509e" />
        </button>
      ),
    },
  ];

  const totalItems = list.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const pageData = list.slice(startIndex, startIndex + itemsPerPage);

  return (
    <ListContainer>
      <ListTitle>Empresas Cadastradas</ListTitle>
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <AddButton onClick={() => navigate('/dashboard/empresas/new')}>
          <FaPlus size={16} style={{ marginRight: '0.5rem' }} />
          Adicionar nova empresa
        </AddButton>
      </div>
      <GenericList
        title="Lista de Empresas"
        data={pageData}
        columns={columns}
        loading={loading}
        error={error || undefined}
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        onPageChange={(page) => setCurrentPage(page)}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </ListContainer>
  );
};

export default ListCompaniesPage;
