/**
 * CropPreviewModal Component
 * Shows preview of cropped area before OCR processing
 */

import { useState, useEffect, useRef, memo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  PreviewContainer,
  PreviewImage,
  CropOverlay,
  CropRegion,
  InfoBox,
  InfoItem,
  InfoLabel,
  InfoValue,
  ActionsRow,
  ConfirmButton,
  CancelButton,
} from './CropPreviewModal.styles';

const CropPreviewModal = ({
  isOpen,
  originalImage,
  croppedImage,
  cropRegion,
  onConfirm,
  onCancel,
}) => {
  const { t } = useTranslation();
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const [displayScale, setDisplayScale] = useState(1);
  const imageRef = useRef(null);

  // Calculate display scale when image loads
  useEffect(() => {
    if (!originalImage || !imageRef.current) return;

    const img = new Image();
    img.onload = () => {
      setImageDimensions({ width: img.width, height: img.height });

      // Calculate how much the image is scaled in the preview
      if (imageRef.current) {
        const displayWidth = imageRef.current.offsetWidth;
        const scale = displayWidth / img.width;
        setDisplayScale(scale);
      }
    };
    img.src = originalImage;
  }, [originalImage]);

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onCancel();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onCancel]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Calculate crop region position (scaled for display)
  const scaledCropRegion = cropRegion ? {
    left: `${cropRegion.x * displayScale}px`,
    top: `${cropRegion.y * displayScale}px`,
    width: `${cropRegion.width * displayScale}px`,
    height: `${cropRegion.height * displayScale}px`,
  } : null;

  return (
    <ModalOverlay onClick={onCancel}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>
            {t('bestiaryPlanner.screenshot.cropPreview.title')}
          </ModalTitle>
          <ModalDescription>
            {t('bestiaryPlanner.screenshot.cropPreview.description')}
          </ModalDescription>
        </ModalHeader>

        <PreviewContainer>
          <PreviewImage
            ref={imageRef}
            src={croppedImage || originalImage}
            alt="Preview"
          />
          {scaledCropRegion && originalImage && !croppedImage && (
            <CropOverlay>
              <CropRegion style={scaledCropRegion} />
            </CropOverlay>
          )}
        </PreviewContainer>

        {cropRegion && (
          <InfoBox>
            <InfoItem>
              <InfoLabel>{t('bestiaryPlanner.screenshot.cropPreview.originalSize')}</InfoLabel>
              <InfoValue>{imageDimensions.width} × {imageDimensions.height} px</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>{t('bestiaryPlanner.screenshot.cropPreview.croppedSize')}</InfoLabel>
              <InfoValue>{cropRegion.width} × {cropRegion.height} px</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>{t('bestiaryPlanner.screenshot.cropPreview.zoomLevel')}</InfoLabel>
              <InfoValue>150%</InfoValue>
            </InfoItem>
          </InfoBox>
        )}

        <ActionsRow>
          <CancelButton onClick={onCancel}>
            {t('bestiaryPlanner.screenshot.cropPreview.cancelButton')}
          </CancelButton>
          <ConfirmButton onClick={onConfirm}>
            {t('bestiaryPlanner.screenshot.cropPreview.confirmButton')}
          </ConfirmButton>
        </ActionsRow>
      </ModalContent>
    </ModalOverlay>
  );
};

export default memo(CropPreviewModal);
