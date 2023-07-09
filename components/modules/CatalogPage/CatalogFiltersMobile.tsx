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
import { useMediaQuery } from '@/hooks';
import { CatalogFiltersMobileProps } from '@/types/catalog';

import { FiltersPopup } from './FiltersPopup';
import { FiltersPopupTop } from './FiltersPopupTop';
import { PriceRange } from './PriceRange';

import styles from '@/styles/catalog/index.module.scss';
import spinnerStyles from '@/styles/spinner/index.module.scss';

export const CatalogFiltersMobile = ({
  isLoading,
  resetFilterBtnDisabled,
  resetFilters,
  closePopup,
  applyFilters,
  filtersMobileOpen,
  priceRange,
  setPriceRange,
  setIsPriceRangeChanged
}: CatalogFiltersMobileProps) => {
  const boilerManufacturers = useStore($boilerManufacturers);
  const partsManufacturers = useStore($partsManufacturers);
  const mode = useStore($mode);
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';

  const isAnyBoilerManufacturerChecked = boilerManufacturers.some((item) => item.checked);
  const isAnyPartsManufacturerChecked = partsManufacturers.some((item) => item.checked);

  const isMedia820 = useMediaQuery(820);

  const [openBoilers, setOpenBoilers] = React.useState(false);
  const [openParts, setOpenParts] = React.useState(false);

  const handleOpenBoilers = () => setOpenBoilers(true);
  const handleCloseBoilers = () => setOpenBoilers(false);

  const handleOpenParts = () => setOpenParts(true);
  const handleCloseParts = () => setOpenParts(false);

  const resetAllBoilerManufacturers = () => {
    setBoilerManufacturer(boilerManufacturers.map((item) => ({ ...item, checked: false })));
  };

  const resetAllPartsManufacturers = () => {
    setPartsManufacturer(partsManufacturers.map((item) => ({ ...item, checked: false })));
  };

  const applyFiltersAndClosePopup = () => {
    applyFilters();
    closePopup();
  };

  return (
    <div
      className={`${styles.catalog__bottom__filters} ${darkModeClass} ${
        filtersMobileOpen ? styles.open : ''
      }`}
    >
      <div className={styles.catalog__bottom__filters__inner}>
        <FiltersPopupTop
          resetBtnText='Сбросить всё'
          title='Фильтры'
          resetFilters={resetFilters}
          resetFilterBtnDisabled={resetFilterBtnDisabled}
          closePopup={closePopup}
        />
        <div className={styles.filters__boiler_manufacturers}>
          <button
            className={`${styles.filters__manufacturer__btn} ${darkModeClass}`}
            onClick={handleOpenBoilers}
          >
            Производитель котлов
          </button>
          <FiltersPopup
            title='Производитель котлов'
            resetFilterBtnDisabled={!isAnyBoilerManufacturerChecked}
            updateManufacturer={updateBoilerManufacturer}
            setManufacturer={setBoilerManufacturer}
            applyFilters={applyFiltersAndClosePopup}
            manufacturersList={boilerManufacturers}
            resetAllManufacturers={resetAllBoilerManufacturers}
            handleClosePopup={handleCloseBoilers}
            openPopup={openBoilers}
          />
        </div>

        <div className={styles.filters__boiler_manufactures}>
          <button
            className={`${styles.filters__manufacturer__btn} ${darkModeClass}`}
            onClick={handleOpenParts}
          >
            Производитель запчастей
          </button>
          <FiltersPopup
            title='Производитель запчастей'
            resetFilterBtnDisabled={!isAnyPartsManufacturerChecked}
            updateManufacturer={updatePartsManufacturer}
            setManufacturer={setPartsManufacturer}
            applyFilters={applyFiltersAndClosePopup}
            manufacturersList={partsManufacturers}
            resetAllManufacturers={resetAllPartsManufacturers}
            handleClosePopup={handleCloseParts}
            openPopup={openParts}
          />
        </div>
        <div className={styles.filters__price}>
          <Accordion
            title='Цена'
            titleClass={`${styles.filters__manufacturer__btn} ${darkModeClass}`}
            hideArrowClass={styles.hide_arrow}
            isMobileForFilters={isMedia820}
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
      </div>

      <div className={styles.filters__actions}>
        <button
          className={styles.filters__actions__show}
          onClick={applyFiltersAndClosePopup}
          disabled={resetFilterBtnDisabled || isLoading}
        >
          {isLoading ? (
            <span className={spinnerStyles.spinner} style={{ top: 6, left: '47%' }} />
          ) : (
            'Показать'
          )}
        </button>
      </div>
    </div>
  );
};
