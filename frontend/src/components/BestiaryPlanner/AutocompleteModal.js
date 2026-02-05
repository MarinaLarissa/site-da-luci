/**
 * AutocompleteModal Component
 * Modal for selecting the correct creature when OCR detects a truncated name
 */

import { memo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  ModalSubtitle,
  ModalContent,
  TruncatedName,
  CandidatesList,
  CandidateItem,
  CandidateName,
  CandidateInfo,
  ModalActions,
  SkipButton,
  CloseButton,
} from './AutocompleteModal.styles';

const AutocompleteModal = ({
  isOpen,
  truncatedName,
  candidates,
  onSelectCandidate,
  onSkip,
  onClose,
}) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  const handleSelect = (candidate) => {
    onSelectCandidate?.(candidate);
  };

  const handleSkip = () => {
    onSkip?.();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose?.();
    }
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>{t('bestiaryPlanner.autocomplete.title')}</ModalTitle>
          <ModalSubtitle>
            {t('bestiaryPlanner.autocomplete.subtitle')}
          </ModalSubtitle>
        </ModalHeader>

        <ModalContent>
          <TruncatedName>{truncatedName}</TruncatedName>

          <CandidatesList>
            {candidates.map((candidate, index) => (
              <CandidateItem
                key={candidate.id}
                onClick={() => handleSelect(candidate)}
              >
                <CandidateName>{candidate.name}</CandidateName>
                <CandidateInfo>
                  {candidate.region} • {candidate.charmPoints} CP
                </CandidateInfo>
              </CandidateItem>
            ))}
          </CandidatesList>
        </ModalContent>

        <ModalActions>
          <SkipButton onClick={handleSkip}>
            {t('bestiaryPlanner.autocomplete.skip')}
          </SkipButton>
          <CloseButton onClick={onClose}>
            {t('bestiaryPlanner.autocomplete.cancel')}
          </CloseButton>
        </ModalActions>
      </ModalContainer>
    </ModalOverlay>
  );
};

AutocompleteModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  truncatedName: PropTypes.string.isRequired,
  candidates: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      region: PropTypes.string.isRequired,
      charmPoints: PropTypes.number.isRequired,
    })
  ).isRequired,
  onSelectCandidate: PropTypes.func.isRequired,
  onSkip: PropTypes.func,
  onClose: PropTypes.func,
};

AutocompleteModal.defaultProps = {
  onSkip: null,
  onClose: null,
};

export default memo(AutocompleteModal);
