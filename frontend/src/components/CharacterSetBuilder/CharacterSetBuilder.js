/**
 * CharacterSetBuilder - Main component
 * Allows players to assemble and save equipment sets for their characters
 */

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getActiveCharacter } from '../../services/bestiaryStorage';
import { useCharacterSetBuilder } from '../../hooks/useCharacterSetBuilder';
import EquipmentGrid from './EquipmentGrid';
import ItemBrowser from './ItemBrowser';
import SetStatsPanel from './SetStatsPanel';
import SetManager from './SetManager';
import {
  BuilderContainer,
  Header,
  Title,
  Subtitle,
  MainGrid,
  LeftColumn,
  RightColumn,
  Card,
  CardHeaderRow,
  CardSectionLabel,
  ActionBtn,
} from './CharacterSetBuilder.styles';

export default function CharacterSetBuilder() {
  const { t } = useTranslation();
  const [character, setCharacter] = useState(null);
  const [activeSlot, setActiveSlot] = useState(null);

  useEffect(() => {
    const activeChar = getActiveCharacter();
    setCharacter(activeChar);
  }, []);

  const {
    currentSet,
    savedSets,
    hasUnsavedChanges,
    storageStats,
    error,
    saveMessage,
    loadSet,
    newSet,
    updateName,
    equipItem,
    clearEquipment,
    saveSet,
    deleteSet,
    duplicateSet,
  } = useCharacterSetBuilder(character?.id, character?.vocation || '');

  const handleSlotClick = (slotId) => {
    setActiveSlot(slotId === activeSlot ? null : slotId);
  };

  const equipment = currentSet?.equipment || {};

  return (
    <BuilderContainer>
      <Header>
        <Title>{t('characterSetBuilder.title')}</Title>
        <Subtitle>
          {character
            ? `${character.name} · ${character.vocation} · Level ${character.level}`
            : t('characterSetBuilder.subtitle')}
        </Subtitle>
      </Header>

      <MainGrid>
        {/* LEFT: Equipment paper doll + Item browser */}
        <LeftColumn>
          <Card>
            <CardHeaderRow>
              <CardSectionLabel>{t('characterSetBuilder.equipment')}</CardSectionLabel>
              <ActionBtn $variant="secondary" $compact onClick={clearEquipment}>
                {t('characterSetBuilder.clearAll')}
              </ActionBtn>
            </CardHeaderRow>
            <EquipmentGrid
              equipment={equipment}
              onEquip={equipItem}
              onClear={(slot) => equipItem(slot, null)}
              onSlotClick={handleSlotClick}
            />
          </Card>

          <ItemBrowser
            activeSlot={activeSlot}
            vocation={character?.vocation || ''}
            onEquip={equipItem}
          />
        </LeftColumn>

        {/* RIGHT: Set manager + Stats */}
        <RightColumn>
          <SetManager
            currentSet={currentSet}
            savedSets={savedSets}
            storageStats={storageStats}
            hasUnsavedChanges={hasUnsavedChanges}
            saveMessage={saveMessage}
            error={error}
            onNameChange={updateName}
            onSave={saveSet}
            onNew={newSet}
            onLoad={loadSet}
            onDelete={deleteSet}
            onDuplicate={duplicateSet}
          />

          <SetStatsPanel equipment={equipment} />
        </RightColumn>
      </MainGrid>
    </BuilderContainer>
  );
}
