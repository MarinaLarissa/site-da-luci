import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

export const ModalContainer = styled.div`
  background: #1f2937;
  border-radius: 0.75rem;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #374151;
`;

export const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #f3f4f6;
  margin: 0;
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: #9ca3af;
  font-size: 2rem;
  cursor: pointer;
  padding: 0;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
  transition: all 0.2s;

  &:hover {
    background: #374151;
    color: #f3f4f6;
  }
`;

export const ModalContent = styled.div`
  padding: 1.5rem;
  overflow-y: auto;
  flex: 1;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #111827;
  }

  &::-webkit-scrollbar-thumb {
    background: #4b5563;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #6b7280;
  }
`;

export const ActionInfo = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: rgba(102, 126, 234, 0.1);
  border: 1px solid rgba(102, 126, 234, 0.3);
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
`;

export const ActionIcon = styled.div`
  font-size: 2rem;
`;

export const ActionText = styled.div`
  flex: 1;

  strong {
    color: #a5b4fc;
    font-size: 0.875rem;
    display: block;
    margin-bottom: 0.25rem;
  }

  p {
    color: #d1d5db;
    font-size: 0.8125rem;
    margin: 0;
    font-style: italic;
  }
`;

export const LowConfidenceWarning = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: rgba(245, 158, 11, 0.1);
  border: 1px solid rgba(245, 158, 11, 0.3);
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;

  span {
    font-size: 1.5rem;
  }

  div {
    flex: 1;
  }

  strong {
    color: #fbbf24;
    display: block;
    margin-bottom: 0.25rem;
    font-size: 0.875rem;
  }

  p {
    color: #d1d5db;
    font-size: 0.8125rem;
    margin: 0;
  }
`;

export const NoCreaturesWarning = styled.div`
  display: flex;
  gap: 1rem;
  padding: 2rem;
  background: rgba(107, 114, 128, 0.1);
  border: 1px solid #374151;
  border-radius: 0.5rem;
  text-align: center;
  justify-content: center;

  span {
    font-size: 2rem;
  }

  div {
    flex: 1;
  }

  strong {
    color: #9ca3af;
    display: block;
    margin-bottom: 0.5rem;
  }

  p {
    color: #6b7280;
    font-size: 0.875rem;
    margin: 0;
  }
`;

export const CreatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const CreatureItem = styled.div`
  background: #111827;
  border: 1px solid #374151;
  border-radius: 0.5rem;
  overflow: hidden;
  transition: all 0.2s;

  &:hover {
    border-color: #4b5563;
  }
`;

export const CreatureInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  position: relative;
`;

export const CreatureImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 0.375rem;
  background: #374151;
`;

export const CreatureDetails = styled.div`
  flex: 1;
  min-width: 0;
`;

export const CreatureName = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #f3f4f6;
  margin: 0 0 0.5rem 0;
`;

export const ConfidenceBar = styled.div`
  width: 100%;
  height: 6px;
  background: #374151;
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 0.25rem;
`;

export const ConfidenceBarFill = styled.div`
  height: 100%;
  background: ${(props) => {
    if (props.$confidence >= 0.9) return '#10b981'; // Green
    if (props.$confidence >= 0.75) return '#f59e0b'; // Yellow
    return '#ef4444'; // Red
  }};
  width: ${(props) => props.$confidence * 100}%;
  transition: width 0.3s ease;
`;

export const ConfidenceText = styled.p`
  font-size: 0.75rem;
  color: ${(props) => {
    if (props.$confidence >= 0.9) return '#10b981';
    if (props.$confidence >= 0.75) return '#f59e0b';
    return '#ef4444';
  }};
  margin: 0;
`;

export const KillCountBadge = styled.div`
  padding: 0.375rem 0.75rem;
  background: #667eea;
  border-radius: 0.375rem;
  color: #fff;
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
`;

export const RemoveButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 1.5rem;
  height: 1.5rem;
  background: #374151;
  border: none;
  border-radius: 0.25rem;
  color: #9ca3af;
  font-size: 1.25rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background: #ef4444;
    color: #fff;
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  padding: 1.5rem;
  border-top: 1px solid #374151;
`;

export const FooterButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  ${(props) => {
    if (props.$variant === 'primary') {
      return `
        background: #667eea;
        color: #fff;

        &:hover:not(:disabled) {
          background: #5568d3;
        }
      `;
    }
    return `
      background: #374151;
      color: #d1d5db;

      &:hover:not(:disabled) {
        background: #4b5563;
      }
    `;
  }}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }
`;
