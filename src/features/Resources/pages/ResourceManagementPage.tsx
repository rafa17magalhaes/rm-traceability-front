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

import {
  ListContainer,
  ListTitle,
  AddResourceContainer,
  AddButton,
  ResourceList,
  ResourceCard,
  ToggleSwitch,
  ToggleThumb,
  ToggleContainer,
} from '../styles/ResourceListStyles';

const ResourceManagementPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list, loading, error } = useSelector((state: RootState) => state.resources);

  const [showForm, setShowForm] = useState(false);
  const [selectedResource, setSelectedResource] = useState<ResourceDTO | null>(null);

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

  return (
    <ListContainer>
      <ListTitle>Gerenciamento de Produtos</ListTitle>

      {!showForm && (
        <AddResourceContainer>
          <AddButton onClick={handleAddNew}>
            <FaPlus />
            Adicionar novo produto
          </AddButton>
        </AddResourceContainer>
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
        <>
          {loading && <p style={{ textAlign: 'center' }}>Carregando produtos...</p>}
          {error && <p style={{ color: 'red', textAlign: 'center' }}>Erro: {error}</p>}
          {!loading && list.length === 0 ? (
            <p style={{ textAlign: 'center' }}>Nenhum produto encontrado.</p>
          ) : (
            <ResourceList>
              {list.map((res) => (
                <ResourceCard key={res.id}>
                  <h2>{res.name}</h2>
                  <p>{res.description}</p>
                  
                  <ToggleContainer>
                    <ToggleSwitch
                      active={res.active}
                      onClick={() => handleToggleActive(res)}
                      title={res.active ? 'Desativar produto' : 'Ativar produto'}
                    >
                      <ToggleThumb active={res.active} />
                    </ToggleSwitch>
                  </ToggleContainer>
                  
                  <FaEdit
                    className="edit-icon"
                    onClick={() => handleEdit(res)}
                  />
                </ResourceCard>
              ))}
            </ResourceList>
          )}
        </>
      )}
    </ListContainer>
  );
};

export default ResourceManagementPage;
