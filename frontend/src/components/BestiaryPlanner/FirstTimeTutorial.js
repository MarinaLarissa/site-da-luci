/**
 * FirstTimeTutorial Component
 * Shows a tutorial overlay on first visit to Bestiary Planner
 */

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  TutorialOverlay,
  TutorialBox,
  TutorialArrow,
  TutorialTitle,
  TutorialText,
  TutorialButton,
  TutorialStep,
} from './FirstTimeTutorial.styles';

const STORAGE_KEY = 'bestiaryPlanner_tutorialShown';

const FirstTimeTutorial = () => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if tutorial was already shown
    const tutorialShown = localStorage.getItem(STORAGE_KEY);
    if (!tutorialShown) {
      // Wait a bit before showing to let the page load
      const timer = setTimeout(() => {
        setShow(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setShow(false);
  };

  if (!show) return null;

  return (
    <TutorialOverlay onClick={handleClose}>
      <TutorialArrow />
      <TutorialBox onClick={(e) => e.stopPropagation()}>
        <TutorialTitle>
          {t('bestiaryPlanner.tutorial.title', { defaultValue: '💡 Dica' })}
        </TutorialTitle>

        <TutorialStep>
          <TutorialText>
            {t('bestiaryPlanner.tutorial.actionButtons', {
              defaultValue: '🎯 Use os botões no card: ✓ (completar), + (adicionar ao plano), ✎ (editar kills)',
            })}
          </TutorialText>
        </TutorialStep>

        <TutorialStep>
          <TutorialText>
            {t('bestiaryPlanner.tutorial.keyboardShortcuts', {
              defaultValue: '⌨️ Atalhos: Enter (completar), P (plano), E (editar) quando o card estiver em foco',
            })}
          </TutorialText>
        </TutorialStep>

        <TutorialStep>
          <TutorialText>
            {t('bestiaryPlanner.tutorial.screenshotImport', {
              defaultValue: '📷 Importe screenshots do bestiário para atualizar progresso automaticamente via OCR',
            })}
          </TutorialText>
        </TutorialStep>

        <TutorialStep>
          <TutorialText>
            {t('bestiaryPlanner.tutorial.useFilters', {
              defaultValue: '🔍 Use os filtros para refinar sugestões e gerenciar seu progresso',
            })}
          </TutorialText>
        </TutorialStep>

        <TutorialButton onClick={handleClose}>
          {t('bestiaryPlanner.tutorial.gotIt', { defaultValue: 'Entendi!' })}
        </TutorialButton>
      </TutorialBox>
    </TutorialOverlay>
  );
};

export default FirstTimeTutorial;
