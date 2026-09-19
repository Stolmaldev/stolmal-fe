import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './OrderCtaButton.css';

interface OrderCtaButtonProps {
  /** Extra class name for spacing/positioning from the calling section. */
  className?: string;
}

/**
 * Single source of truth for the "Order now" call-to-action. Every section
 * that wants to send the visitor to the contact section must render this
 * component instead of duplicating the button markup/styles.
 */
const OrderCtaButton: React.FC<OrderCtaButtonProps> = ({ className }) => {
  const { t } = useTranslation();

  return (
    <Link
      to="/contact"
      className={`order-cta-button${className ? ` ${className}` : ''}`}
    >
      {t('common.orderNow')}
    </Link>
  );
};

export default OrderCtaButton;
