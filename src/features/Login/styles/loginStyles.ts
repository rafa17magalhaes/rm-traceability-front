import styled from 'styled-components';

export const LayoutContainer = styled.div`
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0;
  font-family: 'Lato', sans-serif;
`;

export const Spinner = styled.div`
  border: 3px solid #f3f3f3; /* Fundo do spinner */
  border-top: 3px solid #fff; /* Cor da parte giratória */
  border-radius: 50%;
  width: 18px;
  height: 18px;
  animation: spin 1s linear infinite !important;
  margin: auto;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 70vh; /* Ajuste conforme necessário */
`;

export const Subtitle = styled.p`
  margin-top: 0.5rem;
  margin-bottom: 0rem;
  font-size: 1rem;
  color: #d1d1d1;
  font-style: italic;
  text-align: center;
`;

export const DecorativeDivider = styled.div`
  width: 80%;
  height: 2px;
  margin: 1rem auto;
  background: linear-gradient(90deg, transparent, #ffffff, transparent);
`;

export const LogoContainer = styled.div`
  margin-top: -77px; /* Ajuste esse valor conforme necessário */
  margin-bottom: -6rem;
  display: flex;
  justify-content: center; /* Centraliza o logo horizontalmente */
  opacity: 0;
  animation: fadeIn 1s forwards; /* Animação de fade-in */

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }

  img {
    width: 300px; /* Logo aumentado */
    height: auto;
    border-radius: 10px; /* Bordas suavizadas */
    filter: drop-shadow(0 5px 10px rgba(0, 0, 0, 0.3)); /* Sombra sutil */
    transition:
      transform 0.3s ease,
      filter 0.3s ease; /* Transição suave */
  }

  img:hover {
    transform: scale(1.05); /* Aumenta levemente no hover */
    filter: drop-shadow(0 8px 15px rgba(0, 0, 0, 0.4));
  }
`;

export const HeaderText = styled.p`
  margin-top: -20px; /* Espaço pequeno acima do texto para aproximá-lo do logo */
  margin-bottom: 1rem; /* Espaço reduzido abaixo do texto para aproximá-lo do formulário */
  font-size: 1.2rem;
  color: #ffffff;
  text-align: center;
  line-height: 1.5;
  font-weight: 500;
`;

export const InfoCard = styled.div`
  position: absolute;
  top: 20%;
  left: 2%;
  width: 280px;
  background: linear-gradient(135deg, #1a1a1a, #000);
  color: #f0f0f0;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
  font-family: 'Lato', sans-serif;
  text-align: justify;

  h3 {
    margin-top: 0;
    margin-bottom: 0.8rem;
    font-size: 1.4rem;
    color: #fff;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  p {
    margin: 0.5rem 0;
    font-size: 0.95rem;
    line-height: 1.4;
  }
`;

export const Container = styled.div`
  width: 300%;
  max-width: 370px;
  background: #ffffff;
  padding: 3rem;
  border-radius: 7px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  animation: containerFadeIn 1s forwards;

  @keyframes containerFadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const Title = styled.h2`
  margin-bottom: 1.5rem;
  color: #333;
  text-align: center;
  font-weight: 700;
  font-size: 1.8rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const Label = styled.label`
  font-size: 1rem;
  color: #555;
  margin-bottom: 0.5rem;
  display: block;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border 0.2s ease-in-out;
  font-family: inherit;

  &:focus {
    border-color: #002b5c;
    outline: none;
  }
`;

export const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #002b5c;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  display: block;
  margin: 0 auto;
  transition: background-color 0.2s ease-in-out;
  font-weight: 500;
  font-family: inherit;

  &:hover:not(:disabled) {
    background-color: #001f3f;
  }

  &:disabled {
    background-color: #aaa;
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  text-align: center;
`;

export const FooterContainer = styled.div`
  margin-top: 2rem;
`;

export const FooterText = styled.p`
  font-size: 0.8rem;
  color: #f0f0f0;
  text-align: center;
  font-family: 'Raleway', sans-serif;
`;
