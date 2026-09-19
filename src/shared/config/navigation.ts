export interface NavItem {
  /** i18n key under `nav` namespace */
  labelKey: string;
  to: string;
}

export const NAV_ITEMS: NavItem[] = [
  { labelKey: 'nav.home', to: '/' },
  { labelKey: 'nav.gallery', to: '/gallery' },
  { labelKey: 'nav.process', to: '/process' },
  { labelKey: 'nav.contact', to: '/contact' },
];
