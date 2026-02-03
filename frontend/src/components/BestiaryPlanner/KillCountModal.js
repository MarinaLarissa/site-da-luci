/**
 * KillCountModal Component
 * Modal for manually entering kill counts for creatures
 */

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { calculateStageFromKills, isBestiaryComplete, calculatePercentage } from '../../utils/bestiaryStages';
import {
  Overlay,
  Modal,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalBody,
  CreatureHeader,
  CreatureName,
  CreatureImage,
  Form,
  FormGroup,
  Label,
  Input,
  ProgressInfo,
  ProgressBar,
  ProgressFill,
  ProgressText,
  StageInfo,
  ButtonGroup,
  Button,
  ErrorMessage,
} from './KillCountModal.styles';

const KillCountModal = ({ isOpen, onClose, creature, currentKills = 0, onSave }) => {
  const { t } = useTranslation();
  const [kills, setKills] = useState(currentKills);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setKills(currentKills);
      setError('');
    }
  }, [isOpen, currentKills]);

  if (!isOpen || !creature) return null;

  const maxKills = creature.occurrence || 1000;
  const percentage = calculatePercentage(kills, maxKills);
  const stage = calculateStageFromKills(kills, maxKills);
  const isComplete = isBestiaryComplete(kills, maxKills);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (kills < 0) {
      setError(t('bestiaryPlanner.killCountModal.errors.negativeKills'));
      return;
    }

    if (kills > maxKills) {
      setError(t('bestiaryPlanner.killCountModal.errors.exceedsMax', { max: maxKills }));
      return;
    }

    onSave?.(creature.id, kills, maxKills);
    onClose();
  };

  const handleChange = (value) => {
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue)) {
      setKills(numValue);
    } else if (value === '') {
      setKills(0);
    }
  };

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>{t('bestiaryPlanner.killCountModal.title')}</ModalTitle>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>

        <ModalBody>
          <CreatureHeader>
            {creature.imageUrl && (
              <CreatureImage
                src={creature.imageUrl}
                alt={creature.name}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            )}
            <CreatureName>{creature.name}</CreatureName>
          </CreatureHeader>

          <Form onSubmit={handleSubmit}>
            {error && <ErrorMessage>{error}</ErrorMessage>}

            <FormGroup>
              <Label htmlFor="killCount">
                {t('bestiaryPlanner.killCountModal.killsLabel')}
              </Label>
              <Input
                id="killCount"
                type="number"
                min="0"
                max={maxKills}
                value={kills}
                onChange={(e) => handleChange(e.target.value)}
                autoFocus
              />
            </FormGroup>

            <ProgressInfo>
              <ProgressText>
                {kills} / {maxKills} ({percentage}%)
              </ProgressText>
              <StageInfo>
                {isComplete ? (
                  <span style={{ color: '#10b981' }}>
                    ✓ {t('bestiaryPlanner.killCountModal.complete')}
                  </span>
                ) : stage > 0 ? (
                  <span>
                    {t('bestiaryPlanner.killCountModal.stage', { stage })}
                  </span>
                ) : (
                  <span>
                    {t('bestiaryPlanner.killCountModal.notStarted', { defaultValue: 'Not started' })}
                  </span>
                )}
              </StageInfo>
            </ProgressInfo>

            <ProgressBar>
              <ProgressFill $percentage={percentage} />
            </ProgressBar>

            <ButtonGroup>
              <Button type="button" $variant="secondary" onClick={onClose}>
                {t('bestiaryPlanner.killCountModal.cancel')}
              </Button>
              <Button type="submit" $variant="primary">
                {t('bestiaryPlanner.killCountModal.save')}
              </Button>
            </ButtonGroup>
          </Form>
        </ModalBody>
      </Modal>
    </Overlay>
  );
};

KillCountModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  creature: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    occurrence: PropTypes.number,
    imageUrl: PropTypes.string,
  }),
  currentKills: PropTypes.number,
  onSave: PropTypes.func,
};

KillCountModal.defaultProps = {
  creature: null,
  currentKills: 0,
  onSave: () => {},
};

export default KillCountModal;
