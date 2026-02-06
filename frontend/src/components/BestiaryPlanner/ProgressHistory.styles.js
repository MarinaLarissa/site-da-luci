import styled from 'styled-components';

export const HistoryModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;

  @media (max-width: 768px) {
    padding: 0;
  }
`;

export const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(4px);
`;

export const ModalContent = styled.div`
  position: relative;
  background: #1f2937;
  border-radius: 0.5rem;
  width: 100%;
  max-width: 1200px;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    max-width: 100%;
    max-height: 100vh;
    border-radius: 0;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #374151;
  background: #111827;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const ModalTitle = styled.h2`
  margin: 0;
  color: #f3f4f6;
  font-size: 1.25rem;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: #9ca3af;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.25rem;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.25rem;
  transition: all 0.2s ease;

  &:hover {
    background: #374151;
    color: #f3f4f6;
  }
`;

export const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
`;

export const TabsList = styled.div`
  display: flex;
  gap: 0.5rem;
  background: #111827;
  padding: 1rem;
  border-bottom: 1px solid #374151;
  overflow-x: auto;

  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #1f2937;
  }

  &::-webkit-scrollbar-thumb {
    background: #374151;
    border-radius: 2px;

    &:hover {
      background: #4b5563;
    }
  }

  @media (max-width: 768px) {
    gap: 0.25rem;
    padding: 0.75rem;
  }
`;

export const Tab = styled.button`
  padding: 0.75rem 1.5rem;
  background: ${(props) => (props.active ? '#667eea' : 'transparent')};
  color: ${(props) => (props.active ? 'white' : '#9ca3af')};
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: ${(props) => (props.active ? '#5568d3' : '#374151')};
    color: ${(props) => (props.active ? 'white' : '#f3f4f6')};
  }

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.75rem;
    gap: 0.25rem;
  }
`;

export const TabContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
  background: #0f172a;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #1f2937;
  }

  &::-webkit-scrollbar-thumb {
    background: #374151;
    border-radius: 4px;

    &:hover {
      background: #4b5563;
    }
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;
