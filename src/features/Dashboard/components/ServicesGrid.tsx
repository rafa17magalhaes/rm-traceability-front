import React from 'react';
import { ContentGrid, CardContainer, IconWrapper, MoreButton } from '../styles/dashboardStyles';
import { FaBoxes, FaBoxOpen, FaExchangeAlt, FaHistory, FaList, FaQrcode, FaUserFriends } from 'react-icons/fa';
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
      icon: <FaExchangeAlt size={32} />,
      title: 'Movimentar Produtos',
      description: 'Registre entradas e saídas...',
      route: '/dashboard/empresas/new',
    },
    {
      icon: <FaHistory size={32} />,
      title: 'Últimas Movimentações',
      description: 'Acompanhe alterações...',
      route: '/dashboard/usuarios/new',
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
      description: 'Gere e gerencie QR Codes...',
      route: '/dashboard/codigos',
    },
    {
      icon: <FaList size={32} />,
      title: 'Eventos',
      description: 'Acompanhe e gerencie eventos...',
      route: '/dashboard/eventos',
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
