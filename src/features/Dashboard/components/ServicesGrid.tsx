import React from 'react';
import {
  ContentGrid,
  CardContainer,
  IconWrapper,
  MoreButton,
} from '../styles/dashboardStyles';
import {
  FaBoxOpen,
  FaBuilding,
  FaExchangeAlt,
  FaHistory,
  FaUserFriends,
  FaBoxes,
  FaQrcode,
  FaClone,
  FaClipboardCheck,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ServicesGrid: React.FC = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: <FaBoxOpen size={32} />,
      title: 'Inventário',
      description: 'Gerencie e visualize seu estoque...',
      route: '/dashboard/codigos/inventory',
    },
    {
      icon: <FaBuilding size={32} />,
      title: 'Empresas',
      description: 'Gerencie empresas e usuários...',
      route: '/dashboard/empresas',
    },
    {
      icon: <FaExchangeAlt size={32} />,
      title: 'Movimentar Produtos',
      description: 'Registre entradas e saídas...',
      route: '/dashboard/codigos/movements',
    },
    {
      icon: <FaHistory size={32} />,
      title: 'Últimas Movimentações',
      description: 'Acompanhe alterações...',
      route: '/dashboard/eventos',
    },
    {
      icon: <FaUserFriends size={32} />,
      title: 'Usuários',
      description: 'Gerencie contas e permissões...',
      route: '/dashboard/usuarios',
    },
    {
      icon: <FaBoxes size={32} />,
      title: 'Produtos',
      description: 'Gerencie produtos da empresa...',
      route: '/dashboard/recursos',
    },
    {
      icon: <FaQrcode size={32} />,
      title: 'Códigos',
      description: 'Gerencie QR Codes...',
      route: '/dashboard/codigos',
    },
    {
      icon: <FaClone size={32} />,
      title: 'Geração em Lote',
      description: 'Gere lotes de QR Codes...',
      route: '/dashboard/codigos/bulk-generate',
    },
    {
      icon: <FaClipboardCheck size={32} />,
      title: 'Status',
      description: 'Gerencie Status do sistema...',
      route: '/dashboard/status',
    },
  ];

  return (
    <>
      <h2 style={{
        marginBottom: '1.2rem',
        fontSize: '1.8rem',
        fontWeight: 500,
        color: '#333',
        letterSpacing: '0.5px',
        display: 'inline-block',
        paddingBottom: '0.2rem',
        borderBottom: '2px solid #00509e'
      }}>
        Funcionalidades
      </h2>

      <ContentGrid>
        {services.map((service, idx) => (
          <CardContainer key={idx}>
            <IconWrapper>{service.icon}</IconWrapper>
            <h2>{service.title}</h2>
            <p>{service.description}</p>
            <MoreButton onClick={() => navigate(service.route)}>Acessar</MoreButton>
          </CardContainer>
        ))}
      </ContentGrid>
    </>
  );
};

export default ServicesGrid;
