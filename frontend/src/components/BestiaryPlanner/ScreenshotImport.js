/**
 * ScreenshotImport Component
 * Allows users to upload bestiary screenshots and auto-complete creatures via OCR
 */

import { useState, useCallback, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { extractTextFromImage, validateBestiaryScreenshot } from '../../services/ocrService';
import { parseOcrText } from '../../utils/bestiaryOcrParser';
import {
  ImportContainer,
  UploadZone,
  UploadIcon,
  UploadText,
  UploadHint,
  PreviewContainer,
  PreviewImage,
  PreviewActions,
  ProcessButton,
  ClearButton,
  ProgressBar,
  ProgressFill,
  ProgressText,
  ResultsContainer,
  ResultsHeader,
  ResultsTitle,
  ResultsSummary,
  MatchedList,
  MatchedItem,
  CreatureName,
  SimilarityBadge,
  ConfirmButton,
  UnmatchedList,
  UnmatchedItem,
  ErrorMessage,
} from './ScreenshotImport.styles';

const ScreenshotImport = ({ characterId, onCreaturesImported }) => {
  const { t } = useTranslation();
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [croppedPreview, setCroppedPreview] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [ocrResults, setOcrResults] = useState(null);
  const [error, setError] = useState(null);

  // Process selected file
  const handleFile = useCallback((file) => {
    if (!file || !file.type.startsWith('image/')) {
      setError(t('bestiaryPlanner.screenshot.invalidFile'));
      return;
    }

    setImageFile(file);
    setError(null);
    setOcrResults(null);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);
  }, [t]);

  // Handle file drop
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files[0];
    handleFile(file);
  }, [handleFile]);

  // Handle file selection
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  // Process OCR
  const handleProcessOcr = async () => {
    if (!imageFile) return;

    setIsProcessing(true);
    setProgress(0);
    setError(null);
    setCroppedPreview(null);

    try {
      // Extract text from image (with color detection and precise crop)
      const result = await extractTextFromImage(imageFile, setProgress, true, true);

      if (!result.success) {
        setError(result.error || t('bestiaryPlanner.screenshot.ocrFailed'));
        setIsProcessing(false);
        return;
      }

      // Save cropped image preview (for debugging)
      if (result.processedImage) {
        setCroppedPreview(result.processedImage);
      }

      // Debug: Log OCR text in development
      if (process.env.NODE_ENV === 'development') {
        console.log('=== OCR DEBUG ===');
        console.log('Extracted text:', result.text);
        console.log('Confidence:', result.confidence);
        console.log('Text length:', result.text.length);
      }

      // Validate screenshot (isCropped = true with precise crop)
      if (!validateBestiaryScreenshot(result.text, true)) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Validation failed for text:', result.text);
        }
        setError(t('bestiaryPlanner.screenshot.notBestiaryScreenshot'));
        setIsProcessing(false);
        return;
      }

      // Parse creatures with stage detection
      const parsed = parseOcrText(result.text, 0.75);

      if (process.env.NODE_ENV === 'development') {
        console.log('Parsed results:', parsed);
        console.log('Matched creatures:', parsed.matched.length);
        console.log('Unmatched:', parsed.unmatched.length);
      }

      setOcrResults({
        matched: parsed.matched,
        unmatched: parsed.unmatched,
        totalFound: parsed.totalFound,
        confidence: result.confidence,
      });
    } catch (err) {
      console.error('OCR Processing Error:', err);
      setError(t('bestiaryPlanner.screenshot.processingError'));
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  // Confirm and import creatures
  const handleConfirmImport = () => {
    if (!ocrResults || !ocrResults.matched.length) return;

    // Only import creatures that are marked as complete (✓)
    // Creatures in stage 1/3 or 2/3 are not completed yet
    const creatureIds = ocrResults.matched
      .filter((m) => m.isComplete)
      .map((m) => m.creature.id);

    if (creatureIds.length === 0) {
      setError(t('bestiaryPlanner.screenshot.noCompleteCreatures'));
      return;
    }

    onCreaturesImported?.(creatureIds);

    // Reset state
    setImageFile(null);
    setImagePreview(null);
    setOcrResults(null);
  };

  // Clear upload
  const handleClear = () => {
    setImageFile(null);
    setImagePreview(null);
    setCroppedPreview(null);
    setOcrResults(null);
    setError(null);
    setProgress(0);
  };

  return (
    <ImportContainer>
      {!imagePreview && (
        <UploadZone
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => document.getElementById('screenshot-input').click()}
        >
          <UploadIcon>📷</UploadIcon>
          <UploadText>{t('bestiaryPlanner.screenshot.uploadTitle')}</UploadText>
          <UploadHint>{t('bestiaryPlanner.screenshot.uploadHint')}</UploadHint>
          <input
            id="screenshot-input"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleFileSelect}
          />
        </UploadZone>
      )}

      {imagePreview && !ocrResults && (
        <PreviewContainer>
          <PreviewImage src={imagePreview} alt="Screenshot preview" />
          <PreviewActions>
            <ProcessButton onClick={handleProcessOcr} disabled={isProcessing}>
              {isProcessing
                ? t('bestiaryPlanner.screenshot.processing')
                : t('bestiaryPlanner.screenshot.processButton')}
            </ProcessButton>
            <ClearButton onClick={handleClear} disabled={isProcessing}>
              {t('bestiaryPlanner.screenshot.clearButton')}
            </ClearButton>
          </PreviewActions>

          {isProcessing && (
            <ProgressBar>
              <ProgressFill $progress={progress} />
              <ProgressText>{progress}%</ProgressText>
            </ProgressBar>
          )}
        </PreviewContainer>
      )}

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {croppedPreview && process.env.NODE_ENV === 'development' && (
        <div style={{ marginTop: '1rem', padding: '1rem', border: '2px dashed #4b5563', borderRadius: '8px' }}>
          <p style={{ fontSize: '0.875rem', color: '#9ca3af', marginBottom: '0.5rem' }}>
            🔍 Preview da área processada (cropped + zoom 200%):
          </p>
          <PreviewImage src={croppedPreview} alt="Cropped preview" style={{ maxHeight: '300px' }} />
        </div>
      )}

      {ocrResults && (
        <ResultsContainer>
          <ResultsHeader>
            <ResultsTitle>{t('bestiaryPlanner.screenshot.resultsTitle')}</ResultsTitle>
            <ResultsSummary>
              {t('bestiaryPlanner.screenshot.foundCreatures', {
                matched: ocrResults.matched.length,
                total: ocrResults.totalFound,
              })}
            </ResultsSummary>
          </ResultsHeader>

          {ocrResults.matched.length > 0 && (
            <>
              <MatchedList>
                {ocrResults.matched.map((match, index) => (
                  <MatchedItem key={index}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1 }}>
                      <CreatureName>{match.creature.name}</CreatureName>
                      {match.stage && (
                        <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
                          {match.isComplete ? (
                            <span style={{ color: '#10b981' }}>
                              ✓ {t('bestiaryPlanner.screenshot.complete')}
                            </span>
                          ) : (
                            <span>
                              {t('bestiaryPlanner.screenshot.stage', { stage: match.stage })}
                              {match.minimumKills !== null && (
                                <> • {t('bestiaryPlanner.screenshot.minKills', { kills: match.minimumKills })}</>
                              )}
                            </span>
                          )}
                        </span>
                      )}
                    </div>
                    <SimilarityBadge $similarity={match.similarity}>
                      {Math.round(match.similarity * 100)}%
                    </SimilarityBadge>
                  </MatchedItem>
                ))}
              </MatchedList>

              <ConfirmButton onClick={handleConfirmImport}>
                {t('bestiaryPlanner.screenshot.confirmImport', {
                  count: ocrResults.matched.filter(m => m.isComplete).length,
                })}
              </ConfirmButton>
            </>
          )}

          {ocrResults.unmatched.length > 0 && (
            <UnmatchedList>
              <p>{t('bestiaryPlanner.screenshot.unmatchedTitle')}</p>
              {ocrResults.unmatched.map((unmatchedData, index) => (
                <UnmatchedItem key={index}>
                  {unmatchedData.name}
                  {unmatchedData.stage && (
                    <span style={{ fontSize: '0.75rem', color: '#9ca3af', marginLeft: '0.5rem' }}>
                      ({unmatchedData.isComplete ? '✓' : `${unmatchedData.stage}/3`})
                    </span>
                  )}
                </UnmatchedItem>
              ))}
            </UnmatchedList>
          )}

          <ClearButton onClick={handleClear}>
            {t('bestiaryPlanner.screenshot.tryAnother')}
          </ClearButton>
        </ResultsContainer>
      )}
    </ImportContainer>
  );
};

export default memo(ScreenshotImport);
