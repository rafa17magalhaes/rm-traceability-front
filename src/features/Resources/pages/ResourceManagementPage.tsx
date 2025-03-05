import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'store';
import {
  fetchAllResourcesThunk,
  createResourceThunk,
  updateResourceThunk,
} from 'store/slices/resourcesSlice';
import ResourceForm from '../components/ResourceForm';
import { CreateResourceDTO } from 'types/resources/CreateResourceDTO';
import { UpdateResourceDTO } from 'types/resources/UpdateResourceDTO';
import { ResourceDTO } from 'types/resources/ResourceDTO';
import { FaPlus, FaEdit } from 'react-icons/fa';
import styled from 'styled-components';
import GenericList, { ColumnDefinition } from 'components/List/GenericList';
import CelebrationMessage from 'components/CelebrationMessage/CelebrationMessage';
import StatusToggle from 'components/StatusToggle/StatusToggle';

const PageContainer = styled.div`
  padding: 2rem;
  background: #f4f7f9;
  min-height: 100vh;
`;

const ResourceManagementPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list, loading, error } = useSelector((state: RootState) => state.resources);

  const [showForm, setShowForm] = useState(false);
  const [selectedResource, setSelectedResource] = useState<ResourceDTO | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    dispatch(fetchAllResourcesThunk());
  }, [dispatch]);

  const handleAddNew = () => {
    setSelectedResource(null);
    setShowForm(true);
  };

  const handleEdit = (resource: ResourceDTO) => {
    setSelectedResource(resource);
    setShowForm(true);
  };

  const handleSubmit = async (data: CreateResourceDTO | UpdateResourceDTO) => {
    if (selectedResource) {
      await dispatch(updateResourceThunk({ id: selectedResource.id, dto: data }));
    } else {
      await dispatch(createResourceThunk(data as CreateResourceDTO));
    }
    setShowForm(false);
    setSelectedResource(null);
    dispatch(fetchAllResourcesThunk());
    setShowCelebration(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedResource(null);
  };

  const handleToggleActive = async (resource: ResourceDTO) => {
    const newActive = !resource.active;
    const updatedData: UpdateResourceDTO = { active: newActive };
    await dispatch(updateResourceThunk({ id: resource.id, dto: updatedData }));
    dispatch(fetchAllResourcesThunk());
  };

  const columns: ColumnDefinition<ResourceDTO>[] = [
    {
      header: 'Imagem',
      render: (resource) =>
        resource.imageUrl ? (
          <img
            src={resource.imageUrl}
            alt={`Imagem do produto ${resource.name}`}
            style={{ width: 80, height: 80, borderRadius: '8px', objectFit: 'cover' }}
          />
        ) : (
          <span>Nenhuma imagem</span>
        ),
    },
    {
      header: 'Nome',
      render: (resource) => resource.name,
    },
    {
      header: 'Descrição',
      render: (resource) => resource.description,
    },
    {
      header: 'Data de Criação',
      render: (resource) =>
        resource.createdAt
          ? new Date(resource.createdAt).toLocaleString('pt-BR')
          : 'Sem data',
    },
    {
      header: 'Ativo',
      render: (resource) => (
        <StatusToggle
          active={resource.active}
          onToggle={() => handleToggleActive(resource)}
          size={24}
          titleActive="Clique para desativar"
          titleInactive="Clique para ativar"
        />
      ),
    },
    {
      header: 'Ações',
      render: (resource) => (
        <FaEdit style={{ cursor: 'pointer' }} onClick={() => handleEdit(resource)} />
      ),
    },
  ];

  return (
    <PageContainer>
      <h1 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        Gerenciamento de Produtos
      </h1>

      {showCelebration && (
        <CelebrationMessage
          message="Parabéns! Sua operação foi concluída com sucesso."
          duration={5000}
        />
      )}

      {!showForm && (
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <button
            onClick={handleAddNew}
            style={{
              background: '#00509e',
              color: '#fff',
              padding: '0.7rem 1.5rem',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <FaPlus />
            Adicionar novo produto
          </button>
        </div>
      )}

      {showForm ? (
        <ResourceForm
          loading={loading}
          error={error}
          initialData={selectedResource}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      ) : (
        <GenericList
          title="Lista de Produtos"
          data={list}
          columns={columns}
          loading={loading}
          error={error || undefined}
        />
      )}
    </PageContainer>
  );
};

export default ResourceManagementPage;
