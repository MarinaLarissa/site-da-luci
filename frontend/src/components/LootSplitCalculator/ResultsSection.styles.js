/**
 * Styled components for ResultsSection
 * Migrated from ResultsSection.css
 */

import styled from 'styled-components';

export const ResultsContainer = styled.div`
  background-color: #16213e;
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.radius.lg};
  border: 1px solid ${({ theme }) => theme.colors.accent.goldLight};
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

export const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  /* Responsive */
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const SummaryCard = styled.div`
  background: linear-gradient(135deg, #0f1620 0%, #1a1a2e 100%);
  padding: 20px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid rgba(195, 155, 211, 0.3);
  text-align: center;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: ${({ theme }) => theme.colors.accent.gold};
  }
`;

export const SummaryLabel = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 14px;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-weight: 500;
`;

export const SummaryValue = styled.div`
  color: ${({ theme }) => theme.colors.accent.gold};
  font-size: 28px;
  font-weight: 700;
`;

export const DesktopLayout = styled.div`
  display: block;
  margin-top: ${({ theme }) => theme.spacing.xl};

  /* Responsive */
  @media (max-width: 768px) {
    display: none;
  }
`;

export const MobileLayout = styled.div`
  display: none;

  /* Responsive */
  @media (max-width: 768px) {
    display: block;
  }
`;

export const StatsSectionTitle = styled.h3`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.accent.gold};
  margin: 0 0 ${({ theme }) => theme.spacing.lg} 0;
  font-weight: 600;
`;
