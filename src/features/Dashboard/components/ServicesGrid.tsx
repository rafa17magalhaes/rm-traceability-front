import React from 'react';
import { useNavigate } from 'react-router-dom';
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
  FaMapMarkerAlt,
  FaCog,
} from 'react-icons/fa';
import { BsStars } from 'react-icons/bs';

import { useAuth } from 'context/AuthContext';
import { useAppSelector } from 'store/hooks';
import { RootState } from 'store';
import { ModuleKey } from 'store/slices/permissionsSlice';

import {
  ContentGrid,
  CardContainer,
  IconWrapper,
  MoreButton,
  TitleContainer,
  TitleIcon,
  TitleSubtitle,
  TitleText,
} from '../styles/dashboardStyles';
interface ServiceItem {
  icon: JSX.Element;
  title: string;
  description: string;
  route: string;
  permissionKey: ModuleKey;
}

const defaultPermissions: Record<ModuleKey, boolean> = {
  empresas: true,
  usuarios: true,
  produtos: true,
  codigos: true,
  geracaoLote: true,
  movimentacoes: true,
  status: true,
  rastreamento: true,
  configuracoes: true,
  inventario: true,
  ai: true,
};

const services: ServiceItem[] = [
  {
    icon: <FaBoxOpen size={32} />,
    title: 'Inventário',
    description: 'Gerencie e visualize seu estoque...',
    route: '/dashboard/codigos/inventory',
    permissionKey: 'inventario',
  },
  {
    icon: <FaBuilding size={32} />,
    title: 'Empresas',
    description: 'Gerencie empresas e usuários...',
    route: '/dashboard/empresas',
    permissionKey: 'empresas',
  },
  {
    icon: <FaExchangeAlt size={32} />,
    title: 'Movimentar Produtos',
    description: 'Registre entradas e saídas...',
    route: '/dashboard/codigos/movements',
    permissionKey: 'movimentacoes',
  },
  {
    icon: <FaHistory size={32} />,
    title: 'Últimas Movimentações',
    description: 'Acompanhe alterações...',
    route: '/dashboard/eventos',
    permissionKey: 'movimentacoes',
  },
  {
    icon: <FaUserFriends size={32} />,
    title: 'Usuários',
    description: 'Gerencie contas e permissões...',
    route: '/dashboard/usuarios',
    permissionKey: 'usuarios',
  },
  {
    icon: <FaBoxes size={32} />,
    title: 'Produtos',
    description: 'Gerencie produtos da empresa...',
    route: '/dashboard/recursos',
    permissionKey: 'produtos',
  },
  {
    icon: <FaQrcode size={32} />,
    title: 'Códigos',
    description: 'Gerencie QR Codes...',
    route: '/dashboard/codigos',
    permissionKey: 'codigos',
  },
  {
    icon: <FaClone size={32} />,
    title: 'Geração em Lote',
    description: 'Gere lotes de QR Codes...',
    route: '/dashboard/codigos/bulk-generate',
    permissionKey: 'geracaoLote',
  },
  {
    icon: <FaClipboardCheck size={32} />,
    title: 'Status',
    description: 'Gerencie Status do sistema...',
    route: '/dashboard/status',
    permissionKey: 'status',
  },
  {
    icon: <FaMapMarkerAlt size={32} />,
    title: 'Mapa de Rastreio',
    description: 'Visualize a localização das movimentações...',
    route: '/dashboard/rastreamento',
    permissionKey: 'rastreamento',
  },
  {
    icon: <BsStars size={32} />,
    title: 'Assistente IA',
    description: 'Converse com a assistente e resolva dúvidas...',
    route: '/dashboard/ai',
    permissionKey: 'ai',
  },
  {
    icon: <FaCog size={32} />,
    title: 'Configurações',
    description: 'Gerencie dados do usuário e empresa...',
    route: '/dashboard/configuracoes',
    permissionKey: 'configuracoes',
  },
];

const ServicesGrid: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Permissões do usuário
  const storedPermissions = useAppSelector(
    (state: RootState) => state.permissions.data[user?.id || ''] || {}
  );
  const finalPermissions: Record<ModuleKey, boolean> = {
    ...defaultPermissions,
    ...storedPermissions,
  };

  return (
    <>
      <TitleContainer>
        <TitleIcon />
        <TitleText>Painel de Serviços</TitleText>
      </TitleContainer>

      <TitleSubtitle>Selecione um módulo abaixo para gerenciar:</TitleSubtitle>

      <ContentGrid>
        {services.map((service, idx) => {
          // Se o usuário não tiver permissão, não renderiza o card
          if (finalPermissions[service.permissionKey] === false) return null;
          return (
            <CardContainer key={idx}>
              <IconWrapper>{service.icon}</IconWrapper>
              <h2>{service.title}</h2>
              <p>{service.description}</p>
              <MoreButton onClick={() => navigate(service.route)}>
                Acessar
              </MoreButton>
            </CardContainer>
          );
        })}
      </ContentGrid>
    </>
  );
};

export default ServicesGrid;
