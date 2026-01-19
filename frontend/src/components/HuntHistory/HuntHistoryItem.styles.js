/**
 * Styled components for HuntHistoryItem
 * Migrated from HuntHistoryItem.css
 */

import styled from 'styled-components';

export const HuntItemContainer = styled.div`
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 0.75rem;
  overflow: hidden;
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }
`;

export const HuntItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  cursor: pointer;
  background: #fafafa;
  transition: background 0.2s ease;

  &:hover {
    background: #f0f0f0;
  }
`;

export const HuntItemMain = styled.div`
  flex: 1;
  display: flex;
  gap: 1.5rem;
  align-items: center;

  /* Responsive */
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

export const HuntDate = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

export const DateText = styled.span`
  font-weight: 600;
  font-size: 0.95rem;
  color: #333;
`;

export const TimeText = styled.span`
  font-size: 0.85rem;
  color: #666;
`;

export const HuntSummary = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  /* Responsive */
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

export const TotalBalance = styled.span`
  font-weight: 600;
  font-size: 1.1rem;
  color: #4caf50;
`;

export const Duration = styled.span`
  font-size: 0.9rem;
  color: #666;
  padding: 0.25rem 0.5rem;
  background: #e3f2fd;
  border-radius: 4px;
`;

export const HuntItemActions = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const buttonBaseStyles = `
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  transition: background 0.2s ease;
`;

export const DeleteButton = styled.button`
  ${buttonBaseStyles}

  &:hover {
    background: #ffebee;
  }
`;

export const ExpandButton = styled.button`
  ${buttonBaseStyles}

  &:hover {
    background: #e3f2fd;
  }
`;

export const HuntItemDetails = styled.div`
  padding: 1rem;
  background: #ffffff;
  border-top: 1px solid #e0e0e0;
`;

export const DetailsSection = styled.div`
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const DetailsTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #1976d2;
`;

export const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 0.75rem;

  /* Responsive */
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const DetailLabel = styled.span`
  font-size: 0.85rem;
  color: #666;
`;

export const DetailValue = styled.span`
  font-weight: 600;
  font-size: 1rem;
  color: #333;
`;

export const PlayersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const PlayerDetailCard = styled.div`
  padding: 0.75rem;
  background: #f9f9f9;
  border-radius: 6px;
  border: 1px solid #e8e8e8;
`;

export const PlayerName = styled.div`
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: #1976d2;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const LeaderBadge = styled.span`
  font-size: 0.9rem;
`;

export const PlayerStatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 0.5rem;

  /* Responsive */
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const PlayerStat = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding: 0.5rem;
  background: #ffffff;
  border-radius: 4px;
  cursor: help;
  transition: background 0.2s ease;

  &:hover {
    background: #e3f2fd;
  }
`;

export const StatLabel = styled.span`
  font-size: 0.8rem;
  color: #666;
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

export const StatIconInline = styled.img`
  width: 16px;
  height: 16px;
  object-fit: contain;
  vertical-align: middle;
`;

export const StatValue = styled.span`
  font-weight: 600;
  font-size: 0.95rem;
  color: #9e9e9e;
`;
