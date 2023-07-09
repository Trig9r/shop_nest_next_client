import { useStore } from 'effector-react';
import React from 'react';
import { toast } from 'react-toastify';

import { updateCartItemFx } from '@/app/api/shopping-cart';
import { $mode } from '@/context/mode';
import { updateCartItemCount } from '@/context/shopping-cart';
import { CartItemCounterProps } from '@/types/shopping-cart';

import { MinusSvg } from '../MinusSvg';
import { PlusSvg } from '../PlusSvg';

import styles from '@/styles/cartPopup/index.module.scss';
import spinnerStyles from '@/styles/spinner/index.module.scss';

export const CartItemCounter = ({
  totalCount,
  partId,
  initialCount,
  increasePrice,
  decreasePrice
}: CartItemCounterProps) => {
  const mode = useStore($mode);
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';

  const [count, setCount] = React.useState(initialCount);
  const [disableIncrease, setDisableIncrease] = React.useState(false);
  const [disableDecrease, setDisableDecrease] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleIncrease = async () => {
    try {
      setIsLoading(true);
      increasePrice();
      setDisableDecrease(false);
      setCount((prevCount) => prevCount + 1);

      const data = await updateCartItemFx({
        url: `/shopping-cart/count/${partId}`,
        payload: { count: count + 1 }
      });

      updateCartItemCount({ partId, count: data.count });
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDecrease = async () => {
    try {
      setIsLoading(true);
      decreasePrice();
      setDisableIncrease(false);
      setCount((prevCount) => prevCount - 1);

      const data = await updateCartItemFx({
        url: `/shopping-cart/count/${partId}`,
        payload: { count: count - 1 }
      });

      updateCartItemCount({ partId, count: data.count });
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (count === 1) {
      setDisableDecrease(true);
    }

    if (count === totalCount) {
      setDisableIncrease(true);
    }
  }, [count, totalCount]);

  return (
    <div className={`${styles.cart__popup__list__item__counter} ${darkModeClass}`}>
      <button disabled={disableDecrease} onClick={handleDecrease}>
        <MinusSvg />
      </button>
      <span>
        {isLoading ? (
          <span
            className={`${spinnerStyles.spinner} ${
              mode === 'dark' ? '' : `${spinnerStyles.dark_mode}`
            }`}
            style={{ top: 4, left: 33, width: 20, height: 20 }}
          />
        ) : (
          count
        )}
      </span>
      <button disabled={disableIncrease} onClick={handleIncrease}>
        <PlusSvg />
      </button>
    </div>
  );
};
