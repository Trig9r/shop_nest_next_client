import { createEffect } from 'effector-next';

import { CheckPaymentFx, MakePaymentFx } from '@/types/order';

import api from '../axiosClient';

export const makePaymentFx = createEffect(async ({ url, amount }: MakePaymentFx) => {
  const { data } = await api.post(url, { amount });

  return data;
});

export const checkPaymentFx = createEffect(async ({ url, paymentId }: CheckPaymentFx) => {
  const { data } = await api.post(url, { paymentId });

  return data;
});
