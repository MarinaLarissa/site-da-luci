/**
 * Shared Typography Components
 * Phase 4 ETAPA 33 - Consolidates duplicate title/text implementations
 */

import styled from 'styled-components';

/**
 * Section Title Component
 * Used for section headings throughout the app
 * Props:
 *   - $size: 'sm' (16px), 'md' (20px, default), 'lg' (24px)
 *   - $color: Custom color (defaults to theme.colors.accent.gold)
 *   - $weight: Font weight (default: 600)
 *   - $align: Text alignment (default: left)
 *   - $marginBottom: Bottom margin (default: 12px)
 */
export const SectionTitle = styled.h2`
  font-size: ${props => {
    const sizes = { sm: '16px', md: '20px', lg: '24px' };
    return sizes[props.$size] || sizes.md;
  }};
  font-weight: ${props => props.$weight || 600};
  color: ${({ theme, $color }) => $color || theme.colors.accent.gold};
  margin: 0;
  margin-bottom: ${props => props.$marginBottom || '12px'};
  text-align: ${props => props.$align || 'left'};
  font-family: ${({ theme }) => theme.fonts.base};

  /* Responsive */
  @media (max-width: 768px) {
    font-size: ${props => {
      const sizes = { sm: '14px', md: '18px', lg: '22px' };
      return sizes[props.$size] || sizes.md;
    }};
  }
`;

/**
 * Section Description Component
 * Used for section descriptions/subtitles
 * Props:
 *   - $size: 'sm' (13px), 'md' (14px, default), 'lg' (16px)
 *   - $color: Custom color (defaults to theme.colors.text.secondary)
 *   - $marginBottom: Bottom margin (default: 16px)
 *   - $italic: Italic text (default: false)
 */
export const SectionDescription = styled.p`
  font-size: ${props => {
    const sizes = { sm: '13px', md: '14px', lg: '16px' };
    return sizes[props.$size] || sizes.md;
  }};
  color: ${({ theme, $color }) => $color || theme.colors.text.secondary};
  margin: 0;
  margin-bottom: ${props => props.$marginBottom || '16px'};
  line-height: 1.5;
  font-style: ${props => props.$italic ? 'italic' : 'normal'};
  font-family: ${({ theme }) => theme.fonts.base};

  /* Responsive */
  @media (max-width: 768px) {
    font-size: ${props => {
      const sizes = { sm: '12px', md: '13px', lg: '15px' };
      return sizes[props.$size] || sizes.md;
    }};
  }
`;

/**
 * Page Title Component
 * Used for main page headings
 * Props:
 *   - $color: Custom color (defaults to theme.colors.text.primary)
 *   - $align: Text alignment (default: center)
 *   - $marginBottom: Bottom margin (default: 24px)
 *   - $gradient: Use gradient color (default: false)
 */
export const PageTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin: 0;
  margin-bottom: ${props => props.$marginBottom || '24px'};
  text-align: ${props => props.$align || 'center'};
  font-family: ${({ theme }) => theme.fonts.base};

  color: ${({ theme, $color, $gradient }) => {
    if ($gradient) {
      return 'transparent';
    }
    return $color || theme.colors.text.primary;
  }};

  ${props => props.$gradient && `
    background: ${props.theme.gradients.primary};
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  `}

  /* Responsive */
  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 16px;
  }
`;

/**
 * Page Description Component
 * Used for page-level descriptions/subtitles
 * Props:
 *   - $size: 'md' (16px), 'lg' (18px, default)
 *   - $color: Custom color (defaults to theme.colors.text.muted)
 *   - $align: Text alignment (default: center)
 *   - $marginBottom: Bottom margin (default: 32px)
 */
export const PageDescription = styled.p`
  font-size: ${props => props.$size === 'md' ? '16px' : '18px'};
  color: ${({ theme, $color }) => $color || theme.colors.text.muted};
  margin: 0;
  margin-bottom: ${props => props.$marginBottom || '32px'};
  line-height: 1.5;
  text-align: ${props => props.$align || 'center'};
  font-family: ${({ theme }) => theme.fonts.base};

  /* Responsive */
  @media (max-width: 768px) {
    font-size: 14px;
    margin-bottom: 16px;
  }
`;

export default { SectionTitle, SectionDescription, PageTitle, PageDescription };
