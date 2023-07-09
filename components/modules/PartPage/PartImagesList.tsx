import { useStore } from 'effector-react';
import React from 'react';

import { $boilerPart } from '@/context/boilerPart';
import { useMediaQuery } from '@/hooks';

import { PartImageItem } from './PartImageItem';
import { PartSlider } from './PartSlider';

import styles from '@/styles/part/index.module.scss';

export const PartImagesList = () => {
  const boilerPart = useStore($boilerPart);
  const isMobile = useMediaQuery(850);

  const [currentImgSrc, setCurrentImgSrc] = React.useState('');

  const images = boilerPart.images ? (JSON.parse(boilerPart.images) as string[]) : [];

  return (
    <div className={styles.part__images}>
      {isMobile ? (
        <PartSlider images={images} />
      ) : (
        <>
          <div className={styles.part__images__main}>
            <img src={currentImgSrc || images[0]} alt={boilerPart.name} />
          </div>
          <ul className={styles.part__images__list}>
            {images.map((src, index) => (
              <PartImageItem
                key={index}
                src={src}
                alt={`image-${index + 1}`}
                callback={setCurrentImgSrc}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
