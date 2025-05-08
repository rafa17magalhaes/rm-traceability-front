import React, { useEffect, useState, useMemo } from 'react';
import { FaBoxes, FaEye } from 'react-icons/fa';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { fetchInventoryCodesThunk } from 'store/slices/codesSlice';
import { RootState } from 'store';

import { CodeDTO } from 'types/codes/CodeDTO';
import { ResourceDTO } from 'types/resources';
import { QueryParamsDTO } from 'types/pagination';

import GenericList, { ColumnDefinition } from 'components/List/GenericList';
import Pagination from 'components/Pagination/Pagination';
import SideDrawer from '../components/SideDrawer';
import { InventoryContainer, SummaryCard } from '../styles/InventoryPageStyles';

interface ResourceGroup {
  resource: ResourceDTO;
  codes: CodeDTO[];
}

const InventoryPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { list, loading, error } = useAppSelector(
    (state: RootState) => state.codes
  );

  const [selectedGroup, setSelectedGroup] = useState<ResourceGroup | null>(null);

  useEffect(() => {
    const queryParams: QueryParamsDTO = {
      page: 1,
      size: 9999999,
    };
    dispatch(fetchInventoryCodesThunk(queryParams));
  }, [dispatch]);

  const filteredCodes = useMemo(
    () => list.filter((code) => code.resource),
    [list]
  );

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
  }, [filteredCodes]);

  const totalProducts = groupedData.length;
  const totalCodes = groupedData.reduce(
    (acc, group) => acc + group.codes.length,
    0
  );

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
          <span style={{ fontStyle: 'italic', color: '#999' }}>
            Sem imagem
          </span>
        ),
    },
    {
      header: 'Produto',
      render: (group) => (
        <span style={{ fontWeight: 500 }}>
          {group.resource.name || 'Produto sem nome'}
        </span>
      ),
    },
    {
      header: 'Qtde em Estoque',
      render: (group) => (
        <span style={{ fontWeight: 500, color: '#00509e' }}>
          {group.codes.length}
        </span>
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
            (e.currentTarget as HTMLButtonElement).style.backgroundColor =
              '#5a6268';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor =
              '#6c757d';
          }}
          onClick={() => setSelectedGroup(group)}
        >
          <FaEye />
          Visualizar
        </button>
      ),
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return groupedData.slice(startIndex, endIndex);
  }, [groupedData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(groupedData.length / itemsPerPage);

  return (
    <InventoryContainer>
      {/* Resumo de totais */}
      <SummaryCard>
        <div className="summaryTitle">
          <FaBoxes />
          <span>Controle de Estoque</span>
        </div>
        <div className="summarySubtitle">
          {totalProducts} tipos de produtos • Total de {totalCodes} itens em
          estoque
        </div>
      </SummaryCard>

      {/* Lista genérica */}
      <GenericList
        title="Inventário"
        data={paginatedData}
        columns={columns}
        loading={loading}
        error={error ?? undefined}
        currentPage={currentPage}
        onPageChange={(newPage) => setCurrentPage(newPage)}
      />

      {/* Componente de paginação */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(newPage) => setCurrentPage(newPage)}
      />

      {/* SideDrawer */}
      <SideDrawer
        open={!!selectedGroup}
        onClose={() => setSelectedGroup(null)}
        resourceGroup={selectedGroup}
      />
    </InventoryContainer>
  );
};

export default InventoryPage;
