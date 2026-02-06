import styled from 'styled-components';

export const StatisticsContainer = styled.div`
  background: #111827;
  border-radius: 0.5rem;
  padding: 1.5rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const StatisticsHeader = styled.div`
  margin-bottom: 2rem;
`;

export const Title = styled.h3`
  margin: 0 0 0.5rem 0;
  color: #f3f4f6;
  font-size: 1.125rem;
  font-weight: 600;
`;

export const Subtitle = styled.p`
  margin: 0;
  color: #9ca3af;
  font-size: 0.875rem;
`;

export const StatisticsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

export const StatCard = styled.div`
  background: #1f2937;
  border-radius: 0.5rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    background: #374151;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const StatIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

export const StatLabel = styled.div`
  color: #9ca3af;
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const StatValue = styled.div`
  color: #f3f4f6;
  font-size: 2rem;
  font-weight: 700;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const StatUnit = styled.div`
  color: #6b7280;
  font-size: 0.75rem;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #6b7280;
  font-size: 0.875rem;
`;
