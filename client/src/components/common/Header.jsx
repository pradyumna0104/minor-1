import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Header = () => {
  const { t } = useTranslation();

  return (
    <header className="bg-slack-primary text-white shadow-md">
      <nav className="container mx-auto p-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          {t('header.title')}
        </Link>
        <div className="flex items-center space-x-4">
          <Link to="/" className="hover:text-slack-accent">
            {t('header.home')}
          </Link>
          <Link to="/login" className="hover:text-slack-accent">
            {t('header.login')}
          </Link>
          <LanguageSwitcher />
        </div>
      </nav>
    </header>
  );
};

export default Header;