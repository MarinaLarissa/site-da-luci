/**
 * WheelInfoPanel — right-side info panel for the Wheel of Destiny
 *
 * Sections:
 *  • "Seleção"    — points used / total + point allocation controls for selected slice
 *  • "Informações" — Dedication Perk (per point) + Conviction Perk (at max) for selected slice
 *  • "Revelações" — Revelation Perk stages per quadrant (auto-unlocked)
 *  • "Gem Atelier" — gem slots per domain vessel
 */
import { useState } from 'react';
import styled from 'styled-components';
import {
  getSliceById,
  DEDICATION_PERKS,
  CONVICTION_PERKS,
  REVELATION_PERKS,
  QUADRANT_CONFIG,
  GEM_CONFIG,
  GEM_MODS,
  formatDedicationPerk,
  getRevelationPerkId,
  calcQuadrantTotal,
  isSliceUnlockable,
} from '../../data/wheelNodes';

// ─── Styled components ────────────────────────────────────────────────────────

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 220px;
  max-width: 290px;
  color: #e5e7eb;
`;

const Section = styled.div`
  background: #0f0f0f;
  border: 1px solid #2a2a2a;
  border-radius: 0.5rem;
  padding: 1rem;
`;

const SectionTitle = styled.h3`
  font-size: 0.9rem;
  font-weight: 700;
  color: #c8a020;
  margin: 0 0 0.75rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #2a2a2a;
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

/* ── Points section ── */

const PointsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.35rem;
`;
const PLabel = styled.span`font-size: 0.75rem; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.04em;`;
const PValue = styled.span`
  font-size: 0.95rem; font-weight: 700;
  color: ${(p) => p.$v === 'used' ? '#c8a020' : p.$v === 'avail' ? '#3d8b2f' : '#e5e7eb'};
`;
const PointsBar = styled.div`
  height: 5px; background: #1a1a1a; border-radius: 3px; overflow: hidden; margin: 0.5rem 0;
`;
const PointsFill = styled.div`
  height: 100%; border-radius: 3px;
  background: linear-gradient(90deg, #4a3800, #c8a020);
  transition: width 0.3s ease;
  width: ${(p) => Math.min(100, (p.$u / Math.max(p.$t, 1)) * 100)}%;
`;
const SmallText = styled.p`font-size: 0.72rem; color: #6b7280; margin: 0;`;

/* ── Slice controls ── */

const SliceBar = styled.div`
  margin-top: 0.65rem;
  background: #0a0a0a;
  border: 1px solid #2a2a2a;
  border-radius: 0.4rem;
  padding: 0.6rem 0.75rem;
`;

const SliceBarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.4rem;
`;

const SliceName = styled.span`
  font-size: 0.78rem; font-weight: 700; color: #e5e7eb;
`;

const SliceProgress = styled.span`
  font-size: 0.78rem; font-weight: 700;
  color: ${(p) => p.$maxed ? '#52c23c' : '#c8a020'};
`;

const SliceFillBar = styled.div`
  height: 6px; background: #1a1a1a; border-radius: 3px; overflow: hidden; margin-bottom: 0.5rem;
`;
const SliceFillInner = styled.div`
  height: 100%; border-radius: 3px;
  background: ${(p) => p.$color || 'linear-gradient(90deg, #1e4d12, #52c23c)'};
  transition: width 0.2s ease;
  width: ${(p) => p.$pct}%;
`;

const AllocBtns = styled.div`display: flex; gap: 0.3rem;`;
const AllocBtn = styled.button`
  flex: 1; padding: 0.28rem 0.2rem;
  background: ${(p) => p.$variant === 'add' ? '#1e3a00' : p.$variant === 'remove' ? '#3a0000' : '#1a1a1a'};
  border: 1px solid ${(p) => p.$variant === 'add' ? '#3d8b2f' : p.$variant === 'remove' ? '#7a0000' : '#374151'};
  border-radius: 0.25rem;
  color: ${(p) => p.$variant === 'add' ? '#52c23c' : p.$variant === 'remove' ? '#ff6060' : '#9ca3af'};
  font-size: 0.7rem; font-weight: 700; cursor: pointer;
  transition: all 0.15s;
  &:disabled { opacity: 0.3; cursor: default; }
  &:not(:disabled):hover {
    background: ${(p) => p.$variant === 'add' ? '#2a5a00' : p.$variant === 'remove' ? '#5a0000' : '#222'};
  }
`;

/* ── Info section ── */

const PerkBlock = styled.div`
  margin-bottom: 0.65rem;
  &:last-child { margin-bottom: 0; }
`;
const PerkLabel = styled.div`
  font-size: 0.68rem; font-weight: 700;
  color: ${(p) => p.$type === 'conviction' ? '#c8a020' : p.$type === 'revelation' ? '#d070ff' : '#52c23c'};
  text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.25rem;
`;
const PerkName = styled.div`font-size: 0.82rem; font-weight: 700; color: #f3f4f6; margin-bottom: 0.2rem;`;
const PerkDesc = styled.p`font-size: 0.74rem; color: #d1d5db; margin: 0; line-height: 1.5;`;
const Placeholder = styled.p`font-size: 0.78rem; color: #6b7280; margin: 0; font-style: italic;`;
const Divider = styled.div`height: 1px; background: #2a2a2a; margin: 0.6rem 0;`;

/* ── Revelation section ── */

const QuadrantRev = styled.div`
  margin-bottom: 0.65rem;
  &:last-child { margin-bottom: 0; }
`;
const QuadrantHeader = styled.div`
  display: flex; align-items: center; gap: 0.4rem; margin-bottom: 0.3rem;
`;
const QuadrantDot = styled.span`
  display: inline-block; width: 8px; height: 8px; border-radius: 50%;
  background: ${(p) => p.$color};
`;
const QuadrantLabel = styled.span`
  font-size: 0.72rem; font-weight: 700; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.04em;
`;
const QuadrantPoints = styled.span`
  font-size: 0.72rem; color: #6b7280; margin-left: auto;
`;
const RevTier = styled.div`
  padding: 0.25rem 0.4rem;
  background: ${(p) => p.$unlocked ? '#200d30' : '#0a0a0a'};
  border: 1px solid ${(p) => p.$unlocked ? '#7a30aa' : '#1e1e1e'};
  border-radius: 0.25rem;
  margin-bottom: 0.2rem;
`;
const RevTierHeader = styled.div`
  display: flex; align-items: center; gap: 0.4rem;
`;
const RevTierBadge = styled.span`
  font-size: 0.65rem; font-weight: 700;
  color: ${(p) => p.$unlocked ? '#d070ff' : '#4b5563'};
  background: ${(p) => p.$unlocked ? '#2d0d40' : '#111'};
  border: 1px solid ${(p) => p.$unlocked ? '#7a30aa' : '#2a2a2a'};
  padding: 0.1rem 0.35rem; border-radius: 9999px;
`;
const RevTierName = styled.span`
  font-size: 0.74rem; font-weight: 700;
  color: ${(p) => p.$unlocked ? '#e5e7eb' : '#4b5563'};
`;
const RevTierPts = styled.span`font-size: 0.65rem; color: #6b7280; margin-left: auto;`;

/* ── Gem Atelier ── */

const GemDomainRow = styled.div`display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;`;
const GemDomainLabel = styled.span`
  font-size: 0.72rem; font-weight: 600; flex: 0 0 52px;
  color: ${(p) => QUADRANT_CONFIG[p.$q]?.colors.node || '#e5e7eb'};
`;
const GemSlot = styled.button`
  flex: 1; min-height: 28px;
  background: ${(p) => p.$filled ? '#1a1a1a' : 'transparent'};
  border: 1px dashed ${(p) =>
    p.$filled ? (QUADRANT_CONFIG[p.$q]?.colors.bright || '#374151') : '#374151'};
  border-radius: 0.25rem;
  color: ${(p) => p.$filled ? '#f3f4f6' : '#4b5563'};
  font-size: 0.72rem; cursor: pointer; padding: 0.15rem 0.3rem; text-align: left;
  transition: all 0.15s;
  &:hover { border-color: #c8a020; color: #c8a020; }
`;
const GemTypeSelector = styled.div`display: flex; gap: 0.3rem; margin-bottom: 0.5rem;`;
const GemTypeBtn = styled.button`
  flex: 1; padding: 0.25rem;
  background: ${(p) => p.$active ? '#2a2000' : 'transparent'};
  border: 1px solid ${(p) => p.$active ? '#c8a020' : '#374151'};
  border-radius: 0.25rem;
  color: ${(p) => p.$active ? '#c8a020' : '#6b7280'};
  font-size: 0.68rem; cursor: pointer; transition: all 0.15s;
`;
const GemModSelect = styled.select`
  width: 100%; padding: 0.3rem; background: #111; border: 1px solid #374151;
  border-radius: 0.25rem; color: #e5e7eb; font-size: 0.72rem; margin-top: 0.3rem;
`;
const GemGradeRow = styled.div`display: flex; gap: 0.3rem; margin-top: 0.3rem;`;
const GradeBtn = styled.button`
  flex: 1; padding: 0.2rem;
  background: ${(p) => p.$active ? '#2a2000' : 'transparent'};
  border: 1px solid ${(p) => p.$active ? '#c8a020' : '#374151'};
  border-radius: 0.2rem;
  color: ${(p) => p.$active ? '#e8c030' : '#6b7280'};
  font-size: 0.68rem; cursor: pointer;
`;
const RemoveGemBtn = styled.button`
  padding: 0.15rem 0.4rem; background: transparent; border: 1px solid #7a0000;
  border-radius: 0.25rem; color: #ff6060; font-size: 0.68rem; cursor: pointer; margin-top: 0.3rem;
  &:hover { background: #3a0000; }
`;

// ─── Gem helpers ──────────────────────────────────────────────────────────────

const QUADRANT_KEYS = ['topLeft', 'topRight', 'bottomRight', 'bottomLeft'];
const emptyGem = () => ({ type: null, slots: [null, null, null] });
const initialGems = Object.fromEntries(QUADRANT_KEYS.map((q) => [q, emptyGem()]));

// ─── Component ────────────────────────────────────────────────────────────────

const WheelInfoPanel = ({ build, selectedSliceId, availablePoints = 0, onAllocatePoints }) => {
  const [gems,       setGems]       = useState(initialGems);
  const [editingGem, setEditingGem] = useState(null); // { quadrant, slotIndex }

  if (!build) return null;

  const { vocation, slicePoints = {}, points } = build;
  const used  = points.used  || 0;
  const total = points.total || 0;
  const avail = total - used;

  // Selected slice
  const slice   = selectedSliceId != null ? getSliceById(selectedSliceId) : null;
  const current = slice ? (slicePoints[slice.id] || 0) : 0;
  const isMaxed = slice ? current >= slice.maxPoints : false;
  const canAdd  = slice ? (availablePoints > 0 && current < slice.maxPoints && isSliceUnlockable(slice, slicePoints)) : false;
  const canRemove = slice ? current > 0 : false;

  // Dedication perk info
  const dedPerk = slice ? DEDICATION_PERKS[slice.dedicationPerkId] : null;
  const dedDesc = dedPerk ? formatDedicationPerk(slice.dedicationPerkId, vocation) : null;

  // Conviction perk info
  const convPerkId = slice && slice.convictionByVocation ? slice.convictionByVocation[vocation] : null;
  const convPerk   = convPerkId != null ? CONVICTION_PERKS[convPerkId] : null;

  // Quadrant color for slice bar
  const sliceColor = slice
    ? `linear-gradient(90deg, ${QUADRANT_CONFIG[slice.quadrant]?.colors.mid}, ${QUADRANT_CONFIG[slice.quadrant]?.colors.bright})`
    : undefined;

  // ── Gem actions ──────────────────────────────────────────────────────────
  const assignGemType = (q, gemType) => {
    setGems((prev) => ({
      ...prev,
      [q]: { type: gemType, slots: Array(GEM_CONFIG[gemType].slots).fill(null) },
    }));
    setEditingGem(null);
  };

  const setSlotMod = (q, slotIndex, modId) => {
    setGems((prev) => {
      const g = { ...prev[q], slots: [...prev[q].slots] };
      g.slots[slotIndex] = modId ? { modId, grade: 1 } : null;
      return { ...prev, [q]: g };
    });
  };

  const setSlotGrade = (q, slotIndex, grade) => {
    setGems((prev) => {
      const g = { ...prev[q], slots: [...prev[q].slots] };
      if (g.slots[slotIndex]) g.slots[slotIndex] = { ...g.slots[slotIndex], grade };
      return { ...prev, [q]: g };
    });
  };

  const removeGem = (q) => {
    setGems((prev) => ({ ...prev, [q]: emptyGem() }));
    setEditingGem(null);
  };

  return (
    <Panel>

      {/* ── Seleção ── */}
      <Section>
        <SectionTitle>Seleção</SectionTitle>
        <PointsRow><PLabel>Usados</PLabel><PValue $v="used">{used}</PValue></PointsRow>
        <PointsRow><PLabel>Total</PLabel><PValue>{total}</PValue></PointsRow>
        <PointsRow><PLabel>Disponíveis</PLabel><PValue $v="avail">{avail}</PValue></PointsRow>
        <PointsBar><PointsFill $u={used} $t={total} /></PointsBar>

        {/* Slice controls */}
        {slice ? (
          <SliceBar>
            <SliceBarHeader>
              <SliceName>
                Círculo {slice.circle} · {QUADRANT_CONFIG[slice.quadrant]?.label}
              </SliceName>
              <SliceProgress $maxed={isMaxed}>
                {current}/{slice.maxPoints}
              </SliceProgress>
            </SliceBarHeader>
            <SliceFillBar>
              <SliceFillInner $pct={(current / slice.maxPoints) * 100} $color={sliceColor} />
            </SliceFillBar>
            <AllocBtns>
              <AllocBtn $variant="remove" disabled={!canRemove}
                onClick={() => onAllocatePoints && onAllocatePoints(slice.id, -slice.maxPoints)}>
                -Max
              </AllocBtn>
              <AllocBtn $variant="remove" disabled={!canRemove}
                onClick={() => onAllocatePoints && onAllocatePoints(slice.id, -1)}>
                -1
              </AllocBtn>
              <AllocBtn $variant="add" disabled={!canAdd}
                onClick={() => onAllocatePoints && onAllocatePoints(slice.id, 1)}>
                +1
              </AllocBtn>
              <AllocBtn $variant="add" disabled={!canAdd}
                onClick={() => onAllocatePoints && onAllocatePoints(slice.id, slice.maxPoints)}>
                +Max
              </AllocBtn>
            </AllocBtns>
            {!isSliceUnlockable(slice, slicePoints) && (
              <SmallText style={{ marginTop: '0.4rem', color: '#7a3000' }}>
                Fatia bloqueada — complete uma fatia anterior primeiro.
              </SmallText>
            )}
          </SliceBar>
        ) : (
          <SmallText style={{ marginTop: '0.4rem' }}>
            Clique em uma fatia da roda para selecionar.
          </SmallText>
        )}
      </Section>

      {/* ── Informações ── */}
      <Section>
        <SectionTitle>Informações</SectionTitle>
        {slice ? (
          <>
            {/* Dedication perk */}
            {dedPerk && (
              <PerkBlock>
                <PerkLabel $type="dedication">Dedication Perk (por ponto)</PerkLabel>
                <PerkName>{dedPerk.name.replace(/_/g, ' ')}</PerkName>
                <PerkDesc>{dedDesc}</PerkDesc>
              </PerkBlock>
            )}

            <Divider />

            {/* Conviction perk */}
            <PerkBlock>
              <PerkLabel $type="conviction">Conviction Perk (ao completar)</PerkLabel>
              {convPerk ? (
                <>
                  <PerkName>{convPerk.name}</PerkName>
                  <PerkDesc>{convPerk.description}</PerkDesc>
                </>
              ) : (
                <PerkDesc style={{ color: '#6b7280' }}>
                  {vocation === 'monk' ? 'Dados do Monk pendentes.' : 'N/D para esta vocação.'}
                </PerkDesc>
              )}
            </PerkBlock>
          </>
        ) : (
          <Placeholder>Clique em uma fatia da roda para ver os detalhes.</Placeholder>
        )}
      </Section>

      {/* ── Revelation Perks — only unlocked stages ── */}
      <Section>
        <SectionTitle>Revelações</SectionTitle>
        {QUADRANT_KEYS.map((quadrant) => {
          const cfg    = QUADRANT_CONFIG[quadrant];
          const qTotal = calcQuadrantTotal(slicePoints, quadrant);
          const perkId = getRevelationPerkId(vocation, quadrant);
          const perk   = perkId != null ? REVELATION_PERKS[perkId] : null;

          // Next locked threshold (for progress hint)
          const nextTier = perk
            ? perk.tiers.find((t) => qTotal < t.points)
            : null;

          // Only show unlocked tiers
          const unlockedTiers = perk
            ? perk.tiers.filter((t) => qTotal >= t.points)
            : [];

          return (
            <QuadrantRev key={quadrant}>
              <QuadrantHeader>
                <QuadrantDot $color={cfg.colors.node} />
                <QuadrantLabel>{cfg.label}</QuadrantLabel>
                <QuadrantPoints>{qTotal} pts</QuadrantPoints>
              </QuadrantHeader>

              {perk ? (
                <>
                  {unlockedTiers.length === 0 && (
                    <SmallText>
                      {nextTier
                        ? `Próximo: ${perk.name} S1 em ${nextTier.points} pts (faltam ${nextTier.points - qTotal})`
                        : 'Nenhum estágio desbloqueado.'}
                    </SmallText>
                  )}

                  {unlockedTiers.map((tier, i) => (
                    <RevTier key={i} $unlocked>
                      <RevTierHeader>
                        <RevTierBadge $unlocked>S{i + 1}</RevTierBadge>
                        <RevTierName $unlocked>{perk.name}</RevTierName>
                        <RevTierPts>{tier.points} pts</RevTierPts>
                      </RevTierHeader>
                      <PerkDesc style={{ marginTop: '0.3rem', fontSize: '0.7rem' }}>
                        {tier.description}
                      </PerkDesc>
                    </RevTier>
                  ))}

                  {/* Next stage hint (if not all stages unlocked) */}
                  {unlockedTiers.length > 0 && nextTier && (
                    <SmallText style={{ marginTop: '0.25rem' }}>
                      S{unlockedTiers.length + 1} em {nextTier.points} pts
                      {' '}(faltam {nextTier.points - qTotal})
                    </SmallText>
                  )}
                </>
              ) : (
                <SmallText>
                  {vocation === 'monk' ? 'Dados do Monk pendentes.' : 'N/D para esta vocação.'}
                </SmallText>
              )}
            </QuadrantRev>
          );
        })}
      </Section>

      {/* ── Gem Atelier ── */}
      <Section>
        <SectionTitle>Gem Atelier</SectionTitle>
        {QUADRANT_KEYS.map((quadrant) => {
          const cfg       = QUADRANT_CONFIG[quadrant];
          const gem       = gems[quadrant];
          const isEditing = editingGem?.quadrant === quadrant;

          return (
            <div key={quadrant}>
              <GemDomainRow>
                <GemDomainLabel $q={quadrant}>{cfg.label}</GemDomainLabel>

                {gem.type ? (
                  gem.slots.map((slot, i) => {
                    const mod          = slot ? GEM_MODS.find((m) => m.id === slot.modId) : null;
                    const isEditingSlot = isEditing && editingGem.slotIndex === i;
                    return (
                      <GemSlot key={i} $filled={!!slot} $q={quadrant}
                        onClick={() => setEditingGem(isEditingSlot ? null : { quadrant, slotIndex: i })}>
                        {slot ? `${mod?.label || '?'} ${slot.grade > 1 ? `IV-${slot.grade}` : 'I'}` : `+ Mod ${i + 1}${i === 2 ? ' ✦' : ''}`}
                      </GemSlot>
                    );
                  })
                ) : (
                  <GemSlot $filled={false} $q={quadrant}
                    onClick={() => setEditingGem(isEditing ? null : { quadrant, slotIndex: -1 })}>
                    + Adicionar Gema
                  </GemSlot>
                )}
              </GemDomainRow>

              {isEditing && (
                <div style={{ paddingLeft: 56, marginBottom: '0.6rem' }}>
                  {editingGem.slotIndex === -1 ? (
                    <>
                      <SmallText style={{ marginBottom: '0.3rem' }}>Tipo de gema:</SmallText>
                      <GemTypeSelector>
                        {Object.entries(GEM_CONFIG).map(([type, cfg2]) => (
                          <GemTypeBtn key={type} $active={gem.type === type}
                            onClick={() => assignGemType(quadrant, type)}>
                            {cfg2.icon} {cfg2.label.replace(' Gem', '')}
                          </GemTypeBtn>
                        ))}
                      </GemTypeSelector>
                    </>
                  ) : (
                    <>
                      <SmallText>Mod do slot {editingGem.slotIndex + 1}{editingGem.slotIndex === 2 ? ' (Supreme)' : ''}:</SmallText>
                      <GemModSelect
                        value={gems[quadrant].slots[editingGem.slotIndex]?.modId || ''}
                        onChange={(e) => setSlotMod(quadrant, editingGem.slotIndex, e.target.value)}>
                        <option value="">— Sem mod —</option>
                        {GEM_MODS.filter((m) => editingGem.slotIndex < 2 ? !m.supreme : m.supreme).map((m) => (
                          <option key={m.id} value={m.id}>{m.label}</option>
                        ))}
                      </GemModSelect>
                      {gems[quadrant].slots[editingGem.slotIndex] && (
                        <>
                          <SmallText style={{ marginTop: '0.3rem' }}>Grade:</SmallText>
                          <GemGradeRow>
                            {[1, 2, 3, 4].map((g) => (
                              <GradeBtn key={g}
                                $active={gems[quadrant].slots[editingGem.slotIndex]?.grade === g}
                                onClick={() => setSlotGrade(quadrant, editingGem.slotIndex, g)}>
                                {g === 1 ? 'I' : g === 2 ? 'II' : g === 3 ? 'III' : 'IV'}
                              </GradeBtn>
                            ))}
                          </GemGradeRow>
                        </>
                      )}
                      <RemoveGemBtn onClick={() => removeGem(quadrant)}>Remover gema</RemoveGemBtn>
                    </>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </Section>
    </Panel>
  );
};

export default WheelInfoPanel;
