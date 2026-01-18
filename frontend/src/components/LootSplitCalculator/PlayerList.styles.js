/**
 * Styled components for PlayerList
 * Migrated from PlayerList.css
 */

import styled from 'styled-components';

export const PlayerListContainer = styled.div`
  margin-top: 24px;
`;

export const ListTitle = styled.h2`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.accent.gold};
  margin: 0 0 16px 0;
  font-weight: 600;
`;

export const PlayerCards = styled.div`
  display: grid;
  gap: 16px;
`;
