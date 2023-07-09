import { useStore } from 'effector-react';
import React from 'react';

import { removeFromCartFx } from '@/app/api/shopping-cart';
import { removeItemFromCart, updateTotalPrice } from '@/utils/shopping-cart';

export const usePrice = (count: number, partId: number, initialPrice: number) => {
  const [price, setPrice] = React.useState(initialPrice);
  const isLoading = useStore(removeFromCartFx.pending);

  const increasePrice = () => setPrice((prevPrice) => prevPrice + initialPrice);
  const decreasePrice = () => setPrice((prevPrice) => prevPrice - initialPrice);
  const deleteCartItem = () => removeItemFromCart(partId);

  React.useEffect(() => {
    setPrice(price * count);
  }, []);

  React.useEffect(() => {
    updateTotalPrice(price, partId);
  }, [price]);

  return { price, isLoading, increasePrice, decreasePrice, deleteCartItem };
};
