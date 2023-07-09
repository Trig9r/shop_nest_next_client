import { createEffect } from 'effector-next';

import { AddToCartFxProps, UpdateCartItemFxProps } from '@/types/shopping-cart';

import api from '../axiosClient';

export const getCartItemsFx = createEffect(async (url: string) => {
  const { data } = await api.get(url);

  return data;
});

export const addToCartFx = createEffect(async ({ url, username, partId }: AddToCartFxProps) => {
  const { data } = await api.post(url, { username, partId });

  return data;
});

export const removeFromCartFx = createEffect(async (url: string) => {
  await api.delete(url);
});

export const updateCartItemFx = createEffect(async ({ url, payload }: UpdateCartItemFxProps) => {
  const { data } = await api.patch(url, payload);

  return data;
});
