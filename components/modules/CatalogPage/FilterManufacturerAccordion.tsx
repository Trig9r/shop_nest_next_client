import { useStore } from 'effector-react';
import React from 'react';

import { Accordion } from '@/components/elements';
import { $mode } from '@/context/mode';
import { useMediaQuery } from '@/hooks';
import { FilterManufacturerAccordionProps } from '@/types/catalog';

import { FilterCheckboxItem } from './FilterCheckboxItem';

import styles from '@/styles/catalog/index.module.scss';

export const FilterManufacturerAccordion = ({
  title,
  manufacturersList,
  setManufacturer,
  updateManufacturer
}: FilterManufacturerAccordionProps) => {
  const mode = useStore($mode);
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';

  const isMedia820 = useMediaQuery(820);

  const chooseAllManufacturers = () =>
    setManufacturer(manufacturersList.map((item) => ({ ...item, checked: true })));

  return (
    <Accordion
      title={title}
      titleClass={`${styles.filters__manufacturer__btn} ${darkModeClass}`}
      arrowOpenClass={styles.open}
      isMobileForFilters={isMedia820}
      hideArrowClass={isMedia820 ? styles.hide_arrow : ''}
    >
      <div className={styles.filters__manufacturer__inner}>
        <button
          className={styles.filters__manufacturer__select_all}
          onClick={chooseAllManufacturers}
        >
          Выбрать все
        </button>
        <ul className={styles.filters__manufacturer__list}>
          {manufacturersList.map((item) => (
            <FilterCheckboxItem
              key={item.id}
              id={item.id}
              title={item.title}
              checked={item.checked}
              event={updateManufacturer}
            />
          ))}
        </ul>
        <div style={{ height: 24 }} />
      </div>
    </Accordion>
  );
};
