import styled from 'styled-components';

export const BuilderContainer = styled.div`
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  color: #e5e7eb;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const Header = styled.div`
  margin-bottom: 1.5rem;
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #f3f4f6;
  margin: 0 0 0.25rem 0;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const Subtitle = styled.p`
  font-size: 0.95rem;
  color: #9ca3af;
  margin: 0;
`;

/* Main layout: left (equipment grid + browser) | right (set manager + stats) */
export const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 1.5rem;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Card = styled.div`
  background: #1f2937;
  border: 1px solid #374151;
  border-radius: 8px;
  padding: 1.25rem;
`;

export const CardTitle = styled.h3`
  font-size: 0.9rem;
  font-weight: 600;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 1rem 0;
`;

export const CardHeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const CardSectionLabel = styled.span`
  font-size: 0.85rem;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

/* Equipment Grid (paper doll layout) */
export const EquipmentGridWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

export const GridRow = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
`;

export const SlotWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
`;

export const SlotLabel = styled.span`
  font-size: 0.65rem;
  color: #6b7280;
  text-align: center;
`;

export const EquipmentSlotBox = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 6px;
  border: 2px dashed ${({ $filled, $dragover }) =>
    $dragover ? '#60a5fa' : $filled ? '#4b5563' : '#374151'};
  background: ${({ $filled, $dragover }) =>
    $dragover ? '#1e3a5f' : $filled ? '#111827' : '#111827'};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: ${({ $filled }) => ($filled ? 'pointer' : 'default')};
  position: relative;
  transition: border-color 0.15s, background 0.15s;
  overflow: hidden;

  &:hover {
    border-color: ${({ $filled }) => ($filled ? '#6b7280' : '#374151')};
  }
`;

export const SlotIcon = styled.div`
  font-size: 1.5rem;
  opacity: 0.3;
  filter: grayscale(1);
`;

export const SlotItemName = styled.div`
  font-size: 0.6rem;
  color: #d1d5db;
  text-align: center;
  padding: 2px 4px;
  line-height: 1.2;
  word-break: break-word;
  max-width: 100%;
`;

export const SlotClearBtn = styled.button`
  position: absolute;
  top: 2px;
  right: 2px;
  background: #374151;
  border: none;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  font-size: 0.6rem;
  color: #9ca3af;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  padding: 0;
  opacity: 0;
  transition: opacity 0.15s;

  ${EquipmentSlotBox}:hover & {
    opacity: 1;
  }

  &:hover {
    background: #ef4444;
    color: #fff;
  }
`;

/* Item Browser */
export const BrowserSearch = styled.input`
  width: 100%;
  padding: 0.5rem 0.75rem;
  background: #111827;
  border: 1px solid #374151;
  border-radius: 6px;
  color: #e5e7eb;
  font-size: 0.875rem;
  outline: none;
  box-sizing: border-box;
  margin-bottom: 0.75rem;

  &:focus {
    border-color: #60a5fa;
  }

  &::placeholder {
    color: #6b7280;
  }
`;

export const SlotTabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 0.75rem;
`;

export const SlotTab = styled.button`
  padding: 0.25rem 0.6rem;
  background: ${({ $active }) => ($active ? '#2563eb' : '#1f2937')};
  border: 1px solid ${({ $active }) => ($active ? '#3b82f6' : '#374151')};
  border-radius: 4px;
  color: ${({ $active }) => ($active ? '#fff' : '#9ca3af')};
  font-size: 0.75rem;
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: ${({ $active }) => ($active ? '#1d4ed8' : '#374151')};
  }
`;

export const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  max-height: 280px;
  overflow-y: auto;

  /* scrollbar */
  &::-webkit-scrollbar { width: 6px; }
  &::-webkit-scrollbar-track { background: #111827; }
  &::-webkit-scrollbar-thumb { background: #374151; border-radius: 3px; }
`;

export const ItemRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.4rem 0.6rem;
  background: #111827;
  border: 1px solid ${({ $selected }) => ($selected ? '#3b82f6' : '#1f2937')};
  border-radius: 5px;
  cursor: grab;
  user-select: none;
  transition: border-color 0.1s, background 0.1s;

  &:hover {
    background: #1e293b;
    border-color: #4b5563;
  }

  &:active {
    cursor: grabbing;
  }
`;

export const ItemName = styled.span`
  font-size: 0.8rem;
  color: #e5e7eb;
`;

export const ItemStats = styled.span`
  font-size: 0.7rem;
  color: #6b7280;
  white-space: nowrap;
`;

export const EquipBtn = styled.button`
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  background: #2563eb;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  margin-left: 0.5rem;

  &:hover {
    background: #1d4ed8;
  }
`;

/* Set Manager */
export const SetNameInput = styled.input`
  width: 100%;
  padding: 0.5rem 0.75rem;
  background: #111827;
  border: 1px solid #374151;
  border-radius: 6px;
  color: #e5e7eb;
  font-size: 0.875rem;
  outline: none;
  box-sizing: border-box;
  margin-bottom: 0.5rem;

  &:focus {
    border-color: #60a5fa;
  }
`;

export const ButtonRow = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

export const ActionBtn = styled.button`
  flex: ${({ $compact }) => ($compact ? 'none' : '1')};
  min-width: ${({ $compact }) => ($compact ? 'auto' : '80px')};
  padding: ${({ $compact }) => ($compact ? '0.3rem 0.6rem' : '0.45rem 0.75rem')};
  border: none;
  border-radius: 6px;
  font-size: ${({ $compact }) => ($compact ? '0.75rem' : '0.8rem')};
  cursor: pointer;
  transition: background 0.15s;

  background: ${({ $variant }) => {
    if ($variant === 'danger') return '#dc2626';
    if ($variant === 'secondary') return '#374151';
    return '#2563eb';
  }};

  color: #fff;

  &:hover {
    background: ${({ $variant }) => {
      if ($variant === 'danger') return '#b91c1c';
      if ($variant === 'secondary') return '#4b5563';
      return '#1d4ed8';
    }};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const SavedSetsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  max-height: 220px;
  overflow-y: auto;

  &::-webkit-scrollbar { width: 6px; }
  &::-webkit-scrollbar-track { background: #111827; }
  &::-webkit-scrollbar-thumb { background: #374151; border-radius: 3px; }
`;

export const SavedSetRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0.6rem;
  background: #111827;
  border: 1px solid ${({ $active }) => ($active ? '#3b82f6' : '#1f2937')};
  border-radius: 5px;
  cursor: pointer;
  transition: border-color 0.1s;

  &:hover {
    border-color: #4b5563;
  }
`;

export const SavedSetName = styled.span`
  font-size: 0.85rem;
  color: #d1d5db;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const SetActions = styled.div`
  display: flex;
  gap: 0.25rem;
  flex-shrink: 0;
`;

export const IconBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0.15rem 0.3rem;
  border-radius: 4px;
  opacity: 0.6;

  &:hover {
    background: #374151;
    opacity: 1;
  }
`;

/* Stats Panel */
export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.4rem;
`;

export const StatRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.25rem 0;
  border-bottom: 1px solid #1f2937;
`;

export const StatLabel = styled.span`
  font-size: 0.78rem;
  color: #9ca3af;
`;

export const StatValue = styled.span`
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ $value }) => ($value > 0 ? '#34d399' : '#6b7280')};
`;

/* Messages */
export const SuccessMessage = styled.div`
  padding: 0.5rem 0.75rem;
  background: #065f46;
  border: 1px solid #059669;
  border-radius: 5px;
  color: #6ee7b7;
  font-size: 0.8rem;
  margin-top: 0.5rem;
`;

export const ErrorMessage = styled.div`
  padding: 0.5rem 0.75rem;
  background: #7f1d1d;
  border: 1px solid #dc2626;
  border-radius: 5px;
  color: #fca5a5;
  font-size: 0.8rem;
  margin-top: 0.5rem;
`;

/* Empty state */
export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  color: #6b7280;
  text-align: center;
`;

export const EmptyStateIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

export const EmptyStateText = styled.p`
  font-size: 1rem;
  margin: 0;
`;

export const UnsavedBadge = styled.span`
  font-size: 0.7rem;
  color: #f59e0b;
  margin-left: 0.5rem;
`;
