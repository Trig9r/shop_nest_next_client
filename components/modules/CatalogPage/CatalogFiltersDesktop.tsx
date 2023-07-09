import { useStore } from 'effector-react';
import React from 'react';

import { Accordion } from '@/components/elements';
import {
  $boilerManufacturers,
  $partsManufacturers,
  setBoilerManufacturer,
  setPartsManufacturer,
  updateBoilerManufacturer,
  updatePartsManufacturer
} from '@/context/boilerParts';
import { $mode } from '@/context/mode';
import { CatalogFiltersDesktopProps } from '@/types/catalog';

import { FilterManufacturerAccordion } from './FilterManufacturerAccordion';
import { PriceRange } from './PriceRange';

import styles from '@/styles/catalog/index.module.scss';
import spinnerStyles from '@/styles/spinner/index.module.scss';

export const CatalogFiltersDesktop = ({
  priceRange,
  setPriceRange,
  setIsPriceRangeChanged,
  resetFilterBtnDisabled,
  resetFilters,
  isLoading,
  applyFilters
}: CatalogFiltersDesktopProps) => {
  const boilerManufacturers = useStore($boilerManufacturers);
  const partsManufacturers = useStore($partsManufacturers);
  const mode = useStore($mode);
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';

  return (
    <div className={`${styles.catalog__bottom__filters} ${darkModeClass}`}>
      <h3 className={`${styles.catalog__bottom__filters__title} ${darkModeClass}`}>Фильтры</h3>
      <div className={styles.filters__boiler_manufactures}>
        <FilterManufacturerAccordion
          manufacturersList={boilerManufacturers}
          title='Производитель котлов'
          updateManufacturer={updateBoilerManufacturer}
          setManufacturer={setBoilerManufacturer}
        />
      </div>
      <div className={styles.filters__price}>
        <Accordion
          title='Цена'
          titleClass={`${styles.filters__manufacturer__btn} ${darkModeClass}`}
          arrowOpenClass={styles.open}
        >
          <div className={styles.filters__manufacturer__inner}>
            <PriceRange
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              setIsPriceRangeChanged={setIsPriceRangeChanged}
            />
            <div style={{ height: 24 }} />
          </div>
        </Accordion>
      </div>
      <div className={styles.filters__boiler_manufactures}>
        <FilterManufacturerAccordion
          manufacturersList={partsManufacturers}
          title='Производитель запчастей'
          updateManufacturer={updatePartsManufacturer}
          setManufacturer={setPartsManufacturer}
        />
      </div>
      <div className={styles.filters__actions}>
        <button
          className={styles.filters__actions__show}
          disabled={isLoading || resetFilterBtnDisabled}
          onClick={applyFilters}
        >
          {isLoading ? (
            <span className={spinnerStyles.spinner} style={{ top: 6, left: '47%' }} />
          ) : (
            'Показать'
          )}
        </button>
        <button
          className={styles.filters__actions__reset}
          disabled={resetFilterBtnDisabled}
          onClick={resetFilters}
        >
          Сбросить
        </button>
      </div>
    </div>
  );
};
