/**
 * CreatureComparisonModal
 * Side-by-side comparison table for up to 5 bestiary creatures.
 *
 * Highlights:
 * - Color-coded resistances (green = resistant <100%, red = weak >100%)
 * - Shared locations highlighted in purple across selected creatures
 * - Remove individual creatures without closing the modal
 */

import { useTranslation } from 'react-i18next';
import { getImageUrl, PLACEHOLDER_IMAGE } from '../../utils/imageUtils';
import {
  Overlay,
  Modal,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ScrollArea,
  Table,
  THead,
  TBody,
  CreatureHeaderCell,
  CreatureHeaderImage,
  CreatureHeaderName,
  RemoveCreatureButton,
  RowLabelCell,
  DataCell,
  DifficultyBadge,
  ResistanceValue,
  LocationChip,
  ModalFooter,
  FooterButton,
} from './CreatureComparisonModal.styles';

const ELEMENT_ICONS = {
  physical: '⚔️',
  fire: '🔥',
  ice: '❄️',
  energy: '⚡',
  earth: '🌿',
  holy: '✨',
  death: '💀',
};

const ELEMENT_ORDER = ['physical', 'fire', 'ice', 'energy', 'earth', 'holy', 'death'];

const CreatureComparisonModal = ({ isOpen, onClose, creatures, onRemoveCreature, onClearAll }) => {
  const { t } = useTranslation();

  if (!isOpen || creatures.length === 0) return null;

  // Compute shared locations (appear in ≥2 creatures)
  const locationCounts = {};
  creatures.forEach((c) => {
    (c.locations || []).forEach((loc) => {
      locationCounts[loc] = (locationCounts[loc] || 0) + 1;
    });
  });
  const sharedLocations = new Set(
    Object.entries(locationCounts)
      .filter(([, count]) => count >= 2)
      .map(([loc]) => loc)
  );

  const handleImageError = (e) => {
    e.target.src = PLACEHOLDER_IMAGE;
    e.target.onerror = null;
  };

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>
            {t('bestiaryPlanner.compare.title', { count: creatures.length })}
          </ModalTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>

        <ScrollArea>
          <Table>
            <THead>
              <tr>
                <RowLabelCell as="th" />
                {creatures.map((c) => (
                  <CreatureHeaderCell key={c.id}>
                    <CreatureHeaderImage
                      src={getImageUrl(c.imageUrl)}
                      alt={c.name}
                      onError={handleImageError}
                    />
                    <CreatureHeaderName>{c.name}</CreatureHeaderName>
                    {creatures.length > 2 && (
                      <RemoveCreatureButton
                        onClick={() => onRemoveCreature(c.id)}
                        title={t('bestiaryPlanner.compare.remove')}
                      >
                        ×
                      </RemoveCreatureButton>
                    )}
                  </CreatureHeaderCell>
                ))}
              </tr>
            </THead>

            <TBody>
              {/* Charm Points */}
              <tr>
                <RowLabelCell>{t('bestiaryPlanner.compare.rows.charmPoints')}</RowLabelCell>
                {creatures.map((c) => (
                  <DataCell key={c.id}>
                    <strong>{c.charmPoints}</strong> CP
                  </DataCell>
                ))}
              </tr>

              {/* Difficulty */}
              <tr>
                <RowLabelCell>{t('bestiaryPlanner.compare.rows.difficulty')}</RowLabelCell>
                {creatures.map((c) => (
                  <DataCell key={c.id}>
                    <DifficultyBadge $difficulty={c.difficulty}>
                      {t(`bestiaryPlanner.difficulty.${c.difficulty.toLowerCase()}`)}
                    </DifficultyBadge>
                  </DataCell>
                ))}
              </tr>

              {/* HP */}
              <tr>
                <RowLabelCell>{t('bestiaryPlanner.compare.rows.hp')}</RowLabelCell>
                {creatures.map((c) => (
                  <DataCell key={c.id}>
                    {c.hitpoints ? c.hitpoints.toLocaleString() : '—'}
                  </DataCell>
                ))}
              </tr>

              {/* Kills to complete */}
              <tr>
                <RowLabelCell>{t('bestiaryPlanner.compare.rows.kills')}</RowLabelCell>
                {creatures.map((c) => (
                  <DataCell key={c.id}>
                    {c.killsToComplete ? c.killsToComplete.toLocaleString() : '—'}
                  </DataCell>
                ))}
              </tr>

              {/* CP/Kill efficiency */}
              <tr>
                <RowLabelCell>{t('bestiaryPlanner.compare.rows.efficiency')}</RowLabelCell>
                {creatures.map((c) => (
                  <DataCell key={c.id}>
                    {c.killsToComplete
                      ? (c.charmPoints / c.killsToComplete * 1000).toFixed(2)
                      : '—'}
                  </DataCell>
                ))}
              </tr>

              {/* Resistances */}
              {ELEMENT_ORDER.map((element) => (
                <tr key={element}>
                  <RowLabelCell>
                    {ELEMENT_ICONS[element]} {t(`bestiaryPlanner.compare.elements.${element}`, { defaultValue: element })}
                  </RowLabelCell>
                  {creatures.map((c) => {
                    const val = c.elementalResistances?.[element] ?? 100;
                    return (
                      <DataCell key={c.id}>
                        <ResistanceValue $value={val}>{val}%</ResistanceValue>
                      </DataCell>
                    );
                  })}
                </tr>
              ))}

              {/* Locations */}
              <tr>
                <RowLabelCell>{t('bestiaryPlanner.compare.rows.locations')}</RowLabelCell>
                {creatures.map((c) => (
                  <DataCell key={c.id} style={{ textAlign: 'left' }}>
                    {(c.locations || []).length > 0
                      ? c.locations.map((loc, i) => (
                          <LocationChip key={i} $shared={sharedLocations.has(loc)}>
                            {loc}
                          </LocationChip>
                        ))
                      : '—'}
                  </DataCell>
                ))}
              </tr>
            </TBody>
          </Table>
        </ScrollArea>

        <ModalFooter>
          {sharedLocations.size > 0 && (
            <span style={{ fontSize: '0.8rem', color: '#667eea', marginRight: 'auto' }}>
              {t('bestiaryPlanner.compare.sharedLocationsHint')}
            </span>
          )}
          <FooterButton onClick={onClearAll}>
            {t('bestiaryPlanner.compare.clearAll')}
          </FooterButton>
          <FooterButton $variant="primary" onClick={onClose}>
            {t('bestiaryPlanner.compare.close')}
          </FooterButton>
        </ModalFooter>
      </Modal>
    </Overlay>
  );
};

export default CreatureComparisonModal;
