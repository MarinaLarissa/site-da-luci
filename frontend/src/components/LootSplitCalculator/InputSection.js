/**
 * Input section for loot data
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Button from '../common/Button';
import {
  InputContainer,
  SectionTitle,
  SectionDescription,
  TextAreaStyled,
  ButtonGroup,
} from './InputSection.styles';

export default function InputSection({ input, setInput, onCalculate, onLoadExample, loading }) {
  const { t } = useTranslation();

  return (
    <InputContainer>
      <SectionTitle>{t('calculator.inputSection.title')}</SectionTitle>
      <SectionDescription>
        {t('calculator.inputSection.description')}
      </SectionDescription>

      <TextAreaStyled
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={t('calculator.inputSection.placeholder')}
        rows={3}
        disabled={loading}
        data-cy="loot-calculator-input-session"
      />

      <ButtonGroup>
        <Button onClick={onCalculate} disabled={loading || !input.trim()} data-cy="loot-calculator-button-calculate">
          {loading ? t('calculator.inputSection.calculatingButton') : t('calculator.inputSection.calculateButton')}
        </Button>
        <Button variant="secondary" onClick={onLoadExample} disabled={loading}>
          {t('calculator.inputSection.loadExampleButton')}
        </Button>
      </ButtonGroup>
    </InputContainer>
  );
}

InputSection.propTypes = {
  input: PropTypes.string.isRequired,
  setInput: PropTypes.func.isRequired,
  onCalculate: PropTypes.func.isRequired,
  onLoadExample: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};
