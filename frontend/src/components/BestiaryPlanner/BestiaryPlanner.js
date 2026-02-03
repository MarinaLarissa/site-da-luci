/**
 * BestiaryPlanner Component
 * Main component for the bestiary planning feature
 */

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useBestiaryPlanner } from '../../hooks/useBestiaryPlanner';
import FilterPanel from './FilterPanel';
import SuggestionList from './SuggestionList';
import CharacterModal from './CharacterModal';
import SyncStatus from './SyncStatus';
import ScreenshotImport from './ScreenshotImport';
import SessionPlanner from './SessionPlanner';
import Toast from './Toast';
import { markCreaturesCompleted } from '../../services/bestiaryStorage';
import {
  getSessionPlanWithData,
  toggleCreatureInPlan,
  clearSessionPlan,
  isInSessionPlan,
} from '../../services/sessionPlannerStorage';
import { addTodayCompletion } from '../../services/dailyProgressStorage';
import { BESTIARY_DATA } from '../../data/bestiary';
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
  FilterHeader,
  FilterTitle,
  FilterToggle,
  FilterActions,
  FilterButton,
  ResultsSection,
  SessionPlannerSection,
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
  const [sessionPlanCreatures, setSessionPlanCreatures] = useState([]);
  const [isFiltersCollapsed, setIsFiltersCollapsed] = useState(true);
  const [pendingFilters, setPendingFilters] = useState(null);
  const [toast, setToast] = useState(null);
  const [toastClosing, setToastClosing] = useState(false);

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

  // Load session plan creatures
  useEffect(() => {
    if (character) {
      const planCreatures = getSessionPlanWithData(character.id, BESTIARY_DATA);
      setSessionPlanCreatures(planCreatures);
    }
  }, [character]);

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

  // Handle session planner
  const handleTogglePlan = (creatureId) => {
    if (!character) return;

    toggleCreatureInPlan(character.id, creatureId);
    const updatedPlan = getSessionPlanWithData(character.id, BESTIARY_DATA);
    setSessionPlanCreatures(updatedPlan);
  };

  const handleClearPlan = () => {
    if (!character) return;

    clearSessionPlan(character.id);
    setSessionPlanCreatures([]);
  };

  const handleRemoveFromPlan = (creatureId) => {
    if (!character) return;

    toggleCreatureInPlan(character.id, creatureId);
    const updatedPlan = getSessionPlanWithData(character.id, BESTIARY_DATA);
    setSessionPlanCreatures(updatedPlan);
  };

  const handleCompleteCreature = (creatureId) => {
    if (!character) return;

    const creature = BESTIARY_DATA.find((c) => c.id === creatureId);
    if (!creature) return;

    // Mark as completed
    toggleCreatureCompletion(creatureId);

    // Add to today's completions
    addTodayCompletion(character.id, creature);

    // Remove from session plan
    toggleCreatureInPlan(character.id, creatureId);
    const updatedPlan = getSessionPlanWithData(character.id, BESTIARY_DATA);
    setSessionPlanCreatures(updatedPlan);

    // Show success toast
    showToast({
      type: 'success',
      title: t('bestiaryPlanner.toast.completed.title'),
      message: t('bestiaryPlanner.toast.completed.message', {
        name: creature.name,
        charmPoints: creature.charmPoints,
      }),
    });
  };

  const showToast = (toastData) => {
    setToast(toastData);
    setToastClosing(false);

    // Auto-hide after 5 seconds
    setTimeout(() => {
      setToastClosing(true);
      setTimeout(() => {
        setToast(null);
        setToastClosing(false);
      }, 300); // Wait for animation
    }, 5000);
  };

  // Handle filter changes (pending mode)
  const handlePendingFilterChange = (newFilters) => {
    setPendingFilters(newFilters);
  };

  // Apply pending filters
  const handleApplyFilters = () => {
    if (pendingFilters) {
      updateFilters(pendingFilters);
      setPendingFilters(null);
    }
  };

  // Clear filters
  const handleClearFilters = () => {
    resetFilters();
    setPendingFilters(null);
  };

  // Toggle filters visibility
  const toggleFiltersCollapsed = () => {
    setIsFiltersCollapsed(!isFiltersCollapsed);
  };

  return (
    <PlannerContainer>
      <Header>
        <HeaderTop>
          <HeaderContent>
            <Title>{t('bestiaryPlanner.title')}</Title>
            <Subtitle>{t('bestiaryPlanner.subtitle')}</Subtitle>
            <SyncStatus />
          </HeaderContent>
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

      {/* Session Planner (Hunt do Dia) - Sticky no topo */}
      <SessionPlannerSection>
        <SessionPlanner
          creatures={sessionPlanCreatures}
          characterId={character.id}
          onRemoveCreature={handleRemoveFromPlan}
          onClearPlan={handleClearPlan}
          onCompleteCreature={handleCompleteCreature}
        />
      </SessionPlannerSection>

      {/* Main Content Grid */}
      <ContentGrid>
        <FilterSection>
          <FilterHeader>
            <FilterTitle>{t('bestiaryPlanner.filters.title')}</FilterTitle>
            <FilterToggle onClick={toggleFiltersCollapsed}>
              {isFiltersCollapsed ? t('bestiaryPlanner.filters.show') : t('bestiaryPlanner.filters.hide')}
            </FilterToggle>
          </FilterHeader>

          {!isFiltersCollapsed && (
            <>
              <FilterPanel
                filters={pendingFilters || filters}
                onUpdateFilters={handlePendingFilterChange}
                onResetFilters={handleClearFilters}
                totalResults={suggestions.length}
                avgCharmPointsPerHour={avgCharmPointsPerHour}
                totalRemainingTime={totalRemainingTime}
              />
              <FilterActions>
                <FilterButton $variant="primary" onClick={handleApplyFilters} disabled={!pendingFilters}>
                  {t('bestiaryPlanner.filters.apply')}
                </FilterButton>
                <FilterButton onClick={handleClearFilters}>
                  {t('bestiaryPlanner.filters.clear')}
                </FilterButton>
              </FilterActions>
            </>
          )}
        </FilterSection>

        <ResultsSection>
          <SuggestionList
            suggestions={suggestions}
            onToggleComplete={toggleCreatureCompletion}
            onTogglePlan={handleTogglePlan}
            isCreatureInPlan={(creatureId) => isInSessionPlan(character.id, creatureId)}
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

      {/* Toast notification */}
      {toast && <Toast {...toast} isClosing={toastClosing} />}
    </PlannerContainer>
  );
};

export default BestiaryPlanner;
