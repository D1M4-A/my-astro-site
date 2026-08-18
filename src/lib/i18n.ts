export type Language = 'en' | 'id';

const LANGUAGE_KEY = 'bambulogy-language';

let currentLanguage: Language = 'en';

// Import translations
import en from '../i18n/en.json';
import id from '../i18n/id.json';

const translations = {
  en,
  id,
};

/**
 * Get the current language
 */
export function getCurrentLanguage(): Language {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(LANGUAGE_KEY) as Language | null;
    if (stored && (stored === 'en' || stored === 'id')) {
      currentLanguage = stored;
      return stored;
    }
  }
  return currentLanguage;
}

/**
 * Set the language and save to localStorage
 */
export function setLanguage(lang: Language): void {
  currentLanguage = lang;
  if (typeof window !== 'undefined') {
    localStorage.setItem(LANGUAGE_KEY, lang);
  }
  // Dispatch custom event for reactivity
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('languageChange', { detail: { language: lang } }));
  }
}

/**
 * Toggle between languages
 */
export function toggleLanguage(): Language {
  const newLang = currentLanguage === 'en' ? 'id' : 'en';
  setLanguage(newLang);
  return newLang;
}

/**
 * Get translation by key
 * Usage: t('nav.home')
 */
export function t(key: string, lang?: Language): string {
  const language = lang || getCurrentLanguage();
  const keys = key.split('.');
  let value: any = translations[language];

  for (const k of keys) {
    value = value?.[k];
  }

  // Fallback to English if translation not found
  if (!value && language !== 'en') {
    let fallback: any = translations.en;
    for (const k of keys) {
      fallback = fallback?.[k];
    }
    return fallback || key;
  }

  return value || key;
}

/**
 * Get all translations for a specific language
 */
export function getTranslations(lang?: Language): any {
  return translations[lang || getCurrentLanguage()];
}
