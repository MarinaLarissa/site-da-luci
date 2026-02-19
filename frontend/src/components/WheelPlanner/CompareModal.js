/**
 * Compare Modal Component
 * Compares two builds side-by-side with visual diff
 */

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

const Modal = styled.div`
  background: #1f2937;
  border-radius: 0.5rem;
  width: 100%;
  max-width: 1200px;
  max-height: 90vh;
  overflow-y: auto;
  border: 1px solid #374151;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #111827;
  }

  &::-webkit-scrollbar-thumb {
    background: #4b5563;
    border-radius: 4px;
  }
`;

const Header = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #374151;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #f3f4f6;
  margin: 0;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: #9ca3af;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  line-height: 1;

  &:hover {
    color: #f3f4f6;
  }
`;

const Body = styled.div`
  padding: 1.5rem;
`;

const BuildSelector = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SelectorGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #9ca3af;
`;

const Select = styled.select`
  padding: 0.75rem;
  background: #111827;
  border: 1px solid #374151;
  border-radius: 0.375rem;
  color: #f3f4f6;
  font-size: 0.875rem;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const ComparisonGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const BuildColumn = styled.div`
  background: #111827;
  border-radius: 0.5rem;
  padding: 1.5rem;
  border: 2px solid ${props => props.$active ? '#667eea' : '#374151'};
`;

const BuildTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #f3f4f6;
  margin: 0 0 1rem 0;
`;

const StatRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  background: #1f2937;
  border-radius: 0.375rem;
  border-left: 3px solid ${props => {
    if (props.$diff > 0) return '#10b981'; // Better (green)
    if (props.$diff < 0) return '#ef4444'; // Worse (red)
    return '#6b7280'; // Same (gray)
  }};
`;

const StatLabel = styled.span`
  font-size: 0.875rem;
  color: #9ca3af;
`;

const StatValue = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${props => {
    if (props.$diff > 0) return '#10b981';
    if (props.$diff < 0) return '#ef4444';
    return '#f3f4f6';
  }};
`;

const DiffBadge = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  margin-left: 0.5rem;
  background: ${props => {
    if (props.$diff > 0) return '#10b981';
    if (props.$diff < 0) return '#ef4444';
    return 'transparent';
  }};
  color: #fff;
`;

const SectionTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: #f3f4f6;
  margin: 1.5rem 0 0.75rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #374151;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: #9ca3af;
`;

const CompareModal = ({ builds, currentBuild, onClose }) => {
  const { t } = useTranslation();
  const [build1Id, setBuild1Id] = useState(currentBuild?.id || builds[0]?.id);
  const [build2Id, setBuild2Id] = useState(builds.find(b => b.id !== build1Id)?.id);

  const build1 = builds.find(b => b.id === build1Id) || currentBuild;
  const build2 = builds.find(b => b.id === build2Id);

  if (!build1 || !build2) {
    return (
      <Overlay onClick={onClose}>
        <Modal onClick={(e) => e.stopPropagation()}>
          <Header>
            <Title>{t('wheelPlanner.compare.title') || 'Compare Builds'}</Title>
            <CloseButton onClick={onClose}>×</CloseButton>
          </Header>
          <Body>
            <EmptyState>
              {t('wheelPlanner.compare.selectTwo') || 'Please select two builds to compare'}
            </EmptyState>
          </Body>
        </Modal>
      </Overlay>
    );
  }

  // Calculate differences
  const calculateDiff = (val1, val2) => val1 - val2;

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>{t('wheelPlanner.compare.title') || 'Compare Builds'}</Title>
          <CloseButton onClick={onClose}>×</CloseButton>
        </Header>

        <Body>
          {/* Build Selectors */}
          <BuildSelector>
            <SelectorGroup>
              <Label>{t('wheelPlanner.compare.build1') || 'Build 1'}</Label>
              <Select value={build1Id} onChange={(e) => setBuild1Id(e.target.value)}>
                {builds.map((build) => (
                  <option key={build.id} value={build.id}>
                    {build.name}
                  </option>
                ))}
              </Select>
            </SelectorGroup>
            <SelectorGroup>
              <Label>{t('wheelPlanner.compare.build2') || 'Build 2'}</Label>
              <Select value={build2Id} onChange={(e) => setBuild2Id(e.target.value)}>
                {builds.map((build) => (
                  <option key={build.id} value={build.id}>
                    {build.name}
                  </option>
                ))}
              </Select>
            </SelectorGroup>
          </BuildSelector>

          {/* Comparison Grid */}
          <ComparisonGrid>
            {/* Build 1 */}
            <BuildColumn $active>
              <BuildTitle>{build1.name}</BuildTitle>

              <SectionTitle>{t('wheelPlanner.compare.basic') || 'Basic Stats'}</SectionTitle>
              <StatRow $diff={0}>
                <StatLabel>{t('wheelPlanner.stats.hp') || 'HP'}</StatLabel>
                <StatValue $diff={calculateDiff(build1.stats.hp, build2.stats.hp)}>
                  +{build1.stats.hp}
                  {calculateDiff(build1.stats.hp, build2.stats.hp) !== 0 && (
                    <DiffBadge $diff={calculateDiff(build1.stats.hp, build2.stats.hp)}>
                      {calculateDiff(build1.stats.hp, build2.stats.hp) > 0 ? '+' : ''}
                      {calculateDiff(build1.stats.hp, build2.stats.hp)}
                    </DiffBadge>
                  )}
                </StatValue>
              </StatRow>

              <StatRow $diff={0}>
                <StatLabel>{t('wheelPlanner.stats.mana') || 'Mana'}</StatLabel>
                <StatValue $diff={calculateDiff(build1.stats.mana, build2.stats.mana)}>
                  +{build1.stats.mana}
                  {calculateDiff(build1.stats.mana, build2.stats.mana) !== 0 && (
                    <DiffBadge $diff={calculateDiff(build1.stats.mana, build2.stats.mana)}>
                      {calculateDiff(build1.stats.mana, build2.stats.mana) > 0 ? '+' : ''}
                      {calculateDiff(build1.stats.mana, build2.stats.mana)}
                    </DiffBadge>
                  )}
                </StatValue>
              </StatRow>

              <SectionTitle>{t('wheelPlanner.stats.resistances') || 'Resistances'}</SectionTitle>
              {Object.entries(build1.stats.resistances).map(([element, value]) => {
                const diff = calculateDiff(value, build2.stats.resistances[element]);
                return (
                  <StatRow key={element} $diff={diff}>
                    <StatLabel>{element}</StatLabel>
                    <StatValue $diff={diff}>
                      {value > 0 ? '+' : ''}{value}%
                      {diff !== 0 && (
                        <DiffBadge $diff={diff}>
                          {diff > 0 ? '+' : ''}{diff}%
                        </DiffBadge>
                      )}
                    </StatValue>
                  </StatRow>
                );
              })}
            </BuildColumn>

            {/* Build 2 */}
            <BuildColumn>
              <BuildTitle>{build2.name}</BuildTitle>

              <SectionTitle>{t('wheelPlanner.compare.basic') || 'Basic Stats'}</SectionTitle>
              <StatRow $diff={0}>
                <StatLabel>{t('wheelPlanner.stats.hp') || 'HP'}</StatLabel>
                <StatValue $diff={calculateDiff(build2.stats.hp, build1.stats.hp)}>
                  +{build2.stats.hp}
                  {calculateDiff(build2.stats.hp, build1.stats.hp) !== 0 && (
                    <DiffBadge $diff={calculateDiff(build2.stats.hp, build1.stats.hp)}>
                      {calculateDiff(build2.stats.hp, build1.stats.hp) > 0 ? '+' : ''}
                      {calculateDiff(build2.stats.hp, build1.stats.hp)}
                    </DiffBadge>
                  )}
                </StatValue>
              </StatRow>

              <StatRow $diff={0}>
                <StatLabel>{t('wheelPlanner.stats.mana') || 'Mana'}</StatLabel>
                <StatValue $diff={calculateDiff(build2.stats.mana, build1.stats.mana)}>
                  +{build2.stats.mana}
                  {calculateDiff(build2.stats.mana, build1.stats.mana) !== 0 && (
                    <DiffBadge $diff={calculateDiff(build2.stats.mana, build1.stats.mana)}>
                      {calculateDiff(build2.stats.mana, build1.stats.mana) > 0 ? '+' : ''}
                      {calculateDiff(build2.stats.mana, build1.stats.mana)}
                    </DiffBadge>
                  )}
                </StatValue>
              </StatRow>

              <SectionTitle>{t('wheelPlanner.stats.resistances') || 'Resistances'}</SectionTitle>
              {Object.entries(build2.stats.resistances).map(([element, value]) => {
                const diff = calculateDiff(value, build1.stats.resistances[element]);
                return (
                  <StatRow key={element} $diff={diff}>
                    <StatLabel>{element}</StatLabel>
                    <StatValue $diff={diff}>
                      {value > 0 ? '+' : ''}{value}%
                      {diff !== 0 && (
                        <DiffBadge $diff={diff}>
                          {diff > 0 ? '+' : ''}{diff}%
                        </DiffBadge>
                      )}
                    </StatValue>
                  </StatRow>
                );
              })}
            </BuildColumn>
          </ComparisonGrid>
        </Body>
      </Modal>
    </Overlay>
  );
};

export default CompareModal;
