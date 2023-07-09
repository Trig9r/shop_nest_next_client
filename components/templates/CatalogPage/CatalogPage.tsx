/* eslint-disable import/no-extraneous-dependencies */
import { useStore } from 'effector-react';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import React from 'react';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';

import { getBoilerPartsFx } from '@/app/api/boilerParts';
import { FilterSvg } from '@/components/elements';
import {
  CatalogFilters,
  CatalogItem,
  FilterSelect,
  ManufacturesBlock
} from '@/components/modules/CatalogPage';
import {
  $boilerManufacturers,
  $boilerParts,
  $filteredBoilerParts,
  $partsManufacturers,
  setBoilerManufacturer,
  setBoilerParts,
  setPartsManufacturer,
  updateBoilerManufacturer
} from '@/context/boilerParts';
import { $mode } from '@/context/mode';
import { usePopup } from '@/hooks';
import { BoilerPartsProps } from '@/types/boilerparts';
import { QueryParamsProps } from '@/types/catalog';
import { checkQueryParams } from '@/utils/catalog';

import styles from '@/styles/catalog/index.module.scss';
import skeletonStyles from '@/styles/skeleton/index.module.scss';

export const CatalogPage = ({ query }: { query: QueryParamsProps }) => {
  const router = useRouter();

  const boilerManufacturers = useStore($boilerManufacturers);
  const partsManufacturers = useStore($partsManufacturers);
  const filteredBoilerParts = useStore($filteredBoilerParts);
  const boilerParts = useStore($boilerParts);
  const mode = useStore($mode);
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';

  const isValidOffset = query.offset && !Number.isNaN(+query.offset) && +query.offset > 0;
  const pagesCount = Math.ceil(boilerParts.count / 20);
  const isAnyBoilerManufacturerChecked = boilerManufacturers.some((item) => item.checked);
  const isAnyPartsManufacturerChecked = partsManufacturers.some((item) => item.checked);

  const [isLoading, setIsLoading] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(isValidOffset ? +query.offset - 1 : 1);
  const [priceRange, setPriceRange] = React.useState([1000, 9000]);
  const [isPriceRangeChanged, setIsPriceRangeChanged] = React.useState(false);
  const [isFilterInQuery, setIsFilterInQuery] = React.useState(false);
  const { isOpen, closePopup, toggleIsOpen } = usePopup();

  const resetFilterBtnDisabled = !(
    isPriceRangeChanged ||
    isAnyBoilerManufacturerChecked ||
    isAnyPartsManufacturerChecked
  );

  const resetPagination = (data: BoilerPartsProps) => {
    setCurrentPage(0);
    setBoilerParts(isFilterInQuery ? filteredBoilerParts : data);
  };

  const loadBoilerParts = async () => {
    try {
      setIsLoading(true);
      const data = await getBoilerPartsFx(`/boiler-parts?limit=20&offset=0`);

      if (!isValidOffset) {
        router.replace({
          query: {
            offset: 1
          }
        });

        resetPagination(data);
        return;
      }

      if (isValidOffset) {
        if (+query.offset > Math.ceil(data.count / 20)) {
          router.push(
            {
              query: {
                ...query,
                offset: 1
              }
            },
            undefined,
            { shallow: true }
          );

          resetPagination(data);
          return;
        }

        const offset = +query.offset - 1;
        const result = await getBoilerPartsFx(`/boiler-parts?limit=20&offset=${offset}`);

        setCurrentPage(offset);
        setBoilerParts(isFilterInQuery ? filteredBoilerParts : result);
        return;
      }

      resetPagination(data);
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  const handlePageChange = async ({ selected }: { selected: number }) => {
    try {
      if (selected > pagesCount) {
        const data = await getBoilerPartsFx(`/boiler-parts?limit=20&offset=0`);

        resetPagination(isFilterInQuery ? filteredBoilerParts : data);

        if (isValidOffset && +query.offset > pagesCount) {
          resetPagination(isFilterInQuery ? filteredBoilerParts : data);
        }

        return;
      }

      const { isValidBoilerQuery, isValidPartsQuery, isValidPriceQuery } = checkQueryParams(router);

      const result = await getBoilerPartsFx(
        `/boiler-parts?limit=20&offset=${selected}${
          isFilterInQuery && isValidBoilerQuery ? `&boiler=${router.query.boiler}` : ''
        }${isFilterInQuery && isValidPartsQuery ? `&parts=${router.query.parts}` : ''}${
          isFilterInQuery && isValidPriceQuery
            ? `&priceFrom=${router.query.priceFrom}&priceTo=${router.query.priceTo}`
            : ''
        }`
      );

      router.push(
        {
          query: {
            ...router.query,
            offset: selected + 1
          }
        },
        undefined,
        { shallow: true }
      );

      setCurrentPage(selected);
      setBoilerParts(result);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const resetFilters = async () => {
    try {
      setIsLoading(true);

      const data = await getBoilerPartsFx(`/boiler-parts?limit=20&offset=0`);
      const params = router.query;

      delete params.boiler;
      delete params.parts;
      delete params.priceFrom;
      delete params.priceTo;
      params.firts = 'cheap';

      router.push({ query: { ...params } }, undefined, { shallow: true });

      setBoilerManufacturer(boilerManufacturers.map((item) => ({ ...item, checked: false })));
      setPartsManufacturer(partsManufacturers.map((item) => ({ ...item, checked: false })));

      setBoilerParts(data);
      setPriceRange([1000, 9000]);
      setIsPriceRangeChanged(false);
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  React.useEffect(() => {
    loadBoilerParts();
  }, [query, filteredBoilerParts, isFilterInQuery]);

  return (
    <section className={styles.catalog}>
      <div className={`container ${styles.catalog__container}`}>
        <h2 className={`${styles.catalog__title} ${darkModeClass}`}>Каталог товаров</h2>
        <div className={`${styles.catalog__top} ${darkModeClass}`}>
          <AnimatePresence>
            {isAnyBoilerManufacturerChecked && (
              <ManufacturesBlock
                title='Производитель котлов:'
                manufacturersList={boilerManufacturers}
                event={updateBoilerManufacturer}
              />
            )}
          </AnimatePresence>
          <AnimatePresence>
            {isAnyPartsManufacturerChecked && (
              <ManufacturesBlock
                title='Производитель запчастей:'
                manufacturersList={partsManufacturers}
                event={updateBoilerManufacturer}
              />
            )}
          </AnimatePresence>
          <div className={styles.catalog__top__inner}>
            <button
              className={`${styles.catalog__top__reset} ${darkModeClass}`}
              onClick={resetFilters}
              disabled={resetFilterBtnDisabled}
            >
              Сбросить фильтр
            </button>
            <button className={styles.catalog__top__mobile_btn} onClick={toggleIsOpen}>
              <span className={styles.catalog__top__mobile_btn__svg}>
                <FilterSvg />
              </span>
              <span className={styles.catalog__top__mobile_btn__text}>Фильтры</span>
            </button>
            <FilterSelect setIsLoading={setIsLoading} />
          </div>
        </div>
        <div className={`${styles.catalog__bottom} ${darkModeClass}`}>
          <div className={styles.catalog__bottom__inner}>
            <CatalogFilters
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              setIsPriceRangeChanged={setIsPriceRangeChanged}
              resetFilterBtnDisabled={resetFilterBtnDisabled}
              resetFilters={resetFilters}
              isPriceRangeChanged={isPriceRangeChanged}
              currentPage={currentPage}
              setIsFilterInQuery={setIsFilterInQuery}
              closePopup={closePopup}
              filtersMobileOpen={isOpen}
            />
            {isLoading ? (
              <ul className={skeletonStyles.skeleton}>
                {Array.from(new Array(20)).map((_, index) => (
                  <li
                    key={index}
                    className={`${skeletonStyles.skeleton__item} ${
                      mode === 'dark' ? `${skeletonStyles.dark_mode}` : ''
                    }`}
                  >
                    <div className={skeletonStyles.skeleton__item__light} />
                  </li>
                ))}
              </ul>
            ) : (
              <ul className={styles.catalog__list}>
                {boilerParts.rows?.length ? (
                  boilerParts.rows?.map((item) => <CatalogItem key={item.id} item={item} />)
                ) : (
                  <span>Список товаров пуст</span>
                )}
              </ul>
            )}
          </div>
          <ReactPaginate
            containerClassName={styles.catalog__bottom__list}
            pageClassName={styles.catalog__bottom__list__item}
            pageLinkClassName={styles.catalog__bottom__list__item__link}
            previousClassName={styles.catalog__bottom__list__prev}
            nextClassName={styles.catalog__bottom__list__next}
            breakClassName={styles.catalog__bottom__list__break}
            breakLinkClassName={`${styles.catalog__bottom__list__break__link} ${darkModeClass}`}
            breakLabel='...'
            pageCount={pagesCount}
            forcePage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </section>
  );
};
