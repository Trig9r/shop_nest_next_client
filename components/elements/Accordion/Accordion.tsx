/* eslint-disable no-nested-ternary */
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

import { AccordionProps } from '@/types/common';

export const Accordion = ({
  children,
  title,
  titleClass,
  arrowOpenClass,
  isMobileForFilters,
  hideArrowClass,
  boxShadowStyle,
  callback
}: AccordionProps) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const toggleAccordion = () => {
    if (callback) {
      callback(isExpanded);
    }

    setIsExpanded(!isExpanded);
  };

  return (
    <>
      {title ? (
        isMobileForFilters ? (
          <button className={`${titleClass} ${hideArrowClass}`}>{title}</button>
        ) : (
          <motion.button
            initial={false}
            onClick={toggleAccordion}
            className={`${titleClass} ${
              isExpanded ? (isMobileForFilters ? '' : arrowOpenClass) : ''
            }`}
          >
            {title}
          </motion.button>
        )
      ) : (
        ''
      )}
      <AnimatePresence initial={false}>
        {(isMobileForFilters || isExpanded) && (
          <motion.div
            key='content'
            initial='collapsed'
            animate='open'
            exit='collapsed'
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 }
            }}
            style={{ overflow: 'hidden', boxShadow: boxShadowStyle ?? boxShadowStyle }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
