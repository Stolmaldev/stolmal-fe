export type TestimonialSource = 'facebook' | 'allegro';

export interface Testimonial {
  id: string;
  author: string;
  source: TestimonialSource;
  rating: number;
  /** i18n key under `testimonialsSection.items` */
  quoteKey: string;
}

/**
 * Real customer reviews collected from Facebook and Allegro.
 * Sources are interleaved so the two reviews from the same customer
 * (posted on different platforms) don't sit next to each other.
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'ania',
    author: 'Ania Z Zielonego',
    source: 'facebook',
    rating: 5,
    quoteKey: 'testimonialsSection.items.ania',
  },
  {
    id: 'zimneserce',
    author: 'zimneserce',
    source: 'allegro',
    rating: 5,
    quoteKey: 'testimonialsSection.items.zimneserce',
  },
  {
    id: 'budmar',
    author: 'BudMar Usługi Wykończeniowe',
    source: 'facebook',
    rating: 5,
    quoteKey: 'testimonialsSection.items.budmar',
  },
  {
    id: 'iwonaFacebook',
    author: 'Iwona Hylak',
    source: 'facebook',
    rating: 5,
    quoteKey: 'testimonialsSection.items.iwonaFacebook',
  },
];
