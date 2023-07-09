import { createDomain } from 'effector-next';

import { ShoppingCartItemProps } from '@/types/shopping-cart';

const shoppingCart = createDomain();

export const setShoppingCart = shoppingCart.createEvent<ShoppingCartItemProps[]>();
export const updateShoppingCart = shoppingCart.createEvent<ShoppingCartItemProps>();
export const removeShoppingCartItem = shoppingCart.createEvent<number>();
export const setTotalPrice = shoppingCart.createEvent<number>();
export const setDisableCart = shoppingCart.createEvent<boolean>();
export const updateCartItemTotalPrice = shoppingCart.createEvent<{
  partId: number;
  total_price: number;
}>();
export const updateCartItemCount = shoppingCart.createEvent<{
  partId: number;
  count: number;
}>();

const remove = (cartItems: ShoppingCartItemProps[], partId: number) =>
  cartItems.filter((item) => item.partId !== partId);

function updateCartItem<T>(cartItems: ShoppingCartItemProps[], partId: number, payload: T) {
  return cartItems.map((item) => {
    if (item.partId === partId) {
      return {
        ...item,
        ...payload
      };
    }

    return item;
  });
}

export const $shoppingCart = shoppingCart
  .createStore<ShoppingCartItemProps[]>([])
  .on(setShoppingCart, (_, shoppingCart) => shoppingCart)
  .on(updateShoppingCart, (state, cartItem) => [...state, cartItem])
  .on(removeShoppingCartItem, (state, partId) => [...remove(state, partId)])
  .on(updateCartItemTotalPrice, (state, { partId, total_price }) => [
    ...updateCartItem(state, partId, { total_price })
  ])
  .on(updateCartItemCount, (state, { partId, count }) => [
    ...updateCartItem(state, partId, { count })
  ]);

export const $totalPrice = shoppingCart
  .createStore<number>(0)
  .on(setTotalPrice, (_, value) => value);

export const $disableCart = shoppingCart
  .createStore<boolean>(false)
  .on(setDisableCart, (_, value) => value);
