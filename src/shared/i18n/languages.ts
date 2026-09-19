export type LanguageCode = 'pl' | 'en';

export interface Language {
  code: LanguageCode;
  label: string;
  flag: string;
}

export const DEFAULT_LANGUAGE: LanguageCode = 'pl';

/**
 * To add a new language:
 *   1. Create `src/shared/i18n/locales/<code>/common.json`
 *   2. Add an entry below
 *   3. Register it in `i18n.ts` resources
 */
export const LANGUAGES: Language[] = [
  { code: 'pl', label: 'Polski', flag: '🇵🇱' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
];
