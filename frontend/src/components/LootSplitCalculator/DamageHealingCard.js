/**
 * Damage and Healing card component - Reusable card for displaying damage/healing stats
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { formatGold } from '../../utils/formatters';
import Tooltip from '../common/Tooltip';
import damageIcon from '../../assets/tibia/damage-icon.gif';
import healingIcon from '../../assets/tibia/healing-icon.gif';
import {
  DamageHealingCardContainer,
  DamageHealingCardStatsRow,
  DamageHealingCardStatItem,
  DamageHealingCardStatIcon,
  DamageHealingCardStatLabel,
  DamageHealingCardStatPercent,
} from './DamageHealingCard.styles';

export default function DamageHealingCard({ player, totalDamage, totalHealing }) {
  const { t } = useTranslation();

  // Calculate percentages
  const damagePercent = totalDamage > 0 ? ((player.damage / totalDamage) * 100).toFixed(1) : 0;
  const healingPercent = totalHealing > 0 ? ((player.healing / totalHealing) * 100).toFixed(1) : 0;

  return (
    <DamageHealingCardContainer data-cy="damage-healing-card">
      <DamageHealingCardStatsRow>
        <Tooltip
          text={`${t('calculator.resultsSection.damageHealing.tooltips.actualDamage')}: ${formatGold(player.damage || 0)}`}
          position="top"
        >
          <DamageHealingCardStatItem>
            <DamageHealingCardStatIcon src={damageIcon} alt="Damage" />
            <DamageHealingCardStatLabel>{t('calculator.resultsSection.damageHealing.damage')}:</DamageHealingCardStatLabel>
            <DamageHealingCardStatPercent>{damagePercent}%</DamageHealingCardStatPercent>
          </DamageHealingCardStatItem>
        </Tooltip>

        <Tooltip
          text={`${t('calculator.resultsSection.damageHealing.tooltips.actualHealing')}: ${formatGold(player.healing || 0)}`}
          position="top"
        >
          <DamageHealingCardStatItem>
            <DamageHealingCardStatIcon src={healingIcon} alt="Healing" />
            <DamageHealingCardStatLabel>{t('calculator.resultsSection.damageHealing.healing')}:</DamageHealingCardStatLabel>
            <DamageHealingCardStatPercent>{healingPercent}%</DamageHealingCardStatPercent>
          </DamageHealingCardStatItem>
        </Tooltip>
      </DamageHealingCardStatsRow>
    </DamageHealingCardContainer>
  );
}

DamageHealingCard.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string.isRequired,
    isLeader: PropTypes.bool,
    damage: PropTypes.number,
    healing: PropTypes.number
  }).isRequired,
  totalDamage: PropTypes.number.isRequired,
  totalHealing: PropTypes.number.isRequired
};
