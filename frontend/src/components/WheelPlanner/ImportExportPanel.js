/**
 * Import/Export Panel Component
 * Allows importing and exporting builds as JSON
 */

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { exportBuilds, importBuilds } from '../../services/wheelStorage';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

const Modal = styled.div`
  background: #1f2937;
  border-radius: 0.5rem;
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  border: 1px solid #374151;
`;

const Header = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #374151;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #f3f4f6;
  margin: 0;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: #9ca3af;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  line-height: 1;

  &:hover {
    color: #f3f4f6;
  }
`;

const Body = styled.div`
  padding: 1.5rem;
`;

const Tabs = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #374151;
`;

const Tab = styled.button`
  padding: 0.75rem 1.5rem;
  background: transparent;
  border: none;
  border-bottom: 2px solid ${props => props.$active ? '#667eea' : 'transparent'};
  color: ${props => props.$active ? '#f3f4f6' : '#9ca3af'};
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: #f3f4f6;
  }
`;

const Section = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #9ca3af;
  margin-bottom: 0.5rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 300px;
  padding: 1rem;
  background: #111827;
  border: 1px solid #374151;
  border-radius: 0.375rem;
  color: #f3f4f6;
  font-family: 'Courier New', monospace;
  font-size: 0.875rem;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #667eea;
  }

  &::placeholder {
    color: #6b7280;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background: ${props => {
    if (props.$variant === 'primary') return '#667eea';
    if (props.$variant === 'success') return '#10b981';
    return '#374151';
  }};
  border: 1px solid ${props => {
    if (props.$variant === 'primary') return '#667eea';
    if (props.$variant === 'success') return '#10b981';
    return '#4b5563';
  }};
  border-radius: 0.375rem;
  color: #fff;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Message = styled.div`
  padding: 1rem;
  background: ${props => props.$type === 'error' ? '#fef2f2' : '#f0fdf4'};
  border: 1px solid ${props => props.$type === 'error' ? '#fecaca' : '#bbf7d0'};
  border-radius: 0.375rem;
  color: ${props => props.$type === 'error' ? '#991b1b' : '#166534'};
  font-size: 0.875rem;
  margin-top: 1rem;
`;

const InfoBox = styled.div`
  padding: 1rem;
  background: #111827;
  border: 1px solid #374151;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  color: #9ca3af;
  margin-bottom: 1rem;
`;

const ImportExportPanel = ({ characterId, currentBuild, onClose }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('export');
  const [exportData, setExportData] = useState('');
  const [importData, setImportData] = useState('');
  const [message, setMessage] = useState(null);

  // Handle export
  const handleExport = () => {
    try {
      const json = exportBuilds(characterId);
      setExportData(json);
      setMessage({ type: 'success', text: t('wheelPlanner.importExport.exportSuccess') || 'Builds exported successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    }
  };

  // Handle copy to clipboard
  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(exportData);
      setMessage({ type: 'success', text: t('wheelPlanner.importExport.copied') || 'Copied to clipboard!' });
      setTimeout(() => setMessage(null), 2000);
    } catch (error) {
      setMessage({ type: 'error', text: t('wheelPlanner.importExport.copyError') || 'Failed to copy to clipboard' });
    }
  };

  // Handle import
  const handleImport = () => {
    if (!importData.trim()) {
      setMessage({ type: 'error', text: t('wheelPlanner.importExport.pasteFirst') || 'Please paste JSON data first' });
      return;
    }

    try {
      const result = importBuilds(characterId, importData);

      if (result.success) {
        setMessage({
          type: 'success',
          text: t('wheelPlanner.importExport.importSuccess', { count: result.imported }) ||
            `Successfully imported ${result.imported} build(s)!`
        });
        setTimeout(() => {
          onClose();
          window.location.reload(); // Reload to show imported builds
        }, 1500);
      } else {
        setMessage({ type: 'error', text: result.error });
      }
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    }
  };

  // Handle export current build only
  const handleExportCurrent = () => {
    if (!currentBuild) {
      setMessage({ type: 'error', text: t('wheelPlanner.importExport.noCurrentBuild') || 'No current build to export' });
      return;
    }

    try {
      const json = JSON.stringify([currentBuild], null, 2);
      setExportData(json);
      setMessage({ type: 'success', text: t('wheelPlanner.importExport.currentExported') || 'Current build exported!' });
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    }
  };

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>{t('wheelPlanner.importExport.title') || 'Import/Export'}</Title>
          <CloseButton onClick={onClose}>×</CloseButton>
        </Header>

        <Body>
          <Tabs>
            <Tab $active={activeTab === 'export'} onClick={() => setActiveTab('export')}>
              {t('wheelPlanner.importExport.export') || 'Export'}
            </Tab>
            <Tab $active={activeTab === 'import'} onClick={() => setActiveTab('import')}>
              {t('wheelPlanner.importExport.import') || 'Import'}
            </Tab>
          </Tabs>

          {activeTab === 'export' && (
            <Section>
              <InfoBox>
                {t('wheelPlanner.importExport.exportInfo') ||
                  'Export your builds as JSON to share with others or backup. You can export all builds or just the current one.'}
              </InfoBox>

              <ButtonGroup>
                <Button $variant="primary" onClick={handleExport}>
                  {t('wheelPlanner.importExport.exportAll') || 'Export All Builds'}
                </Button>
                <Button onClick={handleExportCurrent}>
                  {t('wheelPlanner.importExport.exportCurrent') || 'Export Current Build'}
                </Button>
              </ButtonGroup>

              {exportData && (
                <>
                  <Label style={{ marginTop: '1.5rem' }}>
                    {t('wheelPlanner.importExport.jsonData') || 'JSON Data'}
                  </Label>
                  <TextArea
                    value={exportData}
                    readOnly
                    placeholder={t('wheelPlanner.importExport.clickExport') || 'Click export to generate JSON...'}
                  />
                  <ButtonGroup>
                    <Button $variant="success" onClick={handleCopyToClipboard}>
                      📋 {t('wheelPlanner.importExport.copy') || 'Copy to Clipboard'}
                    </Button>
                  </ButtonGroup>
                </>
              )}
            </Section>
          )}

          {activeTab === 'import' && (
            <Section>
              <InfoBox>
                {t('wheelPlanner.importExport.importInfo') ||
                  'Paste JSON data below to import builds. Make sure the JSON format is correct. This will add builds to your existing collection (up to 10 total).'}
              </InfoBox>

              <Label>{t('wheelPlanner.importExport.pasteJson') || 'Paste JSON Data'}</Label>
              <TextArea
                value={importData}
                onChange={(e) => setImportData(e.target.value)}
                placeholder={t('wheelPlanner.importExport.pastePlaceholder') || 'Paste JSON data here...'}
              />

              <ButtonGroup>
                <Button $variant="primary" onClick={handleImport}>
                  {t('wheelPlanner.importExport.importButton') || 'Import Builds'}
                </Button>
                <Button onClick={() => setImportData('')}>
                  {t('wheelPlanner.importExport.clear') || 'Clear'}
                </Button>
              </ButtonGroup>
            </Section>
          )}

          {message && (
            <Message $type={message.type}>
              {message.text}
            </Message>
          )}
        </Body>
      </Modal>
    </Overlay>
  );
};

export default ImportExportPanel;
