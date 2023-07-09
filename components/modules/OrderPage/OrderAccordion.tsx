import { useStore } from 'effector-react';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

import { DoneSvg, EditSvg } from '@/components/elements';
import { $mode } from '@/context/mode';
import { $shoppingCart, $totalPrice } from '@/context/shopping-cart';
import { useMediaQuery } from '@/hooks';
import { OrderAccordionProps } from '@/types/order';
import { formatPrice } from '@/utils/common';

import { CartPopupItem } from '../Header/CartPopup';

import { OrderItem } from './OrderItem';

import styles from '@/styles/order/index.module.scss';

export const OrderAccordion = ({ setOrderIsReady, showDoneIcon }: OrderAccordionProps) => {
  const isMedia550 = useMediaQuery(550);

  const totalPrice = useStore($totalPrice);
  const shoppingCart = useStore($shoppingCart);
  const mode = useStore($mode);
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';

  const [isExpanded, setIsExpanded] = React.useState(true);

  const handleOpenAccordion = () => {
    setIsExpanded(true);
    setOrderIsReady(false);
  };

  const handleCloseAccordion = () => {
    setIsExpanded(false);
    setOrderIsReady(true);
  };

  return (
    <>
      <motion.div initial={false} className={`${styles.order__cart__title} ${darkModeClass}`}>
        <h3 className={`${styles.order__cart__title__text} ${darkModeClass}`}>
          {showDoneIcon && (
            <span>
              <DoneSvg />
            </span>
          )}
          Корзина
        </h3>
        <button className={styles.order__cart__title__btn} onClick={handleOpenAccordion}>
          <span>
            <EditSvg />
          </span>
          Редактировать
        </button>
      </motion.div>
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            key='content'
            initial='collapsed'
            animate='open'
            exit='collapsed'
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 }
            }}
            style={{ overflow: 'hidden' }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div className={`${styles.order__cart__content} ${darkModeClass}`}>
              <ul className={styles.order__cart__list}>
                {shoppingCart.length ? (
                  shoppingCart.map((item) =>
                    isMedia550 ? (
                      <CartPopupItem key={item.id} item={item} />
                    ) : (
                      <OrderItem key={item.id} item={item} />
                    )
                  )
                ) : (
                  <li className={styles.order__cart__empty}>
                    <span className={`${styles.order__cart__empty__text} ${darkModeClass}`}>
                      Корзина пуста
                    </span>
                  </li>
                )}
              </ul>

              <div className={styles.order__cart__footer}>
                <div className={styles.order__cart__footer__total}>
                  <span className={`${styles.order__cart__footer__text} ${darkModeClass}`}>
                    Общая сумма заказа:
                  </span>
                  <span className={styles.order__cart__footer__price}>
                    {formatPrice(totalPrice)} P
                  </span>
                </div>
                <button
                  className={styles.order__cart__footer__btn}
                  onClick={handleCloseAccordion}
                  disabled={!shoppingCart.length}
                >
                  Продолжить
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
