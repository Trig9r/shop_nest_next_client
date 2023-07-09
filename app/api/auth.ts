import { AxiosError } from 'axios';
import { createEffect } from 'effector-next';
import { toast } from 'react-toastify';

import { HTTPStatus } from '@/constans';
import type { SignInFxProps, SignUpFxProps } from '@/types/auth';

import api from '../axiosClient';

export const signUpFx = createEffect(async ({ url, username, password, email }: SignUpFxProps) => {
  const { data } = await api.post(url, { username, password, email });

  if (data.warningMessage) {
    toast.warning(data.warningMessage);
    return;
  }

  toast.success('Регистрация прошла успешно!');

  return data;
});

export const signInFx = createEffect(async ({ url, username, password }: SignInFxProps) => {
  const { data } = await api.post(url, { username, password });

  if (data.warningMessage) {
    toast.warning(data.warningMessage);
    return;
  }

  toast.success('Вход выполнен!');

  return data;
});

export const checkUserAuthFx = createEffect(async (url: string) => {
  try {
    const { data } = await api.get(url);

    return data;
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response) {
      if (axiosError.response.status === HTTPStatus.FORBIDDEN) {
        return false;
      }
    }

    toast.error((error as Error).message);
  }
});

export const logoutFx = createEffect(async (url: string) => {
  try {
    await api.get(url);
  } catch (error) {
    toast.error((error as Error).message);
  }
});
