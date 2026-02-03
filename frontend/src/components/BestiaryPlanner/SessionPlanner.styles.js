import styled from 'styled-components';

export const PlannerPanel = styled.div`
  background-color: ${({ theme }) => theme.colors.bg.card};
  border: 1px solid ${({ theme }) => theme.colors.bg.secondary};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  height: fit-content;
  position: sticky;
  top: ${({ theme }) => theme.spacing.lg};
`;

export const PlannerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  border-bottom: 1px solid ${({ theme }) => theme.colors.bg.secondary};
`;

export const PlannerTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const PlannerActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const ClearButton = styled.button`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.bg.secondary};
  border-radius: ${({ theme }) => theme.radius.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.bg.hover};
    border-color: #ef4444;
    color: #ef4444;
  }
`;

export const PlannerList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  max-height: 400px;
  overflow-y: auto;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.bg.hover};
    border-radius: ${({ theme }) => theme.radius.sm};
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.bg.secondary};
    border-radius: ${({ theme }) => theme.radius.sm};

    &:hover {
      background: ${({ theme }) => theme.colors.accent.primary};
    }
  }
`;

export const PlannerItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.bg.hover};
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid ${({ theme }) => theme.colors.bg.secondary};
  transition: all 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent.primary};
    background-color: ${({ theme }) => theme.colors.bg.secondary};
  }
`;

export const CreatureInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  flex: 1;
`;

export const CreatureName = styled.span`
  font-weight: 600;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const CreatureStats = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.text.muted};
`;

export const RemoveButton = styled.button`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.bg.secondary};
  border-radius: ${({ theme }) => theme.radius.sm};
  color: ${({ theme }) => theme.colors.text.muted};
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #ef444420;
    border-color: #ef4444;
    color: #ef4444;
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
`;

export const EmptyIcon = styled.div`
  font-size: 3rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  opacity: 0.5;
`;

export const EmptyText = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text.muted};
  line-height: 1.6;
`;

export const StatsFooter = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.sm};
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.bg.secondary};
`;

export const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const StatLabel = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.text.muted};
  text-align: center;
`;

export const StatValue = styled.span`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.accent.primary};
`;
