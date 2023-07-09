import { createDomain } from 'effector-next';

import { BoilerPartProps } from '@/types/boilerparts';

const boilerPart = createDomain();

export const setBoilerPart = boilerPart.createEvent<BoilerPartProps>();

export const $boilerPart = boilerPart
  .createStore<BoilerPartProps>({} as BoilerPartProps)
  .on(setBoilerPart, (_, part) => part);
