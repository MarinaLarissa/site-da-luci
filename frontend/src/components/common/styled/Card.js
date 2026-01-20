/**
 * Shared Card Component
 * Phase 4 ETAPA 34 - Consolidates duplicate card/container implementations
 */

import styled from 'styled-components';

/**
 * Card Component
 * Reusable card container with variants
 * Props:
 *   - $variant: 'default', 'elevated', 'outlined' (default: 'default')
 *   - $padding: Custom padding (default: theme.spacing.xl)
 *   - $radius: Border radius (default: theme.radius.lg)
 *   - $marginBottom: Bottom margin (default: theme.spacing.xl)
 *   - $background: Custom background (default: theme.colors.bg.card)
 *   - $hover: Enable hover effect (default: false)
 */
export const Card = styled.div`
  background-color: ${({ theme, $background }) => $background || theme.colors.bg.card};
  padding: ${({ theme, $padding }) => $padding || theme.spacing.xl};
  border-radius: ${({ theme, $radius }) => $radius || theme.radius.lg};
  margin-bottom: ${({ theme, $marginBottom }) => $marginBottom || theme.spacing.xl};

  /* Variant: default (subtle border) */
  ${({ $variant, theme }) => $variant === 'default' || !$variant ? `
    border: 1px solid ${theme.colors.border.light};
  ` : ''}

  /* Variant: elevated (box shadow) */
  ${({ $variant }) => $variant === 'elevated' ? `
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    border: none;
  ` : ''}

  /* Variant: outlined (strong border, no background) */
  ${({ $variant, theme }) => $variant === 'outlined' ? `
    border: 2px solid ${theme.colors.accent.goldLight};
    background-color: transparent;
  ` : ''}

  /* Hover effect */
  ${({ $hover, theme }) => $hover ? `
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
      border-color: ${theme.colors.accent.primary};
    }
  ` : ''}

  /* Responsive */
  @media (max-width: 768px) {
    padding: ${({ theme, $padding }) => $padding || theme.spacing.lg};
    margin-bottom: ${({ theme, $marginBottom }) => $marginBottom || theme.spacing.lg};
  }
`;

/**
 * CardHeader Component
 * Header section for cards with optional actions
 * Props:
 *   - $marginBottom: Bottom margin (default: 16px)
 *   - $justify: Justify content (default: space-between)
 */
export const CardHeader = styled.div`
  display: flex;
  justify-content: ${({ $justify }) => $justify || 'space-between'};
  align-items: center;
  margin-bottom: ${({ $marginBottom }) => $marginBottom || '16px'};
  padding-bottom: ${({ $marginBottom }) => $marginBottom || '16px'};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};

  /* Responsive */
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;

/**
 * CardBody Component
 * Main content area for cards
 * Props:
 *   - $padding: Custom padding (default: 0)
 */
export const CardBody = styled.div`
  padding: ${({ $padding }) => $padding || '0'};
`;

/**
 * CardFooter Component
 * Footer section for cards with actions
 * Props:
 *   - $marginTop: Top margin (default: 16px)
 *   - $justify: Justify content (default: flex-end)
 */
export const CardFooter = styled.div`
  display: flex;
  justify-content: ${({ $justify }) => $justify || 'flex-end'};
  align-items: center;
  gap: 12px;
  margin-top: ${({ $marginTop }) => $marginTop || '16px'};
  padding-top: ${({ $marginTop }) => $marginTop || '16px'};
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};

  /* Responsive */
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }
`;

export default { Card, CardHeader, CardBody, CardFooter };
