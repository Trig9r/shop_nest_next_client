/* eslint-disable react/destructuring-assignment */
/* eslint-disable max-len */
import { BrandsSliderArrowProps } from '@/types/elements';

import { BrandSliderArrowSvg } from './BrandsSliderArrow';

import styles from '@/styles/dashboard/index.module.scss';

export const BrandsSliderPrevArrow = (props: BrandsSliderArrowProps) => (
  <button
    className={`${styles.dashboard__brands__slider__arrow} ${styles.dashboard__brands__slider__arrow_prev} ${props.modeClass}`}
    onClick={props.onClick}
  >
    <span>
      <BrandSliderArrowSvg />
    </span>
  </button>
);
