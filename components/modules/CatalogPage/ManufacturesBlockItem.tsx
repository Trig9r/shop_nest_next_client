import { useStore } from 'effector-react';
import { motion } from 'framer-motion';

import { DeleteSvg } from '@/components/elements';
import { $mode } from '@/context/mode';
import { FilterCheckboxItemProps, ManufacturesBlockItemProps } from '@/types/catalog';

import styles from '@/styles/catalog/index.module.scss';

export const ManufacturesBlockItem = ({ item, event }: ManufacturesBlockItemProps) => {
  const mode = useStore($mode);
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';

  const removeFilter = () =>
    event({ id: item.id, checked: !item.checked } as FilterCheckboxItemProps);

  return (
    <motion.li
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`${styles.manufacturers__list__item} ${darkModeClass}`}
    >
      <span className={styles.manufacturers__list__item__text}>{item.title}</span>
      <button className={styles.manufacturers__list__item__btn} onClick={removeFilter}>
        <span>
          <DeleteSvg />
        </span>
      </button>
    </motion.li>
  );
};
