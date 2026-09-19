import React from 'react';
import { useTranslation } from 'react-i18next';
import { ASSETS } from '../../config/assets';
import './Header.css';

const Header: React.FC = () => {
  const { t } = useTranslation();

  return (
    <header className="header">
      <div className="header__inner">
        <img src={ASSETS.logo} alt={t('brand.name')} className="header__logo" />
        <p className="header__tagline">{t('brand.tagline')}</p>
        <h1 className="header__title">{t('hero.title')}</h1>
        <p className="header__subtitle">{t('hero.subtitle')}</p>
      </div>
    </header>
  );
};

export default Header;
