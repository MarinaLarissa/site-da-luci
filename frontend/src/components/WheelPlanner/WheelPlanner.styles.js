import styled from 'styled-components';

export const PlannerContainer = styled.div`
  padding: 2rem;
  max-width: 1600px;
  margin: 0 auto;
  color: #e5e7eb;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const Header = styled.div`
  margin-bottom: 2rem;
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #f3f4f6;
  margin: 0 0 0.5rem 0;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const Subtitle = styled.p`
  font-size: 1rem;
  color: #9ca3af;
  margin: 0;
`;

export const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

export const EditorSection = styled.div`
  background: #1f2937;
  border-radius: 0.5rem;
  padding: 1.5rem;
  border: 1px solid #374151;
`;

export const SidePanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const Card = styled.div`
  background: #1f2937;
  border-radius: 0.5rem;
  padding: 1.5rem;
  border: 1px solid #374151;
`;

export const CardTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #f3f4f6;
  margin: 0 0 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const BuildControls = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

export const VocationSelector = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const VocationButton = styled.button`
  padding: 0.75rem;
  background: ${props => props.$active ? '#667eea' : '#374151'};
  border: 1px solid ${props => props.$active ? '#667eea' : '#4b5563'};
  border-radius: 0.375rem;
  color: ${props => props.$active ? '#fff' : '#9ca3af'};
  font-size: 0.875rem;
  font-weight: ${props => props.$active ? '600' : '400'};
  cursor: pointer;
  transition: all 0.2s;
  text-transform: capitalize;

  &:hover {
    background: ${props => props.$active ? '#5a67d8' : '#4b5563'};
    border-color: ${props => props.$active ? '#5a67d8' : '#6b7280'};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const PointsDisplay = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: #111827;
  border-radius: 0.375rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
`;

export const PointsStat = styled.div`
  text-align: center;
`;

export const PointsLabel = styled.div`
  font-size: 0.75rem;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.25rem;
`;

export const PointsValue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => {
    if (props.$variant === 'available') return '#10b981';
    if (props.$variant === 'used') return '#667eea';
    return '#f3f4f6';
  }};
`;

export const InputGroup = styled.div`
  margin-bottom: 1rem;
`;

export const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #9ca3af;
  margin-bottom: 0.5rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  background: #111827;
  border: 1px solid #374151;
  border-radius: 0.375rem;
  color: #f3f4f6;
  font-size: 0.875rem;

  &:focus {
    outline: none;
    border-color: #667eea;
  }

  &::placeholder {
    color: #6b7280;
  }
`;

export const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background: ${props => {
    if (props.$variant === 'primary') return '#667eea';
    if (props.$variant === 'danger') return '#ef4444';
    if (props.$variant === 'success') return '#10b981';
    return '#374151';
  }};
  border: 1px solid ${props => {
    if (props.$variant === 'primary') return '#667eea';
    if (props.$variant === 'danger') return '#ef4444';
    if (props.$variant === 'success') return '#10b981';
    return '#4b5563';
  }};
  border-radius: 0.375rem;
  color: #fff;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  flex: ${props => props.$fullWidth ? '1' : 'none'};

  &:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: #9ca3af;
`;

export const EmptyStateIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

export const EmptyStateText = styled.p`
  font-size: 1rem;
  margin: 0;
`;

export const ErrorMessage = styled.div`
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 0.375rem;
  padding: 1rem;
  margin-bottom: 1rem;
  color: #991b1b;
  font-size: 0.875rem;
`;

export const SuccessMessage = styled.div`
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 0.375rem;
  padding: 1rem;
  margin-bottom: 1rem;
  color: #166534;
  font-size: 0.875rem;
`;

export const BuildList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-height: 400px;
  overflow-y: auto;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #111827;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #4b5563;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #6b7280;
  }
`;

export const BuildItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: ${props => props.$active ? '#111827' : '#374151'};
  border: 1px solid ${props => props.$active ? '#667eea' : '#4b5563'};
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #667eea;
    background: #111827;
  }
`;

export const BuildInfo = styled.div`
  flex: 1;
`;

export const BuildName = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  color: #f3f4f6;
  margin-bottom: 0.25rem;
`;

export const BuildMeta = styled.div`
  font-size: 0.75rem;
  color: #9ca3af;
  text-transform: capitalize;
`;

export const BuildActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const IconButton = styled.button`
  padding: 0.5rem;
  background: transparent;
  border: 1px solid #4b5563;
  border-radius: 0.375rem;
  color: #9ca3af;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: #4b5563;
    border-color: #6b7280;
    color: #f3f4f6;
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid #374151;
  margin: 1.5rem 0;
`;

export const Badge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: ${props => {
    if (props.$variant === 'success') return '#10b981';
    if (props.$variant === 'warning') return '#f59e0b';
    if (props.$variant === 'danger') return '#ef4444';
    return '#6b7280';
  }};
  color: #fff;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 9999px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;
