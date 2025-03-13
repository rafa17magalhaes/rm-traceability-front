import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { RootState } from 'store';
import { fetchInventoryCodesThunk } from 'store/slices/codesSlice';
import { CodeDTO } from 'types/codes/CodeDTO';
import { ResourceDTO } from 'types/resources';
import GenericList, { ColumnDefinition } from 'components/List/GenericList';
import { QueryParamsDTO } from 'types/pagination';
import SideDrawer from '../components/SideDrawer';
import { FaBoxes, FaEye } from 'react-icons/fa';
import Pagination from 'components/Pagination/Pagination';

interface ResourceGroup {
  resource: ResourceDTO;
  codes: CodeDTO[];
}

const InventoryPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { list, loading, error, total, page, size } = useAppSelector(
    (state: RootState) => state.codes,
  );

  // Estado para abrir o drawer com os detalhes de um produto
  const [selectedGroup, setSelectedGroup] = useState<ResourceGroup | null>(null);

  const filteredCodes = list.filter((code) => code.resource !== null && code.resource !== undefined);


  // Função para carregar os códigos do inventário
  const loadInventory = (pageNumber: number) => {
    const queryParams: QueryParamsDTO = {
      page: pageNumber,
      size: 20,
    };
    dispatch(fetchInventoryCodesThunk(queryParams));
  };

  // Carrega os dados na montagem
  useEffect(() => {
    loadInventory(1);
  }, [dispatch]);

  // Agrupa os códigos por produto (resource)
  const [groupedData, setGroupedData] = useState<ResourceGroup[]>([]);
  useEffect(() => {
    const map = new Map<string, ResourceGroup>();
    filteredCodes.forEach((code) => {
      if (!code.resource) return;
      const resourceId = code.resource.id;
      if (!map.has(resourceId)) {
        map.set(resourceId, { resource: code.resource, codes: [code] });
      } else {
        map.get(resourceId)?.codes.push(code);
      }
    });
    setGroupedData(Array.from(map.values()));
  }, [list]);

  // Cálculo dos totais para exibição no resumo
  const totalProducts = groupedData.length;
  const totalCodes = groupedData.reduce((acc, group) => acc + group.codes.length, 0);

  // Definição das colunas da listagem
  const columns: ColumnDefinition<ResourceGroup>[] = [
    {
      header: 'Foto',
      render: (group) =>
        group.resource.imageUrl ? (
          <img
            src={group.resource.imageUrl}
            alt="Produto"
            style={{
              width: 80,
              height: 80,
              objectFit: 'cover',
              borderRadius: 8,
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          />
        ) : (
          <span style={{ fontStyle: 'italic', color: '#999' }}>Sem imagem</span>
        ),
    },
    {
      header: 'Produto',
      render: (group) => (
        <span style={{ fontWeight: 500 }}>{group.resource.name || 'Produto sem nome'}</span>
      ),
    },
    {
      header: 'Qtde em Estoque',
      render: (group) => (
        <span style={{ fontWeight: 500, color: '#00509e' }}>{group.codes.length}</span>
      ),
    },
    {
      header: 'Ações',
      render: (group) => (
        <button
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            backgroundColor: '#6c757d',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            padding: '0.5rem 0.8rem',
            cursor: 'pointer',
            fontSize: '0.9rem',
            transition: 'background-color 0.2s ease, transform 0.1s ease',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#5a6268';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#6c757d';
          }}
          onClick={() => setSelectedGroup(group)}
        >
          <FaEye />
          Visualizar
        </button>
      ),
    },
  ];

  // Paginação global: calcula total de páginas com base no total e no tamanho
  const safeSize = size || 20;
  const totalPages = Math.ceil(total / safeSize);

  return (
<div style={{ marginTop: '1rem' }}>
  {/* Resumo de totais */}
  <div
  style={{
    width: 'fit-content',
    margin: '0 auto 1.5rem auto',
    padding: '1.2rem 2.4rem',
    background: 'linear-gradient(135deg, #34495e 0%, #4B647C 100%)',
    color: '#fff',
    borderRadius: '12px',
    boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
    fontWeight: 500,
    fontSize: '1.1rem',
    textAlign: 'center',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  }}
  onMouseEnter={(e) => {
    (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.02)';
    (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 16px rgba(0,0,0,0.3)';
  }}
  onMouseLeave={(e) => {
    (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)';
    (e.currentTarget as HTMLDivElement).style.boxShadow = '0 6px 12px rgba(0,0,0,0.2)';
  }}
>
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '1.4rem',
      marginBottom: '0.4rem',
      fontWeight: 'bold',
      textShadow: '0 1px 2px rgba(0,0,0,0.3)',
    }}
  >
    <FaBoxes />
    <span>Controle de Estoque</span>
  </div>
  <div
    style={{
      fontSize: '1rem',
      textShadow: '0 1px 1px rgba(0,0,0,0.2)',
    }}
  >
    {totalProducts} tipos de produtos • Total de {totalCodes} itens em estoque
  </div>
</div>

  <GenericList
    title="Inventário"
    data={groupedData}
    columns={columns}
    loading={loading}
    error={error ?? undefined}
    currentPage={page}
    onPageChange={(newPage) => loadInventory(newPage)}
  />

  <Pagination
    currentPage={page}
    totalPages={totalPages}
    onPageChange={(newPage) => loadInventory(newPage)}
  />

  {/* SideDrawer */}
  <SideDrawer
    open={!!selectedGroup}  
    onClose={() => setSelectedGroup(null)}
    resourceGroup={selectedGroup}
  />
</div>

  );
};

export default InventoryPage;
