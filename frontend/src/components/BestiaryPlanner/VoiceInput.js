/**
 * VoiceInput Component
 * Voice recognition UI for hands-free bestiary updates
 *
 * Features:
 * - Start/stop recording with visual feedback
 * - Real-time transcript display
 * - Language selection (pt-BR, en-US)
 * - Browser compatibility warning
 * - Animated microphone icon
 */

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useVoiceRecognition } from '../../hooks/useVoiceRecognition';
import { parseVoiceCommand } from '../../utils/voiceParser';
import { BESTIARY_DATA } from '../../data/bestiary';
import {
  VoiceInputContainer,
  VoiceInputHeader,
  VoiceInputTitle,
  CloseButton,
  UnsupportedWarning,
  LanguageSelector,
  LanguageButton,
  MicrophoneSection,
  MicButton,
  MicIcon,
  TranscriptSection,
  TranscriptLabel,
  TranscriptText,
  InterimText,
  ActionButtons,
  ActionButton,
  HelpText,
} from './VoiceInput.styles';

const VoiceInput = ({ onClose, onRecognized }) => {
  const { t } = useTranslation();
  const [language, setLanguage] = useState('pt-BR');

  const {
    isListening,
    transcript,
    interimTranscript,
    isSupported,
    error,
    startListening,
    stopListening,
    resetTranscript,
  } = useVoiceRecognition({ language });

  const handleStartStop = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleProcess = () => {
    if (!transcript.trim()) return;

    // Parse voice command
    const result = parseVoiceCommand(transcript, BESTIARY_DATA);

    // Pass result to parent
    onRecognized(result);

    // Reset
    resetTranscript();
  };

  const handleCancel = () => {
    stopListening();
    resetTranscript();
    onClose();
  };

  const handleClear = () => {
    stopListening();
    resetTranscript();
  };

  // Browser not supported
  if (!isSupported) {
    return (
      <VoiceInputContainer>
        <VoiceInputHeader>
          <VoiceInputTitle>{t('bestiaryPlanner.voiceInput.title')}</VoiceInputTitle>
          <CloseButton onClick={handleCancel}>×</CloseButton>
        </VoiceInputHeader>

        <UnsupportedWarning>
          <span>⚠️</span>
          <div>
            <strong>{t('bestiaryPlanner.voiceInput.unsupported.title')}</strong>
            <p>{t('bestiaryPlanner.voiceInput.unsupported.description')}</p>
            <p>
              {t('bestiaryPlanner.voiceInput.unsupported.browsers')}: Chrome, Edge, Safari
            </p>
          </div>
        </UnsupportedWarning>

        <ActionButtons>
          <ActionButton onClick={handleCancel}>
            {t('bestiaryPlanner.voiceInput.close')}
          </ActionButton>
        </ActionButtons>
      </VoiceInputContainer>
    );
  }

  return (
    <VoiceInputContainer>
      <VoiceInputHeader>
        <VoiceInputTitle>{t('bestiaryPlanner.voiceInput.title')}</VoiceInputTitle>
        <CloseButton onClick={handleCancel}>×</CloseButton>
      </VoiceInputHeader>

      {/* Language Selector */}
      <LanguageSelector>
        <LanguageButton
          $active={language === 'pt-BR'}
          onClick={() => setLanguage('pt-BR')}
        >
          🇧🇷 Português
        </LanguageButton>
        <LanguageButton
          $active={language === 'en-US'}
          onClick={() => setLanguage('en-US')}
        >
          🇺🇸 English
        </LanguageButton>
      </LanguageSelector>

      {/* Microphone Section */}
      <MicrophoneSection>
        <MicButton onClick={handleStartStop} $isListening={isListening}>
          <MicIcon $isListening={isListening}>🎤</MicIcon>
        </MicButton>
        <p>
          {isListening
            ? t('bestiaryPlanner.voiceInput.listening')
            : t('bestiaryPlanner.voiceInput.clickToStart')}
        </p>
      </MicrophoneSection>

      {/* Transcript Section */}
      <TranscriptSection>
        <TranscriptLabel>{t('bestiaryPlanner.voiceInput.transcript')}</TranscriptLabel>
        {transcript || interimTranscript ? (
          <TranscriptText>
            {transcript}
            {interimTranscript && <InterimText>{interimTranscript}</InterimText>}
          </TranscriptText>
        ) : (
          <TranscriptText $empty>
            {t('bestiaryPlanner.voiceInput.noTranscript')}
          </TranscriptText>
        )}
      </TranscriptSection>

      {/* Error Display */}
      {error && (
        <UnsupportedWarning>
          <span>⚠️</span>
          <div>
            <strong>{t('bestiaryPlanner.voiceInput.error')}</strong>
            <p>{error}</p>
          </div>
        </UnsupportedWarning>
      )}

      {/* Help Text */}
      <HelpText>
        <strong>{t('bestiaryPlanner.voiceInput.examples.title')}</strong>
        <ul>
          <li>{t('bestiaryPlanner.voiceInput.examples.complete')}</li>
          <li>{t('bestiaryPlanner.voiceInput.examples.kills')}</li>
        </ul>
      </HelpText>

      {/* Action Buttons */}
      <ActionButtons>
        <ActionButton onClick={handleCancel} $variant="secondary">
          {t('bestiaryPlanner.voiceInput.cancel')}
        </ActionButton>
        <ActionButton onClick={handleClear} $variant="secondary" disabled={!transcript}>
          {t('bestiaryPlanner.voiceInput.clear')}
        </ActionButton>
        <ActionButton onClick={handleProcess} $variant="primary" disabled={!transcript.trim()}>
          {t('bestiaryPlanner.voiceInput.process')}
        </ActionButton>
      </ActionButtons>
    </VoiceInputContainer>
  );
};

export default VoiceInput;
