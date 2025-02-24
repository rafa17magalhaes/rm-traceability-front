import React, { useState } from 'react';
import { ButtonStyled, Spinner } from './LoadingButtonStyles';

interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  loadingDelay?: number; // ms
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  loadingDelay = 1500,
  onClick,
  children,
  disabled,
  ...rest
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    if (isLoading) return;
    setIsLoading(true);

    setTimeout(() => {
      onClick();
      setIsLoading(false);
    }, loadingDelay);
  };

  return (
    <ButtonStyled onClick={handleClick} disabled={disabled || isLoading} {...rest}>
      {isLoading && <Spinner />}
      {children}
    </ButtonStyled>
  );
};

export default LoadingButton;
