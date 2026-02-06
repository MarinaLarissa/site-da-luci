import styled from 'styled-components';

export const TimelineContainer = styled.div`
  background: #111827;
  border-radius: 0.5rem;
  padding: 1.5rem;
  max-height: 600px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #1f2937;
    border-radius: 4px;
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

export const TimelineHeader = styled.div`
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #374151;
`;

export const Title = styled.h3`
  margin: 0;
  color: #f3f4f6;
  font-size: 1.125rem;
  font-weight: 600;
`;

export const TimelineList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const DateGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const DateHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #374151;
`;

export const DateLabel = styled.div`
  color: #f3f4f6;
  font-size: 0.875rem;
  font-weight: 600;
`;

export const DateStats = styled.div`
  color: #9ca3af;
  font-size: 0.75rem;
`;

export const CompletionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-left: 1rem;
  border-left: 2px solid #374151;
`;

export const CompletionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: #1f2937;
  border-radius: 0.375rem;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    background: #374151;
  }
`;

export const CompletionDot = styled.div`
  width: 10px;
  height: 10px;
  background: #667eea;
  border-radius: 50%;
  flex-shrink: 0;
  position: absolute;
  left: -1.5625rem;
`;

export const CompletionContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const CreatureName = styled.div`
  color: #f3f4f6;
  font-size: 0.875rem;
  font-weight: 500;
`;

export const CompletionMeta = styled.div`
  color: #9ca3af;
  font-size: 0.75rem;
`;

export const CharmPointsBadge = styled.div`
  background: #667eea;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
`;

export const LoadMoreButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  margin-top: 1rem;
  background: #1f2937;
  color: #9ca3af;
  border: 1px solid #374151;
  border-radius: 0.375rem;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: #374151;
    color: #f3f4f6;
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #6b7280;
  font-size: 0.875rem;
`;
