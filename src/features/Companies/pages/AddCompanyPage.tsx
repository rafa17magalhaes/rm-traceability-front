import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import CompanyForm from '../components/CompanyForm';
import { CreateCompanyDTO } from 'types/companies';
import { CreateUserDTO } from 'types/users';
import { fetchCompanyById, createCompanyThunk, updateCompanyThunk } from 'store/slices/companiesSlice';
import CelebrationMessage from 'components/CelebrationMessage/CelebrationMessage';
import { createUserThunk } from 'store/slices/usersSlice';

const AddCompanyPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // Se existir, estamos em modo edição
  const { loading, error, currentCompany } = useAppSelector((state) => state.companies);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchCompanyById(id));
    }
  }, [dispatch, id]);

  const handleSubmit = async (company: CreateCompanyDTO, user: CreateUserDTO) => {
    let resultAction;
    if (id) {
      // Modo edição
      resultAction = await dispatch(updateCompanyThunk({ id, dto: company }));
    } else {
      resultAction = await dispatch(createCompanyThunk({ company }));
      if (createCompanyThunk.fulfilled.match(resultAction)) {
        const createdCompany = resultAction.payload;
        const updatedUser: CreateUserDTO = { ...user, companyId: createdCompany.id };
        const userResult = await dispatch(createUserThunk(updatedUser));
        if (!createUserThunk.fulfilled.match(userResult)) {
          console.error('Erro ao criar o usuário:', userResult);
        }
      }
    }
  
    if (
      (id && updateCompanyThunk.fulfilled.match(resultAction)) ||
      (!id && createCompanyThunk.fulfilled.match(resultAction))
    ) {
      setShowCelebration(true);
      setTimeout(() => {
        navigate('/dashboard/empresas');
      }, 3000);
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
