/**
 * Language selector component (EN/PT-BR)
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import './LanguageSelector.css';

export default function LanguageSelector() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'pt-BR' : 'en';
    i18n.changeLanguage(newLang);
  };

  const currentLang = i18n.language;
  const isEnglish = currentLang === 'en';

  return (
    <button
      className="language-selector"
      onClick={toggleLanguage}
      aria-label={`Switch to ${isEnglish ? 'Portuguese' : 'English'}`}
      title={`Switch to ${isEnglish ? 'Portuguese' : 'English'}`}
    >
      <span className="flag-icon">{isEnglish ? '🇺🇸' : '🇧🇷'}</span>
      <span className="lang-code">{isEnglish ? 'EN' : 'PT'}</span>
    </button>
  );
}
