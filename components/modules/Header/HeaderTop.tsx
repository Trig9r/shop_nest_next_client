/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useStore } from 'effector-react';
import Link from 'next/link';

import { ModeToggler } from '@/components/elements';
import { CityButton } from '@/components/elements/CityButton';
import { $mode } from '@/context/mode';
import { useMediaQuery, usePopup } from '@/hooks';

import ProfileDropdown from './ProfileDropdown';

import styles from '@/styles/header/index.module.scss';

export const HeaderTop = () => {
  const isMedia950 = useMediaQuery(950);
  const { isOpen, closePopup, toggleIsOpen } = usePopup();

  const mode = useStore($mode);
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';

  return (
    <div className={styles.header__top}>
      <div className={`container ${styles.header__top__container}`}>
        {!isMedia950 ? (
          <CityButton />
        ) : (
          <button
            onClick={toggleIsOpen}
            className={`${styles.burger_menu} ${isOpen ? styles.open : ''} ${darkModeClass}`}
          >
            <span />
            <span />
            <span />
          </button>
        )}
        <nav className={`${styles.header__nav} ${isOpen ? styles.open : ''} ${darkModeClass}`}>
          <ul className={styles.header__nav__list}>
            <li className={styles.header__nav__list__item}>
              <Link href='/shipping-payment' passHref legacyBehavior>
                <a
                  className={`${styles.header__nav__list__item__link} ${darkModeClass}`}
                  onClick={closePopup}
                >
                  Доставка и оплата
                </a>
              </Link>
            </li>
            <li className={styles.header__nav__list__item}>
              <Link href='/about' passHref legacyBehavior>
                <a
                  className={`${styles.header__nav__list__item__link} ${darkModeClass}`}
                  onClick={closePopup}
                >
                  О компании
                </a>
              </Link>
            </li>
            <li className={styles.header__nav__list__item}>
              <Link href='/catalog' passHref legacyBehavior>
                <a
                  className={`${styles.header__nav__list__item__link} ${darkModeClass}`}
                  onClick={closePopup}
                >
                  Каталог
                </a>
              </Link>
            </li>
            <li className={styles.header__nav__list__item}>
              <Link href='/contacts' passHref legacyBehavior>
                <a
                  className={`${styles.header__nav__list__item__link} ${darkModeClass}`}
                  onClick={closePopup}
                >
                  Контакты
                </a>
              </Link>
            </li>
            <li className={styles.header__nav__list__item}>
              <Link href='/wholesale-buyers' passHref legacyBehavior>
                <a
                  className={`${styles.header__nav__list__item__link} ${darkModeClass}`}
                  onClick={closePopup}
                >
                  Оптовым покупателям
                </a>
              </Link>
            </li>
            {isMedia950 && (
              <>
                <li className={styles.header__nav__list__item}>
                  <CityButton />
                </li>
                <li className={styles.header__nav__list__item}>
                  <ModeToggler />
                </li>
              </>
            )}
          </ul>
        </nav>
        <ProfileDropdown />
      </div>
    </div>
  );
};
