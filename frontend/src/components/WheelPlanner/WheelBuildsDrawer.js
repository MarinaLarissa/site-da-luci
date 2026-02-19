/**
 * WheelBuildsDrawer — Floating saved-builds button + slide-in drawer.
 *
 * The floating button follows the FloatingHistoryButton pattern.
 * Clicking it opens a drawer listing all saved builds with actions:
 *   Mostrar (load), Copiar código, Apagar
 * Also allows importing a build from a code string.
 */
import { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { encodeBuild, decodeBuild } from '../../services/wheelCodes';
import { calcTotalUsed } from '../../data/wheelNodes';

// ─── Animations ───────────────────────────────────────────────────────────────

const slideIn = keyframes`
  from { transform: translateX(100%); opacity: 0; }
  to   { transform: translateX(0);    opacity: 1; }
`;

// ─── Floating button ──────────────────────────────────────────────────────────

const FloatBtn = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  min-width: 60px;
  height: 60px;
  padding: 0 1.2rem;
  background: linear-gradient(135deg, #c8a020, #8B6914);
  color: #0a0a0a;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
  transition: all 0.3s ease;
  z-index: 998;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background: linear-gradient(135deg, #e8c030, #c8a020);
    transform: scale(1.08);
    box-shadow: 0 6px 18px rgba(200, 160, 32, 0.45);
  }
  &:active { transform: scale(1.04); }

  @media (max-width: 768px) {
    width: 60px;
    min-width: 60px;
    padding: 0;
    border-radius: 50%;
  }
`;

const FloatIcon = styled.span`font-size: 1.6rem; line-height: 1;`;
const FloatText = styled.span`
  font-size: 0.9rem; font-weight: 700; white-space: nowrap;
  @media (max-width: 768px) { display: none; }
`;
const FloatBadge = styled.span`
  position: absolute;
  top: -6px; right: -6px;
  min-width: 20px; height: 20px;
  background: #ef4444; color: #fff;
  border-radius: 10px; font-size: 0.7rem; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  padding: 0 4px;
`;

// ─── Overlay ──────────────────────────────────────────────────────────────────

const Overlay = styled.div`
  position: fixed; inset: 0;
  background: rgba(0, 0, 0, 0.55);
  z-index: 999;
`;

// ─── Drawer ───────────────────────────────────────────────────────────────────

const Drawer = styled.div`
  position: fixed;
  top: 0; right: 0; bottom: 0;
  width: min(400px, 100vw);
  background: #0d0d0d;
  border-left: 1px solid #2a2a2a;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: ${slideIn} 0.25s ease-out;
`;

const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #2a2a2a;
  flex-shrink: 0;
`;

const DrawerTitle = styled.h2`
  font-size: 1rem; font-weight: 700; color: #c8a020; margin: 0;
`;

const CloseBtn = styled.button`
  background: transparent; border: none; color: #9ca3af;
  font-size: 1.4rem; cursor: pointer; padding: 0.2rem 0.4rem;
  border-radius: 0.25rem;
  &:hover { background: #1a1a1a; color: #fff; }
`;

const DrawerBody = styled.div`
  flex: 1; overflow-y: auto; padding: 1rem 1.25rem;
  display: flex; flex-direction: column; gap: 0.75rem;
`;

// ─── Current build code section ───────────────────────────────────────────────

const CodeSection = styled.div`
  background: #111; border: 1px solid #2a2a2a;
  border-radius: 0.4rem; padding: 0.75rem;
`;

const CodeLabel = styled.div`
  font-size: 0.7rem; font-weight: 700; color: #9ca3af;
  text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.4rem;
`;

const CodeRow = styled.div`display: flex; gap: 0.4rem; align-items: center;`;

const CodeDisplay = styled.input`
  flex: 1; background: #0a0a0a; border: 1px solid #374151;
  border-radius: 0.25rem; color: #c8a020; font-size: 0.72rem;
  font-family: monospace; padding: 0.35rem 0.5rem;
  &:read-only { cursor: default; }
`;

const SmallBtn = styled.button`
  padding: 0.3rem 0.6rem;
  background: ${(p) => p.$variant === 'primary' ? '#2a1800' : p.$variant === 'danger' ? '#3a0000' : '#1a1a1a'};
  border: 1px solid ${(p) => p.$variant === 'primary' ? '#c8a020' : p.$variant === 'danger' ? '#7a0000' : '#374151'};
  border-radius: 0.25rem;
  color: ${(p) => p.$variant === 'primary' ? '#c8a020' : p.$variant === 'danger' ? '#ff6060' : '#9ca3af'};
  font-size: 0.7rem; font-weight: 600; cursor: pointer; white-space: nowrap;
  transition: all 0.15s;
  &:disabled { opacity: 0.4; cursor: default; }
  &:not(:disabled):hover {
    background: ${(p) => p.$variant === 'primary' ? '#3a2200' : p.$variant === 'danger' ? '#5a0000' : '#222'};
  }
`;

// ─── Import section ───────────────────────────────────────────────────────────

const ImportSection = styled.div`
  background: #111; border: 1px solid #2a2a2a;
  border-radius: 0.4rem; padding: 0.75rem;
`;

const ImportInput = styled.input`
  width: 100%; background: #0a0a0a; border: 1px solid #374151;
  border-radius: 0.25rem; color: #e5e7eb; font-size: 0.72rem;
  font-family: monospace; padding: 0.35rem 0.5rem;
  margin: 0.4rem 0;
  box-sizing: border-box;
  &::placeholder { color: #4b5563; }
`;

const ImportError = styled.p`font-size: 0.7rem; color: #ef4444; margin: 0.2rem 0 0;`;

// ─── Build list ───────────────────────────────────────────────────────────────

const SectionLabel = styled.div`
  font-size: 0.7rem; font-weight: 700; color: #9ca3af;
  text-transform: uppercase; letter-spacing: 0.05em;
`;

const BuildCard = styled.div`
  background: ${(p) => p.$active ? '#1a1200' : '#111'};
  border: 1px solid ${(p) => p.$active ? '#c8a020' : '#2a2a2a'};
  border-radius: 0.4rem;
  padding: 0.65rem 0.75rem;
  transition: border-color 0.15s;
`;

const BuildTopRow = styled.div`display: flex; align-items: center; justify-content: space-between; gap: 0.5rem;`;

const BuildName = styled.span`
  font-size: 0.85rem; font-weight: 700; color: #f3f4f6;
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1;
`;

const BuildMeta = styled.div`
  font-size: 0.7rem; color: #6b7280; margin-top: 0.2rem;
`;

const BuildActions = styled.div`display: flex; gap: 0.3rem; flex-wrap: wrap; margin-top: 0.5rem;`;

const EmptyText = styled.p`font-size: 0.8rem; color: #6b7280; text-align: center; margin: 1rem 0;`;

const CopiedMsg = styled.span`font-size: 0.68rem; color: #52c23c;`;

// ─── Component ────────────────────────────────────────────────────────────────

const VOCATION_LABEL = {
  knight: 'Knight', druid: 'Druid', sorcerer: 'Sorcerer',
  paladin: 'Paladin', monk: 'Monk',
};

const WheelBuildsDrawer = ({
  currentBuild,
  savedBuilds = [],
  storageStats,
  onLoadBuild,
  onDeleteBuild,
  onDuplicateBuild,
  onLoadFromCode,
}) => {
  const [open, setOpen]               = useState(false);
  const [importCode, setImportCode]   = useState('');
  const [importError, setImportError] = useState('');
  const [copiedId, setCopiedId]       = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const inputRef = useRef(null);

  // Close drawer on Escape
  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open]);

  const currentCode = currentBuild
    ? encodeBuild(currentBuild.slicePoints || {}, currentBuild.vocation)
    : '';

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const handleImport = () => {
    setImportError('');
    const decoded = decodeBuild(importCode.trim());
    if (!decoded) {
      setImportError('Código inválido. Verifique o prefixo (K/D/S/P/M) e o formato.');
      return;
    }
    if (onLoadFromCode) {
      onLoadFromCode(decoded.vocation, decoded.slicePoints);
      setImportCode('');
      setOpen(false);
    }
  };

  const handleDelete = (buildId) => {
    if (deleteConfirm === buildId) {
      onDeleteBuild(buildId);
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(buildId);
      setTimeout(() => setDeleteConfirm(null), 3000);
    }
  };

  return (
    <>
      {/* ── Floating button ── */}
      <FloatBtn onClick={() => setOpen(true)} title="Saved Builds">
        <FloatIcon>💾</FloatIcon>
        <FloatText>Builds</FloatText>
        {savedBuilds.length > 0 && (
          <FloatBadge>{savedBuilds.length}</FloatBadge>
        )}
      </FloatBtn>

      {/* ── Drawer ── */}
      {open && (
        <>
          <Overlay onClick={() => setOpen(false)} />
          <Drawer>
            <DrawerHeader>
              <DrawerTitle>💾 Builds Salvas</DrawerTitle>
              <CloseBtn onClick={() => setOpen(false)} title="Fechar">✕</CloseBtn>
            </DrawerHeader>

            <DrawerBody>
              {/* Current build code */}
              {currentBuild && (
                <CodeSection>
                  <CodeLabel>Código da build atual</CodeLabel>
                  <CodeRow>
                    <CodeDisplay
                      ref={inputRef}
                      value={currentCode}
                      readOnly
                      onClick={(e) => e.target.select()}
                    />
                    <SmallBtn
                      $variant="primary"
                      onClick={() => copyToClipboard(currentCode, 'current')}
                    >
                      {copiedId === 'current' ? '✓' : 'Copiar'}
                    </SmallBtn>
                  </CodeRow>
                  {copiedId === 'current' && (
                    <CopiedMsg>Código copiado!</CopiedMsg>
                  )}
                </CodeSection>
              )}

              {/* Import from code */}
              <ImportSection>
                <CodeLabel>Importar build por código</CodeLabel>
                <ImportInput
                  type="text"
                  value={importCode}
                  onChange={(e) => { setImportCode(e.target.value); setImportError(''); }}
                  placeholder="Cole o código aqui (ex: K..., D...)"
                  onKeyDown={(e) => e.key === 'Enter' && handleImport()}
                />
                <SmallBtn $variant="primary" onClick={handleImport} disabled={!importCode.trim()}>
                  Carregar
                </SmallBtn>
                {importError && <ImportError>{importError}</ImportError>}
              </ImportSection>

              {/* Saved builds list */}
              <SectionLabel>
                Builds ({storageStats?.total ?? savedBuilds.length}/{storageStats?.limit ?? 10})
              </SectionLabel>

              {savedBuilds.length === 0 ? (
                <EmptyText>Nenhuma build salva. Crie e salve uma build para começar.</EmptyText>
              ) : (
                savedBuilds.map((build) => {
                  const buildCode = encodeBuild(build.slicePoints || {}, build.vocation);
                  const isActive  = build.id === currentBuild?.id;
                  const usedPts   = build.points?.used ?? calcTotalUsed(build.slicePoints || {});

                  return (
                    <BuildCard key={build.id} $active={isActive}>
                      <BuildTopRow>
                        <BuildName title={build.name}>{build.name}</BuildName>
                        {isActive && (
                          <span style={{ fontSize: '0.65rem', color: '#c8a020', fontWeight: 700 }}>
                            EM USO
                          </span>
                        )}
                      </BuildTopRow>
                      <BuildMeta>
                        {VOCATION_LABEL[build.vocation] || build.vocation} ·{' '}
                        {usedPts}/{build.points?.total ?? '?'} pts
                      </BuildMeta>
                      <BuildActions>
                        <SmallBtn
                          $variant="primary"
                          onClick={() => { onLoadBuild(build.id); setOpen(false); }}
                        >
                          Mostrar
                        </SmallBtn>
                        <SmallBtn
                          onClick={() => copyToClipboard(buildCode, build.id)}
                        >
                          {copiedId === build.id ? '✓ Copiado' : 'Copiar código'}
                        </SmallBtn>
                        <SmallBtn
                          onClick={() => { onDuplicateBuild(build.id); }}
                          disabled={(storageStats?.remaining ?? 1) === 0}
                          title="Duplicar"
                        >
                          Duplicar
                        </SmallBtn>
                        <SmallBtn
                          $variant="danger"
                          onClick={() => handleDelete(build.id)}
                          title={deleteConfirm === build.id ? 'Clique novamente para confirmar' : 'Apagar'}
                        >
                          {deleteConfirm === build.id ? '⚠ Confirmar?' : 'Apagar'}
                        </SmallBtn>
                      </BuildActions>
                    </BuildCard>
                  );
                })
              )}
            </DrawerBody>
          </Drawer>
        </>
      )}
    </>
  );
};

export default WheelBuildsDrawer;
