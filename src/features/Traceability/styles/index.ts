import styled from 'styled-components';

export const PageContainer = styled.div`
  padding: 2rem;
  font-family: 'Open Sans', sans-serif;
  background-color: #fff;

  .pageTitle {
    margin-bottom: 1rem;
    font-size: 1.8rem;
    font-weight: 500;
    color: #333;
    padding-bottom: 0.5rem;
    border-bottom: 3px solid #00509e;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

export const SidebarWrapper = styled.div`
  width: 320px;
  background-color: #f8f8f8;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

  h3 {
    margin-bottom: 0.8rem;
    font-size: 1.2rem;
    border-bottom: 1px solid #ccc;
    padding-bottom: 0.3rem;
    color: #333;
  }
`;

export const EventsList = styled.div`
  max-height: 550px;
  overflow-y: auto;
  padding-right: 0.5rem;
`;

export const EventItem = styled.div`
  background-color: #fff;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  padding: 0.6rem 0.8rem;
  cursor: pointer;
  transition:
    background-color 0.2s,
    border-color 0.2s;
  border: 1px solid #eaeaea;

  &:hover {
    background-color: #e6f7ff;
  }

  &.selected {
    background-color: #cceeff;
    border-color: #99ddff;
  }

  strong {
    display: block;
    color: #333;
    margin-bottom: 0.2rem;
    font-weight: 600;
  }

  span {
    display: block;
    font-size: 0.85rem;
    color: #666;
  }
`;

export const MapWrapper = styled.div`
  flex: 1;
  height: 550px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

  .leaflet-container {
    width: 100%;
    height: 100%;
    border: 2px solid #00509e;
  }
`;
