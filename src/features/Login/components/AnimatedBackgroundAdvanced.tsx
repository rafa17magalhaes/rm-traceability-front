import React from 'react';
import styled, { keyframes } from 'styled-components';

const BackgroundWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg,rgb(14, 53, 112),rgb(51, 66, 125),rgb(246, 250, 255));
  background-size: 400% 400%;
  overflow: hidden;
  z-index: -1;
`;

const move1 = keyframes`
  0% { top: 0vh; left: 50vw; }
  25% { left: 0vw; }
  50% { top: 100vh; }
  75% { left: 100vw; }
  100% { top: 0vh; left: 50vw; }
`;

const move2 = keyframes`
  0% { top: 50vh; left: 100vw; }
  25% { top: 100vh; }
  50% { left: 0vw; }
  75% { top: 0vh; }
  100% { top: 50vh; left: 100vw; }
`;

const move3 = keyframes`
  0% { top: 100vh; left: 50vw; }
  25% { left: 100vw; }
  50% { top: 0vh; }
  75% { left: 0vw; }
  100% { top: 100vh; left: 50vw; }
`;

const Div1 = styled.div`
  position: absolute;
  width: 0.001vmin;
  height: 0.001vmin;
  border-radius: 50%;
  opacity: 0.25;
  box-shadow: 0 0 45vmax 45vmax rgb(0, 86, 179);
  animation: ${move1} 19s linear infinite;
`;

const Div2 = styled.div`
  position: absolute;
  width: 0.001vmin;
  height: 0.001vmin;
  border-radius: 50%;
  opacity: 0.25;
  box-shadow: 0 0 45vmax 45vmax #f8f9fa;
  animation: ${move2} 25s linear infinite;
`;

const Div3 = styled.div`
  position: absolute;
  width: 0.001vmin;
  height: 0.001vmin;
  border-radius: 50%;
  opacity: 0.2;
  box-shadow: 0 0 45vmax 45vmax rgb(15, 22, 29);
  animation: ${move3} 15s linear infinite;
`;

const AnimatedBackgroundAdvanced: React.FC = () => {
  return (
    <BackgroundWrapper>
      <Div1 />
      <Div2 />
      <Div3 />
    </BackgroundWrapper>
  );
};

export default AnimatedBackgroundAdvanced;
