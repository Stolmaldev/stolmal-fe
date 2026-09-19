import React from 'react';
import { useTranslation } from 'react-i18next';
import { PRODUCT_CATEGORIES } from '../../config/productCategories';
import { useProductManifest } from '../../hooks/useProductManifest';
import Carousel from '../Carousel';
import OrderCtaButton from '../OrderCtaButton';
import './GallerySection.css';

const GallerySection: React.FC = () => {
  const { t } = useTranslation();
  const manifest = useProductManifest();

  const categoriesWithImages = PRODUCT_CATEGORIES.map((category) => ({
    ...category,
    images: manifest[category.id] ?? [],
  })).filter((category) => category.images.length > 0);

  return (
    <section
      id="gallery"
      className="gallery-section"
      aria-labelledby="gallery-section-title"
    >
      <div className="gallery-section__inner">
        <div className="gallery-section__intro">
          <span className="gallery-section__eyebrow">
            {t('gallerySection.eyebrow')}
          </span>
          <h2 id="gallery-section-title" className="gallery-section__title">
            {t('gallerySection.title')}
          </h2>
          <p className="gallery-section__subtitle">
            {t('gallerySection.subtitle')}
          </p>
        </div>

        {categoriesWithImages.length === 0 ? (
          <p className="gallery-section__empty">{t('gallerySection.empty')}</p>
        ) : (
          <div className="gallery-categories">
            {categoriesWithImages.map((category, categoryIndex) => {
              const label = t(category.labelKey);
              return (
                <div className="gallery-category" key={category.id}>
                  <div className="gallery-category__heading">
                    <span className="gallery-category__index">
                      {String(categoryIndex + 1).padStart(2, '0')}
                    </span>
                    <h3 className="gallery-category__title">{label}</h3>
                  </div>
                  <Carousel
                    ariaLabel={label}
                    images={category.images.map((image, imageIndex) => ({
                      src: image.src,
                      alt: `${label} ${imageIndex + 1}`,
                    }))}
                  />
                </div>
              );
            })}
          </div>
        )}

        <div className="gallery-section__cta">
          <OrderCtaButton />
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
