import React from 'react';

import AnimatedBackgroundAdvanced from './AnimatedBackgroundAdvanced';
import {
  LayoutContainer,
  ContentWrapper,
  InfoCard,
  LogoContainer,
  HeaderText,
  Subtitle,
  DecorativeDivider,
  FooterContainer,
  FooterText,
} from '../styles/loginStyles';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutContainer>
      <AnimatedBackgroundAdvanced />

      <InfoCard>
        <h3>Bem-vindo ao RM Traceability</h3>
        <p>
          Este sistema foi concebido para otimizar a gestão empresarial, controlando o acesso de usuários com precisão e segurança.
        </p>
        <p>
          Oferecemos soluções de rastreabilidade de produtos e um inventário inteligente, adaptados às necessidades da sua empresa.
        </p>
        <p>
          Entre em contato para mais informações através do email abaixo:
        </p>
        <p>
          rafa7magalhaes@outlook.com
        </p>
      </InfoCard>

      <ContentWrapper>
        <LogoContainer>
          <img src="/RM-traceability-logo.png" alt="Logo RM Traceability" />
        </LogoContainer>
        <HeaderText>Acesse RM Traceability</HeaderText>
        <Subtitle>Sua solução para rastreabilidade inteligente</Subtitle>
        <DecorativeDivider />
        {children}
        <FooterContainer>
          <FooterText>
            Desenvolvido por Rafael Magalhães
          </FooterText>
        </FooterContainer>
      </ContentWrapper>
    </LayoutContainer>
  );
};

export default Layout;
