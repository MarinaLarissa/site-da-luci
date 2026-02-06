/**
 * BulkActionsBar Component
 * Floating/sticky action bar for bulk operations
 *
 * Features:
 * - Shows selected count
 * - Actions: Mark Complete, Add to Plan, Remove, Export
 * - Slide-up animation
 * - Sticky to bottom
 */

import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
  BarContainer,
  BarContent,
  SelectedCount,
  ActionsGroup,
  ActionButton,
  CancelButton,
} from './BulkActionsBar.styles';

const BulkActionsBar = ({
  selectedCount,
  onMarkComplete,
  onAddToPlan,
  onRemove,
  onExport,
  onCancel,
}) => {
  const { t } = useTranslation();

  if (selectedCount === 0) {
    return null;
  }

  return (
    <BarContainer>
      <BarContent>
        <SelectedCount>
          {t('bestiaryPlanner.bulkActions.selected', { count: selectedCount })}
        </SelectedCount>

        <ActionsGroup>
          <ActionButton onClick={onMarkComplete} $variant="complete">
            ✓ {t('bestiaryPlanner.bulkActions.markComplete')}
          </ActionButton>

          <ActionButton onClick={onAddToPlan} $variant="plan">
            + {t('bestiaryPlanner.bulkActions.addToPlan')}
          </ActionButton>

          <ActionButton onClick={onRemove} $variant="remove">
            🗑️ {t('bestiaryPlanner.bulkActions.remove')}
          </ActionButton>

          <ActionButton onClick={onExport} $variant="export">
            📥 {t('bestiaryPlanner.bulkActions.export')}
          </ActionButton>

          <CancelButton onClick={onCancel}>
            {t('bestiaryPlanner.bulkActions.cancel')}
          </CancelButton>
        </ActionsGroup>
      </BarContent>
    </BarContainer>
  );
};

BulkActionsBar.propTypes = {
  selectedCount: PropTypes.number.isRequired,
  onMarkComplete: PropTypes.func.isRequired,
  onAddToPlan: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onExport: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default BulkActionsBar;
