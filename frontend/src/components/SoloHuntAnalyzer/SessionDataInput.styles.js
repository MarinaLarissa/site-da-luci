/**
 * Styled components for SessionDataInput
 * Migrated from SessionDataInput.css
 * Following LootSplitCalculator/InputSection color scheme
 */

import styled from 'styled-components';

export const SessionDataInputContainer = styled.div`
  background-color: #16213e;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid rgba(195, 155, 211, 0.2);
  margin-bottom: 24px;

  /* Responsive */
  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 24px;
  color: #c39bd3;
  margin: 0 0 8px 0;
  font-weight: 600;
`;

export const SectionDescription = styled.p`
  color: #9e9e9e;
  font-size: 14px;
  margin: 0 0 20px 0;
`;

export const SessionTextarea = styled.textarea`
  width: 100%;
  padding: 16px;
  background-color: #0f1620;
  border: 2px solid rgba(195, 155, 211, 0.3);
  border-radius: 8px;
  color: #e0e0e0;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  resize: none;
  transition: border-color 0.3s ease;
  margin-bottom: 16px;

  &:focus {
    outline: none;
    border-color: #c39bd3;
  }

  &::placeholder {
    color: #616161;
  }
`;

export const InputActions = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 16px;

  /* Responsive */
  @media (max-width: 768px) {
    flex-direction: column;

    /* Target Button components inside */
    > button {
      width: 100%;
    }
  }
`;

export const ParsedSessionInfo = styled.div`
  background-color: rgba(195, 155, 211, 0.1);
  border: 1px solid rgba(195, 155, 211, 0.3);
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
`;

export const ParsedSessionTitle = styled.h3`
  color: #c39bd3;
  margin-bottom: 12px;
  font-size: 18px;
  font-weight: 600;
`;

export const SessionSummary = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;

  /* Responsive */
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const SummaryItem = styled.p`
  margin: 4px 0;
  color: #e0e0e0;
  font-size: 14px;

  strong {
    color: #c39bd3;
  }
`;
