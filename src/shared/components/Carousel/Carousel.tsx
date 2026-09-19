import React, { useCallback, useEffect, useRef, useState } from 'react';
import './Carousel.css';

export interface CarouselImage {
  src: string;
  alt: string;
}

interface CarouselProps {
  images: CarouselImage[];
  /** Accessible name for the whole carousel region. */
  ariaLabel: string;
  /** Autoplay delay in ms. Set to 0 to disable. Defaults to 6000ms. */
  autoPlayMs?: number;
}

const ChevronLeftIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M15 5.5 8 12l7 6.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronRightIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="m9 5.5 7 6.5-7 6.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SWIPE_THRESHOLD_PX = 40;

/**
 * Generic, reusable image carousel. Renders one image at a time (so
 * categories with hundreds of photos stay lightweight), with arrow
 * navigation, keyboard support, touch swipe, autoplay that pauses on
 * hover/focus, and a "n / total" counter instead of per-image dots (dots
 * don't scale to large photo sets).
 */
const Carousel: React.FC<CarouselProps> = ({
  images,
  ariaLabel,
  autoPlayMs = 6000,
}) => {
  const total = images.length;
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (index >= total) setIndex(0);
  }, [total, index]);

  const goTo = useCallback(
    (nextIndex: number) => {
      if (total === 0) return;
      setIndex(((nextIndex % total) + total) % total);
    },
    [total]
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (!autoPlayMs || isPaused || total <= 1) return undefined;
    const intervalId = setInterval(next, autoPlayMs);
    return () => clearInterval(intervalId);
  }, [autoPlayMs, isPaused, next, total]);

  if (total === 0) return null;

  const current = images[index];

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      prev();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      next();
    }
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const delta = event.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > SWIPE_THRESHOLD_PX) {
      if (delta > 0) prev();
      else next();
    }
    touchStartX.current = null;
  };

  return (
    <div
      className="carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="carousel__viewport">
        <img
          key={current.src}
          src={current.src}
          alt={current.alt}
          className="carousel__image"
          loading="lazy"
        />
      </div>

      {total > 1 && (
        <>
          <button
            type="button"
            className="carousel__control carousel__control--prev"
            onClick={prev}
            aria-label="Previous image"
          >
            <ChevronLeftIcon />
          </button>
          <button
            type="button"
            className="carousel__control carousel__control--next"
            onClick={next}
            aria-label="Next image"
          >
            <ChevronRightIcon />
          </button>
          <div className="carousel__counter" aria-live="polite">
            {index + 1} / {total}
          </div>
        </>
      )}
    </div>
  );
};

export default Carousel;
