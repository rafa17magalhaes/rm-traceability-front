import styled from 'styled-components';

export const DrawerOverlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  justify-content: flex-end;
`;

export const DrawerContent = styled.div`
  background-color: #fff;
  width: 450px;
  height: 100%;
  padding: 1.5rem;
  overflow-y: auto;
  position: relative;
  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.15);
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  font-size: 1.8rem;
  cursor: pointer;
  color: #999;
`;

export const HeaderContainer = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;

  img {
    width: 120px;
    height: 120px;
    object-fit: cover;
    border-radius: 50%;
    margin-bottom: 0.5rem;
  }

  h2 {
    margin: 0;
    font-size: 1.6rem;
    color: #333;
  }
`;

export const Title = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.8rem;
  color: #00509e;
`;

export const InfoText = styled.div`
  font-size: 0.95rem;
  color: #333;
  margin-bottom: 1rem;
`;

export const CodeItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  .codeLeft {
    display: flex;
    align-items: center;

    img {
      width: 60px;
      height: 60px;
      object-fit: cover;
      border-radius: 4px;
      margin-right: 1rem;
    }

    .noQR {
      width: 60px;
      height: 60px;
      background-color: #f0f0f0;
      border-radius: 4px;
      margin-right: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #aaa;
      font-size: 0.8rem;
    }

    .codeInfo {
      display: flex;
      flex-direction: column;

      .codeValue {
        font-weight: 500;
        margin-bottom: 0.25rem;
      }

      .codeStatus {
        font-size: 0.9rem;
        color: #666;
      }

      .codeDate {
        font-size: 0.8rem;
        color: #999;
      }
    }
  }

  .mapButton {
    background-color: #00509e;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 0.4rem 0.6rem;
    cursor: pointer;
    font-size: 0.9rem;
  }
`;
