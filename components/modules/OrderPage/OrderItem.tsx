/* eslint-disable jsx-a11y/anchor-is-valid */
import { useStore } from 'effector-react';
import Link from 'next/link';

import { CartItemCounter } from '@/components/elements';
import { $mode } from '@/context/mode';
import { useMediaQuery, usePrice } from '@/hooks';
import { ShoppingCartItemProps } from '@/types/shopping-cart';
import { formatPrice } from '@/utils/common';

import styles from '@/styles/order/index.module.scss';
import spinnerStyles from '@/styles/spinner/index.module.scss';

export const OrderItem = ({ item }: { item: ShoppingCartItemProps }) => {
  const isMedia1160 = useMediaQuery(1160);
  const mode = useStore($mode);
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';

  const { price, isLoading, decreasePrice, increasePrice, deleteCartItem } = usePrice(
    item.count,
    item.partId,
    item.price
  );

  return (
    <li className={styles.order__cart__list__item}>
      <div className={styles.order__cart__list__item__left}>
        <div className={styles.order__cart__list__item__left__inner}>
          <div className={styles.order__cart__list__item__img}>
            <img src={item.image} alt={item.name} />
          </div>
          <Link href={`/catalog/${item.partId}`} passHref legacyBehavior>
            <a className={`${styles.order__cart__list__item__text} ${darkModeClass}`}>
              <span>
                {item.name.replace('.', '')}, {item.parts_manufacturer}, {item.boiler_manufacturer}
              </span>
            </a>
          </Link>
        </div>
        {isMedia1160 &&
          (item.in_stock === 0 ? (
            <span className={styles.order__cart__list__item__empty}>Нет на складе</span>
          ) : (
            <CartItemCounter
              totalCount={item.in_stock}
              partId={item.partId}
              initialCount={item.count}
              increasePrice={increasePrice}
              decreasePrice={decreasePrice}
            />
          ))}
      </div>
      <div className={styles.order__cart__list__item__right}>
        {!isMedia1160 &&
          (item.in_stock === 0 ? (
            <span className={styles.order__cart__list__item__empty}>Нет на складе</span>
          ) : (
            <CartItemCounter
              totalCount={item.in_stock}
              partId={item.partId}
              initialCount={item.count}
              increasePrice={increasePrice}
              decreasePrice={decreasePrice}
            />
          ))}
        <span className={`${styles.order__cart__list__item__price} ${darkModeClass}`}>
          {formatPrice(price)} P
        </span>
        <button className={styles.order__cart__list__item__delete} onClick={deleteCartItem}>
          {isLoading ? (
            <span
              className={`${spinnerStyles.spinner} ${
                mode === 'dark' ? '' : `${spinnerStyles.dark_mode}`
              }`}
              style={{ top: '-13px', left: '-30px', width: 25, height: 25 }}
            />
          ) : (
            'Удалить'
          )}
        </button>
      </div>
    </li>
  );
};
