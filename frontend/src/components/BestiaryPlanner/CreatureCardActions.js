/**
 * CreatureCardActions Component
 * Displays inline action buttons for creature cards
 *
 * Actions:
 * - Complete (✓): Mark creature as completed
 * - Add to Plan (+): Add/remove from session plan
 * - Edit Kills (✎): Open kill count modal
 * - Undo (↶): Undo last action (shown in BestiaryPlanner level)
 */

import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
  ActionsContainer,
  ActionButton,
  ActionTooltip,
} from './CreatureCardActions.styles';

const CreatureCardActions = ({
  onComplete,
  onEdit,
  onPlan,
  isCompleted,
  isInPlan,
  disabled = false,
}) => {
  const { t } = useTranslation();

  const handleCompleteClick = (e) => {
    e.stopPropagation(); // Prevent card click
    if (!disabled && onComplete) {
      onComplete();
    }
  };

  const handleEditClick = (e) => {
    e.stopPropagation(); // Prevent card click
    if (!disabled && onEdit) {
      onEdit();
    }
  };

  const handlePlanClick = (e) => {
    e.stopPropagation(); // Prevent card click
    if (!disabled && onPlan) {
      onPlan();
    }
  };

  return (
    <ActionsContainer>
      {/* Complete Button */}
      <ActionButton
        onClick={handleCompleteClick}
        disabled={disabled}
        $variant={isCompleted ? 'success' : 'default'}
        aria-label={
          isCompleted
            ? t('bestiaryPlanner.actions.uncomplete', { defaultValue: 'Desmarcar como completo' })
            : t('bestiaryPlanner.actions.complete', { defaultValue: 'Marcar como completo' })
        }
        title={
          isCompleted
            ? t('bestiaryPlanner.actions.uncomplete', { defaultValue: 'Desmarcar como completo' })
            : t('bestiaryPlanner.actions.complete', { defaultValue: 'Marcar como completo' })
        }
      >
        ✓
        <ActionTooltip>
          {isCompleted
            ? t('bestiaryPlanner.actions.uncomplete', { defaultValue: 'Desmarcar' })
            : t('bestiaryPlanner.actions.complete', { defaultValue: 'Completar' })}
          <span className="shortcut">Enter</span>
        </ActionTooltip>
      </ActionButton>

      {/* Add to Plan Button */}
      {onPlan && (
        <ActionButton
          onClick={handlePlanClick}
          disabled={disabled}
          $variant={isInPlan ? 'primary' : 'default'}
          aria-label={
            isInPlan
              ? t('bestiaryPlanner.sessionPlanner.removeFromPlan')
              : t('bestiaryPlanner.sessionPlanner.addToPlan')
          }
          title={
            isInPlan
              ? t('bestiaryPlanner.sessionPlanner.removeFromPlan')
              : t('bestiaryPlanner.sessionPlanner.addToPlan')
          }
        >
          {isInPlan ? '×' : '+'}
          <ActionTooltip>
            {isInPlan
              ? t('bestiaryPlanner.actions.removeFromPlan', { defaultValue: 'Remover do plano' })
              : t('bestiaryPlanner.actions.addToPlan', { defaultValue: 'Adicionar ao plano' })}
            <span className="shortcut">P</span>
          </ActionTooltip>
        </ActionButton>
      )}

      {/* Edit Kills Button */}
      {onEdit && (
        <ActionButton
          onClick={handleEditClick}
          disabled={disabled}
          $variant="default"
          aria-label={t('bestiaryPlanner.creature.editKills')}
          title={t('bestiaryPlanner.creature.editKills')}
        >
          ✎
          <ActionTooltip>
            {t('bestiaryPlanner.actions.editKills', { defaultValue: 'Editar kills' })}
            <span className="shortcut">E</span>
          </ActionTooltip>
        </ActionButton>
      )}
    </ActionsContainer>
  );
};

CreatureCardActions.propTypes = {
  onComplete: PropTypes.func.isRequired,
  onEdit: PropTypes.func,
  onPlan: PropTypes.func,
  isCompleted: PropTypes.bool,
  isInPlan: PropTypes.bool,
  disabled: PropTypes.bool,
};

CreatureCardActions.defaultProps = {
  onEdit: null,
  onPlan: null,
  isCompleted: false,
  isInPlan: false,
  disabled: false,
};

export default CreatureCardActions;
