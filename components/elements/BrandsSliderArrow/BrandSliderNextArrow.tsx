/* eslint-disable react/destructuring-assignment */
import { BrandsSliderArrowProps } from '@/types/elements';

import { BrandSliderArrowSvg } from './BrandsSliderArrow';

import styles from '@/styles/dashboard/index.module.scss';

export const BrandSliderNextArrow = (props: BrandsSliderArrowProps) => (
  <button
    className={`${styles.dashboard__brands__slider__arrow} ${styles.dashboard__brands__slider__arrow_next} ${props.modeClass}`}
    onClick={props.onClick}
  >
    <span>
      <BrandSliderArrowSvg />
    </span>
  </button>
);
