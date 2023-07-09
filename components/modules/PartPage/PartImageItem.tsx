/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { PartImageItemProps } from '@/types/part';

import styles from '@/styles/part/index.module.scss';

export const PartImageItem = ({ src, callback, alt }: PartImageItemProps) => {
  const changeMainImg = () => callback(src);

  return (
    <li className={styles.part__images__list__item} onClick={changeMainImg}>
      <img src={src} alt={alt} />
    </li>
  );
};
