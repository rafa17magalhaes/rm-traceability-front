import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { fetchCompanyById, createCompanyThunk, updateCompanyThunk } from 'store/slices/companiesSlice';
import { createUserThunk } from 'store/slices/usersSlice';

import { CreateCompanyDTO } from 'types/companies';
import { CreateUserDTO } from 'types/users';

import CelebrationMessage from 'components/CelebrationMessage/CelebrationMessage';
import CompanyForm from '../components/CompanyForm';

const AddCompanyPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { loading, error, currentCompany } = useAppSelector((s) => s.companies);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    if (id) dispatch(fetchCompanyById(id));
  }, [dispatch, id]);

  const handleSubmit = async (
    company: CreateCompanyDTO,
    user: CreateUserDTO
  ) => {
    let resultAction;
    if (id) {
      // edição simples de empresa
      resultAction = await dispatch(updateCompanyThunk({ id, dto: company }));
    } else {
      // cria empresa
      resultAction = await dispatch(createCompanyThunk({ company }));
      if (createCompanyThunk.fulfilled.match(resultAction)) {
        const createdCompany = resultAction.payload;
        // injeta o ID da empresa recém‐criada no usuário
        const userWithCompany = {
          ...user,
          companyId: createdCompany.id,
        };
        const userResult = await dispatch(createUserThunk(userWithCompany));
        if (!createUserThunk.fulfilled.match(userResult)) {
          console.error('Erro ao criar usuário administrador:', userResult);
        }
      }
    }

    const success =
      (id && updateCompanyThunk.fulfilled.match(resultAction)) ||
      (!id && createCompanyThunk.fulfilled.match(resultAction));

    if (success) {
      setShowCelebration(true);
      setTimeout(() => navigate('/dashboard/empresas'), 3000);
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      {showCelebration && (
        <CelebrationMessage
          message={id ? "Empresa atualizada com sucesso!" : "Parabéns! Sua operação foi concluída com sucesso."}
          duration={3000}
        />
      )}
      <CompanyForm
        loading={loading}
        error={error}
        onSubmit={handleSubmit}
        initialData={id ? currentCompany || undefined : undefined}
      />
    </div>
  );
};

export default AddCompanyPage;
