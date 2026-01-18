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
  CardContainer,
  StatsRow,
  StatItem,
  StatIcon,
  StatLabel,
  StatPercent,
} from './DamageHealingCard.styles';

export default function DamageHealingCard({ player, totalDamage, totalHealing }) {
  const { t } = useTranslation();

  // Calculate percentages
  const damagePercent = totalDamage > 0 ? ((player.damage / totalDamage) * 100).toFixed(1) : 0;
  const healingPercent = totalHealing > 0 ? ((player.healing / totalHealing) * 100).toFixed(1) : 0;

  return (
    <CardContainer>
      <StatsRow>
        <Tooltip
          text={`${t('calculator.resultsSection.damageHealing.tooltips.actualDamage')}: ${formatGold(player.damage || 0)}`}
          position="top"
        >
          <StatItem>
            <StatIcon src={damageIcon} alt="Damage" />
            <StatLabel>{t('calculator.resultsSection.damageHealing.damage')}:</StatLabel>
            <StatPercent>{damagePercent}%</StatPercent>
          </StatItem>
        </Tooltip>

        <Tooltip
          text={`${t('calculator.resultsSection.damageHealing.tooltips.actualHealing')}: ${formatGold(player.healing || 0)}`}
          position="top"
        >
          <StatItem>
            <StatIcon src={healingIcon} alt="Healing" />
            <StatLabel>{t('calculator.resultsSection.damageHealing.healing')}:</StatLabel>
            <StatPercent>{healingPercent}%</StatPercent>
          </StatItem>
        </Tooltip>
      </StatsRow>
    </CardContainer>
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
