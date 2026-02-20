/**
 * Wheel of Destiny Planner Component
 * Main component for planning and comparing wheel builds
 */

import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useWheelPlanner } from '../../hooks/useWheelPlanner';
import { getActiveCharacter } from '../../services/bestiaryStorage';
import { encodeBuild } from '../../services/wheelCodes';
import { VOCATIONS } from '../../data/wheelData';
import { calculateBuildStats, calcTotalUsed } from '../../data/wheelNodes';
import WheelVisualization from './WheelVisualization';
import StatsPanel from './StatsPanel';
import WheelBuildsDrawer from './WheelBuildsDrawer';
import CompareModal from './CompareModal';
import ImportExportPanel from './ImportExportPanel';
import {
  PlannerContainer,
  Header,
  Title,
  Subtitle,
  MainGrid,
  EditorSection,
  SidePanel,
  Card,
  CardTitle,
  BuildControls,
  VocationSelector,
  VocationButton,
  PointsDisplay,
  PointsStat,
  PointsLabel,
  PointsValue,
  InputGroup,
  Label,
  Input,
  Button,
  EmptyState,
  EmptyStateIcon,
  EmptyStateText,
  ErrorMessage,
  SuccessMessage,
  Divider,
} from './WheelPlanner.styles';

const WheelPlanner = () => {
  const { t } = useTranslation();
  const [character, setCharacter] = useState(null);
  const [showCompare, setShowCompare] = useState(false);
  const [showImportExport, setShowImportExport] = useState(false);
  const [saveMessage, setSaveMessage] = useState(null);

  // Get active character from bestiary storage (optional — wheel planner works without it)
  useEffect(() => {
    const activeChar = getActiveCharacter();
    setCharacter(activeChar);
  }, []);

  const {
    currentBuild,
    savedBuilds,
    isLoading,
    error,
    storageStats,
    hasUnsavedChanges,
    createNewBuild,
    loadBuild,
    updateVocation,
    updateName,
    updatePoints,
    saveBuild,
    deleteBuild,
    duplicateBuild,
    resetBuild,
    allocatePoints,
    setCurrentBuild,
  } = useWheelPlanner(character?.id ?? null);

  // Load a build directly from a decoded code (vocation + slicePoints)
  const handleLoadFromCode = useCallback((vocation, slicePoints) => {
    const used  = calcTotalUsed(slicePoints);
    const stats = calculateBuildStats(slicePoints, vocation);
    setCurrentBuild((prev) => ({
      ...(prev || {}),
      id: null,
      name: 'Imported Build',
      vocation,
      slicePoints,
      stats,
      points: {
        total: prev?.points?.total ?? Math.max(used, 1200),
        used,
        promotion: prev?.points?.promotion ?? 0,
      },
    }));
  }, [setCurrentBuild]);

  // Handle save with feedback
  const handleSave = () => {
    const result = saveBuild();
    if (result.success) {
      setSaveMessage({ type: 'success', text: t('wheelPlanner.messages.saved') || 'Build saved successfully!' });
      setTimeout(() => setSaveMessage(null), 3000);
    } else {
      setSaveMessage({ type: 'error', text: result.error });
      setTimeout(() => setSaveMessage(null), 5000);
    }
  };

  // Copy current build code to clipboard
  const handleCopyCode = () => {
    if (!currentBuild) return;
    const code = encodeBuild(currentBuild.slicePoints || {}, currentBuild.vocation);
    navigator.clipboard.writeText(code)
      .then(() => {
        setSaveMessage({ type: 'success', text: t('wheelPlanner.importExport.copyCodeSuccess', { code }) });
        setTimeout(() => setSaveMessage(null), 4000);
      })
      .catch(() => {
        setSaveMessage({ type: 'error', text: t('wheelPlanner.importExport.copyError') || 'Failed to copy to clipboard' });
        setTimeout(() => setSaveMessage(null), 3000);
      });
  };

  if (!currentBuild) {
    return (
      <PlannerContainer>
        <Header>
          <Title>{t('wheelPlanner.title') || 'Wheel of Destiny Planner'}</Title>
          <Subtitle>{t('wheelPlanner.subtitle') || 'Plan your Wheel of Destiny build'}</Subtitle>
        </Header>
        <EmptyState>
          <EmptyStateIcon>🎡</EmptyStateIcon>
          <EmptyStateText>Loading...</EmptyStateText>
        </EmptyState>
      </PlannerContainer>
    );
  }

  return (
    <PlannerContainer>
      <Header>
        <Title>{t('wheelPlanner.title') || 'Wheel of Destiny Planner'}</Title>
        <Subtitle>{t('wheelPlanner.subtitle') || 'Plan your Wheel of Destiny build'}</Subtitle>
      </Header>

      {/* Messages */}
      {saveMessage && (
        saveMessage.type === 'success' ? (
          <SuccessMessage>{saveMessage.text}</SuccessMessage>
        ) : (
          <ErrorMessage>{saveMessage.text}</ErrorMessage>
        )
      )}
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <MainGrid>
        {/* Left: Editor */}
        <EditorSection>
          <CardTitle>🎡 {t('wheelPlanner.editor.title') || 'Build Editor'}</CardTitle>

          {/* Build Name */}
          <InputGroup>
            <Label>{t('wheelPlanner.editor.buildName') || 'Build Name'}</Label>
            <Input
              type="text"
              value={currentBuild.name}
              onChange={(e) => updateName(e.target.value)}
              placeholder={t('wheelPlanner.editor.namePlaceholder') || 'Enter build name...'}
            />
          </InputGroup>

          {/* Vocation Selector */}
          <InputGroup>
            <Label>{t('wheelPlanner.editor.vocation') || 'Vocation'}</Label>
            <VocationSelector>
              {Object.values(VOCATIONS).map((voc) => (
                <VocationButton
                  key={voc}
                  $active={currentBuild.vocation === voc}
                  onClick={() => updateVocation(voc)}
                >
                  {t(`bestiaryPlanner.vocations.${voc}`) || voc}
                </VocationButton>
              ))}
            </VocationSelector>
          </InputGroup>

          {/* Points Configuration */}
          <InputGroup>
            <Label>{t('wheelPlanner.editor.totalPoints') || 'Total Points'}</Label>
            <Input
              type="number"
              min="0"
              max="4000"
              value={currentBuild.points.total}
              onChange={(e) => updatePoints({ total: parseInt(e.target.value) || 0 })}
            />
          </InputGroup>

          <InputGroup>
            <Label>{t('wheelPlanner.editor.promotionPoints') || 'Promotion Points'}</Label>
            <Input
              type="number"
              min="0"
              max="100"
              value={currentBuild.points.promotion}
              onChange={(e) => updatePoints({ promotion: parseInt(e.target.value) || 0 })}
            />
          </InputGroup>

          {/* Points Display */}
          <PointsDisplay>
            <PointsStat>
              <PointsLabel>{t('wheelPlanner.points.total') || 'Total'}</PointsLabel>
              <PointsValue>{currentBuild.points.total}</PointsValue>
            </PointsStat>
            <PointsStat>
              <PointsLabel>{t('wheelPlanner.points.used') || 'Used'}</PointsLabel>
              <PointsValue $variant="used">{currentBuild.points.used}</PointsValue>
            </PointsStat>
            <PointsStat>
              <PointsLabel>{t('wheelPlanner.points.available') || 'Available'}</PointsLabel>
              <PointsValue $variant="available">
                {currentBuild.points.total - currentBuild.points.used}
              </PointsValue>
            </PointsStat>
          </PointsDisplay>

          <Divider />

          {/* Wheel Visualization */}
          <WheelVisualization
            build={currentBuild}
            onAllocatePoints={allocatePoints}
          />

          {/* Action Buttons */}
          <BuildControls>
            <Button
              $variant="primary"
              onClick={handleSave}
              disabled={isLoading || !hasUnsavedChanges}
            >
              {isLoading ? (t('wheelPlanner.actions.saving') || 'Saving...') : (t('wheelPlanner.actions.save') || 'Save Build')}
            </Button>
            <Button onClick={resetBuild} disabled={isLoading}>
              {t('wheelPlanner.actions.reset') || 'Reset'}
            </Button>
            <Button onClick={() => createNewBuild(currentBuild.vocation)} disabled={isLoading}>
              {t('wheelPlanner.actions.new') || 'New Build'}
            </Button>
            <Button onClick={handleCopyCode} disabled={!currentBuild}>
              {t('wheelPlanner.actions.copy') || 'Copy Code'}
            </Button>
          </BuildControls>
        </EditorSection>

        {/* Right: Side Panel */}
        <SidePanel>
          {/* Stats Panel */}
          <StatsPanel build={currentBuild} />

          {/* Additional Actions */}
          <Card>
            <CardTitle>⚙️ {t('wheelPlanner.actions.title') || 'Actions'}</CardTitle>
            <BuildControls>
              <Button $fullWidth onClick={() => setShowCompare(true)} disabled={savedBuilds.length < 2}>
                {t('wheelPlanner.actions.compare') || 'Compare Builds'}
              </Button>
              <Button $fullWidth onClick={() => setShowImportExport(true)}>
                {t('wheelPlanner.actions.importExport') || 'Import/Export'}
              </Button>
            </BuildControls>
          </Card>
        </SidePanel>
      </MainGrid>

      {/* Compare Modal */}
      {showCompare && (
        <CompareModal
          builds={savedBuilds}
          currentBuild={currentBuild}
          onClose={() => setShowCompare(false)}
        />
      )}

      {/* Import/Export Panel */}
      {showImportExport && (
        <ImportExportPanel
          characterId={character?.id ?? null}
          currentBuild={currentBuild}
          onClose={() => setShowImportExport(false)}
        />
      )}

      {/* Floating Saved Builds Drawer */}
      <WheelBuildsDrawer
        currentBuild={currentBuild}
        savedBuilds={savedBuilds}
        storageStats={storageStats}
        onLoadBuild={loadBuild}
        onDeleteBuild={deleteBuild}
        onDuplicateBuild={duplicateBuild}
        onLoadFromCode={handleLoadFromCode}
      />
    </PlannerContainer>
  );
};

export default WheelPlanner;
