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
import CharacterDrawer from './CharacterDrawer';
import SyncStatus from './SyncStatus';
import ScreenshotImport from './ScreenshotImport';
import SessionPlanner from './SessionPlanner';
import Toast from './Toast';
import KillCountModal from './KillCountModal';
import { markCreaturesCompleted, updateCreatureKills, getCreatureKills, getActiveCharacter } from '../../services/bestiaryStorage';
import {
  getSessionPlanWithData,
  toggleCreatureInPlan,
  clearSessionPlan,
  isInSessionPlan,
  updateCreatureHours,
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
  const [isCharacterDrawerOpen, setIsCharacterDrawerOpen] = useState(false);
  const [showScreenshotImport, setShowScreenshotImport] = useState(false);
  const [sessionPlanCreatures, setSessionPlanCreatures] = useState([]);
  const [isFiltersCollapsed, setIsFiltersCollapsed] = useState(true);
  const [pendingFilters, setPendingFilters] = useState(null);
  const [toast, setToast] = useState(null);
  const [toastClosing, setToastClosing] = useState(false);
  const [isKillCountModalOpen, setIsKillCountModalOpen] = useState(false);
  const [selectedCreatureForEdit, setSelectedCreatureForEdit] = useState(null);
  const [characterToEdit, setCharacterToEdit] = useState(null);

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
    refreshProgress,
    reloadCharacter,
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

    // Refresh progress to reflect changes
    refreshProgress();
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

  const handleEditHours = (creatureId, creatureName, currentHours) => {
    if (!character) return;

    const newHours = prompt(
      t('bestiaryPlanner.sessionPlanner.editHoursPrompt', { name: creatureName }),
      currentHours
    );

    // User cancelled or entered empty value
    if (newHours === null || newHours.trim() === '') return;

    const parsedHours = parseFloat(newHours);

    // Validate input
    if (isNaN(parsedHours) || parsedHours <= 0) {
      showToast({
        type: 'error',
        title: t('bestiaryPlanner.toast.invalidHours.title'),
        message: t('bestiaryPlanner.toast.invalidHours.message'),
      });
      return;
    }

    // Update hours in storage
    updateCreatureHours(character.id, creatureId, parsedHours);

    // Reload session plan to reflect changes
    const updatedPlan = getSessionPlanWithData(character.id, BESTIARY_DATA);
    setSessionPlanCreatures(updatedPlan);

    // Show success toast
    showToast({
      type: 'success',
      title: t('bestiaryPlanner.toast.hoursUpdated.title'),
      message: t('bestiaryPlanner.toast.hoursUpdated.message', {
        name: creatureName,
        hours: parsedHours,
      }),
    });
  };

  // Handle character switching
  const handleCharacterChange = () => {
    // Reload character data from storage
    reloadCharacter();

    // Reload session plan for new character
    const activeChar = getActiveCharacter();
    if (activeChar) {
      const planCreatures = getSessionPlanWithData(activeChar.id, BESTIARY_DATA);
      setSessionPlanCreatures(planCreatures);
    }
  };

  const handleOpenCreateCharacter = () => {
    setCharacterToEdit(null); // Reset edit state
    setIsCharacterDrawerOpen(false);
    setIsCharacterModalOpen(true);
  };

  const handleOpenEditCharacter = (characterData) => {
    setCharacterToEdit(characterData); // Set character to edit
    setIsCharacterDrawerOpen(false);
    setIsCharacterModalOpen(true);
  };

  const handleCompleteCreature = (creatureId) => {
    if (!character) return;

    const creature = BESTIARY_DATA.find((c) => c.id === creatureId);
    if (!creature) return;

    // Don't complete if already completed
    if (isCreatureCompleted(creatureId)) return;

    // Mark as completed
    toggleCreatureCompletion(creatureId);

    // Add to today's completions
    addTodayCompletion(character.id, creature);

    // Remove from session plan if it's there
    if (isInSessionPlan(character.id, creatureId)) {
      toggleCreatureInPlan(character.id, creatureId);
      const updatedPlan = getSessionPlanWithData(character.id, BESTIARY_DATA);
      setSessionPlanCreatures(updatedPlan);
    }

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

  // Handle opening kill count modal
  const handleEditKills = (creatureId) => {
    if (!character) return;

    const creature = BESTIARY_DATA.find((c) => c.id === creatureId);
    if (!creature) return;

    setSelectedCreatureForEdit(creature);
    setIsKillCountModalOpen(true);
  };

  // Handle saving kill count
  const handleSaveKills = (creatureId, kills, occurrence) => {
    if (!character) return;

    updateCreatureKills(character.id, creatureId, kills, occurrence);

    // If kills reach the max, also add to today's completions
    if (kills >= occurrence) {
      const creature = BESTIARY_DATA.find((c) => c.id === creatureId);
      if (creature) {
        addTodayCompletion(character.id, creature);

        // Show success toast
        showToast({
          type: 'success',
          title: t('bestiaryPlanner.toast.completed.title'),
          message: t('bestiaryPlanner.toast.completed.message', {
            name: creature.name,
            charmPoints: creature.charmPoints,
          }),
        });
      }
    }

    // Refresh progress to reflect kill count changes
    refreshProgress();

    // Reload session plan if creature was completed
    if (kills >= occurrence) {
      const planCreatures = getSessionPlanWithData(character.id, BESTIARY_DATA);
      setSessionPlanCreatures(planCreatures);
    }

    // Close modal
    setIsKillCountModalOpen(false);
    setSelectedCreatureForEdit(null);
  };

  return (
    <PlannerContainer>
      <Header>
        <HeaderTop>
          <HeaderContent>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Title>{t('bestiaryPlanner.title')}</Title>
              {character && (
                <button
                  onClick={() => setIsCharacterDrawerOpen(true)}
                  style={{
                    padding: '0.5rem 1rem',
                    background: 'transparent',
                    border: '1px solid #374151',
                    borderRadius: '0.375rem',
                    color: '#9ca3af',
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.borderColor = '#667eea';
                    e.target.style.color = '#667eea';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.borderColor = '#374151';
                    e.target.style.color = '#9ca3af';
                  }}
                >
                  👤 {character.name}
                </button>
              )}
            </div>
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
          onEditHours={handleEditHours}
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
            onToggleComplete={handleCompleteCreature}
            onTogglePlan={handleTogglePlan}
            onEditKills={handleEditKills}
            isCreatureInPlan={(creatureId) => isInSessionPlan(character.id, creatureId)}
            isCreatureCompleted={isCreatureCompleted}
            character={character}
          />
        </ResultsSection>
      </ContentGrid>

      <CharacterModal
        isOpen={isCharacterModalOpen}
        onClose={() => {
          setIsCharacterModalOpen(false);
          setCharacterToEdit(null); // Reset edit state on close
        }}
        character={characterToEdit}
      />

      {/* Toast notification */}
      {toast && <Toast {...toast} isClosing={toastClosing} />}

      {/* Character Drawer */}
      <CharacterDrawer
        isOpen={isCharacterDrawerOpen}
        onClose={() => setIsCharacterDrawerOpen(false)}
        activeCharacterId={character?.id}
        onCharacterChange={handleCharacterChange}
        onCreateCharacter={handleOpenCreateCharacter}
        onEditCharacter={handleOpenEditCharacter}
      />

      {/* Kill Count Modal */}
      {selectedCreatureForEdit && (
        <KillCountModal
          isOpen={isKillCountModalOpen}
          onClose={() => setIsKillCountModalOpen(false)}
          creature={selectedCreatureForEdit}
          currentKills={character ? getCreatureKills(character.id, selectedCreatureForEdit.id) : 0}
          onSave={handleSaveKills}
        />
      )}
    </PlannerContainer>
  );
};

export default BestiaryPlanner;
