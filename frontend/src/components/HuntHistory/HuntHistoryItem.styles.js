/**
 * Styled components for HuntHistoryItem
 * Migrated from HuntHistoryItem.css
 */

import styled from 'styled-components';

export const HuntHistoryItemContainer = styled.div`
  background: #16213e;
  border: 1px solid rgba(195, 155, 211, 0.2);
  border-radius: 8px;
  margin-bottom: 0.75rem;
  overflow: hidden;
  transition: box-shadow 0.2s ease, border-color 0.2s ease;

  &:hover {
    box-shadow: 0 2px 8px rgba(195, 155, 211, 0.15);
    border-color: rgba(195, 155, 211, 0.4);
  }
`;

export const HuntHistoryItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  cursor: pointer;
  background: rgba(195, 155, 211, 0.05);
  transition: background 0.2s ease;

  &:hover {
    background: rgba(195, 155, 211, 0.1);
  }
`;

export const HuntHistoryItemMain = styled.div`
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

export const HuntHistoryItemDate = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

export const HuntHistoryItemDateText = styled.span`
  font-weight: 600;
  font-size: 0.95rem;
  color: #e0e0e0;
`;

export const HuntHistoryItemTimeText = styled.span`
  font-size: 0.85rem;
  color: #9e9e9e;
`;

export const HuntHistoryItemSummary = styled.div`
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

export const HuntHistoryItemTotalBalance = styled.span`
  font-weight: 600;
  font-size: 1.1rem;
  color: #4caf50;
`;

export const HuntHistoryItemDuration = styled.span`
  font-size: 0.9rem;
  color: #e0e0e0;
  padding: 0.25rem 0.5rem;
  background: rgba(195, 155, 211, 0.15);
  border-radius: 4px;
`;

export const HuntHistoryItemActions = styled.div`
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

export const HuntHistoryItemDeleteButton = styled.button`
  ${buttonBaseStyles}
  color: #f44336;

  &:hover {
    background: rgba(244, 67, 54, 0.1);
  }
`;

export const HuntHistoryItemExpandButton = styled.button`
  ${buttonBaseStyles}
  color: #c39bd3;

  &:hover {
    background: rgba(195, 155, 211, 0.1);
  }
`;

export const HuntHistoryItemDetails = styled.div`
  padding: 1rem;
  background: #0f1620;
  border-top: 1px solid rgba(195, 155, 211, 0.2);
`;

export const HuntHistoryItemDetailsSection = styled.div`
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const HuntHistoryItemDetailsTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #c39bd3;
`;

export const HuntHistoryItemDetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 0.75rem;

  /* Responsive */
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const HuntHistoryItemDetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const HuntHistoryItemDetailLabel = styled.span`
  font-size: 0.85rem;
  color: #9e9e9e;
`;

export const HuntHistoryItemDetailValue = styled.span`
  font-weight: 600;
  font-size: 1rem;
  color: #e0e0e0;
`;

export const HuntHistoryItemPlayersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const HuntHistoryItemPlayerDetailCard = styled.div`
  padding: 0.75rem;
  background: rgba(195, 155, 211, 0.05);
  border-radius: 6px;
  border: 1px solid rgba(195, 155, 211, 0.2);
`;

export const HuntHistoryItemPlayerName = styled.div`
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: #c39bd3;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const HuntHistoryItemLeaderBadge = styled.span`
  font-size: 0.9rem;
`;

export const HuntHistoryItemPlayerStatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 0.5rem;

  /* Responsive */
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const HuntHistoryItemPlayerStat = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding: 0.5rem;
  background: rgba(15, 22, 32, 0.5);
  border-radius: 4px;
  cursor: help;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(195, 155, 211, 0.1);
  }
`;

export const HuntHistoryItemStatLabel = styled.span`
  font-size: 0.8rem;
  color: #9e9e9e;
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

export const HuntHistoryItemStatIconInline = styled.img`
  width: 16px;
  height: 16px;
  object-fit: contain;
  vertical-align: middle;
`;

export const HuntHistoryItemStatValue = styled.span`
  font-weight: 600;
  font-size: 0.95rem;
  color: #9e9e9e;
`;
