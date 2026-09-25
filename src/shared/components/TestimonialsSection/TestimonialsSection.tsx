import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TESTIMONIALS, TestimonialSource } from '../../config/testimonials';
import OrderCtaButton from '../OrderCtaButton';
import './TestimonialsSection.css';

const QuoteIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M7.5 6.5C5 8 3.8 10 3.8 12.6c0 2.6 1.7 4.4 3.9 4.4 1.9 0 3.3-1.4 3.3-3.2 0-1.7-1.2-3-2.9-3-.3 0-.6 0-.8.1.2-1.6 1.4-3.1 2.9-4l-2.7-.4Z"
      fill="currentColor"
    />
    <path
      d="M17 6.5c-2.5 1.5-3.7 3.5-3.7 6.1 0 2.6 1.7 4.4 3.9 4.4 1.9 0 3.3-1.4 3.3-3.2 0-1.7-1.2-3-2.9-3-.3 0-.6 0-.8.1.2-1.6 1.4-3.1 2.9-4l-2.7-.4Z"
      fill="currentColor"
    />
  </svg>
);

const StarIcon: React.FC<{ filled: boolean }> = ({ filled }) => (
  <svg
    viewBox="0 0 20 20"
    fill={filled ? 'currentColor' : 'none'}
    aria-hidden="true"
    className="testimonial-card__star"
  >
    <path
      d="M10 1.6l2.47 5.13 5.53.68-4.03 3.9 1 5.6L10 14.2l-4.97 2.71 1-5.6-4.03-3.9 5.53-.68L10 1.6Z"
      stroke="currentColor"
      strokeWidth={filled ? 0 : 1.3}
      strokeLinejoin="round"
    />
  </svg>
);

const AllegroIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="11" fill="#FF5A00" />
    <path
      d="M8.4 16.5 11 7.4h2.2l2.6 9.1h-1.9l-.5-1.9h-2.8l-.5 1.9H8.4Zm2.5-3.4h1.9L12 9.5l-1.1 3.6Z"
      fill="#fff"
    />
  </svg>
);

const FacebookBadgeIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="11" fill="#1877F2" />
    <path
      d="M13.6 21v-7.2h2.4l.4-2.8h-2.8V9.2c0-.8.2-1.4 1.4-1.4h1.5V5.3c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.1H8.2v2.8h2.4V21h3Z"
      fill="#fff"
    />
  </svg>
);

const SOURCE_ICON: Record<TestimonialSource, React.FC> = {
  facebook: FacebookBadgeIcon,
  allegro: AllegroIcon,
};

/**
 * Reviews vary wildly in length (one-liners next to multi-sentence
 * paragraphs), which used to make cards look uneven. Long quotes are
 * collapsed to ~20% of the longest review's length with a "Read more"
 * toggle, keeping every card roughly the same height.
 */
const TestimonialCard: React.FC<{
  quote: string;
  collapseLimit: number;
}> = ({ quote, collapseLimit }) => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const isLong = quote.length > collapseLimit;
  const displayText =
    isLong && !expanded ? `${quote.slice(0, collapseLimit).trimEnd()}…` : quote;

  return (
    <>
      <p className="testimonial-card__quote">{displayText}</p>
      {isLong && (
        <button
          type="button"
          className="testimonial-card__toggle"
          onClick={() => setExpanded((value) => !value)}
        >
          {expanded
            ? t('testimonialsSection.showLess')
            : t('testimonialsSection.showMore')}
        </button>
      )}
    </>
  );
};

const TestimonialsSection: React.FC = () => {
  const { t } = useTranslation();

  const quotes = useMemo(
    () =>
      TESTIMONIALS.map((testimonial) => ({
        ...testimonial,
        text: t(testimonial.quoteKey),
      })),
    [t]
  );

  const collapseLimit = useMemo(() => {
    const longest = Math.max(...quotes.map((item) => item.text.length));
    return Math.round(longest * 0.2);
  }, [quotes]);

  return (
    <section
      id="testimonials"
      className="testimonials-section"
      aria-labelledby="testimonials-section-eyebrow"
    >
      <div className="testimonials-section__inner">
        <div className="testimonials-section__intro">
          <span
            id="testimonials-section-eyebrow"
            className="testimonials-section__eyebrow"
          >
            {t('testimonialsSection.eyebrow')}
          </span>
          <p className="testimonials-section__subtitle">
            {t('testimonialsSection.subtitle')}
          </p>
        </div>

        <ul className="testimonials-grid">
          {quotes.map((testimonial) => {
            const SourceIcon = SOURCE_ICON[testimonial.source];
            return (
              <li className="testimonial-card" key={testimonial.id}>
                <div className="testimonial-card__header">
                  <span className="testimonial-card__quote-icon">
                    <QuoteIcon />
                  </span>
                  <span
                    className="testimonial-card__source"
                    title={t(
                      `testimonialsSection.source.${testimonial.source}`
                    )}
                  >
                    <SourceIcon />
                  </span>
                </div>

                <div
                  className="testimonial-card__rating"
                  role="img"
                  aria-label={`${testimonial.rating}/5`}
                >
                  {Array.from({ length: 5 }, (_, index) => (
                    <StarIcon key={index} filled={index < testimonial.rating} />
                  ))}
                </div>

                <TestimonialCard
                  quote={testimonial.text}
                  collapseLimit={collapseLimit}
                />

                <span className="testimonial-card__author">
                  {testimonial.author}
                </span>
              </li>
            );
          })}
        </ul>

        <div className="testimonials-section__cta">
          <OrderCtaButton />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

