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
import { DIFFICULTY, REGIONS, RESPAWN_CATEGORY } from '../../data/bestiary';
import {
  Panel,
  PanelHeader,
  PanelTitle,
  ResetButton,
  FilterGroup,
  FilterLabel,
  SearchInput,
  CheckboxGroup,
  CheckboxLabel,
  Checkbox,
  RangeInputGroup,
  RangeInput,
  RangeValue,
  ResultsSummary,
  SummaryItem,
  SummaryLabel,
  SummaryValue,
  MultiSelect,
  MultiSelectChip,
} from './FilterPanel.styles';

const FilterPanel = ({
  filters,
  onUpdateFilters,
  onResetFilters,
  totalResults,
  avgCharmPointsPerHour,
  totalRemainingTime,
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

  const handleRegionToggle = (region) => {
    const newRegions = filters.region.includes(region)
      ? filters.region.filter((r) => r !== region)
      : [...filters.region, region];
    onUpdateFilters({ region: newRegions });
  };

  const handleRespawnCategoryToggle = (category) => {
    const newCategories = filters.respawnCategory.includes(category)
      ? filters.respawnCategory.filter((c) => c !== category)
      : [...filters.respawnCategory, category];
    onUpdateFilters({ respawnCategory: newCategories });
  };

  return (
    <Panel>
      <PanelHeader>
        <PanelTitle>{t('bestiaryPlanner.filters.title')}</PanelTitle>
        <ResetButton onClick={onResetFilters}>
          {t('bestiaryPlanner.filters.reset')}
        </ResetButton>
      </PanelHeader>

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

      {/* Regions */}
      <FilterGroup>
        <FilterLabel>{t('bestiaryPlanner.filters.region')}</FilterLabel>
        <CheckboxGroup style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {Object.values(REGIONS).map((region) => (
            <CheckboxLabel key={region}>
              <Checkbox
                type="checkbox"
                checked={filters.region.includes(region)}
                onChange={() => handleRegionToggle(region)}
              />
              {region}
            </CheckboxLabel>
          ))}
        </CheckboxGroup>
      </FilterGroup>

      {/* Min Charm Points */}
      <FilterGroup>
        <FilterLabel>
          {t('bestiaryPlanner.filters.minCharmPoints')}: <RangeValue>{filters.minCharmPoints}</RangeValue>
        </FilterLabel>
        <RangeInputGroup>
          <RangeInput
            type="range"
            min="0"
            max="50"
            step="5"
            value={filters.minCharmPoints}
            onChange={(e) => onUpdateFilters({ minCharmPoints: Number(e.target.value) })}
          />
        </RangeInputGroup>
      </FilterGroup>

      {/* Max Estimated Hours */}
      <FilterGroup>
        <FilterLabel>
          {t('bestiaryPlanner.filters.maxHours')}: <RangeValue>{filters.maxEstimatedHours}h</RangeValue>
        </FilterLabel>
        <RangeInputGroup>
          <RangeInput
            type="range"
            min="1"
            max="10"
            step="0.5"
            value={filters.maxEstimatedHours}
            onChange={(e) => onUpdateFilters({ maxEstimatedHours: Number(e.target.value) })}
          />
        </RangeInputGroup>
      </FilterGroup>

      {/* Level Range */}
      <FilterGroup>
        <FilterLabel>
          {t('bestiaryPlanner.filters.levelRange')}: <RangeValue>{filters.minRecommendedLevel} - {filters.maxRecommendedLevel}</RangeValue>
        </FilterLabel>
        <RangeInputGroup>
          <RangeInput
            type="range"
            min="0"
            max="500"
            step="10"
            value={filters.minRecommendedLevel}
            onChange={(e) => onUpdateFilters({ minRecommendedLevel: Number(e.target.value) })}
          />
          <RangeInput
            type="range"
            min="0"
            max="500"
            step="10"
            value={filters.maxRecommendedLevel}
            onChange={(e) => onUpdateFilters({ maxRecommendedLevel: Number(e.target.value) })}
          />
        </RangeInputGroup>
      </FilterGroup>

      {/* Results Summary */}
      <ResultsSummary>
        <SummaryItem>
          <SummaryLabel>{t('bestiaryPlanner.filters.results')}</SummaryLabel>
          <SummaryValue>{totalResults}</SummaryValue>
        </SummaryItem>
        <SummaryItem>
          <SummaryLabel>{t('bestiaryPlanner.filters.avgCharmPoints')}</SummaryLabel>
          <SummaryValue>{avgCharmPointsPerHour.toFixed(1)} / h</SummaryValue>
        </SummaryItem>
        <SummaryItem>
          <SummaryLabel>{t('bestiaryPlanner.filters.totalTime')}</SummaryLabel>
          <SummaryValue>{Math.round(totalRemainingTime)}h</SummaryValue>
        </SummaryItem>
      </ResultsSummary>
    </Panel>
  );
};

// Memo the FilterPanel to avoid re-renders when filters haven't changed
export default memo(FilterPanel);
