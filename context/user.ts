import { createDomain } from 'effector-next';

import { UserProps } from '@/types/auth';

const user = createDomain();

export const setUser = user.createEvent<UserProps>();
export const setUserCity = user.createEvent<{ city: string; street: string }>();

export const $user = user.createStore<UserProps>({} as UserProps).on(setUser, (_, user) => user);

export const $userCity = user
  .createStore({ city: '', street: '' })
  .on(setUserCity, (_, city) => city);
