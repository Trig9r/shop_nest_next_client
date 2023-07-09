import { useStore } from 'effector-react';
import { motion } from 'framer-motion';
import React from 'react';

import { $mode } from '@/context/mode';
import { tab1Text, tab2Text, tab3Text, tab4Text } from '@/utils/shipping-payment';

import styles from '@/styles/shippingPayment/index.module.scss';

export const ShippingPayment = () => {
  const mode = useStore($mode);
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';

  const [isTab1, setIsTab1] = React.useState(true);
  const [isTab2, setIsTab2] = React.useState(false);
  const [isTab3, setIsTab3] = React.useState(false);
  const [isTab4, setIsTab4] = React.useState(false);

  const toggleTab1 = () => {
    setIsTab1(true);
    setIsTab2(false);
    setIsTab3(false);
    setIsTab4(false);
  };

  const toggleTab2 = () => {
    setIsTab1(false);
    setIsTab2(true);
    setIsTab3(false);
    setIsTab4(false);
  };

  const toggleTab3 = () => {
    setIsTab1(false);
    setIsTab2(false);
    setIsTab3(true);
    setIsTab4(false);
  };

  const toggleTab4 = () => {
    setIsTab1(false);
    setIsTab2(false);
    setIsTab3(false);
    setIsTab4(true);
  };

  return (
    <section className={styles.shipping_payment}>
      <div className='container'>
        <h2 className={`${styles.shipping_payment__title} ${darkModeClass}`}>Доставка и оплата</h2>
        <div className={`${styles.shipping_payment__tabs} ${darkModeClass}`}>
          <ul className={styles.shipping_payment__tabs__controls}>
            <li
              className={`${styles.shipping_payment__tabs__controls__item} ${
                isTab1 ? styles.active : ''
              } ${darkModeClass}`}
            >
              <button className={darkModeClass} onClick={toggleTab1}>
                Как работает курьерская доставка?
              </button>
            </li>

            <li
              className={`${styles.shipping_payment__tabs__controls__item} ${
                isTab2 ? styles.active : ''
              } ${darkModeClass}`}
            >
              <button className={darkModeClass} onClick={toggleTab2}>
                Как получить товар из пункта самовызова?
              </button>
            </li>

            <li
              className={`${styles.shipping_payment__tabs__controls__item} ${
                isTab3 ? styles.active : ''
              } ${darkModeClass}`}
            >
              <button className={darkModeClass} onClick={toggleTab3}>
                Какие способы оплаты?
              </button>
            </li>

            <li
              className={`${styles.shipping_payment__tabs__controls__item} ${
                isTab4 ? styles.active : ''
              } ${darkModeClass}`}
            >
              <button className={darkModeClass} onClick={toggleTab4}>
                Как узнать статус заказанного товара?
              </button>
            </li>
          </ul>

          <div className={`${styles.shipping_payment__tabs__content} ${darkModeClass}`}>
            {isTab1 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={styles.shipping_payment__tabs__content__text}
              >
                {tab1Text}
              </motion.p>
            )}
            {isTab2 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={styles.shipping_payment__tabs__content__text}
              >
                {tab2Text}
              </motion.p>
            )}
            {isTab3 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={styles.shipping_payment__tabs__content__text}
              >
                {tab3Text}
              </motion.p>
            )}
            {isTab4 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={styles.shipping_payment__tabs__content__text}
              >
                {tab4Text}
              </motion.p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
