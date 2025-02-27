import React, { useState } from 'react';
import { ButtonStyled, Spinner } from './LoadingButtonStyles';

interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  loadingDelay?: number; // ms
  loading?: boolean;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  loadingDelay = 1500,
  onClick,
  children,
  disabled,
  loading,
  ...rest
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const effectiveLoading = loading !== undefined ? loading : isLoading;

  const handleClick = () => {
    if (effectiveLoading) return;
    setIsLoading(true);
    setTimeout(() => {
      onClick();
      setIsLoading(false);
    }, loadingDelay);
  };

  return (
    <ButtonStyled onClick={handleClick} disabled={disabled || effectiveLoading} {...rest}>
      {effectiveLoading && <Spinner />}
      {children}
    </ButtonStyled>
  );
};

export default LoadingButton;
