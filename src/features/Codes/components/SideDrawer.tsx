import React, { useState, useEffect } from 'react';
import { CodeDTO } from 'types/codes/CodeDTO';
import { ResourceDTO } from 'types/resources';
import Pagination from 'components/Pagination/Pagination';
import { useNavigate } from 'react-router-dom';
import { Title } from '../styles/CodeMovementStyles';
import { DrawerOverlay, DrawerContent, CloseButton, HeaderContainer, InfoText, CodeItem } from '../styles/SideDrawerStyles';

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

  // Reseta a página quando o grupo mudar
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
    <DrawerOverlay onClick={onClose}>
      <DrawerContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>

        <HeaderContainer>
          {resource.imageUrl && (
            <img
              src={resource.imageUrl}
              alt={resource.name}
            />
          )}
          <h2>{resource.name}</h2>
        </HeaderContainer>

        <Title>Produtos Rastreáveis</Title>
        <InfoText>Total em estoque: {codes.length}</InfoText>

        {visibleCodes.map((code) => (
          <CodeItem key={code.id}>
            <div className="codeLeft">
              {code.qrCodeUrl ? (
                <img
                  src={code.qrCodeUrl}
                  alt={code.value}
                />
              ) : (
                <div className="noQR">Sem QR</div>
              )}

              <div className="codeInfo">
                <div className="codeValue">{code.value}</div>
                <div className="codeStatus">
                  Último evento: {code.status?.name || code.statusId || 'N/D'}
                </div>
                <div className="codeDate">
                  Data da movimentação:{' '}
                  {code.createdAt
                    ? new Date(code.createdAt).toLocaleString('pt-BR')
                    : 'N/D'}
                </div>
              </div>
            </div>

            <button
              className="mapButton"
              onClick={() => {
                navigate(`/dashboard/rastreamento?code=${code.value}`);
              }}
            >
              Ver no mapa
            </button>
          </CodeItem>
        ))}

        <Pagination
          currentPage={drawerPage}
          totalPages={totalPagesDrawer}
          onPageChange={(newPage) => setDrawerPage(newPage)}
        />
      </DrawerContent>
    </DrawerOverlay>
  );
};

export default SideDrawer;
