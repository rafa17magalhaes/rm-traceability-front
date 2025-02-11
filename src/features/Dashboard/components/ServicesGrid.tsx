import React from 'react';
import { ContentGrid, CardContainer, IconWrapper, MoreButton } from '../styles/dashboardStyles';
import { FaRocket, FaFileContract, FaLightbulb, FaUsers } from 'react-icons/fa';

const ServicesGrid: React.FC = () => {
  const services = [
      {
        icon: <FaLightbulb size={32} />, 
        title: 'Inventario', 
        description: 'Gerencie e visualize seu estoque e produtos em um só lugar.'
      },
      {
        icon: <FaRocket size={32} />, 
        title: 'Movimentar produtos', 
        description: 'Registre entradas e saídas de forma simples e rápida, mantendo o estoque sempre atualizado.'
      },
      {
        icon: <FaFileContract size={32} />, 
        title: 'Últimas Movimentações', 
        description: 'Acompanhe as movimentações recentes e fique por dentro das alterações no seu inventário.'
      },
      {
        icon: <FaUsers size={32} />, 
        title: 'Usuários', 
        description: 'Gerencie contas, permissões e níveis de acesso de maneira eficiente e segura.'
      },    
  ];

  return (
    <ContentGrid>
      {services.map((service, idx) => (
        <CardContainer key={idx}>
          <IconWrapper>
            {service.icon}
          </IconWrapper>

          <h2>{service.title}</h2>
          <p>{service.description}</p>

          <MoreButton>Acessar</MoreButton>
        </CardContainer>
      ))}
    </ContentGrid>
  );
};

export default ServicesGrid;
