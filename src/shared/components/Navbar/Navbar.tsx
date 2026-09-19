import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { NAV_ITEMS } from '../../config/navigation';
import Logo from '../Logo';
import LanguageSwitcher from '../LanguageSwitcher';
import './Navbar.css';

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar" aria-label="Primary">
      <div className="navbar__inner">
        <Link
          to="/"
          className="navbar__brand"
          aria-label={t('brand.name')}
          onClick={() => setOpen(false)}
        >
          <Logo size="sm" iconOnly />
        </Link>

        <button
          type="button"
          className={`navbar__burger${open ? ' navbar__burger--open' : ''}`}
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`navbar__menu${open ? ' navbar__menu--open' : ''}`}>
          <ul className="navbar__links">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `navbar__link${isActive ? ' navbar__link--active' : ''}`
                  }
                  onClick={() => setOpen(false)}
                >
                  {t(item.labelKey)}
                </NavLink>
              </li>
            ))}
          </ul>
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
