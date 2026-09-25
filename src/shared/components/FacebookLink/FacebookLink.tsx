import React from 'react';
import { useTranslation } from 'react-i18next';
import { CONTACT_INFO } from '../../config/contactInfo';
import './FacebookLink.css';

const FacebookIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
    />
  </svg>
);

export interface FacebookLinkProps {
  /** Renders the label text next to the icon; icon-only when false (e.g. footer). */
  withLabel?: boolean;
  className?: string;
}

/**
 * Global link to the business Facebook page. Single source of the URL and
 * markup so the footer badge and any in-page CTA stay visually consistent.
 */
const FacebookLink: React.FC<FacebookLinkProps> = ({
  withLabel = false,
  className = '',
}) => {
  const { t } = useTranslation();

  return (
    <a
      className={`facebook-link ${withLabel ? 'facebook-link--labeled' : 'facebook-link--icon'} ${className}`.trim()}
      href={CONTACT_INFO.facebookUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('social.facebook')}
      title={t('social.facebook')}
    >
      <span className="facebook-link__icon">
        <FacebookIcon />
      </span>
      {withLabel && (
        <span className="facebook-link__label">{t('social.facebook')}</span>
      )}
    </a>
  );
};

export default FacebookLink;
