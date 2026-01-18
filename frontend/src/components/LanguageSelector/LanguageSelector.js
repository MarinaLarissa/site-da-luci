/**
 * Language selector component (EN/PT-BR)
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { SelectorButton, FlagIcon, LangCode } from './LanguageSelector.styles';

export default function LanguageSelector() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'pt-BR' : 'en';
    i18n.changeLanguage(newLang);
  };

  const currentLang = i18n.language;
  const isEnglish = currentLang === 'en';

  return (
    <SelectorButton
      onClick={toggleLanguage}
      aria-label={`Switch to ${isEnglish ? 'Portuguese' : 'English'}`}
      title={`Switch to ${isEnglish ? 'Portuguese' : 'English'}`}
      data-cy="language-toggle-button"
    >
      <FlagIcon>{isEnglish ? '🇺🇸' : '🇧🇷'}</FlagIcon>
      <LangCode>{isEnglish ? 'EN' : 'PT'}</LangCode>
    </SelectorButton>
  );
}
