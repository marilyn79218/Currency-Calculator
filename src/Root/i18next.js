import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import combinedResources from '../i18nResource';

i18next
  .use(LanguageDetector)
  .init({
    resources: combinedResources,
    fallbackLng: 'zh-TW',
  });

export default i18next;
