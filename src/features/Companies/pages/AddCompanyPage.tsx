import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CompanyForm from '../components/CompanyForm';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from 'store';
import { CreateCompanyDTO } from 'types/companies';
import { CreateUserDTO } from 'types/users';
import { createCompanyThunk } from 'store/slices/companiesSlice';

const AddCompanyPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.companies);

  const handleSubmit = async (company: CreateCompanyDTO, user: CreateUserDTO) => {
    const resultAction = await dispatch(createCompanyThunk({ company, user }));
  
    if (createCompanyThunk.fulfilled.match(resultAction)) {
      navigate('/dashboard/empresas');
    }  
  };

  return (
    <div style={{ padding: '1rem' }}>
      <CompanyForm loading={loading} error={error} onSubmit={handleSubmit} />
    </div>
  );
};

export default AddCompanyPage;
