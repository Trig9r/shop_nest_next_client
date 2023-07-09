/* eslint-disable no-nested-ternary */
import Slider from 'react-slick';

import { useMediaQuery } from '@/hooks';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from '@/styles/part/index.module.scss';

export const PartSlider = ({ images }: { images: string[] }) => {
  const isMobile700 = useMediaQuery(700);
  const isMobile530 = useMediaQuery(530);

  const settings = {
    dots: false,
    infinite: true,
    variableWidth: true,
    autoplay: true,
    speed: 500,
    arrows: false,
    slidesToScroll: 1
  };

  return (
    <Slider {...settings} className={styles.part__slider}>
      {images.map((src, index) => (
        <div
          key={index}
          className={styles.part__slide}
          style={{ width: isMobile530 ? 228 : isMobile700 ? 350 : 593 }}
        >
          <img src={src} alt={`img-${index + 1}`} />
        </div>
      ))}
    </Slider>
  );
};
