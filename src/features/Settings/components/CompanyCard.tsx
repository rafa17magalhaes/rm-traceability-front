import React, { useEffect } from 'react';
import { useAuth } from 'context/AuthContext';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { fetchCompanyById } from 'store/slices/companiesSlice';
import { RootState } from 'store';

import {
  CompanyCardContainer,
  CardHeader,
  CardTitle,
  CardBody,
  FieldRow,
  FieldLabel,
  FieldValue,
} from '../styles/CompanyCardStyles';

const CompanyCard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAuth();

  // Pega a empresa "atual" do slice companies
  const { currentCompany, loading } = useAppSelector((state: RootState) => state.companies);

  useEffect(() => {
    if (user?.companyId) {
      dispatch(fetchCompanyById(user.companyId));
    }
  }, [user?.companyId, dispatch]);

  if (!user) {
    return null;
  }

  if (loading) {
    return <p style={{ textAlign: 'center' }}>Carregando dados da empresa...</p>;
  }

  return (
    <CompanyCardContainer>
      <CardHeader>
        <CardTitle>Minha Empresa</CardTitle>
      </CardHeader>
      <CardBody>
        <FieldRow>
          <FieldLabel>Nome da Empresa:</FieldLabel>
          <FieldValue>
            {currentCompany?.name || user.companyName || '---'}
          </FieldValue>
        </FieldRow>
        <FieldRow>
          <FieldLabel>CNPJ:</FieldLabel>
          <FieldValue>
            {currentCompany?.document || '---'}
          </FieldValue>
        </FieldRow>
        <FieldRow>
          <FieldLabel>Endereço (Cidade):</FieldLabel>
          <FieldValue>
            {currentCompany?.city || '---'}
          </FieldValue>
        </FieldRow>
      </CardBody>
    </CompanyCardContainer>
  );
};

export default CompanyCard;
