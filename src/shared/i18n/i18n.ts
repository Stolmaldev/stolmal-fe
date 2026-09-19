import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { DEFAULT_LANGUAGE } from './languages';
import plCommon from './locales/pl/common.json';
import enCommon from './locales/en/common.json';

const STORAGE_KEY = 'lang';

i18n.use(initReactI18next).init({
  resources: {
    pl: { common: plCommon },
    en: { common: enCommon },
  },
  lng: localStorage.getItem(STORAGE_KEY) || DEFAULT_LANGUAGE,
  fallbackLng: DEFAULT_LANGUAGE,
  defaultNS: 'common',
  interpolation: { escapeValue: false },
});

i18n.on('languageChanged', (lng) => {
  localStorage.setItem(STORAGE_KEY, lng);
  document.documentElement.lang = lng;
});

document.documentElement.lang = i18n.language;

export default i18n;
