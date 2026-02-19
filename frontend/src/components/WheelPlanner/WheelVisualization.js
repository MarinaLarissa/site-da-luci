/**
 * WheelVisualization — circular Tibia-style Wheel of Destiny
 *
 * Layout:
 *   Header → vocation indicator + points used
 *   Left   → TibiaWheel SVG (interactive slices)
 *   Right  → WheelInfoPanel (Seleção + Informações + Gem Atelier)
 */
import { useState } from 'react';
import styled from 'styled-components';
import TibiaWheel from './TibiaWheel';
import WheelInfoPanel from './WheelInfoPanel';

// ─── Styled ───────────────────────────────────────────────────────────────────

const Container = styled.div`
  margin: 0.5rem 0;
`;

const WheelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  padding: 0.5rem 0.75rem;
  background: #0f0f0f;
  border: 1px solid #2a2a2a;
  border-radius: 0.4rem;
`;

const VocationLabel = styled.span`
  font-size: 0.8rem;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  strong { color: #c8a020; text-transform: capitalize; }
`;

const PointsUsed = styled.span`
  font-size: 0.8rem;
  color: #9ca3af;
  strong { color: #e8c030; }
`;

const WheelLayout = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;
  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
  }
`;

const WheelWrapper = styled.div`
  flex: 0 0 auto;
  width: min(500px, 100%);
`;

const PanelWrapper = styled.div`
  flex: 1;
  min-width: 0;
`;

// ─── Component ────────────────────────────────────────────────────────────────

const WheelVisualization = ({ build, onAllocatePoints }) => {
  const [selectedSliceId, setSelectedSliceId] = useState(null);

  if (!build) return null;

  const { vocation, slicePoints = {}, points } = build;
  const used            = points.used  || 0;
  const total           = points.total || 0;
  const availablePoints = total - used;

  const handleSliceClick = (sliceId) => {
    // Toggle selection: clicking the already-selected slice deselects it
    setSelectedSliceId((prev) => (prev === sliceId ? null : sliceId));
  };

  return (
    <Container>
      <WheelHeader>
        <VocationLabel>
          Vocação: <strong>{vocation}</strong>
        </VocationLabel>
        <PointsUsed>
          Pontos usados: <strong>{used}</strong>/{total}
        </PointsUsed>
      </WheelHeader>

      <WheelLayout>
        <WheelWrapper>
          <TibiaWheel
            vocation={vocation}
            slicePoints={slicePoints}
            availablePoints={availablePoints}
            onSliceClick={handleSliceClick}
            selectedSliceId={selectedSliceId}
          />
        </WheelWrapper>

        <PanelWrapper>
          <WheelInfoPanel
            build={build}
            selectedSliceId={selectedSliceId}
            availablePoints={availablePoints}
            onAllocatePoints={onAllocatePoints}
          />
        </PanelWrapper>
      </WheelLayout>
    </Container>
  );
};

export default WheelVisualization;
