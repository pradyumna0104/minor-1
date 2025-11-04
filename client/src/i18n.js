import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';

i18n
  .use(HttpApi) // Loads translations from /public/locales
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    lng: 'en', // Default language
    fallbackLng: 'en',
    supportedLngs: ['en', 'hi', 'or'],
    backend: {
      loadPath: '/locales/{{lng}}.json', // Path to translation files
    },
    interpolation: {
      escapeValue: false, // React already safes from xss
    },
  });

export default i18n;