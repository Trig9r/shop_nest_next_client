import { useStore } from 'effector-react';

import { $mode } from '@/context/mode';
import { FiltersPopupProps } from '@/types/catalog';

import { FilterManufacturerAccordion } from './FilterManufacturerAccordion';
import { FiltersPopupTop } from './FiltersPopupTop';

import styles from '@/styles/catalog/index.module.scss';

export const FiltersPopup = ({
  resetFilterBtnDisabled,
  resetAllManufacturers,
  handleClosePopup,
  updateManufacturer,
  setManufacturer,
  applyFilters,
  openPopup,
  title,
  manufacturersList
}: FiltersPopupProps) => {
  const mode = useStore($mode);
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';

  return (
    <div className={`${styles.filters__popup} ${darkModeClass} ${openPopup ? styles.open : ''}`}>
      <div className={styles.filters__popup__inner}>
        <FiltersPopupTop
          resetBtnText='Сбросить'
          title={title as string}
          resetFilterBtnDisabled={resetFilterBtnDisabled}
          resetFilters={resetAllManufacturers}
          closePopup={handleClosePopup}
        />
        <FilterManufacturerAccordion
          title={false}
          manufacturersList={manufacturersList}
          setManufacturer={setManufacturer}
          updateManufacturer={updateManufacturer}
        />
      </div>
      <div className={styles.filters__actions}>
        <button
          className={styles.filters__actions__show}
          disabled={resetFilterBtnDisabled}
          onClick={applyFilters}
          style={{ marginBottom: 12 }}
        >
          Показать
        </button>
        <button className={styles.filters__actions__reset} onClick={handleClosePopup}>
          Назад
        </button>
      </div>
    </div>
  );
};
