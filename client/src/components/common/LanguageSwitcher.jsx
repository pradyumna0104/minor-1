import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex space-x-2">
      <button
        onClick={() => changeLanguage('en')}
        className={`px-3 py-1 rounded ${
          i18n.language === 'en' ? 'bg-slack-accent' : 'bg-gray-700'
        } hover:bg-slack-accent`}
      >
        {t('lang.en')}
      </button>
      <button
        onClick={() => changeLanguage('hi')}
        className={`px-3 py-1 rounded ${
          i18n.language === 'hi' ? 'bg-slack-accent' : 'bg-gray-700'
        } hover:bg-slack-accent`}
      >
        {t('lang.hi')}
      </button>
      <button
        onClick={() => changeLanguage('or')}
        className={`px-3 py-1 rounded ${
          i18n.language === 'or' ? 'bg-slack-accent' : 'bg-gray-700'
        } hover:bg-slack-accent`}
      >
        {t('lang.or')}
      </button>
    </div>
  );
};

export default LanguageSwitcher;