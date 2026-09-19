import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { NAV_ITEMS } from '../../config/navigation';
import { CONTACT_INFO } from '../../config/contactInfo';
import './Footer.css';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__col">
          <h3 className="footer__brand">{t('brand.name')}</h3>
          <p className="footer__about">{t('footer.about')}</p>
        </div>

        <div className="footer__col">
          <h4 className="footer__heading">{t('footer.navigation')}</h4>
          <ul className="footer__list">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <Link className="footer__link" to={item.to}>
                  {t(item.labelKey)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h4 className="footer__heading">{t('footer.contact')}</h4>
          <ul className="footer__list">
            <li>
              <a className="footer__link" href={`mailto:${CONTACT_INFO.email}`}>
                {CONTACT_INFO.email}
              </a>
            </li>
            {CONTACT_INFO.contacts.map((contact) => (
              <li key={contact.phone} className="footer__contact">
                <span className="footer__contact-name">{contact.name}</span>
                <a
                  className="footer__link"
                  href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                >
                  {contact.phone}
                </a>
              </li>
            ))}
            <li className="footer__muted">{CONTACT_INFO.address}</li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        © {year} {t('brand.name')}. {t('footer.rights')}
      </div>
    </footer>
  );
};

export default Footer;
