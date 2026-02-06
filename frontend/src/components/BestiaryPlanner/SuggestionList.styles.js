import styled from 'styled-components';

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
  gap: 1rem;
`;

export const ListTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const ResultsCount = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text.muted};
  background-color: ${({ theme }) => theme.colors.bg.card};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radius.full};
  border: 1px solid ${({ theme }) => theme.colors.bg.secondary};
`;

export const CreatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.sm};
  width: 100%;

  /* Large screens - 5 columns */
  @media (min-width: 1600px) {
    grid-template-columns: repeat(5, 1fr);
  }

  /* Extra large screens - 6 columns */
  @media (min-width: 1920px) {
    grid-template-columns: repeat(6, 1fr);
  }

  /* Medium screens - 4 columns */
  @media (min-width: 1200px) and (max-width: 1599px) {
    grid-template-columns: repeat(4, 1fr);
  }

  /* Tablets - 2 columns */
  @media (min-width: 769px) and (max-width: 1199px) {
    grid-template-columns: repeat(2, 1fr);
  }

  /* Mobile - 1 column */
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl};
  background-color: ${({ theme }) => theme.colors.bg.card};
  border-radius: ${({ theme }) => theme.radius.lg};
  border: 1px solid ${({ theme }) => theme.colors.bg.secondary};
`;

export const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  opacity: 0.5;
`;

export const EmptyTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const EmptyText = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.875rem;
`;

export const ViewToggle = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
  background-color: ${({ theme }) => theme.colors.bg.card};
  padding: 4px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.bg.secondary};
`;

export const ViewButton = styled.button`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.accent.primary : 'transparent'};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.bg.primary : theme.colors.text.secondary};
  border: none;
  border-radius: ${({ theme }) => theme.radius.sm};
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ $active, theme }) =>
      $active ? theme.colors.accent.primary : theme.colors.bg.hover};
  }
`;

export const LoadMoreButton = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.bg.card};
  border: 1px solid ${({ theme }) => theme.colors.bg.secondary};
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent.primary};
    background-color: ${({ theme }) => theme.colors.bg.hover};
  }
`;
