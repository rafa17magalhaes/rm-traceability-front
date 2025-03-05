import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { createStatusThunk, updateStatusThunk, fetchAllStatusesThunk } from 'store/slices/statusesSlice';
import { CreateStatusDTO } from 'types/status/CreateStatusDTO';
import { UpdateStatusDTO } from 'types/status/UpdateStatusDTO';
import { useNavigate, useParams } from 'react-router-dom';
import StatusForm from '../components/StatusForm';
import CelebrationMessage from 'components/CelebrationMessage/CelebrationMessage';
import { PageBackground } from '../styles/StatusFormStyles';

const AddStatusPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();

  const { list, loading, error } = useAppSelector((state) => state.statuses);

  const editing = Boolean(id);
  const existingStatus = list.find((s) => s.id === id);

  const [formData, setFormData] = useState<CreateStatusDTO>({
    name: '',
    description: '',
    active: true,
    companyId: '',
  });

  const [isLocalLoading, setIsLocalLoading] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    if (list.length === 0) {
      dispatch(fetchAllStatusesThunk());
    }
    if (editing && existingStatus) {
      setFormData({
        name: existingStatus.name,
        description: existingStatus.description,
        active: existingStatus.active,
        companyId: existingStatus.companyId || '',
      });
    }
  }, [editing, existingStatus, list, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, type } = e.target;
    if (type === 'checkbox') {
      const input = e.target as HTMLInputElement;
      setFormData((prev) => ({
        ...prev,
        [name]: input.checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: e.target.value,
      }));
    }
  };

  const handleSubmit = async () => {
    setIsLocalLoading(true);
    try {
      if (editing && id) {
        const updateDto: UpdateStatusDTO = { ...formData };
        await dispatch(updateStatusThunk({ id, dto: updateDto }));
      } else {
        await dispatch(createStatusThunk(formData));
      }
      setShowCelebration(true);
      setTimeout(() => {
        navigate('/dashboard/status');
      }, 3000);
    } catch (err) {
    } finally {
      setIsLocalLoading(false);
    }
  };

  return (
    <PageBackground>
      {showCelebration && (
        <CelebrationMessage message="Parabéns! Status salvo com sucesso." duration={3000} />
      )}
<StatusForm
  formData={formData}
  onChange={handleChange}
  onSubmit={handleSubmit}
  loading={isLocalLoading}
  error={error}
  editing={editing}
/>
    </PageBackground>
  );
};

export default AddStatusPage;
