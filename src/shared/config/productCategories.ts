export interface ProductCategory {
  /** Matches both the `storage/<id>` folder name and the manifest.json key. */
  id: string;
  /** i18n key for the category's display name, under `gallerySection.categories`. */
  labelKey: string;
}

/**
 * Order in which product carousels are stacked in the gallery section.
 * Furniture care products are intentionally last — they are an accessory
 * category, not a furniture category.
 */
export const PRODUCT_CATEGORIES: ProductCategory[] = [
  { id: 'beds', labelKey: 'gallerySection.categories.beds' },
  { id: 'chairs', labelKey: 'gallerySection.categories.chairs' },
  { id: 'tables', labelKey: 'gallerySection.categories.tables' },
  {
    id: 'furniture-care-product',
    labelKey: 'gallerySection.categories.furnitureCare',
  },
];
