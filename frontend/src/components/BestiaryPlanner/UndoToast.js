/**
 * UndoToast Component
 * Toast notification with undo button
 *
 * Features:
 * - Auto-hide after 10 seconds (matches undo stack timeout)
 * - Shows action details (creature name, action type)
 * - Undo button (keyboard: Ctrl+Z also works)
 * - Slide-in animation
 */

import { useEffect, useState } from 'prop-types';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
  ToastContainer,
  ToastContent,
  ToastIcon,
  ToastMessage,
  ToastTitle,
  ToastText,
  UndoButton,
  ProgressBar,
} from './UndoToast.styles';

const UndoToast = ({
  action,
  onUndo,
  onClose,
  autoHideDelay = 10000, // 10 seconds to match undo stack timeout
}) => {
  const { t } = useTranslation();
  const [isClosing, setIsClosing] = useState(false);
  const [progress, setProgress] = useState(100);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose?.();
    }, 300); // Wait for animation
  };

  useEffect(() => {
    // Auto-hide timer
    const hideTimer = setTimeout(() => {
      handleClose();
    }, autoHideDelay);

    // Progress bar animation (update every 100ms)
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev - (100 / (autoHideDelay / 100));
        return newProgress > 0 ? newProgress : 0;
      });
    }, 100);

    return () => {
      clearTimeout(hideTimer);
      clearInterval(progressInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoHideDelay]);

  const handleUndo = () => {
    onUndo?.();
    handleClose();
  };

  if (!action) return null;

  // Get action-specific message
  const getActionMessage = () => {
    switch (action.type) {
      case 'complete':
        return {
          title: t('bestiaryPlanner.toast.completed.title'),
          text: t('bestiaryPlanner.toast.completed.message', {
            name: action.data.creatureName,
            charmPoints: action.data.charmPoints,
          }),
          icon: '✓',
        };
      case 'uncomplete':
        return {
          title: t('bestiaryPlanner.toast.uncompleted.title', { defaultValue: 'Criatura Desmarcada' }),
          text: t('bestiaryPlanner.toast.uncompleted.message', {
            name: action.data.creatureName,
            defaultValue: `${action.data.creatureName} desmarcada como completa`,
          }),
          icon: '↶',
        };
      case 'plan':
        return {
          title: t('bestiaryPlanner.toast.addedToPlan.title', { defaultValue: 'Adicionado ao Plano' }),
          text: t('bestiaryPlanner.toast.addedToPlan.message', {
            name: action.data.creatureName,
            defaultValue: `${action.data.creatureName} adicionada ao plano de hunt`,
          }),
          icon: '+',
        };
      case 'unplan':
        return {
          title: t('bestiaryPlanner.toast.removedFromPlan.title', { defaultValue: 'Removido do Plano' }),
          text: t('bestiaryPlanner.toast.removedFromPlan.message', {
            name: action.data.creatureName,
            defaultValue: `${action.data.creatureName} removida do plano`,
          }),
          icon: '−',
        };
      case 'editKills':
        return {
          title: t('bestiaryPlanner.toast.killsUpdated.title', { defaultValue: 'Kills Atualizados' }),
          text: t('bestiaryPlanner.toast.killsUpdated.message', {
            name: action.data.creatureName,
            kills: action.data.newKills,
            defaultValue: `${action.data.creatureName}: ${action.data.newKills} kills`,
          }),
          icon: '✎',
        };
      default:
        return {
          title: t('bestiaryPlanner.toast.actionPerformed.title', { defaultValue: 'Ação Realizada' }),
          text: action.data.creatureName || '',
          icon: 'ℹ️',
        };
    }
  };

  const message = getActionMessage();

  return (
    <ToastContainer $isClosing={isClosing} role="alert" aria-live="assertive">
      <ToastContent>
        <ToastIcon>{message.icon}</ToastIcon>
        <ToastMessage>
          <ToastTitle>{message.title}</ToastTitle>
          <ToastText>{message.text}</ToastText>
        </ToastMessage>
        <UndoButton
          onClick={handleUndo}
          aria-label={t('bestiaryPlanner.actions.undo', { defaultValue: 'Desfazer' })}
          title={t('bestiaryPlanner.actions.undo', { defaultValue: 'Desfazer (Ctrl+Z)' })}
        >
          ↶ {t('bestiaryPlanner.actions.undo', { defaultValue: 'Desfazer' })}
        </UndoButton>
      </ToastContent>
      <ProgressBar $progress={progress} />
    </ToastContainer>
  );
};

UndoToast.propTypes = {
  action: PropTypes.shape({
    type: PropTypes.oneOf(['complete', 'uncomplete', 'plan', 'unplan', 'editKills']).isRequired,
    data: PropTypes.shape({
      creatureName: PropTypes.string.isRequired,
      charmPoints: PropTypes.number,
      newKills: PropTypes.number,
    }).isRequired,
    undo: PropTypes.func.isRequired,
  }),
  onUndo: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  autoHideDelay: PropTypes.number,
};

UndoToast.defaultProps = {
  action: null,
  autoHideDelay: 10000,
};

export default UndoToast;
