import styled from 'styled-components';

export const ChartContainer = styled.div`
  background: #111827;
  border-radius: 0.5rem;
  padding: 1.5rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const ChartTitle = styled.h3`
  margin: 0;
  color: #f3f4f6;
  font-size: 1.125rem;
  font-weight: 600;
`;

export const PeriodTabs = styled.div`
  display: flex;
  gap: 0.5rem;
  background: #1f2937;
  padding: 0.25rem;
  border-radius: 0.375rem;

  @media (max-width: 768px) {
    width: 100%;
    overflow-x: auto;
  }
`;

export const PeriodTab = styled.button`
  padding: 0.5rem 1rem;
  background: ${(props) => (props.active ? '#667eea' : 'transparent')};
  color: ${(props) => (props.active ? 'white' : '#9ca3af')};
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) => (props.active ? '#5568d3' : '#374151')};
  }

  @media (max-width: 768px) {
    padding: 0.375rem 0.75rem;
    font-size: 0.75rem;
  }
`;

export const ChartFooter = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #374151;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

export const Stat = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const StatLabel = styled.div`
  color: #9ca3af;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const StatValue = styled.div`
  color: #f3f4f6;
  font-size: 1.25rem;
  font-weight: 700;
`;

export const LoadingSpinner = styled.div`
  text-align: center;
  padding: 3rem;
  color: #9ca3af;
  font-size: 0.875rem;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #6b7280;
  font-size: 0.875rem;
`;
