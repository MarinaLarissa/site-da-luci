/**
 * FilterPanel Component
 * Sidebar panel for filtering bestiary creatures
 *
 * Performance: Memoized to prevent re-renders when parent updates
 * but filter props haven't changed
 */

import { memo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDebounce } from '../../hooks/useDebounce';
import { DIFFICULTY, RESPAWN_CATEGORY, BESTIARY_DATA } from '../../data/bestiary';
import {
  Panel,
  FilterGroup,
  FilterLabel,
  SearchInput,
  CheckboxLabel,
  Checkbox,
  ResultsSummary,
  SummaryItem,
  SummaryLabel,
  SummaryValue,
  MultiSelect,
  MultiSelectChip,
  Select,
} from './FilterPanel.styles';

/**
 * Charm Points Filter - Fixed Values
 *
 * Changed from range slider (0-50) to multi-select checkboxes with fixed values.
 * Reason: In Tibia, charm points are only awarded in specific amounts (1, 5, 10, 15, 25, 50).
 * The previous range slider allowed selection of non-existent values (e.g., 7, 12, 23).
 * Multi-select provides better UX by showing only valid charm point values.
 */
const CHARM_POINTS_VALUES = [1, 5, 10, 15, 25, 50];

const FilterPanel = ({
  filters,
  onUpdateFilters,
  onResetFilters,
  totalResults,
  onSelectAllFiltered,
}) => {
  const { t } = useTranslation();

  // Local state for search input with debounce
  const [searchInput, setSearchInput] = useState(filters.searchTerm);
  const debouncedSearchTerm = useDebounce(searchInput, 300);

  // Update parent filter when debounced value changes
  useEffect(() => {
    if (debouncedSearchTerm !== filters.searchTerm) {
      onUpdateFilters({ searchTerm: debouncedSearchTerm });
    }
  }, [debouncedSearchTerm, filters.searchTerm, onUpdateFilters]);

  // Sync local state when filter resets
  useEffect(() => {
    setSearchInput(filters.searchTerm);
  }, [filters.searchTerm]);

  const handleDifficultyToggle = (difficulty) => {
    const newDifficulty = filters.difficulty.includes(difficulty)
      ? filters.difficulty.filter((d) => d !== difficulty)
      : [...filters.difficulty, difficulty];
    onUpdateFilters({ difficulty: newDifficulty });
  };

  const handleCharmPointsToggle = (value) => {
    // Toggle charm point value selection
    const currentValues = filters.charmPointsFilter || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value].sort((a, b) => a - b);
    onUpdateFilters({ charmPointsFilter: newValues });
  };

  // Get all unique locations from bestiary data
  const getAllLocations = () => {
    const locationsSet = new Set();
    BESTIARY_DATA.forEach(creature => {
      if (creature.locations && Array.isArray(creature.locations)) {
        creature.locations.forEach(loc => {
          if (!loc || loc === 'Unknown' || loc.trim() === '') return;

          let cleanedLoc = loc.trim();

          // Replace generic locations with specific names
          if (cleanedLoc.toLowerCase() === 'all over tibia') {
            return; // Skip "All over tibia"
          }
          if (cleanedLoc.toLowerCase() === 'all over tiquanda') {
            cleanedLoc = 'Tiquanda';
          }
          if (cleanedLoc.toLowerCase() === 'all over zao') {
            cleanedLoc = 'Zao';
          }

          locationsSet.add(cleanedLoc);
        });
      }
    });
    return Array.from(locationsSet).sort();
  };

  const availableLocations = getAllLocations();

  const handleRespawnCategoryToggle = (category) => {
    const newCategories = filters.respawnCategory.includes(category)
      ? filters.respawnCategory.filter((c) => c !== category)
      : [...filters.respawnCategory, category];
    onUpdateFilters({ respawnCategory: newCategories });
  };

  return (
    <Panel>
      {/* Search (debounced for performance) */}
      <FilterGroup>
        <FilterLabel>{t('bestiaryPlanner.filters.search')}</FilterLabel>
        <SearchInput
          type="text"
          placeholder={t('bestiaryPlanner.filters.searchPlaceholder')}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </FilterGroup>

      {/* Show Completed Toggle */}
      <FilterGroup>
        <CheckboxLabel>
          <Checkbox
            type="checkbox"
            checked={filters.showCompleted}
            onChange={(e) => onUpdateFilters({ showCompleted: e.target.checked })}
          />
          {t('bestiaryPlanner.filters.showCompleted')}
        </CheckboxLabel>
      </FilterGroup>

      {/* Difficulty */}
      <FilterGroup>
        <FilterLabel>{t('bestiaryPlanner.filters.difficulty')}</FilterLabel>
        <MultiSelect>
          {Object.values(DIFFICULTY).map((diff) => (
            <MultiSelectChip
              key={diff}
              $selected={filters.difficulty.includes(diff)}
              onClick={() => handleDifficultyToggle(diff)}
            >
              {t(`bestiaryPlanner.difficulty.${diff.toLowerCase()}`)}
            </MultiSelectChip>
          ))}
        </MultiSelect>
      </FilterGroup>

      {/* Respawn Category */}
      <FilterGroup>
        <FilterLabel>{t('bestiaryPlanner.filters.respawnCategory')}</FilterLabel>
        <MultiSelect>
          {Object.values(RESPAWN_CATEGORY).map((category) => (
            <MultiSelectChip
              key={category}
              $selected={filters.respawnCategory.includes(category)}
              onClick={() => handleRespawnCategoryToggle(category)}
            >
              {t(`bestiaryPlanner.respawnCategory.${category}`)}
            </MultiSelectChip>
          ))}
        </MultiSelect>
      </FilterGroup>

      {/* Localização (Single Select Dropdown) */}
      <FilterGroup>
        <FilterLabel>{t('bestiaryPlanner.filters.location', 'Localização')}</FilterLabel>
        <Select
          value={filters.location || ''}
          onChange={(e) => {
            onUpdateFilters({ location: e.target.value });
          }}
        >
          <option value="">-- Select --</option>
          {availableLocations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </Select>
      </FilterGroup>

      {/* Charm Points (Checkboxes) */}
      <FilterGroup>
        <FilterLabel>{t('bestiaryPlanner.filters.charmPoints', 'Charm Points')}</FilterLabel>
        <MultiSelect style={{ flexWrap: 'wrap' }}>
          {CHARM_POINTS_VALUES.map((value) => {
            const currentValues = filters.charmPointsFilter || [];
            return (
              <MultiSelectChip
                key={value}
                $selected={currentValues.includes(value)}
                onClick={() => handleCharmPointsToggle(value)}
              >
                {value} CP
              </MultiSelectChip>
            );
          })}
        </MultiSelect>
        {filters.charmPointsFilter && filters.charmPointsFilter.length > 0 && (
          <div style={{ fontSize: '0.75rem', marginTop: '0.25rem', color: '#9ca3af' }}>
            Showing: {filters.charmPointsFilter.join(', ')} CP
          </div>
        )}
      </FilterGroup>

      {/* Results Summary */}
      <ResultsSummary>
        <SummaryItem>
          <SummaryLabel>{t('bestiaryPlanner.filters.results')}</SummaryLabel>
          <SummaryValue>{totalResults}</SummaryValue>
        </SummaryItem>
      </ResultsSummary>
    </Panel>
  );
};

// Memo the FilterPanel to avoid re-renders when filters haven't changed
export default memo(FilterPanel);
