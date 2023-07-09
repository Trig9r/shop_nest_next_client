/* eslint-disable import/no-extraneous-dependencies */
import { useStore } from 'effector-react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import React, { forwardRef } from 'react';
import { toast } from 'react-toastify';

import { getCartItemsFx } from '@/app/api/shopping-cart';
import { ShoppingCartSvg } from '@/components/elements';
import { $mode } from '@/context/mode';
import {
  $disableCart,
  $shoppingCart,
  $totalPrice,
  setShoppingCart,
  setTotalPrice
} from '@/context/shopping-cart';
import { $user } from '@/context/user';
import { WrappedComponentProps } from '@/types/common';
import { formatPrice } from '@/utils/common';
import { withClickOutside } from '@/utils/withClickOutside';

import { CartPopupItem } from './CartPopupItem';

import styles from '@/styles/cartPopup/index.module.scss';

export const CartPopup = forwardRef<HTMLDivElement, WrappedComponentProps>(
  ({ isOpen, setIsOpen }, ref) => {
    const { userId } = useStore($user);
    const totalPrice = useStore($totalPrice);
    const disableCart = useStore($disableCart);
    const mode = useStore($mode);
    const shoppingCart = useStore($shoppingCart);
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';

    const toggleCartDropdown = () => {
      setIsOpen(!isOpen);
    };

    const loadCartItems = async () => {
      try {
        const cartItems = await getCartItemsFx(`/shopping-cart/${userId}`);

        setShoppingCart(cartItems);
      } catch (error) {
        toast.error((error as Error).message);
      }
    };

    React.useEffect(() => {
      loadCartItems();
    }, []);

    React.useEffect(() => {
      setTotalPrice(
        shoppingCart.reduce((defaultCount, item) => defaultCount + item.total_price, 0)
      );
    }, [shoppingCart]);

    return (
      <div className={styles.cart} ref={ref}>
        {disableCart ? (
          <button className={`${styles.cart__btn} ${darkModeClass}`} style={{ cursor: 'auto' }}>
            <span className={styles.cart__svg}>
              <ShoppingCartSvg />
            </span>
            <span className={styles.cart__text}>Корзина</span>
          </button>
        ) : (
          <button className={`${styles.cart__btn} ${darkModeClass}`} onClick={toggleCartDropdown}>
            {!!shoppingCart.length && (
              <span className={styles.cart__btn__count}>{shoppingCart.length}</span>
            )}
            <span className={styles.cart__svg}>
              <ShoppingCartSvg />
            </span>
            <span className={styles.cart__text}>Корзина</span>
          </button>
        )}
        <AnimatePresence>
          {isOpen && (
            <motion.ul
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className={`${styles.cart__popup} ${darkModeClass}`}
              style={{ transformOrigin: 'right top' }}
            >
              <h3 className={styles.cart__popup__title}>Корзина</h3>
              <ul className={styles.cart__popup__list}>
                {shoppingCart.length ? (
                  shoppingCart.map((item) => <CartPopupItem key={item.id} item={item} />)
                ) : (
                  <li className={styles.cart__popup__empty}>
                    <span className={`${styles.cart__popup__empty__text} ${darkModeClass}`}>
                      Корзина пуста
                    </span>
                  </li>
                )}
              </ul>
              <div className={styles.cart__popup__footer}>
                <div className={styles.cart__popup__footer__total}>
                  <span className={`${styles.cart__popup__footer__text} ${darkModeClass}`}>
                    Общая сумма заказа:
                  </span>
                  <span className={styles.cart__popup__footer__price}>
                    {formatPrice(totalPrice)} P
                  </span>
                </div>
                <Link href='/order' passHref legacyBehavior>
                  <button
                    className={styles.cart__popup__footer__btn}
                    disabled={!shoppingCart.length}
                  >
                    Оформить заказ
                  </button>
                </Link>
              </div>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

CartPopup.displayName = 'CartPopup';

export default withClickOutside(CartPopup);
