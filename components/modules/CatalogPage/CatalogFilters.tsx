/* eslint-disable react/jsx-no-useless-fragment */
import { useStore } from 'effector-react';
import { useRouter } from 'next/router';
import React from 'react';
import { toast } from 'react-toastify';

import {
  $boilerManufacturers,
  $partsManufacturers,
  setBoilerManufacturersFromQuery,
  setPartsManufacturersFromQuery
} from '@/context/boilerParts';
import { useMediaQuery } from '@/hooks';
import { CatalogFiltersProps } from '@/types/catalog';
import {
  checkQueryParams,
  updateParamsAndFilters,
  updateParamsAndFiltersFromQuery
} from '@/utils/catalog';
import { getQueryParamOnFirstRender } from '@/utils/common';

import { CatalogFiltersDesktop } from './CatalogFiltersDesktop';
import { CatalogFiltersMobile } from './CatalogFiltersMobile';

export const CatalogFilters = ({
  priceRange,
  setPriceRange,
  setIsPriceRangeChanged,
  resetFilterBtnDisabled,
  resetFilters,
  isPriceRangeChanged,
  currentPage,
  setIsFilterInQuery,
  closePopup,
  filtersMobileOpen
}: CatalogFiltersProps) => {
  const router = useRouter();

  const boilerManufacturers = useStore($boilerManufacturers);
  const partsManufacturers = useStore($partsManufacturers);
  const isMedia820 = useMediaQuery(820);
  const [isLoading, setIsLoading] = React.useState(false);

  const updatePriceFromQuery = (priceFrom: number, priceTo: number) => {
    setIsFilterInQuery(true);
    setPriceRange([priceFrom, priceTo]);
    setIsPriceRangeChanged(true);
  };

  const applyFilters = async () => {
    setIsFilterInQuery(true);
    try {
      setIsLoading(true);

      const priceFrom = Math.ceil(priceRange[0]);
      const priceTo = Math.ceil(priceRange[1]);

      const initialPage = currentPage > 0 ? 0 : currentPage;
      const boilers = boilerManufacturers.filter((item) => item.checked).map((item) => item.title);
      const parts = partsManufacturers.filter((item) => item.checked).map((item) => item.title);

      const encodedBoilerQuery = encodeURIComponent(JSON.stringify(boilers));
      const encodedPartsQuery = encodeURIComponent(JSON.stringify(parts));

      const priceQuery = isPriceRangeChanged ? `&priceFrom=${priceFrom}&priceTo=${priceTo}` : '';
      const boilerQuery = `&boiler=${encodedBoilerQuery}`;
      const partsQuery = `&parts=${encodedPartsQuery}`;

      if (boilers.length && parts.length && isPriceRangeChanged) {
        updateParamsAndFilters(
          {
            boiler: encodedBoilerQuery,
            parts: encodedPartsQuery,
            priceFrom,
            priceTo,
            offset: initialPage + 1
          },
          `${initialPage}${priceQuery}${boilerQuery}${partsQuery}`,
          router
        );

        return;
      }

      if (isPriceRangeChanged) {
        updateParamsAndFilters(
          { priceFrom, priceTo, offset: initialPage + 1 },
          `${initialPage}${priceQuery}`,
          router
        );
      }

      if (boilers.length && parts.length) {
        updateParamsAndFilters(
          { boiler: encodedBoilerQuery, parts: encodedPartsQuery, offset: initialPage + 1 },
          `${initialPage}${boilerQuery}${partsQuery}`,
          router
        );

        return;
      }

      if (boilers.length) {
        updateParamsAndFilters(
          { boiler: encodedBoilerQuery, offset: initialPage + 1 },
          `${initialPage}${boilerQuery}`,
          router
        );
      }

      if (parts.length) {
        updateParamsAndFilters(
          { parts: encodedPartsQuery, offset: initialPage + 1 },
          `${initialPage}${partsQuery}`,
          router
        );
      }

      if (boilers.length && isPriceRangeChanged) {
        updateParamsAndFilters(
          {
            boiler: encodedBoilerQuery,
            priceFrom,
            priceTo,
            offset: initialPage + 1
          },
          `${initialPage}${boilerQuery}${priceQuery}`,
          router
        );
      }

      if (parts.length && isPriceRangeChanged) {
        updateParamsAndFilters(
          {
            parts: encodedPartsQuery,
            priceFrom,
            priceTo,
            offset: initialPage + 1
          },
          `${initialPage}${partsQuery}${priceQuery}`,
          router
        );
      }
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const applyFiltersFromQuery = async () => {
    try {
      const {
        isValidBoilerQuery,
        isValidPartsQuery,
        isValidPriceQuery,
        boilerQueryValue,
        partsQueryValue,
        priceFromQueryValue,
        priceToQueryValue
      } = checkQueryParams(router);

      const boilerQuery = `&boiler=${getQueryParamOnFirstRender('boiler', router)}`;
      const partsQuery = `&parts=${getQueryParamOnFirstRender('parts', router)}`;
      const priceQuery = `&priceFrom=${priceFromQueryValue}&priceTo=${priceToQueryValue}`;

      if (isValidBoilerQuery && isValidPartsQuery && isValidPriceQuery) {
        updateParamsAndFiltersFromQuery(() => {
          updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue);
          setBoilerManufacturersFromQuery(boilerQueryValue);
          setPartsManufacturersFromQuery(partsQueryValue);
        }, `${currentPage}${priceQuery}${boilerQuery}${partsQuery}`);
        return;
      }

      if (isValidPriceQuery) {
        updateParamsAndFiltersFromQuery(() => {
          updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue);
        }, `${currentPage}${priceQuery}`);
      }

      if (isValidBoilerQuery && isValidPartsQuery) {
        updateParamsAndFiltersFromQuery(() => {
          setIsFilterInQuery(true);
          setBoilerManufacturersFromQuery(boilerQueryValue);
          setPartsManufacturersFromQuery(partsQueryValue);
        }, `${currentPage}${boilerQuery}${partsQuery}`);
        return;
      }

      if (isValidBoilerQuery) {
        updateParamsAndFiltersFromQuery(() => {
          setIsFilterInQuery(true);
          setBoilerManufacturersFromQuery(boilerQueryValue);
        }, `${currentPage}${boilerQuery}`);
      }

      if (isValidPartsQuery) {
        updateParamsAndFiltersFromQuery(() => {
          setIsFilterInQuery(true);
          setPartsManufacturersFromQuery(partsQueryValue);
        }, `${currentPage}${partsQuery}`);
      }

      if (isValidPartsQuery && isValidPriceQuery) {
        updateParamsAndFiltersFromQuery(() => {
          updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue);
          setPartsManufacturersFromQuery(partsQueryValue);
        }, `${currentPage}${priceQuery}${boilerQuery}`);
      }

      if (isValidBoilerQuery && isValidPriceQuery) {
        updateParamsAndFiltersFromQuery(() => {
          updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue);
          setBoilerManufacturersFromQuery(boilerQueryValue);
        }, `${currentPage}${priceQuery}${partsQuery}`);
      }
    } catch (error) {
      const err = error as Error;

      if (err.message === 'URI malformed') {
        toast.warning('Неправильный url для фильтра');
        return;
      }

      toast.error(err.message);
    }
  };

  React.useEffect(() => {
    applyFiltersFromQuery();
  }, []);

  return (
    <>
      {isMedia820 ? (
        <CatalogFiltersMobile
          closePopup={closePopup}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          setIsPriceRangeChanged={setIsPriceRangeChanged}
          resetFilterBtnDisabled={resetFilterBtnDisabled}
          resetFilters={resetFilters}
          isLoading={isLoading}
          applyFilters={applyFilters}
          filtersMobileOpen={filtersMobileOpen}
        />
      ) : (
        <CatalogFiltersDesktop
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          setIsPriceRangeChanged={setIsPriceRangeChanged}
          resetFilterBtnDisabled={resetFilterBtnDisabled}
          resetFilters={resetFilters}
          isLoading={isLoading}
          applyFilters={applyFilters}
        />
      )}
    </>
  );
};
