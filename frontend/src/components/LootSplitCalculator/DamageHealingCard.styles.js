/**
 * Styled components for DamageHealingCard
 * Migrated from DamageHealingCard.css
 */

import styled from 'styled-components';

export const CardContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.bg.secondary};
  border: 1px solid ${({ theme }) => theme.colors.accent.goldLight};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  text-align: left;

  &:hover {
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.colors.accent.gold};
  }
`;

export const PlayerNameHeader = styled.div`
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 0.75rem;
  color: ${({ theme }) => theme.colors.accent.gold};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const LeaderIndicator = styled.span`
  color: ${({ theme }) => theme.colors.accent.gold};
  font-size: 0.9rem;
`;

export const StatsRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.05);
  transition: background 0.2s ease;
  cursor: help;

  &:hover {
    background: ${({ theme }) => theme.colors.accent.goldLight};
  }
`;

export const StatIcon = styled.img`
  width: 20px;
  height: 20px;
  object-fit: contain;
  vertical-align: middle;
`;

export const StatLabel = styled.span`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  flex: 1;
`;

export const StatPercent = styled.span`
  font-weight: 600;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text.primary};
`;
