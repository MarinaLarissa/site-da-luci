import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;
  animation: fadeIn 0.2s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const ModalContent = styled.div`
  background: #1f2937;
  border-radius: 16px;
  padding: 2rem;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  animation: slideUp 0.3s ease-out;

  @keyframes slideUp {
    from {
      transform: translateY(30px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @media (max-width: 640px) {
    padding: 1.5rem;
    max-height: 95vh;
  }
`;

export const ModalHeader = styled.div`
  margin-bottom: 1.5rem;
`;

export const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #f3f4f6;
  margin: 0 0 0.5rem 0;
`;

export const ModalDescription = styled.p`
  font-size: 0.875rem;
  color: #9ca3af;
  margin: 0;
`;

export const PreviewContainer = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
  border-radius: 12px;
  overflow: hidden;
  background: #111827;
  border: 2px solid #374151;
`;

export const PreviewImage = styled.img`
  display: block;
  width: 100%;
  height: auto;
  max-height: 500px;
  object-fit: contain;

  @media (max-width: 640px) {
    max-height: 300px;
  }
`;

export const CropOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
`;

export const CropRegion = styled.div`
  position: absolute;
  border: 3px solid #10b981;
  box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5);

  &::before {
    content: '🔍 OCR Area';
    position: absolute;
    top: -32px;
    left: 0;
    background: #10b981;
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 600;
    white-space: nowrap;
  }
`;

export const InfoBox = styled.div`
  background: #111827;
  border: 1px solid #374151;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  display: flex;
  gap: 1rem;
  align-items: flex-start;

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

export const InfoItem = styled.div`
  flex: 1;
`;

export const InfoLabel = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.25rem;
`;

export const InfoValue = styled.div`
  font-size: 0.875rem;
  color: #f3f4f6;
  font-weight: 600;
`;

export const ActionsRow = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;

  @media (max-width: 640px) {
    flex-direction: column-reverse;
  }
`;

export const ActionButton = styled.button`
  padding: 0.875rem 1.75rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  min-width: 140px;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 640px) {
    min-width: 100%;
  }
`;

export const ConfirmButton = styled(ActionButton)`
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

export const CancelButton = styled(ActionButton)`
  background: #374151;
  color: #f3f4f6;

  &:hover:not(:disabled) {
    background: #4b5563;
  }
`;
