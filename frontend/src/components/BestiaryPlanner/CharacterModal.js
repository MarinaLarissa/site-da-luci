/**
 * CharacterModal Component
 * Modal for creating/editing characters
 */

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { createCharacter, updateCharacter } from '../../services/bestiaryStorage';
import {
  Overlay,
  Modal,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Select,
  ButtonGroup,
  Button,
  CharacterInfo,
  CharacterName,
  CharacterStats,
  StatItem,
  StatLabel,
  StatValue,
  ErrorMessage,
} from './CharacterModal.styles';

const CharacterModal = ({ isOpen, onClose, character = null }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    level: 100,
    vocation: 'knight',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (character) {
      setFormData({
        name: character.name,
        level: character.level,
        vocation: character.vocation,
      });
    } else {
      setFormData({
        name: '',
        level: 100,
        vocation: 'knight',
      });
    }
    setError('');
  }, [character, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.name.trim()) {
      setError(t('bestiaryPlanner.characterModal.errors.nameRequired'));
      return;
    }

    if (formData.level < 1 || formData.level > 9999) {
      setError(t('bestiaryPlanner.characterModal.errors.invalidLevel'));
      return;
    }

    try {
      if (character) {
        // Update existing character
        updateCharacter(character.id, formData);
      } else {
        // Create new character
        createCharacter(formData.name, formData.level, formData.vocation);
      }

      // Reload page to refresh data
      window.location.reload();
    } catch (err) {
      setError(t('bestiaryPlanner.characterModal.errors.saveFailed'));
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (!isOpen) return null;

  const isEditing = !!character;

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>
            {isEditing
              ? t('bestiaryPlanner.characterModal.editTitle')
              : t('bestiaryPlanner.characterModal.createTitle')}
          </ModalTitle>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>

        <ModalBody>
          {isEditing && character && (
            <CharacterInfo>
              <CharacterName>{character.name}</CharacterName>
              <CharacterStats>
                <StatItem>
                  <StatLabel>{t('bestiaryPlanner.characterModal.level')}</StatLabel>
                  <StatValue>{character.level}</StatValue>
                </StatItem>
                <StatItem>
                  <StatLabel>{t('bestiaryPlanner.characterModal.vocation')}</StatLabel>
                  <StatValue>
                    {t(`bestiaryPlanner.vocations.${character.vocation}`)}
                  </StatValue>
                </StatItem>
              </CharacterStats>
            </CharacterInfo>
          )}

          <Form onSubmit={handleSubmit}>
            {error && <ErrorMessage>{error}</ErrorMessage>}

            <FormGroup>
              <Label htmlFor="characterName">
                {t('bestiaryPlanner.characterModal.characterName')}
              </Label>
              <Input
                id="characterName"
                type="text"
                placeholder={t('bestiaryPlanner.characterModal.namePlaceholder')}
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                autoFocus
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="level">
                {t('bestiaryPlanner.characterModal.level')}
              </Label>
              <Input
                id="level"
                type="number"
                min="1"
                max="9999"
                value={formData.level}
                onChange={(e) => handleChange('level', Number(e.target.value))}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="vocation">
                {t('bestiaryPlanner.characterModal.vocation')}
              </Label>
              <Select
                id="vocation"
                value={formData.vocation}
                onChange={(e) => handleChange('vocation', e.target.value)}
              >
                <option value="knight">{t('bestiaryPlanner.vocations.knight')}</option>
                <option value="paladin">{t('bestiaryPlanner.vocations.paladin')}</option>
                <option value="sorcerer">{t('bestiaryPlanner.vocations.sorcerer')}</option>
                <option value="druid">{t('bestiaryPlanner.vocations.druid')}</option>
              </Select>
            </FormGroup>

            <ButtonGroup>
              <Button type="button" $variant="secondary" onClick={onClose}>
                {t('bestiaryPlanner.characterModal.cancel')}
              </Button>
              <Button type="submit" $variant="primary">
                {isEditing
                  ? t('bestiaryPlanner.characterModal.save')
                  : t('bestiaryPlanner.characterModal.create')}
              </Button>
            </ButtonGroup>
          </Form>
        </ModalBody>
      </Modal>
    </Overlay>
  );
};

export default CharacterModal;
