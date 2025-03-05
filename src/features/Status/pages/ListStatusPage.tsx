import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { fetchAllStatusesThunk, updateStatusThunk } from 'store/slices/statusesSlice';
import GenericList, { ColumnDefinition } from 'components/List/GenericList';
import { StatusDTO } from 'types/status/StatusDTO';
import { FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { UpdateStatusDTO } from 'types/status/UpdateStatusDTO';
import StatusToggle from 'components/StatusToggle/StatusToggle';

const ListStatusPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { list, loading, error } = useAppSelector((state) => state.statuses);

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
        render: (event) =>
          event.createdAt
            ? new Date(event.createdAt).toLocaleString('pt-BR')
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
          Novo Status
        </button>
      </div>
      <GenericList
        title="Listagem de Status"
        data={list}
        columns={columns}
        loading={loading}
        error={error ?? undefined}
      />
    </>
  );
};

export default ListStatusPage;
