import { useStore } from 'effector-react';
import { useId } from 'react';

import { $mode } from '@/context/mode';
import { FilterCheckboxItemProps } from '@/types/catalog';

import styles from '@/styles/catalog/index.module.scss';

export const FilterCheckboxItem = ({ title, checked, id, event }: FilterCheckboxItemProps) => {
  const labelId = useId();

  const mode = useStore($mode);
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';

  const handleFilterChange = () => event({ checked: !checked, id } as FilterCheckboxItemProps);

  return (
    <li className={`${styles.filters__manufacturer__list__item} ${darkModeClass}`}>
      <label htmlFor={labelId}>
        <input id={labelId} type='checkbox' checked={checked} onChange={handleFilterChange} />
        <span id={labelId}>{title}</span>
      </label>
    </li>
  );
};
