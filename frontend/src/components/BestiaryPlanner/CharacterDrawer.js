/**
 * CharacterDrawer Component
 * Drawer for switching between characters
 */

import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { getAllCharacters, setActiveCharacter } from '../../services/bestiaryStorage';
import {
  DrawerOverlay,
  DrawerContainer,
  DrawerHeader,
  DrawerTitle,
  CloseButton,
  DrawerContent,
  CharacterList,
  CharacterItem,
  CharacterInfo,
  CharacterName,
  CharacterLevel,
  CharacterVocation,
  ActiveBadge,
  CreateButton,
  EmptyState,
  EmptyIcon,
  EmptyText,
} from './CharacterDrawer.styles';

const CharacterDrawer = ({ isOpen, onClose, activeCharacterId, onCharacterChange, onCreateCharacter }) => {
  const { t } = useTranslation();
  const characters = getAllCharacters();

  const handleSelectCharacter = (character) => {
    setActiveCharacter(character.id);
    onCharacterChange?.(character);
    onClose();
  };

  const handleCreateNew = () => {
    onCreateCharacter?.();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <DrawerOverlay onClick={onClose} />
      <DrawerContainer $isOpen={isOpen}>
        <DrawerHeader>
          <DrawerTitle>{t('bestiaryPlanner.characterDrawer.title')}</DrawerTitle>
          <CloseButton onClick={onClose}>✕</CloseButton>
        </DrawerHeader>

        <DrawerContent>
          {characters.length === 0 ? (
            <EmptyState>
              <EmptyIcon>👤</EmptyIcon>
              <EmptyText>{t('bestiaryPlanner.characterDrawer.empty')}</EmptyText>
              <CreateButton onClick={handleCreateNew}>
                {t('bestiaryPlanner.characterDrawer.createFirst')}
              </CreateButton>
            </EmptyState>
          ) : (
            <>
              <CharacterList>
                {characters.map((character) => (
                  <CharacterItem
                    key={character.id}
                    onClick={() => handleSelectCharacter(character)}
                    $isActive={character.id === activeCharacterId}
                  >
                    <CharacterInfo>
                      <CharacterName>{character.name}</CharacterName>
                      <div>
                        <CharacterLevel>Level {character.level}</CharacterLevel>
                        <CharacterVocation>
                          {t(`bestiaryPlanner.vocations.${character.vocation.toLowerCase()}`)}
                        </CharacterVocation>
                      </div>
                    </CharacterInfo>
                    {character.id === activeCharacterId && (
                      <ActiveBadge>
                        ✓ {t('bestiaryPlanner.characterDrawer.active')}
                      </ActiveBadge>
                    )}
                  </CharacterItem>
                ))}
              </CharacterList>

              <CreateButton onClick={handleCreateNew}>
                + {t('bestiaryPlanner.characterDrawer.createNew')}
              </CreateButton>
            </>
          )}
        </DrawerContent>
      </DrawerContainer>
    </>
  );
};

export default memo(CharacterDrawer);
