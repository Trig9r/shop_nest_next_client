import { useStore } from 'effector-react';
import { motion } from 'framer-motion';
import React from 'react';

import { $boilerPart } from '@/context/boilerPart';
import { $mode } from '@/context/mode';

import styles from '@/styles/part/index.module.scss';

export const PartTabs = () => {
  const boilerPart = useStore($boilerPart);
  const mode = useStore($mode);
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';
  const [isShowDescription, setIsShowSDescription] = React.useState(true);
  const [isShowCompatibility, setIsShowSCompatibility] = React.useState(false);

  const handleShowDescription = () => {
    setIsShowSDescription(true);
    setIsShowSCompatibility(false);
  };

  const handleShowCompatibility = () => {
    setIsShowSDescription(false);
    setIsShowSCompatibility(true);
  };

  return (
    <div className={styles.part__tabs}>
      <div className={`${styles.part__tabs__controls} ${darkModeClass}`}>
        <button className={isShowDescription ? styles.active : ''} onClick={handleShowDescription}>
          Описание
        </button>

        <button
          className={isShowCompatibility ? styles.active : ''}
          onClick={handleShowCompatibility}
        >
          Совместимость
        </button>
      </div>
      {isShowDescription && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={styles.part__tabs__content}
        >
          <h3 className={`${styles.part__tabs__content__title} ${darkModeClass}`}>
            {boilerPart.name}
          </h3>
          <p className={`${styles.part__tabs__content__text} ${darkModeClass}`}>
            {boilerPart.description}
          </p>
        </motion.div>
      )}
      {isShowCompatibility && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={styles.part__tabs__content}
        >
          <p className={`${styles.part__tabs__content__text} ${darkModeClass}`}>
            {boilerPart.compatibility}
          </p>
        </motion.div>
      )}
    </div>
  );
};
