/**
 * BestiaryPlanner Component
 * Main component for the bestiary planning feature
 */

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useBestiaryPlanner } from '../../hooks/useBestiaryPlanner';
import FilterPanel from './FilterPanel';
import SuggestionList from './SuggestionList';
import CharacterModal from './CharacterModal';
import SyncStatus from './SyncStatus';
import ScreenshotImport from './ScreenshotImport';
import { markCreaturesCompleted } from '../../services/bestiaryStorage';
import {
  PlannerContainer,
  Header,
  HeaderTop,
  HeaderContent,
  Title,
  Subtitle,
  ProgressBar,
  ProgressStats,
  ProgressStat,
  StatLabel,
  StatValue,
  ProgressBarTrack,
  ProgressBarFill,
  ScreenshotSection,
  ScreenshotToggleButton,
  ContentGrid,
  FilterSection,
  ResultsSection,
  CharacterWarning,
  WarningIcon,
  WarningContent,
  WarningTitle,
  WarningText,
  CreateCharacterButton,
} from './BestiaryPlanner.styles';

const BestiaryPlanner = () => {
  const { t } = useTranslation();
  const [isCharacterModalOpen, setIsCharacterModalOpen] = useState(false);
  const [showScreenshotImport, setShowScreenshotImport] = useState(false);

  const {
    character,
    progress,
    suggestions,
    filters,
    updateFilters,
    resetFilters,
    toggleCreatureCompletion,
    isCreatureCompleted,
    getTotalRemainingTime,
    getAverageCharmPointsPerHour,
  } = useBestiaryPlanner();

  // Show warning if no character exists
  if (!character) {
    return (
      <PlannerContainer>
        <Header>
          <Title>{t('bestiaryPlanner.title')}</Title>
          <Subtitle>{t('bestiaryPlanner.subtitle')}</Subtitle>
        </Header>

        <CharacterWarning>
          <WarningIcon>⚠️</WarningIcon>
          <WarningContent>
            <WarningTitle>{t('bestiaryPlanner.noCharacter.title')}</WarningTitle>
            <WarningText>{t('bestiaryPlanner.noCharacter.description')}</WarningText>
          </WarningContent>
          <CreateCharacterButton onClick={() => setIsCharacterModalOpen(true)}>
            {t('bestiaryPlanner.noCharacter.createButton')}
          </CreateCharacterButton>
        </CharacterWarning>

        <CharacterModal
          isOpen={isCharacterModalOpen}
          onClose={() => setIsCharacterModalOpen(false)}
        />
      </PlannerContainer>
    );
  }

  const totalRemainingTime = getTotalRemainingTime();
  const avgCharmPointsPerHour = getAverageCharmPointsPerHour();

  // Handle screenshot import
  const handleCreaturesImported = (creatureIds) => {
    if (!character) return;

    markCreaturesCompleted(character.id, creatureIds, true);
    setShowScreenshotImport(false);

    // Reload data to reflect changes
    window.location.reload();
  };

  return (
    <PlannerContainer>
      <Header>
        <HeaderTop>
          <HeaderContent>
            <Title>{t('bestiaryPlanner.title')}</Title>
            <Subtitle>{t('bestiaryPlanner.subtitle')}</Subtitle>
          </HeaderContent>
          <SyncStatus />
        </HeaderTop>
      </Header>

      {/* Progress Section */}
      <ProgressBar>
        <ProgressStats>
          <ProgressStat>
            <StatLabel>{t('bestiaryPlanner.progress.completed')}</StatLabel>
            <StatValue>
              {progress.completed} / {progress.total}
            </StatValue>
          </ProgressStat>
          <ProgressStat>
            <StatLabel>{t('bestiaryPlanner.progress.charmPoints')}</StatLabel>
            <StatValue>{progress.charmPointsEarned}</StatValue>
          </ProgressStat>
          <ProgressStat>
            <StatLabel>{t('bestiaryPlanner.progress.remaining')}</StatLabel>
            <StatValue>{progress.charmPointsRemaining}</StatValue>
          </ProgressStat>
          <ProgressStat>
            <StatLabel>{t('bestiaryPlanner.progress.percentage')}</StatLabel>
            <StatValue>{progress.percentage}%</StatValue>
          </ProgressStat>
        </ProgressStats>

        <ProgressBarTrack>
          <ProgressBarFill $percentage={progress.percentage} />
        </ProgressBarTrack>
      </ProgressBar>

      {/* Screenshot Import */}
      <ScreenshotSection>
        <ScreenshotToggleButton onClick={() => setShowScreenshotImport(!showScreenshotImport)}>
          📷 {showScreenshotImport ? t('bestiaryPlanner.screenshot.hide') : t('bestiaryPlanner.screenshot.show')}
        </ScreenshotToggleButton>
        {showScreenshotImport && (
          <ScreenshotImport
            characterId={character.id}
            onCreaturesImported={handleCreaturesImported}
          />
        )}
      </ScreenshotSection>

      {/* Main Content Grid */}
      <ContentGrid>
        <FilterSection>
          <FilterPanel
            filters={filters}
            onUpdateFilters={updateFilters}
            onResetFilters={resetFilters}
            totalResults={suggestions.length}
            avgCharmPointsPerHour={avgCharmPointsPerHour}
            totalRemainingTime={totalRemainingTime}
          />
        </FilterSection>

        <ResultsSection>
          <SuggestionList
            suggestions={suggestions}
            onToggleComplete={toggleCreatureCompletion}
            isCreatureCompleted={isCreatureCompleted}
            character={character}
          />
        </ResultsSection>
      </ContentGrid>

      <CharacterModal
        isOpen={isCharacterModalOpen}
        onClose={() => setIsCharacterModalOpen(false)}
        character={character}
      />
    </PlannerContainer>
  );
};

export default BestiaryPlanner;
