/* eslint-disable import/no-extraneous-dependencies */
import { useStore } from 'effector-react';
import { useRouter } from 'next/router';
import React, { MutableRefObject } from 'react';
import Select from 'react-select';
import { toast } from 'react-toastify';

import { gePartsByNameFx, getPartsBySearchFx } from '@/app/api/boilerParts';
import { $searchInputZIndex, setSearchInputZIndex } from '@/context/header';
import { $mode } from '@/context/mode';
import { useDebounceCallback } from '@/hooks/useDebounce';
import { controllStyles, inputStyles, menuStyles, optionStyles } from '@/styles/searchInput';
import { BoilerPartProps } from '@/types/boilerparts';
import { OptionProps, SelectOptionType } from '@/types/common';
import {
  createSelectOption,
  removeClassNamesForOverlayAndBody,
  toggleClassNamesForOverlayAndBody
} from '@/utils/common';

import { SearchSvg } from '../SearchSvg';
import { NoOptionsLoading, NoOptionsMessage } from '../SelectOptionsMessage/SelectOptionsMessage';

import styles from '@/styles/header/index.module.scss';

export const SearchInput = () => {
  const router = useRouter();

  const zIndex = useStore($searchInputZIndex);
  const mode = useStore($mode);
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';
  const delayCallback = useDebounceCallback(1000);
  const isLoading = useStore(getPartsBySearchFx.pending);

  const [options, setOptions] = React.useState([]);
  const [inputValue, setInputValue] = React.useState('');
  const [searchOptions, setSearchOptions] = React.useState<SelectOptionType>(null);
  const [onMenuOpenControlStyles, setOnMenuOpenControlStyles] = React.useState({});
  const [onMenuOpenContainerStyles, setOnMenuOpenContainerStyles] = React.useState({});
  const btnRef = React.useRef() as MutableRefObject<HTMLButtonElement>;
  const borderRef = React.useRef() as MutableRefObject<HTMLSpanElement>;

  const loadSearchParts = async (search: string) => {
    try {
      setInputValue(search);

      const data = await getPartsBySearchFx({
        url: '/boiler-parts/search',
        search
      });

      const names = data.map((item: BoilerPartProps) => item.name).map(createSelectOption);
      setOptions(names);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const getPartAndRedirect = async (name: string) => {
    const part = await gePartsByNameFx({
      url: '/boiler-parts/name',
      name
    });

    if (!part.id) {
      toast.warning('Товар не найден');
      return;
    }

    router.push(`/catalog/${part.id}`);
  };

  const handleSearchOptionChange = (selectedOption: SelectOptionType) => {
    if (!selectedOption) {
      setSearchOptions(null);
      return;
    }

    const name = (selectedOption as OptionProps)?.value as string;

    if (name) {
      getPartAndRedirect(name);
    }

    setSearchOptions(selectedOption);
    removeClassNamesForOverlayAndBody();
  };

  const onFocusSearch = () => {
    toggleClassNamesForOverlayAndBody('open-search');
    setSearchInputZIndex(100);
  };

  const onSearchInputChange = (value: string) => {
    document.querySelector('.overlay')?.classList.add('open-search');
    document.querySelector('body')?.classList.add('overflow-hidden');

    delayCallback(() => loadSearchParts(value));
  };

  const onSearchMenuOpen = () => {
    setOnMenuOpenControlStyles({
      borderBottomLeftRadius: 0,
      border: 'none'
    });
    setOnMenuOpenContainerStyles({
      boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)'
    });

    btnRef.current.style.border = 'none';
    btnRef.current.style.borderBottomRightRadius = 'none';
    borderRef.current.style.display = 'block';
  };

  const onSearchMenuClose = () => {
    setOnMenuOpenControlStyles({
      borderBottomLeftRadius: 4,
      boxShadow: 'none',
      border: '1px solid #9e9e9e'
    });
    setOnMenuOpenContainerStyles({
      boxShadow: 'none'
    });

    btnRef.current.style.border = '1px solid #9e9e9e';
    btnRef.current.style.borderLeft = 'none';
    btnRef.current.style.borderBottomRightRadius = '4px';
    borderRef.current.style.display = 'none';
  };

  const handleSearchClick = async () => {
    if (!inputValue) {
      return;
    }

    getPartAndRedirect(inputValue);
  };

  return (
    <>
      <div className={styles.header__search__inner}>
        <Select
          components={{ NoOptionsMessage: isLoading ? NoOptionsLoading : NoOptionsMessage }}
          placeholder='Я ищу...'
          value={searchOptions}
          onChange={handleSearchOptionChange}
          styles={{
            ...inputStyles,
            container: (defaultStyles) => ({
              ...defaultStyles,
              ...onMenuOpenContainerStyles
            }),
            control: (defaultStyles) => ({
              ...controllStyles(defaultStyles, mode),
              backgroundColor: mode === 'dark' ? '#2d2d2d' : '#ffffff',
              zIndex,
              transition: 'none',
              ...onMenuOpenControlStyles
            }),
            input: (defaultStyles) => ({
              ...defaultStyles,
              color: mode === 'dark' ? '#f2f2f2' : '#222222'
            }),
            menu: (defaultStyles) => ({
              ...menuStyles(defaultStyles, mode),
              marginTop: '-1px',
              zIndex
            }),
            option: (defaultStyles, state) => ({
              ...optionStyles(defaultStyles, state, mode)
            })
          }}
          isClearable
          openMenuOnClick={false}
          onMenuOpen={onSearchMenuOpen}
          onMenuClose={onSearchMenuClose}
          onFocus={onFocusSearch}
          onInputChange={onSearchInputChange}
          options={options}
        />

        <span ref={borderRef} className={styles.header__search__border} />
      </div>

      <button
        ref={btnRef}
        onClick={handleSearchClick}
        className={`${styles.header__search__btn} ${darkModeClass}`}
        style={{ zIndex }}
      >
        <span className={styles.header__search__btn__span}>
          <SearchSvg />
        </span>
      </button>
    </>
  );
};
