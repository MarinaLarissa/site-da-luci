/**
 * Styled components for PlayerCard
 * Migrated from PlayerCard.css
 */

import styled from 'styled-components';

export const PlayerCardContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.bg.card};
  padding: 16px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.accent.goldLight};
  transition: transform 0.2s ease;
  text-align: left;

  &:hover {
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.colors.accent.gold};
  }
`;

export const PlayerCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  flex-wrap: wrap;
  gap: 8px;
`;

export const PlayerCardName = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const PlayerCardLeaderBadge = styled.span`
  font-size: 14px;
  background-color: ${({ theme }) => theme.colors.accent.goldLight};
  color: ${({ theme }) => theme.colors.accent.gold};
  padding: 4px 8px;
  border-radius: ${({ theme }) => theme.radius.sm};
  font-weight: 500;
`;

export const PlayerCardRole = styled.span`
  font-size: 14px;
  font-weight: 500;
`;

export const PlayerCardStats = styled.div`
  display: grid;
  gap: 8px;
`;

export const PlayerCardStat = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const PlayerCardStatLabel = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 14px;
`;

export const PlayerCardStatValue = styled.span`
  color: ${({ theme, $variant }) => {
    if ($variant === 'positive') return theme.colors.success;
    if ($variant === 'negative') return theme.colors.error;
    return theme.colors.text.primary;
  }};
  font-size: 14px;
  font-weight: 600;
`;
