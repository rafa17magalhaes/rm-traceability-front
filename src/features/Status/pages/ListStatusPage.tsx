import React, { useEffect, useState } from 'react';
import { FaEdit, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { fetchAllStatusesThunk, updateStatusThunk } from 'store/slices/statusesSlice';

import { StatusDTO } from 'types/status/StatusDTO';
import { UpdateStatusDTO } from 'types/status/UpdateStatusDTO';

import GenericList, { ColumnDefinition } from 'components/List/GenericList';
import StatusToggle from 'components/StatusToggle/StatusToggle';
import Pagination from 'components/Pagination/Pagination';

const ListStatusPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { list, loading, error } = useAppSelector((state) => state.statuses);

  // PAGINAÇÃO
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    dispatch(fetchAllStatusesThunk());
  }, [dispatch]);

  const handleToggleActive = async (status: StatusDTO) => {
    try {
      const updatedData: UpdateStatusDTO = { active: !status.active };
      await dispatch(updateStatusThunk({ id: status.id, dto: updatedData }));
      dispatch(fetchAllStatusesThunk());
    } catch (err) {
      console.error('Erro ao atualizar status:', err);
    }
  };

  const columns: ColumnDefinition<StatusDTO>[] = [
    {
      header: 'Nome',
      render: (status) => status.name,
    },
    {
      header: 'Descrição',
      render: (status) => status.description || 'Sem descrição',
    },
    {
      header: 'Data de Criação',
      render: (status) =>
        status.createdAt
          ? new Date(status.createdAt).toLocaleString('pt-BR')
          : 'Sem data',
    },
    {
      header: 'Ativo?',
      render: (status) => (
        <StatusToggle
          active={status.active}
          onToggle={() => handleToggleActive(status)}
          titleActive="Clique para desativar"
          titleInactive="Clique para ativar"
        />
      ),
    },
    {
      header: 'Ações',
      render: (status) => (
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
          <button
            onClick={() => navigate(`/dashboard/status/edit/${status.id}`)}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
            title="Editar"
          >
            <FaEdit size={16} color="#00509e" />
          </button>
        </div>
      ),
    },
  ];

  const totalItems = list.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const pageData = list.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
        <button
          onClick={() => navigate('/dashboard/status/new')}
          style={{
            background: '#00509e',
            color: '#fff',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <FaPlus />
          Adicionar Novo Status
        </button>
      </div>

      <GenericList
        title="Listagem de Status"
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
    </>
  );
};

export default ListStatusPage;
