/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';

import styles from '@/styles/footer/index.module.scss';

export const FooterLogo = () => (
  <div className={styles.footer__top__item}>
    <Link href='/dashboard' passHref legacyBehavior>
      <a className={styles.footer__top__item__logo}>
        <img src='/img/logo-footer.svg' alt='logo-footer' />
        <span className={styles.footer__top__item__logo__text}>Детали для газовых котлов</span>
      </a>
    </Link>
  </div>
);
