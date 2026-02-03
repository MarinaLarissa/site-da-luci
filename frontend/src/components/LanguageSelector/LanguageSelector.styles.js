/**
 * Styled components for LanguageSelector
 * Migrated from LanguageSelector.css
 */

import styled from 'styled-components';

export const LanguageSelectorButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.5);
    background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
  }

  &:active {
    transform: translateY(0);
  }

  /* Responsive */
  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 13px;
  }
`;

export const LanguageSelectorFlagIcon = styled.span`
  font-size: 18px;
  line-height: 1;

  /* Responsive */
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const LanguageSelectorLangCode = styled.span`
  font-size: 13px;
  letter-spacing: 0.5px;

  /* Responsive */
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;
