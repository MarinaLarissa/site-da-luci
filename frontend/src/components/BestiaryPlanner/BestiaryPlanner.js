/**
 * BestiaryPlanner Component
 * Main component for the bestiary planning feature
 *
 * Feature 2 Update (Quick Actions Inline):
 * - Integrated useUndoAction hook for action history
 * - Replaced Toast with UndoToast component
 * - Added keyboard shortcuts support (Ctrl+Z for undo)
 */

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useBestiaryPlanner } from '../../hooks/useBestiaryPlanner';
import { useUndoAction } from '../../hooks/useUndoAction';
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts';
import { useBulkSelection } from '../../hooks/useBulkSelection';
import FilterPanel from './FilterPanel';
import SuggestionList from './SuggestionList';
import CharacterModal from './CharacterModal';
import CharacterDrawer from './CharacterDrawer';
import SyncStatus from './SyncStatus';
import ScreenshotImport from './ScreenshotImport';
import SessionPlanner from './SessionPlanner';
import UndoToast from './UndoToast';
import KillCountModal from './KillCountModal';
import FirstTimeTutorial from './FirstTimeTutorial';
import BulkActionsBar from './BulkActionsBar';
import BulkConfirmationModal from './BulkConfirmationModal';
import ProgressHistory from './ProgressHistory';
import VoiceInput from './VoiceInput';
import VoiceConfirmationModal from './VoiceConfirmationModal';
import { importCreaturesWithProgress, updateCreatureKills, getCreatureKills, getActiveCharacter } from '../../services/bestiaryStorage';
import { saveCompletion } from '../../services/progressHistoryStorage';
import {
  getSessionPlanWithData,
  toggleCreatureInPlan,
  clearSessionPlan,
  isInSessionPlan,
} from '../../services/sessionPlannerStorage';
import { addTodayCompletion, clearDailyProgress } from '../../services/dailyProgressStorage';
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
  CollapsedFilterActions,
  QuickActionButton,
  ShowCompletedToggle,
} from './BestiaryPlanner.styles';

const BestiaryPlanner = () => {
  const { t } = useTranslation();
  const [isCharacterModalOpen, setIsCharacterModalOpen] = useState(false);
  const [isCharacterDrawerOpen, setIsCharacterDrawerOpen] = useState(false);
  const [showScreenshotImport, setShowScreenshotImport] = useState(false);
  const [sessionPlanCreatures, setSessionPlanCreatures] = useState([]);
  const [isFiltersCollapsed, setIsFiltersCollapsed] = useState(true); // Collapsed by default
  const [isSessionPlannerCollapsed, setIsSessionPlannerCollapsed] = useState(true); // Collapsed by default
  const [pendingFilters, setPendingFilters] = useState(null);
  const [isKillCountModalOpen, setIsKillCountModalOpen] = useState(false);
  const [selectedCreatureForEdit, setSelectedCreatureForEdit] = useState(null);
  const [characterToEdit, setCharacterToEdit] = useState(null);
  const [bulkModalConfig, setBulkModalConfig] = useState(null);
  const [isProgressHistoryOpen, setIsProgressHistoryOpen] = useState(false);
  const [isVoiceInputOpen, setIsVoiceInputOpen] = useState(false);
  const [voiceConfirmationData, setVoiceConfirmationData] = useState(null);

  const {
    character,
    progress,
    suggestions,
    filters,
    updateFilters,
    resetFilters,
    toggleCreatureCompletion,
    isCreatureCompleted,
    refreshProgress,
    reloadCharacter,
  } = useBestiaryPlanner();

  // Undo functionality
  const {
    performAction,
    undo,
    canUndo,
    getMostRecentAction,
  } = useUndoAction(character?.id);

  // Global keyboard shortcut for undo (Ctrl+Z)
  useKeyboardShortcuts({
    onUndo: canUndo ? undo : null,
    enabled: true,
  });

  // Bulk selection
  const {
    selectionMode,
    selectedCount,
    toggleSelection,
    selectFiltered,
    selectNone,
    enterSelectionMode,
    exitSelectionMode,
    isSelected,
    getSelectedIds,
  } = useBulkSelection(character?.id);

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

  // Handle screenshot import
  const handleCreaturesImported = (creaturesData) => {
    if (!character) return;

    // Import creatures with their progress (Unknown, In Progress, Complete)
    importCreaturesWithProgress(character.id, creaturesData);
    setShowScreenshotImport(false);

    // Refresh progress to reflect changes
    refreshProgress();
  };

  // Handle session planner
  const handleTogglePlan = (creatureId) => {
    if (!character) return;

    const creature = BESTIARY_DATA.find((c) => c.id === creatureId);
    if (!creature) return;

    const wasInPlan = isInSessionPlan(character.id, creatureId);

    toggleCreatureInPlan(character.id, creatureId);
    const updatedPlan = getSessionPlanWithData(character.id, BESTIARY_DATA);
    setSessionPlanCreatures(updatedPlan);

    // Add to undo stack
    performAction({
      type: wasInPlan ? 'unplan' : 'plan',
      data: {
        creatureId,
        creatureName: creature.name,
      },
      undo: () => {
        // Undo: Toggle plan back
        toggleCreatureInPlan(character.id, creatureId);
        const updatedPlan = getSessionPlanWithData(character.id, BESTIARY_DATA);
        setSessionPlanCreatures(updatedPlan);
      },
    });
  };

  const handleClearPlan = () => {
    if (!character) return;

    clearSessionPlan(character.id);
    clearDailyProgress(character.id); // Also clear "Completed Today"
    setSessionPlanCreatures([]);
  };

  const handleRemoveFromPlan = (creatureId) => {
    if (!character) return;

    toggleCreatureInPlan(character.id, creatureId);
    const updatedPlan = getSessionPlanWithData(character.id, BESTIARY_DATA);
    setSessionPlanCreatures(updatedPlan);
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

    const wasCompleted = isCreatureCompleted(creatureId);

    // Toggle completion status
    toggleCreatureCompletion(creatureId);

    if (!wasCompleted) {
      // Was NOT completed, now IS completed
      // Add to today's completions
      addTodayCompletion(character.id, creature);

      // Feature 4: Save to progress history storage (long-term tracking)
      saveCompletion(character.id, {
        id: creature.id,
        name: creature.name,
        charmPoints: creature.charmPoints,
      });

      // Remove from session plan if it's there
      const wasInPlan = isInSessionPlan(character.id, creatureId);
      if (wasInPlan) {
        toggleCreatureInPlan(character.id, creatureId);
        const updatedPlan = getSessionPlanWithData(character.id, BESTIARY_DATA);
        setSessionPlanCreatures(updatedPlan);
      }

      // Add to undo stack
      performAction({
        type: 'complete',
        data: {
          creatureId,
          creatureName: creature.name,
          charmPoints: creature.charmPoints,
          wasInPlan,
        },
        undo: () => {
          // Undo: Toggle back to incomplete
          toggleCreatureCompletion(creatureId);

          // Re-add to plan if it was there
          if (wasInPlan) {
            toggleCreatureInPlan(character.id, creatureId);
            const updatedPlan = getSessionPlanWithData(character.id, BESTIARY_DATA);
            setSessionPlanCreatures(updatedPlan);
          }

          refreshProgress();
        },
      });
    } else {
      // Was completed, now is NOT completed
      // Add to undo stack
      performAction({
        type: 'uncomplete',
        data: {
          creatureId,
          creatureName: creature.name,
        },
        undo: () => {
          // Undo: Toggle back to completed
          toggleCreatureCompletion(creatureId);
          addTodayCompletion(character.id, creature);
          refreshProgress();
        },
      });
    }
  };

  // Close toast callback
  const handleCloseToast = () => {
    // Toast will auto-close, no state management needed
    // UndoToast manages its own lifecycle
  };

  // Handle filter changes (pending mode)
  const handlePendingFilterChange = (newFilters) => {
    setPendingFilters(prev => ({
      ...(prev || filters),
      ...newFilters
    }));
  };

  // Apply pending filters
  const handleApplyFilters = () => {
    if (pendingFilters) {
      updateFilters(pendingFilters);
      setPendingFilters(null);
      setIsFiltersCollapsed(true); // Auto-collapse after applying
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

  // Toggle session planner visibility
  const toggleSessionPlannerCollapsed = () => {
    setIsSessionPlannerCollapsed(!isSessionPlannerCollapsed);
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

        // Add to undo stack
        performAction({
          type: 'complete',
          data: {
            creatureId,
            creatureName: creature.name,
            charmPoints: creature.charmPoints,
          },
          undo: () => {
            toggleCreatureCompletion(creatureId);
            refreshProgress();
          },
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

  // Bulk Actions Handlers
  const handleBulkMarkComplete = () => {
    const selectedCreatures = BESTIARY_DATA.filter((c) => getSelectedIds().includes(c.id));

    setBulkModalConfig({
      title: t('bestiaryPlanner.bulkActions.confirmComplete.title'),
      description: t('bestiaryPlanner.bulkActions.confirmComplete.description', { count: selectedCount }),
      creatures: selectedCreatures,
      confirmText: t('bestiaryPlanner.bulkActions.markComplete'),
      confirmVariant: 'complete',
      onConfirm: () => {
        getSelectedIds().forEach((creatureId) => {
          const creature = BESTIARY_DATA.find((c) => c.id === creatureId);
          if (creature && !isCreatureCompleted(creatureId)) {
            toggleCreatureCompletion(creatureId);
            addTodayCompletion(character.id, creature);

            // Remove from session plan if it's there
            if (isInSessionPlan(character.id, creatureId)) {
              toggleCreatureInPlan(character.id, creatureId);
            }
          }
        });

        refreshProgress();
        const updatedPlan = getSessionPlanWithData(character.id, BESTIARY_DATA);
        setSessionPlanCreatures(updatedPlan);
        exitSelectionMode();
        setBulkModalConfig(null);
      },
    });
  };

  const handleBulkAddToPlan = () => {
    const selectedCreatures = BESTIARY_DATA.filter((c) => getSelectedIds().includes(c.id));

    setBulkModalConfig({
      title: t('bestiaryPlanner.bulkActions.confirmAddToPlan.title'),
      description: t('bestiaryPlanner.bulkActions.confirmAddToPlan.description', { count: selectedCount }),
      creatures: selectedCreatures,
      confirmText: t('bestiaryPlanner.bulkActions.addToPlan'),
      confirmVariant: 'plan',
      onConfirm: () => {
        getSelectedIds().forEach((creatureId) => {
          if (!isInSessionPlan(character.id, creatureId)) {
            toggleCreatureInPlan(character.id, creatureId);
          }
        });

        const updatedPlan = getSessionPlanWithData(character.id, BESTIARY_DATA);
        setSessionPlanCreatures(updatedPlan);
        exitSelectionMode();
        setBulkModalConfig(null);
      },
    });
  };

  const handleBulkRemove = () => {
    const selectedCreatures = BESTIARY_DATA.filter((c) => getSelectedIds().includes(c.id));

    setBulkModalConfig({
      title: t('bestiaryPlanner.bulkActions.confirmRemove.title'),
      description: t('bestiaryPlanner.bulkActions.confirmRemove.description', { count: selectedCount }),
      creatures: selectedCreatures,
      confirmText: t('bestiaryPlanner.bulkActions.remove'),
      confirmVariant: 'remove',
      onConfirm: () => {
        getSelectedIds().forEach((creatureId) => {
          // Mark as incomplete (remove completion)
          if (isCreatureCompleted(creatureId)) {
            toggleCreatureCompletion(creatureId);
          }
          // Remove from plan if in plan
          if (isInSessionPlan(character.id, creatureId)) {
            toggleCreatureInPlan(character.id, creatureId);
          }
        });

        refreshProgress();
        const updatedPlan = getSessionPlanWithData(character.id, BESTIARY_DATA);
        setSessionPlanCreatures(updatedPlan);
        exitSelectionMode();
        setBulkModalConfig(null);
      },
    });
  };

  const handleBulkExport = () => {
    const selectedCreatures = BESTIARY_DATA.filter((c) => getSelectedIds().includes(c.id));

    // Generate CSV
    const csvHeader = 'Name,Charm Points,Difficulty,Kills To Complete\n';
    const csvRows = selectedCreatures
      .map((c) => `"${c.name}",${c.charmPoints},"${c.difficulty}",${c.killsToComplete}`)
      .join('\n');
    const csvContent = csvHeader + csvRows;

    // Download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `bestiary-selection-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();

    exitSelectionMode();
  };

  const handleBulkCancel = () => {
    exitSelectionMode();
  };

  // Voice Input Handlers
  const handleVoiceRecognized = (parsedResult) => {
    // Close voice input modal
    setIsVoiceInputOpen(false);

    // Open confirmation modal with parsed results
    setVoiceConfirmationData(parsedResult);
  };

  const handleVoiceConfirm = (confirmedData) => {
    if (!character) return;

    const { action, matches } = confirmedData;

    // Process each confirmed match
    matches.forEach((match) => {
      const creatureId = match.creature.id;

      switch (action) {
        case 'complete':
          // Mark as complete if not already completed
          if (!isCreatureCompleted(creatureId)) {
            toggleCreatureCompletion(creatureId);
            addTodayCompletion(character.id, match.creature);

            // Save to progress history
            saveCompletion(character.id, {
              id: match.creature.id,
              name: match.creature.name,
              charmPoints: match.creature.charmPoints,
            });

            // Remove from session plan if it's there
            if (isInSessionPlan(character.id, creatureId)) {
              toggleCreatureInPlan(character.id, creatureId);
            }
          }
          break;

        case 'updateKills':
          // Update kill count
          if (match.killCount) {
            updateCreatureKills(character.id, creatureId, match.killCount, match.creature.occurrence);

            // If kills reach the max, also complete the creature
            if (match.killCount >= match.creature.occurrence) {
              if (!isCreatureCompleted(creatureId)) {
                toggleCreatureCompletion(creatureId);
                addTodayCompletion(character.id, match.creature);

                // Remove from session plan
                if (isInSessionPlan(character.id, creatureId)) {
                  toggleCreatureInPlan(character.id, creatureId);
                }
              }
            }
          }
          break;

        case 'remove':
          // Mark as incomplete (remove completion)
          if (isCreatureCompleted(creatureId)) {
            toggleCreatureCompletion(creatureId);
          }
          // Remove from plan if in plan
          if (isInSessionPlan(character.id, creatureId)) {
            toggleCreatureInPlan(character.id, creatureId);
          }
          break;

        default:
          console.warn('Unknown voice action:', action);
      }
    });

    // Refresh progress and session plan
    refreshProgress();
    const updatedPlan = getSessionPlanWithData(character.id, BESTIARY_DATA);
    setSessionPlanCreatures(updatedPlan);

    // Close confirmation modal
    setVoiceConfirmationData(null);
  };

  return (
    <PlannerContainer>
      <Header>
        <HeaderTop>
          <HeaderContent>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <Title>{t('bestiaryPlanner.title')}</Title>
              {character && (
                <>
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
                  <button
                    onClick={() => setIsProgressHistoryOpen(true)}
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
                    📊 {t('bestiaryPlanner.progressHistory.button')}
                  </button>
                </>
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

      {/* Screenshot Import & Voice Input */}
      <ScreenshotSection>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <ScreenshotToggleButton onClick={() => setShowScreenshotImport(!showScreenshotImport)}>
            📷 {showScreenshotImport ? t('bestiaryPlanner.screenshot.hide') : t('bestiaryPlanner.screenshot.show')}
          </ScreenshotToggleButton>
          <ScreenshotToggleButton onClick={() => setIsVoiceInputOpen(true)}>
            🎤 {t('bestiaryPlanner.voiceInput.button')}
          </ScreenshotToggleButton>
        </div>
        {showScreenshotImport && (
          <ScreenshotImport
            characterId={character.id}
            onCreaturesImported={handleCreaturesImported}
          />
        )}
      </ScreenshotSection>

      {/* Main Content Grid - Session Planner + Suggestions lado a lado */}
      <ContentGrid>
        {/* Session Planner (Hunt do Dia) - Coluna esquerda */}
        <SessionPlannerSection>
          {/* Session Planner Header with Collapse */}
          <FilterSection>
            <FilterHeader>
              <FilterTitle>{t('bestiaryPlanner.sessionPlanner.title')}</FilterTitle>
              <FilterToggle onClick={toggleSessionPlannerCollapsed}>
                {isSessionPlannerCollapsed ? t('bestiaryPlanner.filters.show') : t('bestiaryPlanner.filters.hide')}
              </FilterToggle>
            </FilterHeader>

            {!isSessionPlannerCollapsed && (
              <SessionPlanner
                creatures={sessionPlanCreatures}
                characterId={character.id}
                onRemoveCreature={handleRemoveFromPlan}
                onClearPlan={handleClearPlan}
                onCompleteCreature={handleCompleteCreature}
              />
            )}
          </FilterSection>

          {/* Filtros abaixo da Hunt do Dia */}
          <FilterSection>
            <FilterHeader>
              <FilterTitle>{t('bestiaryPlanner.filters.title')}</FilterTitle>

              {/* Quick actions visible when collapsed */}
              {isFiltersCollapsed && (
                <CollapsedFilterActions>
                  <QuickActionButton onClick={handleClearFilters}>
                    {t('bestiaryPlanner.filters.clear')}
                  </QuickActionButton>
                  <ShowCompletedToggle>
                    <input
                      type="checkbox"
                      checked={filters.showCompleted}
                      onChange={(e) => {
                        // Apply directly without pending state for quick action
                        updateFilters({ ...filters, showCompleted: e.target.checked });
                      }}
                    />
                    {t('bestiaryPlanner.filters.showCompleted')}
                  </ShowCompletedToggle>
                </CollapsedFilterActions>
              )}

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
                  onSelectAllFiltered={() => {
                    enterSelectionMode();
                    selectFiltered(suggestions);
                  }}
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
        </SessionPlannerSection>

        {/* Suggestions - Coluna direita */}
        <ResultsSection>
          <SuggestionList
            suggestions={suggestions}
            onToggleComplete={handleCompleteCreature}
            onTogglePlan={handleTogglePlan}
            onEditKills={handleEditKills}
            isCreatureInPlan={(creatureId) => isInSessionPlan(character.id, creatureId)}
            isCreatureCompleted={isCreatureCompleted}
            character={character}
            selectionMode={selectionMode}
            isCreatureSelected={isSelected}
            onToggleSelection={toggleSelection}
            onSelectAll={() => selectFiltered(suggestions)}
            onSelectNone={selectNone}
            onEnterSelectionMode={enterSelectionMode}
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

      {/* Undo Toast notification */}
      {canUndo && (
        <UndoToast
          action={getMostRecentAction()}
          onUndo={undo}
          onClose={handleCloseToast}
        />
      )}

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

      {/* First Time Tutorial */}
      <FirstTimeTutorial />

      {/* Bulk Actions Bar */}
      {selectionMode && (
        <BulkActionsBar
          selectedCount={selectedCount}
          onMarkComplete={handleBulkMarkComplete}
          onAddToPlan={handleBulkAddToPlan}
          onRemove={handleBulkRemove}
          onExport={handleBulkExport}
          onCancel={handleBulkCancel}
        />
      )}

      {/* Bulk Confirmation Modal */}
      {bulkModalConfig && (
        <BulkConfirmationModal
          isOpen={!!bulkModalConfig}
          onClose={() => setBulkModalConfig(null)}
          onConfirm={bulkModalConfig.onConfirm}
          title={bulkModalConfig.title}
          description={bulkModalConfig.description}
          creatures={bulkModalConfig.creatures}
          confirmText={bulkModalConfig.confirmText}
          confirmVariant={bulkModalConfig.confirmVariant}
        />
      )}

      {/* Progress History Modal (Feature 4) */}
      {character && (
        <ProgressHistory
          isOpen={isProgressHistoryOpen}
          onClose={() => setIsProgressHistoryOpen(false)}
          characterId={character.id}
        />
      )}

      {/* Voice Input Modal */}
      {isVoiceInputOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem',
          }}
          onClick={() => setIsVoiceInputOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <VoiceInput
              onClose={() => setIsVoiceInputOpen(false)}
              onRecognized={handleVoiceRecognized}
            />
          </div>
        </div>
      )}

      {/* Voice Confirmation Modal */}
      <VoiceConfirmationModal
        isOpen={!!voiceConfirmationData}
        onClose={() => setVoiceConfirmationData(null)}
        onConfirm={handleVoiceConfirm}
        parsedResult={voiceConfirmationData}
      />
    </PlannerContainer>
  );
};

export default BestiaryPlanner;
