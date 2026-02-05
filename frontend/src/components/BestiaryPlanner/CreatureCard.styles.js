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

export const StatusBadge = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing.sm};
  right: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ $color }) => $color || '#6b7280'};
  color: white;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radius.full};
  font-size: 0.75rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 60px;
  max-width: 120px;
  justify-content: center;
  white-space: nowrap;
  pointer-events: none; /* Prevent blocking clicks */
  z-index: 10;
`;

export const RapidBadge = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing.sm};
  left: ${({ theme }) => theme.spacing.sm};
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  color: white;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radius.full};
  font-size: 0.75rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
  box-shadow: 0 2px 8px rgba(245, 158, 11, 0.3);
  animation: pulse 2s ease-in-out infinite;
  white-space: nowrap;
  pointer-events: none; /* Prevent blocking clicks */
  z-index: 10;

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.8;
    }
  }
`;

export const CardTop = styled.div`
  display: grid;
  grid-template-columns: 64px 1fr;
  gap: ${({ theme }) => theme.spacing.md};

  /* Mobile: stack vertically */
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const CreatureImage = styled.img`
  width: 64px;
  height: 64px;
  object-fit: contain;
  background-color: ${({ theme }) => theme.colors.bg.secondary};
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid ${({ theme }) => theme.colors.bg.secondary};
  padding: ${({ theme }) => theme.spacing.xs};

  /* Grid positioning */
  grid-row: 1 / 2;
  grid-column: 1 / 2;

  &[src=''] {
    display: none;
  }

  /* Mobile: center */
  @media (max-width: 768px) {
    margin: 0 auto;
  }
`;

export const CreatureInfo = styled.div`
  /* Grid positioning - header info next to image */
  grid-row: 1 / 2;
  grid-column: 2 / 3;
  min-width: 0;

  /* Mobile: full width */
  @media (max-width: 768px) {
    grid-column: 1 / 2;
  }
`;

export const CardDetails = styled.div`
  /* Grid positioning - details span both columns below */
  grid-column: 1 / -1;

  /* Two column layout for details */
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};

  /* Mobile: single column */
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
  min-height: 32px;
`;

export const CreatureName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
  flex: 1;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  min-width: 0;
  padding-right: ${({ theme }) => theme.spacing.sm};
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
      case 'HARMLESS':
        return 'rgba(158, 158, 158, 0.2)';
      case 'TRIVIAL':
        return 'rgba(129, 199, 132, 0.2)';
      case 'EASY':
        return 'rgba(76, 175, 80, 0.2)';
      case 'MEDIUM':
        return 'rgba(255, 193, 7, 0.2)';
      case 'HARD':
        return 'rgba(255, 152, 0, 0.2)';
      case 'CHALLENGING':
        return 'rgba(244, 67, 54, 0.2)';
      default:
        return theme.colors.bg.secondary;
    }
  }};
  color: ${({ $difficulty, theme }) => {
    switch ($difficulty) {
      case 'HARMLESS':
        return '#9e9e9e';
      case 'TRIVIAL':
        return '#81c784';
      case 'EASY':
        return '#4caf50';
      case 'MEDIUM':
        return '#ffc107';
      case 'HARD':
        return '#ff9800';
      case 'CHALLENGING':
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

export const EditButton = styled.button`
  width: 28px;
  height: 28px;
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
    background-color: ${({ theme }) => theme.colors.bg.hover};
    border-color: ${({ theme }) => theme.colors.accent.primary};
    color: ${({ theme }) => theme.colors.accent.primary};
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const ResistancesRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
`;

export const ResistanceItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background-color: ${({ theme }) => theme.colors.bg.secondary};
  border-radius: ${({ theme }) => theme.radius.sm};
  font-size: 0.75rem;
`;

export const ResistanceIcon = styled.span`
  font-size: 1rem;
  line-height: 1;
`;

export const ResistanceValue = styled.span`
  font-weight: 600;
  color: ${({ $value, theme }) => {
    if ($value === 0) return '#f44336'; // Immune (0 damage) - RED
    if ($value > 100) return '#4caf50'; // Weak (takes more damage) - GREEN
    if ($value < 100) return '#ffc107'; // Resistant (takes less damage) - YELLOW
    return theme.colors.text.secondary; // Neutral (100%) - GRAY
  }};
`;

export const KillsSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.sm};
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid rgba(102, 126, 234, 0.1);
`;
