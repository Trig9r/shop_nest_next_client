/* eslint-disable no-nested-ternary */
import { useStore } from 'effector-react';
import React from 'react';
import { toast } from 'react-toastify';

import { getGeolocationFx } from '@/app/api/geolocation';
import { $mode } from '@/context/mode';
import { $userCity, setUserCity } from '@/context/user';

import { LocationSvg } from '../LocationSvg';

import styles from '@/styles/cityButton/index.module.scss';
import spinnerStyles from '@/styles/spinner/index.module.scss';

export const CityButton = () => {
  const { city } = useStore($userCity);
  const mode = useStore($mode);
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';
  const isLoading = useStore(getGeolocationFx.pending);

  const getUserCity = () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    const success = async (pos: GeolocationPosition) => {
      try {
        const { latitude, longitude } = pos.coords;

        const { data } = await getGeolocationFx({ latitude, longitude });

        setUserCity({
          city: data.features[0].properties.city,
          street: data.features[0].properties.adaress_line1
        });
      } catch (error) {
        toast.error((error as Error).message);
      }
    };

    const error = (error: GeolocationPositionError) =>
      toast.error(`${error.code} ${error.message}`);

    navigator.geolocation.getCurrentPosition(success, error, options);
  };

  return (
    <button className={styles.city} onClick={getUserCity}>
      <span className={`${styles.city__span} ${darkModeClass}`}>
        <LocationSvg />
      </span>
      <span className={`${styles.city__text} ${darkModeClass}`}>
        {isLoading ? (
          <span
            className={spinnerStyles.spinner}
            style={{ top: '-10px', left: 10, width: 20, height: 20 }}
          />
        ) : city.length ? (
          city
        ) : (
          'Выбрать город'
        )}
      </span>
    </button>
  );
};
