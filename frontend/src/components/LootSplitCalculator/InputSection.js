/**
 * Input section for loot data
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Button from '../common/Button';
import './InputSection.css';

export default function InputSection({ input, setInput, onCalculate, onLoadExample, loading }) {
  const { t } = useTranslation();

  return (
    <div className="input-section">
      <h2 className="section-title">{t('calculator.inputSection.title')}</h2>
      <p className="section-description">
        {t('calculator.inputSection.description')}
      </p>

      <textarea
        className="loot-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={t('calculator.inputSection.placeholder')}
        rows={3}
        disabled={loading}
      />

      <div className="button-group">
        <Button onClick={onCalculate} disabled={loading || !input.trim()}>
          {loading ? t('calculator.inputSection.calculatingButton') : t('calculator.inputSection.calculateButton')}
        </Button>
        <Button variant="secondary" onClick={onLoadExample} disabled={loading}>
          {t('calculator.inputSection.loadExampleButton')}
        </Button>
      </div>
    </div>
  );
}

InputSection.propTypes = {
  input: PropTypes.string.isRequired,
  setInput: PropTypes.func.isRequired,
  onCalculate: PropTypes.func.isRequired,
  onLoadExample: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};
