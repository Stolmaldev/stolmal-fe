import React from 'react';
import { useTranslation } from 'react-i18next';
import { PROCESS_STEPS } from '../../config/processSteps';
import OrderCtaButton from '../OrderCtaButton';
import './ProcessSection.css';

const ConsultationIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M4 5.5h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9.5L5 20.5V16.5H4a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path
      d="M7.5 9.5h9M7.5 13h6"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

const DesignIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="m4 20 1-4.4L15.3 5.3a1.5 1.5 0 0 1 2.1 0l1.3 1.3a1.5 1.5 0 0 1 0 2.1L8.4 19 4 20Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path
      d="m13.8 6.8 3.4 3.4"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

const CraftingIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="m14.5 6.5 3 3-7.6 7.6a2.1 2.1 0 0 1-1.5.6H5v-3.4a2.1 2.1 0 0 1 .6-1.5l8.9-8.9Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path
      d="M13 8l3 3M16 4.5l3.5 3.5-1.5 1.5-3.5-3.5L16 4.5Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>
);

const DeliveryIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M3 7.5h11v9H3z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path
      d="M14 10.5h3.6L21 13.8v2.7h-7z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <circle cx="7" cy="18" r="1.6" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="17.5" cy="18" r="1.6" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

const STEP_ICONS = [ConsultationIcon, DesignIcon, CraftingIcon, DeliveryIcon];

const ProcessSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section
      id="process"
      className="process-section"
      aria-labelledby="process-section-title"
    >
      <div className="process-section__inner">
        <div className="process-section__intro">
          <span className="process-section__eyebrow">
            {t('processSection.eyebrow')}
          </span>
          <h2 id="process-section-title" className="process-section__title">
            {t('processSection.title')}
          </h2>
          <p className="process-section__subtitle">
            {t('processSection.subtitle')}
          </p>
        </div>

        <ol className="process-steps">
          {PROCESS_STEPS.map((step, index) => {
            const Icon = STEP_ICONS[index];
            return (
              <li className="process-step" key={step.titleKey}>
                <div className="process-step__marker">
                  <span className="process-step__icon">
                    <Icon />
                  </span>
                  <span className="process-step__number">{index + 1}</span>
                </div>
                <h3 className="process-step__title">{t(step.titleKey)}</h3>
                <p className="process-step__description">
                  {t(step.descriptionKey)}
                </p>
              </li>
            );
          })}
        </ol>

        <div className="process-section__cta">
          <OrderCtaButton />
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
