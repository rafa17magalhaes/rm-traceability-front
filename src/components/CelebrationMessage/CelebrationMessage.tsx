import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Confetti from 'react-confetti';
import styled, { keyframes } from 'styled-components';

interface CelebrationMessageProps {
  message?: string;
  duration?: number; // duração em milissegundos
}

// Animação para fade out
const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const MessageContainer = styled.div<{ delay: number }>`
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  background: rgba(0, 0, 0, 0.85);
  padding: 2.5rem 4rem;
  border-radius: 10px;
  color: #fff;
  font-size: 1.6rem;
  text-align: center;
  animation: ${fadeOut} 1s ease-out forwards;
  animation-delay: ${({ delay }) => `${delay}ms`};
`;

const CelebrationMessage: React.FC<CelebrationMessageProps> = ({
  message = 'Parabéns! Sua operação foi concluída com sucesso.',
  duration = 5000,
}) => {
  const [show, setShow] = useState(true);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), duration);
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [duration]);

  if (!show) return null;

  // Renderiza em um portal para garantir visibilidade
  return ReactDOM.createPortal(
    <>
      <Confetti
        width={dimensions.width}
        height={dimensions.height}
        recycle={false}
        numberOfPieces={200}
      />
      <MessageContainer delay={duration - 1000}>
        {message}
      </MessageContainer>
    </>,
    document.body
  );
};

export default CelebrationMessage;
