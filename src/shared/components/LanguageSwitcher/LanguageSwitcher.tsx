import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  LANGUAGES,
  LanguageCode,
  DEFAULT_LANGUAGE,
} from '../../i18n/languages';
import './LanguageSwitcher.css';

const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();
  const current =
    LANGUAGES.find((lang) =>
      (i18n.language || DEFAULT_LANGUAGE).startsWith(lang.code)
    ) ??
    LANGUAGES.find((lang) => lang.code === DEFAULT_LANGUAGE) ??
    LANGUAGES[0];

  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const selectLanguage = (code: LanguageCode) => {
    i18n.changeLanguage(code);
    setOpen(false);
  };

  return (
    <div className="lang-switcher" ref={rootRef}>
      <button
        type="button"
        className="lang-switcher__trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('language.switch')}
        onClick={() => setOpen((v) => !v)}
      >
        <span aria-hidden="true" className="lang-switcher__flag">
          {current.flag}
        </span>
        <span className="lang-switcher__code">
          {current.code.toUpperCase()}
        </span>
        <span
          aria-hidden="true"
          className={`lang-switcher__chevron${open ? ' lang-switcher__chevron--open' : ''}`}
        >
          ▾
        </span>
      </button>

      {open && (
        <ul
          className="lang-switcher__list"
          role="listbox"
          aria-label={t('language.switch')}
        >
          {LANGUAGES.map((lang) => {
            const active = lang.code === current.code;
            return (
              <li key={lang.code} role="none">
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  className={`lang-switcher__option${active ? ' lang-switcher__option--active' : ''}`}
                  onClick={() => selectLanguage(lang.code)}
                >
                  <span aria-hidden="true" className="lang-switcher__flag">
                    {lang.flag}
                  </span>
                  <span>{lang.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher;
