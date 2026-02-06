import styled from 'styled-components';

export const ExportContainer = styled.div`
  background: #111827;
  border-radius: 0.5rem;
  padding: 1.5rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const ExportHeader = styled.div`
  margin-bottom: 2rem;
`;

export const Title = styled.h3`
  margin: 0 0 0.5rem 0;
  color: #f3f4f6;
  font-size: 1.125rem;
  font-weight: 600;
`;

export const Subtitle = styled.p`
  margin: 0;
  color: #9ca3af;
  font-size: 0.875rem;
`;

export const ExportOptions = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

export const OptionGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
`;

export const OptionLabel = styled.label`
  color: #9ca3af;
  font-size: 0.875rem;
  font-weight: 500;
`;

export const Select = styled.select`
  padding: 0.75rem;
  background: #1f2937;
  color: #f3f4f6;
  border: 1px solid #374151;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #4b5563;
  }

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

export const FormatButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const FormatButton = styled.button`
  flex: 1;
  padding: 0.75rem;
  background: ${(props) => (props.active ? '#667eea' : '#1f2937')};
  color: ${(props) => (props.active ? 'white' : '#9ca3af')};
  border: 1px solid ${(props) => (props.active ? '#667eea' : '#374151')};
  border-radius: 0.375rem;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) => (props.active ? '#5568d3' : '#374151')};
    border-color: ${(props) => (props.active ? '#5568d3' : '#4b5563')};
  }
`;

export const PreviewSection = styled.div`
  margin-bottom: 2rem;
`;

export const PreviewLabel = styled.div`
  color: #9ca3af;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

export const PreviewBox = styled.div`
  background: #1f2937;
  border: 1px solid #374151;
  border-radius: 0.375rem;
  padding: 1rem;
  max-height: 200px;
  overflow-y: auto;

  pre {
    margin: 0;
    color: #9ca3af;
    font-size: 0.75rem;
    font-family: 'Courier New', monospace;
    white-space: pre-wrap;
    word-break: break-all;
  }

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #111827;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #374151;
    border-radius: 4px;

    &:hover {
      background: #4b5563;
    }
  }
`;

export const ExportActions = styled.div`
  display: flex;
  justify-content: center;
`;

export const ExportButton = styled.button`
  padding: 0.75rem 2rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: #5568d3;
  }

  &:disabled {
    background: #374151;
    color: #6b7280;
    cursor: not-allowed;
  }
`;

export const SuccessMessage = styled.div`
  margin-top: 1rem;
  padding: 0.75rem;
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.3);
  border-radius: 0.375rem;
  color: #22c55e;
  font-size: 0.875rem;
  text-align: center;
`;

export const ErrorMessage = styled.div`
  margin-top: 1rem;
  padding: 0.75rem;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 0.375rem;
  color: #ef4444;
  font-size: 0.875rem;
  text-align: center;
`;
