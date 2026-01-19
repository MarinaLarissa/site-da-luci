/**
 * Styled components for HuntHistoryControls
 * Migrated from HuntHistoryControls.css
 */

import styled, { css } from 'styled-components';

export const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const ControlsSection = styled.div`
  padding: 1rem;
  background: #f9f9f9;
  border-radius: 8px;
  border: 1px solid #e0e0e0;

  ${({ $dangerZone }) =>
    $dangerZone &&
    css`
      background: #fff5f5;
      border-color: #ffcdd2;
    `}
`;

export const ControlsTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #333;
`;

export const ExportTypeSelector = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

export const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.95rem;

  span {
    color: #333;
  }

  input[type='radio'] {
    cursor: pointer;
    width: 18px;
    height: 18px;
  }
`;

export const InputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: 1.75rem;
  margin-top: 0.5rem;

  /* Responsive */
  @media (max-width: 600px) {
    margin-left: 0;
  }
`;

export const NumberInput = styled.input`
  width: 80px;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.95rem;
`;

export const InputHint = styled.span`
  font-size: 0.9rem;
  color: #666;
`;

export const DateRangeInputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-left: 1.75rem;
  margin-top: 0.5rem;

  /* Responsive */
  @media (max-width: 600px) {
    margin-left: 0;
  }
`;

export const InputLabel = styled.label`
  font-size: 0.9rem;
  color: #666;
  min-width: 80px;

  /* Responsive */
  @media (max-width: 600px) {
    min-width: 60px;
  }
`;

export const DateInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.95rem;
  flex: 1;
`;

const buttonBaseStyles = css`
  width: 100%;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const ExportButton = styled.button`
  ${buttonBaseStyles}
  background: #1976d2;
  color: white;

  &:hover {
    background: #1565c0;
    transform: translateY(-1px);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  }
`;

export const ClearAllButton = styled.button`
  ${buttonBaseStyles}
  background: #d32f2f;
  color: white;

  &:hover {
    background: #c62828;
    transform: translateY(-1px);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  }
`;

export const WarningText = styled.p`
  margin-top: 0.75rem;
  font-size: 0.85rem;
  color: #d32f2f;
  text-align: center;
`;
