/* eslint-disable jsx-a11y/anchor-is-valid */
import { useStore } from 'effector-react';
import Link from 'next/link';
import React from 'react';

import { CartItemCounter, DeleteSvg } from '@/components/elements';
import { $mode } from '@/context/mode';
import { usePrice } from '@/hooks';
import { ShoppingCartItemProps } from '@/types/shopping-cart';
import { formatPrice } from '@/utils/common';

import styles from '@/styles/cartPopup/index.module.scss';
import spinnerStyles from '@/styles/spinner/index.module.scss';

export const CartPopupItem = ({ item }: { item: ShoppingCartItemProps }) => {
  const mode = useStore($mode);
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';

  const { price, isLoading, decreasePrice, increasePrice, deleteCartItem } = usePrice(
    item.count,
    item.partId,
    item.price
  );

  return (
    <li className={styles.cart__popup__list__item}>
      <div className={styles.cart__popup__list__item__top}>
        <div className={styles.cart__popup__list__item__img}>
          <img src={item.image} alt={item.name} />
        </div>
        <Link href={`/catalog/${item.partId}`} passHref legacyBehavior>
          <a className={`${styles.cart__popup__list__item__text} ${darkModeClass}`}>
            <span>
              {item.name.replace('.', '')}, {item.parts_manufacturer}, {item.boiler_manufacturer}
            </span>
          </a>
        </Link>
        <button onClick={deleteCartItem}>
          <span>
            {isLoading ? (
              <span
                className={`${spinnerStyles.spinner} ${
                  mode === 'dark' ? '' : `${spinnerStyles.dark_mode}`
                }`}
                style={{ top: 0, left: 0, width: 20, height: 20 }}
              />
            ) : (
              <DeleteSvg />
            )}
          </span>
        </button>
      </div>
      <div className={styles.cart__popup__list__item__bottom}>
        {item.in_stock === 0 ? (
          <span className={styles.cart__popup__list__item__empty}>Нет на складе</span>
        ) : (
          <CartItemCounter
            totalCount={item.in_stock}
            partId={item.partId}
            initialCount={item.count}
            increasePrice={increasePrice}
            decreasePrice={decreasePrice}
          />
        )}
        <span className={`${styles.cart__popup__list__item__price} ${darkModeClass}`}>
          {formatPrice(price)} P
        </span>
      </div>
    </li>
  );
};
