/**
 * VoiceConfirmationModal Component
 * Review and confirm creatures recognized from voice input
 *
 * Features:
 * - Display recognized creatures with confidence scores
 * - Allow editing/removing individual creatures
 * - Show alternative suggestions for low-confidence matches
 * - Confirm or cancel before applying changes
 */

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalContent,
  ActionInfo,
  ActionIcon,
  ActionText,
  CreatureList,
  CreatureItem,
  CreatureInfo,
  CreatureImage,
  CreatureDetails,
  CreatureName,
  ConfidenceBar,
  ConfidenceBarFill,
  ConfidenceText,
  KillCountBadge,
  RemoveButton,
  LowConfidenceWarning,
  NoCreaturesWarning,
  ModalFooter,
  FooterButton,
} from './VoiceConfirmationModal.styles';

const VoiceConfirmationModal = ({ isOpen, onClose, onConfirm, parsedResult }) => {
  const { t } = useTranslation();
  const [selectedMatches, setSelectedMatches] = useState(parsedResult?.matches || []);

  if (!isOpen || !parsedResult) return null;

  const { action, matches, rawTranscript } = parsedResult;

  const handleRemoveMatch = (index) => {
    setSelectedMatches((prev) => prev.filter((_, i) => i !== index));
  };

  const handleConfirm = () => {
    if (selectedMatches.length === 0) {
      onClose();
      return;
    }

    onConfirm({
      action,
      matches: selectedMatches,
    });

    onClose();
  };

  const getActionIcon = () => {
    switch (action) {
      case 'complete':
        return '✅';
      case 'updateKills':
        return '📊';
      case 'remove':
        return '❌';
      default:
        return '🎤';
    }
  };

  const getActionLabel = () => {
    switch (action) {
      case 'complete':
        return t('bestiaryPlanner.voiceInput.actions.complete');
      case 'updateKills':
        return t('bestiaryPlanner.voiceInput.actions.updateKills');
      case 'remove':
        return t('bestiaryPlanner.voiceInput.actions.remove');
      default:
        return t('bestiaryPlanner.voiceInput.actions.unknown');
    }
  };

  const hasLowConfidence = selectedMatches.some((m) => m.confidence < 0.85);

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>{t('bestiaryPlanner.voiceInput.confirmModal.title')}</ModalTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>

        <ModalContent>
          {/* Action Info */}
          <ActionInfo>
            <ActionIcon>{getActionIcon()}</ActionIcon>
            <ActionText>
              <strong>{getActionLabel()}</strong>
              <p>"{rawTranscript}"</p>
            </ActionText>
          </ActionInfo>

          {/* Low Confidence Warning */}
          {hasLowConfidence && (
            <LowConfidenceWarning>
              <span>⚠️</span>
              <div>
                <strong>{t('bestiaryPlanner.voiceInput.confirmModal.lowConfidence.title')}</strong>
                <p>{t('bestiaryPlanner.voiceInput.confirmModal.lowConfidence.description')}</p>
              </div>
            </LowConfidenceWarning>
          )}

          {/* Recognized Creatures */}
          {selectedMatches.length > 0 ? (
            <CreatureList>
              {selectedMatches.map((match, index) => (
                <CreatureItem key={`${match.creature.id}-${index}`}>
                  <CreatureInfo>
                    <CreatureImage
                      src={match.creature.image || '/images/creatures/default.png'}
                      alt={match.creature.name}
                      onError={(e) => {
                        e.target.src = '/images/creatures/default.png';
                      }}
                    />
                    <CreatureDetails>
                      <CreatureName>{match.creature.name}</CreatureName>
                      <ConfidenceBar>
                        <ConfidenceBarFill $confidence={match.confidence} />
                      </ConfidenceBar>
                      <ConfidenceText $confidence={match.confidence}>
                        {Math.round(match.confidence * 100)}% {t('bestiaryPlanner.voiceInput.confirmModal.confidence')}
                      </ConfidenceText>
                    </CreatureDetails>

                    {/* Kill Count Badge (for updateKills action) */}
                    {match.killCount && (
                      <KillCountBadge>
                        {match.killCount} kills
                      </KillCountBadge>
                    )}

                    {/* Remove Button */}
                    <RemoveButton onClick={() => handleRemoveMatch(index)}>
                      ×
                    </RemoveButton>
                  </CreatureInfo>
                </CreatureItem>
              ))}
            </CreatureList>
          ) : (
            <NoCreaturesWarning>
              <span>🔍</span>
              <div>
                <strong>{t('bestiaryPlanner.voiceInput.confirmModal.noCreatures.title')}</strong>
                <p>{t('bestiaryPlanner.voiceInput.confirmModal.noCreatures.description')}</p>
              </div>
            </NoCreaturesWarning>
          )}
        </ModalContent>

        <ModalFooter>
          <FooterButton onClick={onClose} $variant="secondary">
            {t('bestiaryPlanner.voiceInput.confirmModal.cancel')}
          </FooterButton>
          <FooterButton
            onClick={handleConfirm}
            $variant="primary"
            disabled={selectedMatches.length === 0}
          >
            {t('bestiaryPlanner.voiceInput.confirmModal.confirm')} ({selectedMatches.length})
          </FooterButton>
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default VoiceConfirmationModal;
