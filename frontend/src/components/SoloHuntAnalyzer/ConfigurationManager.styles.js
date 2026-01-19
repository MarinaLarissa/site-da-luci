/**
 * Styled components for ConfigurationManager
 * Migrated from ConfigurationManager.css
 * Following LootSplitCalculator color scheme
 */

import styled from 'styled-components';

export const ConfigurationManagerContainer = styled.div`
  background-color: #16213e;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  border: 1px solid rgba(195, 155, 211, 0.2);
`;

export const ConfigHeader = styled.div`
  h3 {
    font-size: 20px;
    font-weight: 600;
    color: #c39bd3;
    margin-bottom: 8px;
  }
`;

export const ConfigDescription = styled.p`
  font-size: 14px;
  color: #9e9e9e;
  margin-bottom: 16px;
`;

export const ConfigControls = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;

  /* Responsive */
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const ConfigLoadSection = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex: 1;
  min-width: 250px;

  /* Responsive */
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const ConfigSelect = styled.select`
  flex: 1;
  padding: 10px 12px;
  border: 2px solid rgba(195, 155, 211, 0.3);
  border-radius: 6px;
  font-size: 14px;
  background-color: #0f1620;
  color: #e0e0e0;
  transition: border-color 0.3s ease;
  cursor: pointer;

  &:hover {
    border-color: rgba(195, 155, 211, 0.5);
  }

  &:focus {
    outline: none;
    border-color: #c39bd3;
  }
`;

export const DangerButtonSmall = styled.button`
  padding: 8px 12px;
  background-color: rgba(244, 67, 54, 0.1);
  color: #f44336;
  border: 2px solid rgba(244, 67, 54, 0.3);
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(244, 67, 54, 0.2);
    border-color: rgba(244, 67, 54, 0.5);
  }
`;

export const SecondaryButtonSmall = styled.button`
  padding: 8px 12px;
  background-color: rgba(195, 155, 211, 0.1);
  color: #c39bd3;
  border: 2px solid rgba(195, 155, 211, 0.3);
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(195, 155, 211, 0.2);
    border-color: rgba(195, 155, 211, 0.5);
  }
`;

export const DangerButton = styled.button`
  padding: 10px 16px;
  background-color: rgba(244, 67, 54, 0.1);
  color: #f44336;
  border: 2px solid rgba(244, 67, 54, 0.3);
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(244, 67, 54, 0.2);
    border-color: rgba(244, 67, 54, 0.5);
    transform: translateY(-1px);
  }

  /* Responsive */
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const ConfigCount = styled.p`
  margin-top: 12px;
  font-size: 13px;
  color: #9e9e9e;
  font-style: italic;
`;

/* Save Modal Styles */
export const ConfigPreview = styled.div`
  margin: 16px 0;
  padding: 12px;
  background-color: rgba(195, 155, 211, 0.05);
  border-radius: 6px;
  border: 1px solid rgba(195, 155, 211, 0.2);
`;

export const PreviewLabel = styled.p`
  font-size: 13px;
  color: #9e9e9e;
  margin-bottom: 8px;
  font-weight: 600;
`;

export const PreviewList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    font-size: 14px;
    color: #e0e0e0;
    padding: 4px 0;
  }
`;
