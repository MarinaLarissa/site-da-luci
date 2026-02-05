/**
 * ImageQualityValidator Component
 * Validates image quality before OCR processing and provides feedback
 */

import { useState, useEffect, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { analyzeImageQuality } from '../../../utils/imageQualityUtils';
import {
  ValidatorContainer,
  ValidatorHeader,
  ValidatorTitle,
  OverallScore,
  ChecksList,
  CheckItem,
  CheckInfo,
  CheckName,
  CheckStatus,
  CheckMessage,
  CheckScore,
  SuggestionsList,
  SuggestionsTitle,
  Suggestion,
  ActionsRow,
  ProceedButton,
  RetakeButton,
  AnalyzingMessage,
} from './ImageQualityValidator.styles';

const ImageQualityValidator = ({ imageFile, onProceed, onRetake }) => {
  const { t } = useTranslation();
  const [analyzing, setAnalyzing] = useState(true);
  const [qualityReport, setQualityReport] = useState(null);

  useEffect(() => {
    const analyzeImage = async () => {
      if (!imageFile) return;

      setAnalyzing(true);

      try {
        const report = await analyzeImageQuality(imageFile);
        setQualityReport(report);
      } catch (error) {
        console.error('Quality analysis failed:', error);
        // If analysis fails, allow proceeding anyway
        setQualityReport({
          overallScore: 50,
          passed: true,
          checks: {},
          suggestions: ['Quality check failed - proceeding with caution'],
        });
      } finally {
        setAnalyzing(false);
      }
    };

    analyzeImage();
  }, [imageFile]);

  if (analyzing) {
    return (
      <ValidatorContainer $passed={true}>
        <AnalyzingMessage>
          {t('bestiaryPlanner.screenshot.qualityCheck.analyzing')}
        </AnalyzingMessage>
      </ValidatorContainer>
    );
  }

  if (!qualityReport) return null;

  const { overallScore, passed, checks, suggestions } = qualityReport;

  return (
    <ValidatorContainer $passed={passed}>
      <ValidatorHeader>
        <ValidatorTitle>
          {t('bestiaryPlanner.screenshot.qualityCheck.title')}
        </ValidatorTitle>
        <OverallScore $score={overallScore}>
          {t('bestiaryPlanner.screenshot.qualityCheck.score', { score: overallScore })}
        </OverallScore>
      </ValidatorHeader>

      <ChecksList>
        {checks.resolution && (
          <CheckItem $passed={checks.resolution.passed}>
            <CheckInfo>
              <CheckName>
                {t('bestiaryPlanner.screenshot.qualityCheck.resolution')}
                <CheckStatus $passed={checks.resolution.passed}>
                  {checks.resolution.passed
                    ? t('bestiaryPlanner.screenshot.qualityCheck.passed')
                    : t('bestiaryPlanner.screenshot.qualityCheck.failed')}
                </CheckStatus>
              </CheckName>
              <CheckMessage>{checks.resolution.message}</CheckMessage>
            </CheckInfo>
            <CheckScore $score={checks.resolution.score}>
              {checks.resolution.score}%
            </CheckScore>
          </CheckItem>
        )}

        {checks.brightness && (
          <CheckItem $passed={checks.brightness.passed}>
            <CheckInfo>
              <CheckName>
                {t('bestiaryPlanner.screenshot.qualityCheck.brightness')}
                <CheckStatus $passed={checks.brightness.passed}>
                  {checks.brightness.passed
                    ? t('bestiaryPlanner.screenshot.qualityCheck.passed')
                    : t('bestiaryPlanner.screenshot.qualityCheck.failed')}
                </CheckStatus>
              </CheckName>
              <CheckMessage>{checks.brightness.message}</CheckMessage>
            </CheckInfo>
            <CheckScore $score={checks.brightness.score}>
              {checks.brightness.score}%
            </CheckScore>
          </CheckItem>
        )}

        {checks.contrast && (
          <CheckItem $passed={checks.contrast.passed}>
            <CheckInfo>
              <CheckName>
                {t('bestiaryPlanner.screenshot.qualityCheck.contrast')}
                <CheckStatus $passed={checks.contrast.passed}>
                  {checks.contrast.passed
                    ? t('bestiaryPlanner.screenshot.qualityCheck.passed')
                    : t('bestiaryPlanner.screenshot.qualityCheck.failed')}
                </CheckStatus>
              </CheckName>
              <CheckMessage>{checks.contrast.message}</CheckMessage>
            </CheckInfo>
            <CheckScore $score={checks.contrast.score}>
              {checks.contrast.score}%
            </CheckScore>
          </CheckItem>
        )}

        {checks.blur && (
          <CheckItem $passed={checks.blur.passed}>
            <CheckInfo>
              <CheckName>
                {t('bestiaryPlanner.screenshot.qualityCheck.sharpness')}
                <CheckStatus $passed={checks.blur.passed}>
                  {checks.blur.passed
                    ? t('bestiaryPlanner.screenshot.qualityCheck.passed')
                    : t('bestiaryPlanner.screenshot.qualityCheck.failed')}
                </CheckStatus>
              </CheckName>
              <CheckMessage>{checks.blur.message}</CheckMessage>
            </CheckInfo>
            <CheckScore $score={checks.blur.score}>
              {checks.blur.score}%
            </CheckScore>
          </CheckItem>
        )}
      </ChecksList>

      {suggestions.length > 0 && (
        <SuggestionsList>
          <SuggestionsTitle>
            {t('bestiaryPlanner.screenshot.qualityCheck.suggestions')}
          </SuggestionsTitle>
          {suggestions.map((suggestion, index) => (
            <Suggestion key={index}>{suggestion}</Suggestion>
          ))}
        </SuggestionsList>
      )}

      {!passed && (
        <div style={{ marginBottom: '1rem', padding: '0.75rem', background: '#7f1d1d', borderRadius: '8px' }}>
          <p style={{ margin: 0, fontSize: '0.875rem', color: '#fecaca' }}>
            ⚠️ {t('bestiaryPlanner.screenshot.qualityCheck.warning')}
          </p>
        </div>
      )}

      <ActionsRow>
        <RetakeButton onClick={onRetake}>
          {t('bestiaryPlanner.screenshot.qualityCheck.retake')}
        </RetakeButton>
        <ProceedButton onClick={onProceed}>
          {passed
            ? t('bestiaryPlanner.screenshot.processButton')
            : t('bestiaryPlanner.screenshot.qualityCheck.proceedAnyway')}
        </ProceedButton>
      </ActionsRow>
    </ValidatorContainer>
  );
};

export default memo(ImageQualityValidator);
