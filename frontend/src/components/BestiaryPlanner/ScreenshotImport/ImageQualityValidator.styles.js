import styled from 'styled-components';

export const ValidatorContainer = styled.div`
  background: #1f2937;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  border: 2px solid ${props => props.$passed ? '#10b981' : '#f59e0b'};
`;

export const ValidatorHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export const ValidatorTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #f3f4f6;
  margin: 0;
`;

export const OverallScore = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => {
    if (props.$score >= 80) return '#10b981';
    if (props.$score >= 60) return '#f59e0b';
    return '#ef4444';
  }};
`;

export const ChecksList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
`;

export const CheckItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  background: #111827;
  border-radius: 8px;
  border-left: 3px solid ${props => props.$passed ? '#10b981' : '#ef4444'};
`;

export const CheckInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
`;

export const CheckName = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  color: #f3f4f6;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const CheckStatus = styled.span`
  font-size: 0.75rem;
  color: ${props => props.$passed ? '#10b981' : '#ef4444'};
  font-weight: 600;
`;

export const CheckMessage = styled.div`
  font-size: 0.75rem;
  color: #9ca3af;
`;

export const CheckScore = styled.div`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${props => {
    if (props.$score >= 80) return '#10b981';
    if (props.$score >= 60) return '#f59e0b';
    return '#ef4444';
  }};
  min-width: 3.5rem;
  text-align: right;
`;

export const SuggestionsList = styled.div`
  background: #1f2937;
  border: 1px solid #374151;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;
`;

export const SuggestionsTitle = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: #f59e0b;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '💡';
  }
`;

export const Suggestion = styled.div`
  font-size: 0.8125rem;
  color: #d1d5db;
  padding: 0.5rem 0;
  padding-left: 1.5rem;
  position: relative;

  &::before {
    content: '•';
    position: absolute;
    left: 0.5rem;
    color: #f59e0b;
  }

  &:not(:last-child) {
    border-bottom: 1px solid #374151;
  }
`;

export const ActionsRow = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

export const ActionButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  min-width: 150px;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 640px) {
    min-width: 100%;
  }
`;

export const ProceedButton = styled(ActionButton)`
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
  }
`;

export const RetakeButton = styled(ActionButton)`
  background: #374151;
  color: #f3f4f6;

  &:hover:not(:disabled) {
    background: #4b5563;
  }
`;

export const AnalyzingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #9ca3af;
  font-size: 0.875rem;

  &::after {
    content: '...';
    animation: dots 1.5s steps(4, end) infinite;
  }

  @keyframes dots {
    0%, 20% {
      content: '';
    }
    40% {
      content: '.';
    }
    60% {
      content: '..';
    }
    80%, 100% {
      content: '...';
    }
  }
`;
