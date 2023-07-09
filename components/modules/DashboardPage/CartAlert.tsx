/* eslint-disable jsx-a11y/anchor-is-valid */
import { useStore } from 'effector-react';
import Link from 'next/link';

import { $mode } from '@/context/mode';
import { $totalPrice } from '@/context/shopping-cart';
import { CartAlertProps } from '@/types/dashboard';
import { formatPrice } from '@/utils/common';

import styles from '@/styles/dashboard/index.module.scss';

export const CartAlert = ({ count, closeAlert }: CartAlertProps) => {
  const totalPrice = useStore($totalPrice);
  const mode = useStore($mode);
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';

  const showCountMessage = (count: string) => {
    if (count.endsWith('1')) {
      return 'товар';
    }

    if (count.endsWith('2') || count.endsWith('3') || count.endsWith('4')) {
      return 'товара';
    }

    return 'товаров';
  };

  return (
    <>
      <div className={`${styles.dashboard__alert__left} ${darkModeClass}`}>
        <span>
          В корзине {count} {showCountMessage(`${count}`)}
        </span>
        <span>На сумму {formatPrice(totalPrice)} P</span>
      </div>
      <div className={styles.dashboard__alert__right}>
        <Link href='/order' passHref legacyBehavior>
          <a className={styles.dashboard__alert__btn_cart}>Перейти в корзину</a>
        </Link>
        <Link href='/order' legacyBehavior>
          <a className={styles.dashboard__alert__btn_order}>Оформить заказ</a>
        </Link>
      </div>
      <button
        aria-label='закрыть'
        className={styles.dashboard__alert__btn_close}
        onClick={closeAlert}
      />
    </>
  );
};
