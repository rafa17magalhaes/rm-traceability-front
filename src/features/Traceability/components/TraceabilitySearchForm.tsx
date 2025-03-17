import React, { useState } from 'react';
import LoadingButton from 'components/Button/LoadingButton';
import { ErrorMessage } from 'features/Login/styles/loginStyles';
import { SearchContainer } from '../styles/TraceabilitySearchFormStyles';
import { ResourceDTO } from 'types/resources';

interface TraceabilitySearchFormProps {
  onSearch: (searchTerm: string) => void;
  loading?: boolean;
  error?: string | null;
  resource?: ResourceDTO | null;
}

const TraceabilitySearchForm: React.FC<TraceabilitySearchFormProps> = ({
  onSearch,
  loading = false,
  error,
  resource,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = () => {
    onSearch(searchTerm);
  };

  return (
    <SearchContainer>
      <div className="searchRow">
        <input
          type="text"
          placeholder="Insira o código do produto..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <LoadingButton onClick={handleSubmit} loading={loading}>
          Search
        </LoadingButton>
      </div>

      {error && <ErrorMessage>Error: {error}</ErrorMessage>}

      {resource && (
        <div className="resourceRow">
          {resource.imageUrl && (
            <img src={resource.imageUrl} alt={resource.name} />
          )}
          <div>
            <strong>{resource.name}</strong>
          </div>
        </div>
      )}
    </SearchContainer>
  );
};

export default TraceabilitySearchForm;
