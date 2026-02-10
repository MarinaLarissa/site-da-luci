import styled, { keyframes } from 'styled-components';

// Animations
const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
`;

const ripple = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(102, 126, 234, 0.7);
  }
  70% {
    box-shadow: 0 0 0 20px rgba(102, 126, 234, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(102, 126, 234, 0);
  }
`;

export const VoiceInputContainer = styled.div`
  background: #1f2937;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  max-width: 500px;
  width: 100%;
`;

export const VoiceInputHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const VoiceInputTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #f3f4f6;
  margin: 0;
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: #9ca3af;
  font-size: 2rem;
  cursor: pointer;
  padding: 0;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
  transition: all 0.2s;

  &:hover {
    background: #374151;
    color: #f3f4f6;
  }
`;

export const UnsupportedWarning = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 0.5rem;
  margin-bottom: 1rem;

  span {
    font-size: 1.5rem;
  }

  div {
    flex: 1;
  }

  strong {
    color: #fca5a5;
    display: block;
    margin-bottom: 0.25rem;
  }

  p {
    color: #d1d5db;
    font-size: 0.875rem;
    margin: 0.25rem 0;
  }
`;

export const LanguageSelector = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

export const LanguageButton = styled.button`
  flex: 1;
  padding: 0.625rem 1rem;
  background: ${(props) => (props.$active ? '#667eea' : '#374151')};
  border: 1px solid ${(props) => (props.$active ? '#667eea' : '#4b5563')};
  border-radius: 0.5rem;
  color: ${(props) => (props.$active ? '#fff' : '#9ca3af')};
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${(props) => (props.$active ? '#5568d3' : '#4b5563')};
    border-color: ${(props) => (props.$active ? '#5568d3' : '#667eea')};
  }
`;

export const MicrophoneSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem 0;

  p {
    color: #d1d5db;
    font-size: 0.875rem;
    margin: 0;
  }
`;

export const MicButton = styled.button`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  border: none;
  background: ${(props) => (props.$isListening ? '#ef4444' : '#667eea')};
  color: #fff;
  font-size: 2.5rem;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${(props) => (props.$isListening ? ripple : 'none')} 1.5s infinite;

  &:hover {
    background: ${(props) => (props.$isListening ? '#dc2626' : '#5568d3')};
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const MicIcon = styled.span`
  animation: ${(props) => (props.$isListening ? pulse : 'none')} 1s ease-in-out infinite;
`;

export const TranscriptSection = styled.div`
  margin-bottom: 1.5rem;
`;

export const TranscriptLabel = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #d1d5db;
  margin-bottom: 0.5rem;
`;

export const TranscriptText = styled.div`
  background: #111827;
  border: 1px solid #374151;
  border-radius: 0.5rem;
  padding: 1rem;
  min-height: 80px;
  max-height: 150px;
  overflow-y: auto;
  color: ${(props) => (props.$empty ? '#6b7280' : '#f3f4f6')};
  font-size: 0.875rem;
  line-height: 1.5;
  font-style: ${(props) => (props.$empty ? 'italic' : 'normal')};

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #1f2937;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: #4b5563;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #6b7280;
  }
`;

export const InterimText = styled.span`
  color: #9ca3af;
  font-style: italic;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
`;

export const ActionButton = styled.button`
  padding: 0.625rem 1.25rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  ${(props) => {
    if (props.$variant === 'primary') {
      return `
        background: #667eea;
        color: #fff;

        &:hover:not(:disabled) {
          background: #5568d3;
        }
      `;
    }
    return `
      background: #374151;
      color: #d1d5db;

      &:hover:not(:disabled) {
        background: #4b5563;
      }
    `;
  }}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }
`;

export const HelpText = styled.div`
  background: rgba(102, 126, 234, 0.1);
  border: 1px solid rgba(102, 126, 234, 0.3);
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1.5rem;

  strong {
    color: #a5b4fc;
    font-size: 0.875rem;
    display: block;
    margin-bottom: 0.5rem;
  }

  ul {
    margin: 0;
    padding-left: 1.5rem;
    color: #d1d5db;
    font-size: 0.8125rem;
    line-height: 1.6;

    li {
      margin-bottom: 0.25rem;
    }
  }
`;
