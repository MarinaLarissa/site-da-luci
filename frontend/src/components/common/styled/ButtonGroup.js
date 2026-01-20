/**
 * Shared ButtonGroup Component
 * Phase 4 ETAPA 35 - Consolidates duplicate button group implementations
 */

import styled from 'styled-components';

/**
 * ButtonGroup Component
 * Container for multiple buttons with consistent spacing
 * Props:
 *   - $gap: Gap between buttons (default: theme.spacing.md)
 *   - $justify: Justify content (default: flex-start)
 *   - $marginTop: Top margin (default: theme.spacing.lg)
 *   - $fullWidthMobile: Make buttons full width on mobile (default: true)
 */
export const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme, $gap }) => $gap || theme.spacing.md};
  justify-content: ${({ $justify }) => $justify || 'flex-start'};
  margin-top: ${({ theme, $marginTop }) => $marginTop || theme.spacing.lg};

  /* Responsive */
  @media (max-width: 768px) {
    ${({ $fullWidthMobile = true }) => $fullWidthMobile ? `
      flex-direction: column;

      /* Make child buttons full width */
      > button {
        width: 100%;
      }
    ` : ''}
  }
`;

export default ButtonGroup;
