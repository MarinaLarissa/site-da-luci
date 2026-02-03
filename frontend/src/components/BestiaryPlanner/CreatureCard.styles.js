import styled from 'styled-components';

export const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.bg.card};
  border: 1px solid ${({ theme }) => theme.colors.bg.secondary};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: ${({ theme }) => theme.spacing.lg};
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent.primary};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
  }

  ${({ $completed, theme }) =>
    $completed &&
    `
    opacity: 0.6;
    border-color: ${theme.colors.success};

    &:hover {
      opacity: 0.8;
    }
  `}
`;

export const CompletedBadge = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing.sm};
  right: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.success};
  color: ${({ theme }) => theme.colors.bg.primary};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radius.full};
  font-size: 0.75rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const CardTop = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const CreatureImage = styled.img`
  width: 64px;
  height: 64px;
  object-fit: contain;
  background-color: ${({ theme }) => theme.colors.bg.secondary};
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid ${({ theme }) => theme.colors.bg.secondary};
  padding: ${({ theme }) => theme.spacing.xs};
  flex-shrink: 0;

  &[src=''] {
    display: none;
  }
`;

export const CreatureInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const CreatureName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
  flex: 1;
`;

export const CharmPointsBadge = styled.div`
  background: ${({ theme }) => theme.gradients.primary};
  color: ${({ theme }) => theme.colors.bg.primary};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radius.full};
  font-size: 0.875rem;
  font-weight: 700;
  white-space: nowrap;
  margin-left: ${({ theme }) => theme.spacing.sm};
`;

export const StatsRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
`;

export const Stat = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const StatIcon = styled.span`
  font-size: 1rem;
`;

export const DifficultyBadge = styled.span`
  padding: 2px 8px;
  border-radius: ${({ theme }) => theme.radius.sm};
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  background-color: ${({ $difficulty, theme }) => {
    switch ($difficulty) {
      case 'EASY':
        return 'rgba(76, 175, 80, 0.2)';
      case 'MEDIUM':
        return 'rgba(255, 193, 7, 0.2)';
      case 'HARD':
        return 'rgba(244, 67, 54, 0.2)';
      default:
        return theme.colors.bg.secondary;
    }
  }};
  color: ${({ $difficulty, theme }) => {
    switch ($difficulty) {
      case 'EASY':
        return '#4caf50';
      case 'MEDIUM':
        return '#ffc107';
      case 'HARD':
        return '#f44336';
      default:
        return theme.colors.text.secondary;
    }
  }};
`;

export const LocationSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const LocationLabel = styled.div`
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: ${({ theme }) => theme.colors.text.muted};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const LocationList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const LocationChip = styled.span`
  padding: 4px 8px;
  background-color: ${({ theme }) => theme.colors.bg.secondary};
  border-radius: ${({ theme }) => theme.radius.sm};
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const EfficiencyScore = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.sm};
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid rgba(102, 126, 234, 0.2);
`;

export const EfficiencyLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: ${({ theme }) => theme.colors.text.muted};
`;

export const EfficiencyValue = styled.span`
  font-size: 1rem;
  font-weight: 700;
  background: ${({ theme }) => theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const RegionBadge = styled.span`
  padding: 4px 8px;
  background-color: ${({ theme }) => theme.colors.bg.secondary};
  border-radius: ${({ theme }) => theme.radius.sm};
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.accent.primary};
  font-weight: 600;
`;

export const PlanButton = styled.button`
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ $isInPlan, theme }) =>
    $isInPlan ? theme.colors.accent.primary : 'transparent'};
  border: 1px solid ${({ $isInPlan, theme }) =>
    $isInPlan ? theme.colors.accent.primary : theme.colors.bg.secondary};
  border-radius: ${({ theme }) => theme.radius.sm};
  color: ${({ $isInPlan, theme }) =>
    $isInPlan ? theme.colors.bg.primary : theme.colors.text.secondary};
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ $isInPlan, theme }) =>
      $isInPlan ? theme.colors.accent.secondary : theme.colors.bg.hover};
    border-color: ${({ theme }) => theme.colors.accent.primary};
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;
