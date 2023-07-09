import { createEffect } from 'effector-next';

import { GeoLocationProps } from '@/types/common';

import api from '../axiosClient';

export const getGeolocationFx = createEffect(async ({ latitude, longitude }: GeoLocationProps) => {
  const data = await api.get(
    `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&lang=ru&apiKey=${process.env.NEXT_PUBLIC_GEOAPI_KEY}`,
    {
      withCredentials: false
    }
  );

  return data;
});
