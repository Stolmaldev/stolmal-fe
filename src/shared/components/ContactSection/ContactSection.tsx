import React from 'react';
import { useTranslation } from 'react-i18next';
import { CONTACT_INFO } from '../../config/contactInfo';
import './ContactSection.css';

const toDigits = (phone: string) => phone.replace(/[^\d]/g, '');

const MailIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M3.5 6.5h17a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-17a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1Z"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <path
      d="m3 7 9 6.2L21 7"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PhoneIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M6.6 10.8c1.3 2.6 3.4 4.7 6 6l2-2a1 1 0 0 1 1-.24c1.1.36 2.3.55 3.5.55a1 1 0 0 1 1 1V19.5a1 1 0 0 1-1 1C10.7 20.5 3.5 13.3 3.5 4.9a1 1 0 0 1 1-1H7.9a1 1 0 0 1 1 1c0 1.2.2 2.4.55 3.5a1 1 0 0 1-.24 1.02l-2 2Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>
);

const WhatsappIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12.02 2C6.76 2 2.5 6.26 2.5 11.52c0 1.85.5 3.58 1.44 5.06L2 22l5.6-1.87a9.5 9.5 0 0 0 4.42 1.1h.01c5.26 0 9.52-4.26 9.52-9.52C21.55 6.26 17.28 2 12.02 2Zm5.6 13.44c-.24.66-1.4 1.27-1.94 1.34-.5.08-1.13.1-1.83-.12-.42-.13-.96-.3-1.66-.6-2.92-1.26-4.83-4.2-4.98-4.4-.14-.2-1.2-1.6-1.2-3.05 0-1.46.76-2.17 1.03-2.47.27-.3.6-.37.8-.37h.57c.18 0 .43-.03.66.5.24.56.8 1.94.87 2.08.07.14.12.3.02.48-.1.19-.15.3-.3.46-.15.16-.31.36-.44.48-.15.14-.3.3-.14.6.17.3.75 1.24 1.62 2.02 1.11 1 2.05 1.31 2.35 1.46.3.14.47.12.65-.07.18-.2.75-.87.95-1.17.2-.3.4-.24.66-.14.27.1 1.7.8 1.99.95.29.14.48.21.55.34.08.13.08.75-.16 1.41Z" />
  </svg>
);

const ContactSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section
      id="contact"
      className="contact-section"
      aria-labelledby="contact-section-title"
    >
      <div className="contact-section__inner">
        <div className="contact-section__intro">
          <span className="contact-section__eyebrow">
            {t('contactSection.eyebrow')}
          </span>
          <h2 id="contact-section-title" className="contact-section__title">
            {t('contactSection.title')}
          </h2>
          <p className="contact-section__subtitle">
            {t('contactSection.subtitle')}
          </p>
        </div>

        <div className="contact-section__content">
          <a
            className="contact-email"
            href={`mailto:${CONTACT_INFO.email}`}
            aria-label={`${t('contactSection.email')}: ${CONTACT_INFO.email}`}
          >
            <span className="contact-email__icon">
              <MailIcon />
            </span>
            <span className="contact-email__text">
              <span className="contact-email__label">
                {t('contactSection.email')}
              </span>
              <span className="contact-email__value">{CONTACT_INFO.email}</span>
            </span>
          </a>

          <ul className="contact-people">
            {CONTACT_INFO.contacts.map((contact) => (
              <li className="contact-person" key={contact.phone}>
                <span className="contact-person__avatar" aria-hidden="true">
                  {contact.name.charAt(0)}
                </span>

                <span className="contact-person__info">
                  <span className="contact-person__name">{contact.name}</span>
                  <span className="contact-person__phone">{contact.phone}</span>
                </span>

                <span className="contact-person__actions">
                  <a
                    className="contact-action contact-action--call"
                    href={`tel:${toDigits(contact.phone)}`}
                    aria-label={`${t('contactSection.call')} ${contact.name}`}
                    title={t('contactSection.call')}
                  >
                    <PhoneIcon />
                  </a>
                  <a
                    className="contact-action contact-action--whatsapp"
                    href={`https://wa.me/${toDigits(contact.phone)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${t('contactSection.whatsapp')} ${contact.name}`}
                    title={t('contactSection.whatsapp')}
                  >
                    <WhatsappIcon />
                  </a>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
