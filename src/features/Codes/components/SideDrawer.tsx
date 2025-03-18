import React, { useState, useEffect } from 'react';
import { CodeDTO } from 'types/codes/CodeDTO';
import { ResourceDTO } from 'types/resources';
import Pagination from 'components/Pagination/Pagination';
import { useNavigate } from 'react-router-dom';

interface ResourceGroup {
  resource: ResourceDTO;
  codes: CodeDTO[];
}

interface SideDrawerProps {
  open: boolean;
  onClose: () => void;
  resourceGroup: ResourceGroup | null;
}

const PAGE_SIZE = 10;

const SideDrawer: React.FC<SideDrawerProps> = ({ open, onClose, resourceGroup }) => {
  const [drawerPage, setDrawerPage] = useState(1);
  const navigate = useNavigate();

  // reseta a página quando o grupo mudar
  useEffect(() => {
    setDrawerPage(1);
  }, [resourceGroup]);

  if (!open || !resourceGroup) {
    return null;
  }

  const { resource, codes } = resourceGroup;
  const totalPagesDrawer = Math.ceil(codes.length / PAGE_SIZE);

  // Paginação local
  const startIndex = (drawerPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const visibleCodes = codes.slice(startIndex, endIndex);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 9999,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#fff',
          width: '450px',
          height: '100%',
          padding: '1.5rem',
          overflowY: 'auto',
          position: 'relative',
          boxShadow: '-4px 0 12px rgba(0,0,0,0.15)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'transparent',
            border: 'none',
            fontSize: '1.8rem',
            cursor: 'pointer',
            color: '#999',
          }}
          onClick={onClose}
        >
          &times;
        </button>

        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          {resource.imageUrl && (
            <img
              src={resource.imageUrl}
              alt={resource.name}
              style={{
                width: '120px',
                height: '120px',
                objectFit: 'cover',
                borderRadius: '50%',
                marginBottom: '0.5rem',
              }}
            />
          )}
          <h2 style={{ margin: 0, fontSize: '1.6rem', color: '#333' }}>
            {resource.name}
          </h2>
        </div>

        <h3 style={{ fontSize: '1.2rem', marginBottom: '0.8rem', color: '#00509e' }}>
          Produtos Rastreáveis
        </h3>
        <div style={{ fontSize: '0.95rem', color: '#333', marginBottom: '1rem' }}>
          Total em estoque: {codes.length}
        </div>

        {visibleCodes.map((code) => (
          <div
            key={code.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.75rem',
              marginBottom: '0.75rem',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {code.qrCodeUrl ? (
                <img
                  src={code.qrCodeUrl}
                  alt={code.value}
                  style={{
                    width: '60px',
                    height: '60px',
                    objectFit: 'cover',
                    borderRadius: '4px',
                    marginRight: '1rem',
                  }}
                />
              ) : (
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    backgroundColor: '#f0f0f0',
                    borderRadius: '4px',
                    marginRight: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#aaa',
                    fontSize: '0.8rem',
                  }}
                >
                  Sem QR
                </div>
              )}
              <div>
                <div style={{ fontWeight: 500, marginBottom: '0.25rem' }}>
                  {code.value}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>
                  Último evento: {code.status?.name || code.statusId || 'N/D'}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#999' }}>
                  Data da movimentação:{' '}
                  {code.createdAt
                    ? new Date(code.createdAt).toLocaleString('pt-BR')
                    : 'N/D'}
                </div>
              </div>
            </div>

            {/* Botão que leva ao mapa */}
            <button
              style={{
                backgroundColor: '#00509e',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                padding: '0.4rem 0.6rem',
                cursor: 'pointer',
              }}
              onClick={() => {
                navigate(`/dashboard/rastreamento?code=${code.value}`);
              }}
            >
              Ver no mapa
            </button>
          </div>
        ))}

        <Pagination
          currentPage={drawerPage}
          totalPages={totalPagesDrawer}
          onPageChange={(newPage) => setDrawerPage(newPage)}
        />
      </div>
    </div>
  );
};

export default SideDrawer;
