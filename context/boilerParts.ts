import { createDomain } from 'effector-next';

import { BoilerPartsProps } from '@/types/boilerparts';
import { FilterCheckboxItemProps } from '@/types/catalog';
import { boilerManufacturers, partsManufacturers } from '@/utils/catalog';

const boilerParts = createDomain();

export const setBoilerParts = boilerParts.createEvent<BoilerPartsProps>();

export const setBoilerPartsCheapFirst = boilerParts.createEvent();
export const setBoilerPartsExpensiveFirst = boilerParts.createEvent();
export const setBoilerPartsByPopularity = boilerParts.createEvent();

export const setFilteredBoilerParts = boilerParts.createEvent<BoilerPartsProps>();

export const setBoilerManufacturer = boilerParts.createEvent<FilterCheckboxItemProps[]>();
export const updateBoilerManufacturer = boilerParts.createEvent<FilterCheckboxItemProps>();

export const setPartsManufacturer = boilerParts.createEvent<FilterCheckboxItemProps[]>();
export const updatePartsManufacturer = boilerParts.createEvent<FilterCheckboxItemProps>();

export const setBoilerManufacturersFromQuery = boilerParts.createEvent<string[]>();
export const setPartsManufacturersFromQuery = boilerParts.createEvent<string[]>();

const updateManufacturer = (
  manufacturers: FilterCheckboxItemProps[],
  id: string,
  payload: Partial<FilterCheckboxItemProps>
) =>
  manufacturers.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        ...payload
      };
    }

    return item;
  });

const updateManufacturerFromQuery = (
  manufacturers: FilterCheckboxItemProps[],
  manufacturersFromQuery: string[]
) =>
  manufacturers.map((item) => {
    if (manufacturersFromQuery.find((title) => title === item.title)) {
      return {
        ...item,
        checked: true
      };
    }

    return item;
  });

export const $boilerParts = boilerParts
  .createStore<BoilerPartsProps>({} as BoilerPartsProps)
  .on(setBoilerParts, (_, parts) => parts)
  .on(setBoilerPartsCheapFirst, (state) => ({
    ...state,
    rows: state.rows.sort((a, b) => a.price - b.price)
  }))
  .on(setBoilerPartsExpensiveFirst, (state) => ({
    ...state,
    rows: state.rows.sort((a, b) => b.price - a.price)
  }))
  .on(setBoilerPartsByPopularity, (state) => ({
    ...state,
    rows: state.rows.sort((a, b) => b.popularity - a.popularity)
  }));

export const $boilerManufacturers = boilerParts
  .createStore<FilterCheckboxItemProps[]>(boilerManufacturers as FilterCheckboxItemProps[])
  .on(setBoilerManufacturer, (_, parts) => parts)
  .on(updateBoilerManufacturer, (state, payload) => [
    ...updateManufacturer(state, payload.id as string, { checked: payload.checked })
  ])
  .on(setBoilerManufacturersFromQuery, (state, manufacturersFromQuery) => [
    ...updateManufacturerFromQuery(state, manufacturersFromQuery)
  ]);

export const $partsManufacturers = boilerParts
  .createStore<FilterCheckboxItemProps[]>(partsManufacturers as FilterCheckboxItemProps[])
  .on(setPartsManufacturer, (_, parts) => parts)
  .on(updatePartsManufacturer, (state, payload) => [
    ...updateManufacturer(state, payload.id as string, { checked: payload.checked })
  ])
  .on(setPartsManufacturersFromQuery, (state, manufacturersFromQuery) => [
    ...updateManufacturerFromQuery(state, manufacturersFromQuery)
  ]);

export const $filteredBoilerParts = boilerParts
  .createStore<BoilerPartsProps>({} as BoilerPartsProps)
  .on(setFilteredBoilerParts, (_, parts) => parts);
