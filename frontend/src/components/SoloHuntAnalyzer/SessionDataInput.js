/**
 * Session Data Input Component
 * Allows user to paste session data from TIBIA client (single player only)
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Button from '../common/Button';
import {
  SessionDataInputContainer,
  SectionTitle,
  SectionDescription,
  SessionTextarea,
  InputActions,
  ParsedSessionInfo,
} from './SessionDataInput.styles';

export default function SessionDataInput({ sessionData, setSessionData, onParse, parsedSession }) {
  const { t } = useTranslation();

  const handleLoadExample3h = () => {
    const example = `Session data: From 2025-12-28, 17:00:00 to 2025-12-28, 20:00:00
Session: 03:00h
Loot Type: Leader
Loot: 16,048,186
Supplies: 1,943,593
Balance: 14,104,593

Lofi Shades (Leader)
\tLoot: 14,313,399
\tSupplies: 219,690
\tBalance: 14,093,709
\tDamage: 16,030,727
\tHealing: 378,775`;

    setSessionData(example);
  };

  const handleLoadExample2h30 = () => {
    const example = `Session data: From 2025-12-28, 17:00:00 to 2025-12-28, 19:30:00
Session: 02:30h
Loot Type: Leader
Loot: 13,373,488
Supplies: 1,619,661
Balance: 11,753,827

Lofi Shades (Leader)
\tLoot: 11,927,832
\tSupplies: 183,075
\tBalance: 11,744,757
\tDamage: 13,359,106
\tHealing: 315,646`;

    setSessionData(example);
  };

  return (
    <SessionDataInputContainer>
      <SectionTitle>{t('soloHuntAnalyzer.sessionInput.title')}</SectionTitle>
      <SectionDescription>
        {t('soloHuntAnalyzer.sessionInput.description')} <strong>{t('soloHuntAnalyzer.sessionInput.onePlayerOnly')}</strong>
      </SectionDescription>

      <SessionTextarea
        value={sessionData}
        onChange={(e) => setSessionData(e.target.value)}
        placeholder={t('soloHuntAnalyzer.sessionInput.placeholder')}
        rows={3}
        data-cy="solo-hunt-input-session"
      />

      <InputActions>
        <Button
          variant="primary"
          onClick={onParse}
          disabled={!sessionData.trim()}
        >
          {t('soloHuntAnalyzer.sessionInput.parseButton')}
        </Button>
        <Button
          variant="secondary"
          onClick={handleLoadExample3h}
        >
          {t('soloHuntAnalyzer.sessionInput.loadExampleButton')} (3:00h)
        </Button>
        <Button
          variant="secondary"
          onClick={handleLoadExample2h30}
        >
          {t('soloHuntAnalyzer.sessionInput.loadExampleButton')} (2:30h)
        </Button>
      </InputActions>

      {/* Show parsed session info */}
      {parsedSession && (
        <ParsedSessionInfo>
          <p>{t('soloHuntAnalyzer.sessionInput.sessionProcessed')}</p>
        </ParsedSessionInfo>
      )}
    </SessionDataInputContainer>
  );
}

// PropTypes validation
SessionDataInput.propTypes = {
  sessionData: PropTypes.string.isRequired,
  setSessionData: PropTypes.func.isRequired,
  onParse: PropTypes.func.isRequired,
  parsedSession: PropTypes.shape({
    sessionInfo: PropTypes.string,
    duration: PropTypes.string,
    player: PropTypes.shape({
      name: PropTypes.string.isRequired,
      loot: PropTypes.number.isRequired,
      supplies: PropTypes.number.isRequired,
      balance: PropTypes.number.isRequired,
      damage: PropTypes.number,
      healing: PropTypes.number,
    }).isRequired,
  }),
};
