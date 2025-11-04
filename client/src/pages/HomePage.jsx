import React from 'react';
import { useTranslation } from 'react-i18next';

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center p-10">
      <h1 className="text-4xl font-bold">{t('home.welcome')}</h1>
      {/* Add more content here */}
    </div>
  );
};

export default HomePage;