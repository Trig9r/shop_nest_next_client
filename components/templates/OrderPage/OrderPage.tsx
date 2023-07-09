/* eslint-disable no-console */
import { useStore } from 'effector-react';
import { useRouter } from 'next/router';
import React, { useId } from 'react';
import { toast } from 'react-toastify';

import { checkPaymentFx, makePaymentFx } from '@/app/api/payment';
import { removeFromCartFx } from '@/app/api/shopping-cart';
import { OrderAccordion } from '@/components/modules/OrderPage';
import { $mode } from '@/context/mode';
import { $shoppingCart, $totalPrice, setShoppingCart } from '@/context/shopping-cart';
import { $user } from '@/context/user';
import { formatPrice } from '@/utils/common';

import styles from '@/styles/order/index.module.scss';
import spinnerStyles from '@/styles/spinner/index.module.scss';

export const OrderPage = () => {
  const labelId = useId();
  const router = useRouter();

  const { userId } = useStore($user);
  const shoppingCart = useStore($shoppingCart);
  const totalPrice = useStore($totalPrice);
  const mode = useStore($mode);
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';

  const [isOrderReady, setIsOrderReady] = React.useState(false);
  const [isUserAgreement, setIsUserAgreement] = React.useState(false);
  const isLoading = useStore(makePaymentFx.pending);

  const handleUserAgreementChange = () => setIsUserAgreement(!isUserAgreement);

  const makePayment = async () => {
    try {
      const data = await makePaymentFx({
        url: '/payment',
        amount: totalPrice
      });

      sessionStorage.setItem('paymentId', data.id);

      router.push(data.confirmation.confirmation_url);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const resetCart = async () => {
    await removeFromCartFx(`/shopping-cart/all/${userId}`);
    setShoppingCart([]);
    sessionStorage.removeItem('paymentId');
  };

  const checkPayment = async (paymentId: string) => {
    try {
      const data = await checkPaymentFx({
        url: '/payment/info',
        paymentId
      });

      if (data.status === 'succeeded') {
        resetCart();
        return;
      }

      sessionStorage.removeItem('paymentId');
    } catch (error) {
      console.log((error as Error).message);
      resetCart();
    }
  };

  React.useEffect(() => {
    const paymentId = sessionStorage.getItem('paymentId');

    if (paymentId) {
      checkPayment(paymentId);
    }
  }, []);

  return (
    <section className={styles.order}>
      <div className='container'>
        <h2 className={`${styles.order__title} ${darkModeClass}`}>Оформление заказа</h2>
        <div className={styles.order__inner}>
          <div className={styles.order__cart}>
            <OrderAccordion setOrderIsReady={setIsOrderReady} showDoneIcon={isOrderReady} />
          </div>
          <div className={styles.order__pay}>
            <h3 className={`${styles.order__pay__title} ${darkModeClass}`}>Итого</h3>
            <div className={`${styles.order__pay__inner} ${darkModeClass}`}>
              <div className={styles.order__pay__goods}>
                <span>Товары ({shoppingCart.reduce((count, item) => count + item.count, 0)})</span>
                <span>{formatPrice(totalPrice)} P</span>
              </div>

              <div className={styles.order__pay__total}>
                <span>На сумму</span>
                <span className={darkModeClass}>{formatPrice(totalPrice)} P</span>
              </div>

              <button
                className={styles.order__pay__btn}
                onClick={makePayment}
                disabled={!(isOrderReady && isUserAgreement)}
              >
                {isLoading ? (
                  <span className={spinnerStyles.spinner} style={{ top: '6px', left: '47%' }} />
                ) : (
                  'Подтвердить заказ'
                )}
              </button>

              <label className={`${styles.order__pay__rights} ${darkModeClass}`} htmlFor={labelId}>
                <input
                  type='checkbox'
                  className={styles.order__pay__rights__input}
                  id={labelId}
                  onChange={handleUserAgreementChange}
                  checked={isUserAgreement}
                />
                <span id={labelId} className={styles.order__pay__rights__text}>
                  <strong>Согласен с условиями</strong> Правил пользования торговой площадкой и
                  правилами возврата
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
