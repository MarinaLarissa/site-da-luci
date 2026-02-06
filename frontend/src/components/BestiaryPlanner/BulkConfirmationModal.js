/**
 * BulkConfirmationModal Component
 * Confirmation modal for bulk actions with preview of affected creatures
 */

import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalBody,
  ModalDescription,
  CreaturePreview,
  CreaturePreviewList,
  CreaturePreviewItem,
  CreaturePreviewMore,
  ModalFooter,
  ConfirmButton,
  CancelButton,
} from './BulkConfirmationModal.styles';

const MAX_PREVIEW_CREATURES = 10;

const BulkConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  creatures,
  confirmText,
  confirmVariant,
}) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  const visibleCreatures = creatures.slice(0, MAX_PREVIEW_CREATURES);
  const remainingCount = creatures.length - MAX_PREVIEW_CREATURES;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <CloseButton onClick={onClose} aria-label="Close modal">
            ✕
          </CloseButton>
        </ModalHeader>

        <ModalBody>
          <ModalDescription>{description}</ModalDescription>

          <CreaturePreview>
            <CreaturePreviewList>
              {visibleCreatures.map((creature) => (
                <CreaturePreviewItem key={creature.id}>
                  <span>{creature.name}</span>
                  <span>{creature.charmPoints} CP</span>
                </CreaturePreviewItem>
              ))}
            </CreaturePreviewList>

            {remainingCount > 0 && (
              <CreaturePreviewMore>
                {t('bestiaryPlanner.bulkActions.andMore', { count: remainingCount })}
              </CreaturePreviewMore>
            )}
          </CreaturePreview>
        </ModalBody>

        <ModalFooter>
          <CancelButton onClick={onClose}>
            {t('bestiaryPlanner.bulkActions.cancelAction')}
          </CancelButton>
          <ConfirmButton onClick={onConfirm} $variant={confirmVariant}>
            {confirmText}
          </ConfirmButton>
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>
  );
};

BulkConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  creatures: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      charmPoints: PropTypes.number.isRequired,
    })
  ).isRequired,
  confirmText: PropTypes.string.isRequired,
  confirmVariant: PropTypes.oneOf(['complete', 'plan', 'remove', 'export']),
};

BulkConfirmationModal.defaultProps = {
  confirmVariant: 'complete',
};

export default BulkConfirmationModal;
