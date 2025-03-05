import React from 'react';
import { ContentGrid, CardContainer, IconWrapper, MoreButton } from '../styles/dashboardStyles';
import { FaBoxes, FaBoxOpen, FaBuilding, FaClipboardCheck, FaClone, FaExchangeAlt, FaHistory, FaQrcode, FaUserFriends } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ServicesGrid: React.FC = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: <FaBoxOpen size={32} />,
      title: 'Inventário',
      description: 'Gerencie e visualize seu estoque...',
      route: '/dashboard/empresas',
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
      icon: <FaHistory size={32} />,
      title: 'Últimas Movimentações',
      description: 'Acompanhe e gerencie eventos...',
      route: '/dashboard/eventos',
    },
    {
      icon: <FaClipboardCheck  size={32} />,
      title: 'Status',
      description: 'Gerencie Status do sistema...',
      route: '/dashboard/status',
    },
  ];

  return (
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
  );
};

export default ServicesGrid;
