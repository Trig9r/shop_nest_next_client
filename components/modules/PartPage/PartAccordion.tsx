import { useStore } from 'effector-react';

import { Accordion } from '@/components/elements';
import { $mode } from '@/context/mode';
import { PartAccordionProps } from '@/types/part';

import styles from '@/styles/part/index.module.scss';

export const PartAccordion = ({ title, children }: PartAccordionProps) => {
  const mode = useStore($mode);
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';

  const handleExpandAccordion = (expanded: boolean) => {
    const accodrionsTitle = document.querySelectorAll(`.${styles.part__accordion__title}`);

    accodrionsTitle.forEach((title) => {
      const item = title as HTMLElement;

      if (!expanded) {
        item.style.borderBottomLeftRadius = '0';
        item.style.borderBottomRightRadius = '0';
      } else {
        item.style.borderBottomLeftRadius = '4px';
        item.style.borderBottomRightRadius = '4px';
      }
    });
  };

  return (
    <Accordion
      title={title}
      titleClass={`${styles.part__accordion__title} ${darkModeClass}`}
      arrowOpenClass={styles.open}
      boxShadowStyle='0px 2px 8px rgba(0, 0, 0, 0.1)'
      callback={handleExpandAccordion}
    >
      {children}
    </Accordion>
  );
};
