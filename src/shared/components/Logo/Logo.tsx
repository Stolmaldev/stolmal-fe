import React from 'react';
import { useTranslation } from 'react-i18next';
import { ASSETS } from '../../config/assets';
import './Logo.css';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  iconOnly?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', iconOnly = false }) => {
  const { t } = useTranslation();
  return (
    <span className={`logo logo--${size}`} aria-label={t('brand.name')}>
      <img
        src={ASSETS.logo}
        alt={t('brand.name')}
        className="logo__image"
        loading="eager"
      />
      {!iconOnly && <span className="logo__text">{t('brand.name')}</span>}
    </span>
  );
};

export default Logo;
