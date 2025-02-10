import React from 'react';
import styled from 'styled-components';

const BackgroundWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg,rgb(0, 50, 104), #f8f9fa, #ced4da);
  background-size: 400% 400%;
  overflow: hidden;
  z-index: -1;
`;

const Div1 = styled.div`
  position: absolute;
  width: 0.001vmin;
  height: 0.001vmin;
  border-radius: 50%;
  opacity: 0.25;
  box-shadow: 0 0 45vmax 45vmax #0056b3;
  animation: move1 19s linear infinite;
`;

const Div2 = styled.div`
  position: absolute;
  width: 0.001vmin;
  height: 0.001vmin;
  border-radius: 50%;
  opacity: 0.25;
  box-shadow: 0 0 45vmax 45vmax #f8f9fa;
  animation: move2 25s linear infinite;
`;

const Div3 = styled.div`
  position: absolute;
  width: 0.001vmin;
  height: 0.001vmin;
  border-radius: 50%;
  opacity: 0.2;
  box-shadow: 0 0 45vmax 45vmax #ced4da;
  animation: move3 15s linear infinite;
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
