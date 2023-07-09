/* eslint-disable jsx-a11y/anchor-is-valid */
import { useStore } from 'effector-react';
import Link from 'next/link';
import React from 'react';

import { CrumbArrowSvg } from '@/components/elements';
import { $mode } from '@/context/mode';
import { CrumbProps } from '@/types/common';

import styles from '@/styles/breadcrumbs/index.module.scss';

export const Crumb = ({ text: defaultText, textGenerator, href, last = false }: CrumbProps) => {
  const mode = useStore($mode);
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';

  const [text, setText] = React.useState(defaultText);

  const handleTextGenerate = async () => {
    // eslint-disable-next-line no-extra-boolean-cast
    if (!Boolean(textGenerator)) {
      return;
    }

    const finalText = await textGenerator();
    setText(finalText as string);
  };

  React.useEffect(() => {
    handleTextGenerate();
  }, [textGenerator]);

  if (last) {
    return (
      <a>
        <span
          className={`${styles.breadcrumbs__item__icon} ${darkModeClass}`}
          style={{ marginRight: 13 }}
        >
          <CrumbArrowSvg />
        </span>
        <span className={`last-crumb ${styles.breadcrumbs__item__text}`}>{text}</span>
      </a>
    );
  }

  return (
    <Link href={href} passHref legacyBehavior>
      <a>
        <span
          className={`${styles.breadcrumbs__item__icon} ${darkModeClass}`}
          style={{ marginRight: 13 }}
        >
          <CrumbArrowSvg />
        </span>
        <span className={styles.breadcrumbs__item__text}>{text}</span>
      </a>
    </Link>
  );
};
