import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${({ theme }) => theme.spacing.md};
`;

export const Modal = styled.div`
  background-color: ${({ theme }) => theme.colors.bg.card};
  border-radius: ${({ theme }) => theme.radius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  width: 100%;
  max-width: 960px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.4);
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.secondary};
  flex-shrink: 0;
`;

export const ModalTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.25rem;
  line-height: 1;
  border-radius: ${({ theme }) => theme.radius.sm};

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
    background: ${({ theme }) => theme.colors.bg.secondary};
  }
`;

export const ScrollArea = styled.div`
  overflow-x: auto;
  overflow-y: auto;
  flex: 1;
  padding: ${({ theme }) => theme.spacing.lg};
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 480px;
`;

export const THead = styled.thead``;
export const TBody = styled.tbody``;

export const CreatureHeaderCell = styled.th`
  padding: ${({ theme }) => theme.spacing.md};
  text-align: center;
  border-bottom: 2px solid ${({ theme }) => theme.colors.border.primary};
  min-width: 160px;
  position: relative;
`;

export const CreatureHeaderImage = styled.img`
  width: 48px;
  height: 48px;
  object-fit: contain;
  display: block;
  margin: 0 auto 0.375rem;
`;

export const CreatureHeaderName = styled.div`
  font-size: 0.875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 0.25rem;
`;

export const RemoveCreatureButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.875rem;
  cursor: pointer;
  padding: 0.125rem 0.375rem;
  border-radius: ${({ theme }) => theme.radius.sm};

  &:hover {
    color: #ef4444;
    background: rgba(239, 68, 68, 0.1);
  }
`;

export const RowLabelCell = styled.td`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  font-size: 0.8rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.secondary};
  white-space: nowrap;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.secondary};
  background: ${({ theme }) => theme.colors.bg.secondary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const DataCell = styled.td`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  text-align: center;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text.primary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.secondary};
`;

export const DifficultyBadge = styled.span`
  padding: 0.2rem 0.5rem;
  border-radius: ${({ theme }) => theme.radius.full};
  font-size: 0.75rem;
  font-weight: 600;
  background: ${({ $difficulty }) => {
    switch ($difficulty) {
      case 'HARMLESS': return 'rgba(16,185,129,0.15)';
      case 'TRIVIAL':  return 'rgba(59,130,246,0.15)';
      case 'EASY':     return 'rgba(234,179,8,0.15)';
      case 'MEDIUM':   return 'rgba(249,115,22,0.15)';
      case 'HARD':     return 'rgba(239,68,68,0.15)';
      case 'CHALLENGING': return 'rgba(139,92,246,0.15)';
      default: return 'rgba(107,114,128,0.15)';
    }
  }};
  color: ${({ $difficulty }) => {
    switch ($difficulty) {
      case 'HARMLESS': return '#10b981';
      case 'TRIVIAL':  return '#3b82f6';
      case 'EASY':     return '#eab308';
      case 'MEDIUM':   return '#f97316';
      case 'HARD':     return '#ef4444';
      case 'CHALLENGING': return '#8b5cf6';
      default: return '#6b7280';
    }
  }};
`;

export const ResistanceValue = styled.span`
  font-weight: 600;
  color: ${({ $value }) => {
    if ($value < 100) return '#10b981'; // resistant — green
    if ($value > 100) return '#ef4444'; // weak — red
    return '#9ca3af';                   // neutral
  }};
`;

export const LocationChip = styled.span`
  display: inline-block;
  padding: 0.15rem 0.45rem;
  border-radius: ${({ theme }) => theme.radius.sm};
  font-size: 0.72rem;
  margin: 0.15rem;
  background: ${({ $shared, theme }) =>
    $shared ? 'rgba(102,126,234,0.2)' : theme.colors.bg.secondary};
  border: 1px solid ${({ $shared }) =>
    $shared ? '#667eea' : 'transparent'};
  color: ${({ $shared, theme }) =>
    $shared ? '#667eea' : theme.colors.text.secondary};
  font-weight: ${({ $shared }) => $shared ? 600 : 400};
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border.secondary};
  flex-shrink: 0;
`;

export const FooterButton = styled.button`
  padding: 0.625rem 1.25rem;
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.2s;

  background: ${({ $variant }) =>
    $variant === 'primary' ? 'linear-gradient(135deg, #667eea, #764ba2)' : '#374151'};
  color: ${({ $variant }) => $variant === 'primary' ? '#fff' : '#9ca3af'};
  border: ${({ $variant }) => $variant === 'primary' ? 'none' : '1px solid #4b5563'};

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`;

export const CompareFloatingButton = styled.button`
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: #fff;
  border: none;
  border-radius: ${({ theme }) => theme.radius.full};
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.5);
  z-index: 900;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(102, 126, 234, 0.6);
  }

  &:active {
    transform: scale(0.97);
  }
`;
