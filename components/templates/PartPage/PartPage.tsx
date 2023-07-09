import { useStore } from 'effector-react';
import React from 'react';
import { toast } from 'react-toastify';

import { getBoilerPartsFx } from '@/app/api/boilerParts';
import { removeFromCartFx } from '@/app/api/shopping-cart';
import { CartHoverCheckedSvg } from '@/components/elements/CartHoverCheckedSvg';
import { CartHoverSvg } from '@/components/elements/CartHoverSvg';
import { DashboardSlider } from '@/components/modules/DashboardPage';
import { PartAccordion, PartImagesList, PartTabs } from '@/components/modules/PartPage';
import { $boilerPart } from '@/context/boilerPart';
import { $boilerParts, setBoilerParts, setBoilerPartsByPopularity } from '@/context/boilerParts';
import { $mode } from '@/context/mode';
import { $shoppingCart } from '@/context/shopping-cart';
import { $user } from '@/context/user';
import { useMediaQuery } from '@/hooks';
import { formatPrice } from '@/utils/common';
import { toggleCartItem } from '@/utils/shopping-cart';

import styles from '@/styles/part/index.module.scss';
import spinnerStyles from '@/styles/spinner/index.module.scss';

export const PartPage = () => {
  const isMobile = useMediaQuery(850);

  const { username } = useStore($user);
  const boilerPart = useStore($boilerPart);
  const boilerParts = useStore($boilerParts);
  const cartItems = useStore($shoppingCart);
  const mode = useStore($mode);
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';

  const isLoadingCart = useStore(removeFromCartFx.pending);
  const isLoadingSlider = useStore(getBoilerPartsFx.pending);

  const isInCart = cartItems.some((item) => item.partId === boilerPart.id);

  const toggleToCart = () => toggleCartItem(username, boilerPart.id, isInCart);

  const loadBoilerParts = async () => {
    try {
      const data = await getBoilerPartsFx('/boiler-parts?limit=20&offset=0');

      setBoilerParts(data);
      setBoilerPartsByPopularity();
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  React.useEffect(() => {
    loadBoilerParts();
  }, []);

  return (
    <section>
      <div className='container'>
        <div className={`${styles.part__top} ${darkModeClass}`}>
          <h2 className={`${styles.part__title} ${darkModeClass}`}>{boilerPart.name}</h2>
          <div className={styles.part__inner}>
            <PartImagesList />
            <div className={styles.part__info}>
              <span className={`${styles.part__info__price} ${darkModeClass}`}>
                {formatPrice(boilerPart.price || 0)} P
              </span>

              <span className={styles.part__info__stock}>
                {+boilerPart.in_stock > 0 ? (
                  <span className={styles.part__info__stock__success}>Есть на складе</span>
                ) : (
                  <span className={styles.part__info__stock__not}>Нет на складе</span>
                )}
              </span>

              <span className={styles.part__info__code}>Артикул: {boilerPart.vendor_code}</span>

              <button
                className={`${styles.part__info__btn} ${isInCart ? styles.in_cart : ''}`}
                onClick={toggleToCart}
                disabled={+boilerPart.in_stock === 0 || isLoadingCart}
              >
                {isLoadingCart ? (
                  <span className={spinnerStyles.spinner} style={{ top: 10, left: '45%' }} />
                ) : (
                  <span>
                    {isInCart ? (
                      <>
                        <CartHoverCheckedSvg />
                        <span>Добавленно в корзину</span>
                      </>
                    ) : (
                      <>
                        <CartHoverSvg />
                        <span>Положить в корзину</span>
                      </>
                    )}
                  </span>
                )}
              </button>
              {!isMobile && <PartTabs />}
            </div>
          </div>
        </div>
        {isMobile && (
          <div className={styles.part__accordion}>
            <div className={styles.part__accordion__inner}>
              <PartAccordion title='Описание'>
                <div className={`${styles.part__accordion__content} ${darkModeClass}`}>
                  <h3 className={`${styles.part__tabs__content__title} ${darkModeClass}`}>
                    {boilerPart.name}
                  </h3>
                  <p className={`${styles.part__tabs__content__text} ${darkModeClass}`}>
                    {boilerPart.description}
                  </p>
                </div>
              </PartAccordion>
            </div>
            <PartAccordion title='Совместимость'>
              <div className={`${styles.part__accordion__content} ${darkModeClass}`}>
                <p className={`${styles.part__tabs__content__text} ${darkModeClass}`}>
                  {boilerPart.compatibility}
                </p>
              </div>
            </PartAccordion>
          </div>
        )}
        <div className={`${styles.part__bottom} ${darkModeClass}`}>
          <h2 className={`${styles.part__title} ${darkModeClass}`}>Вам понравится</h2>
          <DashboardSlider
            goToPartPage
            isLoading={isLoadingSlider}
            items={boilerParts.rows || []}
          />
        </div>
      </div>
    </section>
  );
};
