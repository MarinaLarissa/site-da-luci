/**
 * ScreenshotImport Component
 * Allows users to upload bestiary screenshots and auto-complete creatures via OCR
 */

import { useState, useCallback, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { validateBestiaryScreenshot, preprocessWithQualityCheck } from '../../services/ocrService';
import { parseOcrText, isTruncatedName, findAutocompleteCandidates } from '../../utils/bestiaryOcrParser';
import { calculateMinimumKills } from '../../utils/bestiaryStages';
import { useOcrWithRetry } from '../../hooks/useOcrWithRetry';
import useMultipleOcrProcessing from '../../hooks/useMultipleOcrProcessing';
import AutocompleteModal from './AutocompleteModal';
import ImageQualityValidator from './ScreenshotImport/ImageQualityValidator';
import CropPreviewModal from './ScreenshotImport/CropPreviewModal';
import {
  ImportContainer,
  UploadZone,
  UploadIcon,
  UploadText,
  UploadHint,
  PreviewContainer,
  PreviewImage,
  PreviewActions,
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
  ImageGrid,
  ImageItem,
  ImageProgress,
  StatusIcon,
  ImageFileName,
  GlobalProgressContainer,
  GlobalProgressText,
  ErrorSummary,
  ErrorTitle,
  ErrorList,
  ErrorItem,
  ErrorFileName,
  ErrorMessageText,
} from './ScreenshotImport.styles';

const ScreenshotImport = ({ characterId, onCreaturesImported }) => {
  const { t } = useTranslation();
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]); // Multiple previews
  const [croppedPreview, setCroppedPreview] = useState(null);
  const [cropRegion, setCropRegion] = useState(null);
  const [ocrResults, setOcrResults] = useState(null);
  const [error, setError] = useState(null);
  const [isMultipleMode, setIsMultipleMode] = useState(false);

  // New workflow states
  const [showQualityCheck, setShowQualityCheck] = useState(false);
  const [showCropPreview, setShowCropPreview] = useState(false);

  // Autocomplete states
  const [autocompleteQueue, setAutocompleteQueue] = useState([]);
  const [currentAutocomplete, setCurrentAutocomplete] = useState(null);
  const [isAutocompleteOpen, setIsAutocompleteOpen] = useState(false);

  // OCR with retry hook (single image)
  const {
    processOcr,
    isProcessing,
    progress,
    retryCount,
  } = useOcrWithRetry({
    maxRetries: 3,
    onProgress: (prog, retry) => {
      if (process.env.NODE_ENV === 'development') {
        console.log(`OCR Progress: ${prog}% (Attempt ${retry + 1})`);
      }
    },
    onError: (err, retry) => {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`OCR Attempt ${retry + 1} failed:`, err.message);
      }
    },
  });

  // Multiple OCR processing hook
  const {
    processMultiple,
    isProcessing: isProcessingMultiple,
    globalProgress,
    results: multipleResults,
    imageStatuses,
    cancel: cancelMultiple,
  } = useMultipleOcrProcessing({
    maxParallel: 3,
    onProgress: (progress, statuses) => {
      if (process.env.NODE_ENV === 'development') {
        console.log(`Multiple OCR Progress: ${progress}%`);
      }
    },
    onComplete: (consolidated) => {
      if (process.env.NODE_ENV === 'development') {
        console.log('Multiple OCR Complete:', consolidated);
      }
      // Set consolidated results
      setOcrResults({
        matched: consolidated.matched,
        unmatched: consolidated.unmatched,
        totalFound: consolidated.totalFound,
      });
    },
    onError: (errors) => {
      if (process.env.NODE_ENV === 'development') {
        console.error('Multiple OCR Errors:', errors);
      }
    },
  });

  // Process selected file
  const handleFile = useCallback((file) => {
    if (!file || !file.type.startsWith('image/')) {
      setError(t('bestiaryPlanner.screenshot.invalidFile'));
      return;
    }

    setImageFile(file);
    setError(null);
    setOcrResults(null);
    setShowQualityCheck(false);
    setShowCropPreview(false);
    setCroppedPreview(null);
    setCropRegion(null);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
      // Show quality check after preview loads
      setShowQualityCheck(true);
    };
    reader.readAsDataURL(file);
  }, [t]);

  // Handle multiple files
  const handleMultipleFiles = useCallback((files) => {
    // Validate all files are images
    const invalidFiles = files.filter(file => !file.type.startsWith('image/'));
    if (invalidFiles.length > 0) {
      setError(t('bestiaryPlanner.screenshot.invalidFile'));
      return;
    }

    setIsMultipleMode(true);
    setError(null);
    setOcrResults(null);

    // Create previews for all images
    const previewPromises = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          resolve({
            file: file,
            preview: e.target.result,
            id: `${file.name}_${file.size}_${file.lastModified}`,
          });
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(previewPromises).then(previews => {
      setImagePreviews(previews);
      // Auto-start processing
      processMultiple(files);
    });
  }, [t, processMultiple]);

  // Handle file drop
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 1) {
      handleMultipleFiles(files);
    } else if (files.length === 1) {
      handleFile(files[0]);
    }
  }, [handleFile, handleMultipleFiles]);

  // Handle file selection
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 1) {
      handleMultipleFiles(files);
    } else if (files.length === 1) {
      handleFile(files[0]);
    }
  };

  // Handle quality check proceed (show crop preview)
  const handleQualityCheckProceed = async () => {
    setShowQualityCheck(false);

    // Preprocess image to get crop preview
    try {
      const { processedImage, cropRegion: region } = await preprocessWithQualityCheck(
        imageFile,
        true,
        true
      );

      setCroppedPreview(processedImage);
      setCropRegion(region);
      setShowCropPreview(true);
    } catch (err) {
      console.error('Preprocessing error:', err);
      setError(t('bestiaryPlanner.screenshot.processingError'));
    }
  };

  // Handle quality check retake
  const handleQualityCheckRetake = () => {
    handleClear();
  };

  // Handle crop preview confirm (start OCR)
  const handleCropPreviewConfirm = async () => {
    setShowCropPreview(false);

    if (!imageFile) return;

    setError(null);

    try {
      // Process OCR with retry
      const result = await processOcr(imageFile, true, true);

      if (!result.success) {
        setError(result.error || t('bestiaryPlanner.screenshot.ocrFailed'));
        return;
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
        return;
      }

      // Parse creatures with stage detection
      const parsed = parseOcrText(result.text, 0.75);

      if (process.env.NODE_ENV === 'development') {
        console.log('Parsed results:', parsed);
        console.log('Matched creatures:', parsed.matched.length);
        console.log('Unmatched:', parsed.unmatched.length);
      }

      // Check for truncated names in unmatched
      const truncatedNames = parsed.unmatched.filter((unmatched) =>
        isTruncatedName(unmatched.name)
      );

      if (process.env.NODE_ENV === 'development') {
        console.log('Truncated names found:', truncatedNames.length);
      }

      // If there are truncated names, prepare autocomplete queue
      if (truncatedNames.length > 0) {
        const queue = truncatedNames.map((item) => ({
          originalName: item.name,
          stage: item.stage,
          isComplete: item.isComplete,
          candidates: findAutocompleteCandidates(item.name),
        }));

        setAutocompleteQueue(queue);
        setOcrResults({
          matched: parsed.matched,
          unmatched: parsed.unmatched,
          totalFound: parsed.totalFound,
          confidence: result.confidence,
        });

        // Start autocomplete process
        if (queue.length > 0 && queue[0].candidates.length > 0) {
          setCurrentAutocomplete(queue[0]);
          setIsAutocompleteOpen(true);
        }
      } else {
        setOcrResults({
          matched: parsed.matched,
          unmatched: parsed.unmatched,
          totalFound: parsed.totalFound,
          confidence: result.confidence,
        });
      }
    } catch (err) {
      console.error('OCR Processing Error:', err);
      setError(t('bestiaryPlanner.screenshot.processingError'));
    }
  };

  // Handle crop preview cancel
  const handleCropPreviewCancel = () => {
    setShowCropPreview(false);
    // Return to quality check
    setShowQualityCheck(true);
  };

  // Confirm and import creatures
  const handleConfirmImport = () => {
    if (!ocrResults || !ocrResults.matched.length) return;

    // Import ALL creatures with their progress (not just complete ones)
    // Include: Unknown (?), In Progress (1/3, 2/3), and Complete (✓)
    const creaturesData = ocrResults.matched.map((m) => ({
      creatureId: m.creature.id,
      stage: m.stage,
      isComplete: m.isComplete,
      minimumKills: m.minimumKills,
    }));

    if (creaturesData.length === 0) {
      setError(t('bestiaryPlanner.screenshot.noCreaturesDetected'));
      return;
    }

    onCreaturesImported?.(creaturesData);

    // Reset state
    setImageFile(null);
    setImagePreview(null);
    setOcrResults(null);
  };

  // Clear upload
  const handleClear = useCallback(() => {
    setImageFile(null);
    setImagePreview(null);
    setImagePreviews([]);
    setCroppedPreview(null);
    setCropRegion(null);
    setOcrResults(null);
    setError(null);
    setIsMultipleMode(false);
    setShowQualityCheck(false);
    setShowCropPreview(false);
    setAutocompleteQueue([]);
    setCurrentAutocomplete(null);
    setIsAutocompleteOpen(false);
    if (isProcessingMultiple) {
      cancelMultiple();
    }
  }, [isProcessingMultiple, cancelMultiple]);

  // Handle autocomplete selection
  const handleAutocompleteSelect = (selectedCreature) => {
    if (!currentAutocomplete || !ocrResults) return;

    // Add selected creature to matched list
    const newMatch = {
      creature: selectedCreature,
      similarity: 1.0,
      originalText: currentAutocomplete.originalName,
      stage: currentAutocomplete.stage,
      isComplete: currentAutocomplete.isComplete,
      minimumKills: currentAutocomplete.stage
        ? calculateMinimumKills(currentAutocomplete.stage, selectedCreature.occurrence)
        : null,
    };

    // Remove from unmatched
    const updatedUnmatched = ocrResults.unmatched.filter(
      (u) => u.name !== currentAutocomplete.originalName
    );

    setOcrResults({
      ...ocrResults,
      matched: [...ocrResults.matched, newMatch],
      unmatched: updatedUnmatched,
    });

    // Process next in queue
    processNextAutocomplete();
  };

  // Skip current autocomplete
  const handleAutocompleteSkip = () => {
    processNextAutocomplete();
  };

  // Process next item in autocomplete queue
  const processNextAutocomplete = () => {
    const nextQueue = autocompleteQueue.slice(1);
    setAutocompleteQueue(nextQueue);

    if (nextQueue.length > 0 && nextQueue[0].candidates.length > 0) {
      setCurrentAutocomplete(nextQueue[0]);
      setIsAutocompleteOpen(true);
    } else {
      setCurrentAutocomplete(null);
      setIsAutocompleteOpen(false);
    }
  };

  // Close autocomplete modal
  const handleAutocompleteClose = () => {
    setIsAutocompleteOpen(false);
    setAutocompleteQueue([]);
    setCurrentAutocomplete(null);
  };

  return (
    <>
      {/* Autocomplete Modal */}
      {currentAutocomplete && (
        <AutocompleteModal
          isOpen={isAutocompleteOpen}
          truncatedName={currentAutocomplete.originalName}
          candidates={currentAutocomplete.candidates}
          onSelectCandidate={handleAutocompleteSelect}
          onSkip={handleAutocompleteSkip}
          onClose={handleAutocompleteClose}
        />
      )}

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
            multiple
            style={{ display: 'none' }}
            onChange={handleFileSelect}
          />
        </UploadZone>
      )}

      {/* Multiple Images Mode */}
      {isMultipleMode && imagePreviews.length > 0 && (
        <>
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              {t('bestiaryPlanner.screenshot.multipleUpload')}
            </h3>

            {/* Global Progress */}
            {isProcessingMultiple && (
              <GlobalProgressContainer>
                <GlobalProgressText>
                  {t('bestiaryPlanner.screenshot.processingMultiple', {
                    current: Array.from(imageStatuses.values()).filter(s => s.status === 'completed').length,
                    total: imagePreviews.length,
                  })}
                </GlobalProgressText>
                <ProgressBar>
                  <ProgressFill $progress={globalProgress} />
                  <ProgressText>{globalProgress}%</ProgressText>
                </ProgressBar>
              </GlobalProgressContainer>
            )}

            {/* Image Grid */}
            <ImageGrid>
              {imagePreviews.map((preview, index) => {
                const status = imageStatuses.get(preview.id);
                const statusType = status?.status || 'queued';
                const statusProgress = status?.progress || 0;

                return (
                  <ImageItem key={preview.id} $status={statusType}>
                    <img src={preview.preview} alt={`Preview ${index + 1}`} />

                    {/* Status Icon */}
                    <StatusIcon>
                      {statusType === 'completed' && '✅'}
                      {statusType === 'error' && '❌'}
                      {statusType === 'processing' && '🔄'}
                      {statusType === 'queued' && '⏳'}
                    </StatusIcon>

                    {/* Progress Bar */}
                    {(statusType === 'processing' || statusType === 'completed') && (
                      <ImageProgress $progress={statusProgress} />
                    )}

                    {/* File Name */}
                    <ImageFileName title={preview.file.name}>
                      {preview.file.name}
                    </ImageFileName>
                  </ImageItem>
                );
              })}
            </ImageGrid>

            {/* Error Summary */}
            {multipleResults.some(r => !r.success && !r.cancelled) && !isProcessingMultiple && (
              <ErrorSummary>
                <ErrorTitle>
                  ⚠️ {multipleResults.filter(r => !r.success && !r.cancelled).length} {t('bestiaryPlanner.screenshot.imageStatus.error')}
                </ErrorTitle>
                <ErrorList>
                  {multipleResults
                    .filter(r => !r.success && !r.cancelled)
                    .map((result, index) => (
                      <ErrorItem key={index}>
                        <ErrorFileName>{result.fileName}:</ErrorFileName>
                        <ErrorMessageText>{result.error}</ErrorMessageText>
                      </ErrorItem>
                    ))}
                </ErrorList>
              </ErrorSummary>
            )}

            {/* Clear Button */}
            {!isProcessingMultiple && (
              <PreviewActions>
                <ClearButton onClick={handleClear}>
                  {t('bestiaryPlanner.screenshot.clearButton')}
                </ClearButton>
              </PreviewActions>
            )}
          </div>
        </>
      )}

      {/* Single Image Mode */}
      {!isMultipleMode && imagePreview && !ocrResults && (
        <>
          <PreviewContainer>
            <PreviewImage src={imagePreview} alt="Screenshot preview" />
          </PreviewContainer>

          {/* Quality Check */}
          {showQualityCheck && !isProcessing && (
            <ImageQualityValidator
              imageFile={imageFile}
              onProceed={handleQualityCheckProceed}
              onRetake={handleQualityCheckRetake}
            />
          )}

          {/* Crop Preview Modal */}
          <CropPreviewModal
            isOpen={showCropPreview}
            originalImage={imagePreview}
            croppedImage={croppedPreview}
            cropRegion={cropRegion}
            onConfirm={handleCropPreviewConfirm}
            onCancel={handleCropPreviewCancel}
          />

          {/* OCR Processing */}
          {isProcessing && (
            <div style={{ marginTop: '1rem' }}>
              <ProgressBar>
                <ProgressFill $progress={progress} />
                <ProgressText>
                  {progress}%
                  {retryCount > 0 && (
                    <span style={{ fontSize: '0.75rem', marginLeft: '0.5rem', color: '#f59e0b' }}>
                      ({t('bestiaryPlanner.screenshot.retry.attempting', {
                        current: retryCount + 1,
                        max: 4,
                      })})
                    </span>
                  )}
                </ProgressText>
              </ProgressBar>
            </div>
          )}

          {!showQualityCheck && !showCropPreview && !isProcessing && (
            <PreviewActions>
              <ClearButton onClick={handleClear}>
                {t('bestiaryPlanner.screenshot.clearButton')}
              </ClearButton>
            </PreviewActions>
          )}
        </>
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
                  count: ocrResults.matched.length,
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
    </>
  );
};

export default memo(ScreenshotImport);
