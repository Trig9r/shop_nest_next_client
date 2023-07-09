import { useStore } from 'effector-react';
import { useRouter } from 'next/router';
import React from 'react';
import Select from 'react-select';

import {
  $boilerParts,
  setBoilerPartsByPopularity,
  setBoilerPartsCheapFirst,
  setBoilerPartsExpensiveFirst
} from '@/context/boilerParts';
import { $mode } from '@/context/mode';
import { controllStyles, menuStyles, selectStyles } from '@/styles/catalog/select';
import { optionStyles } from '@/styles/searchInput';
import { OptionProps, SelectOptionType } from '@/types/common';
import { createSelectOption } from '@/utils/common';
import { categoriesOptions } from '@/utils/selectContents';

export const FilterSelect = ({ setIsLoading }: { setIsLoading: (arg0: boolean) => void }) => {
  const router = useRouter();

  const boilerParts = useStore($boilerParts);
  const mode = useStore($mode);
  const [categoryOption, setCategoryOption] = React.useState<SelectOptionType>(null);

  const updateRouteParam = (first: string) =>
    router.push(
      {
        query: {
          ...router.query,
          first
        }
      },
      undefined,
      { shallow: true }
    );

  const updateCategoryOption = (value: string) => {
    setCategoryOption({ value, label: value });
  };

  const handleSortOptionChange = (selectedOption: SelectOptionType) => {
    setIsLoading(true);
    setCategoryOption(selectedOption);

    switch ((selectedOption as OptionProps).value) {
      case 'Сначала дорогие':
        setBoilerPartsExpensiveFirst();
        updateRouteParam('expensive');
        break;
      case 'По популярности':
        setBoilerPartsByPopularity();
        updateRouteParam('popular');

        break;
      default:
        setBoilerPartsCheapFirst();
        updateRouteParam('cheap');
        break;
    }

    setTimeout(() => setIsLoading(false), 1000);
  };

  React.useEffect(() => {
    if (boilerParts.rows) {
      switch (router.query.first) {
        case 'expensive':
          updateCategoryOption('Сначала дорогие');
          setBoilerPartsExpensiveFirst();
          break;
        case 'popular':
          updateCategoryOption('По популярности');
          setBoilerPartsByPopularity();
          break;
        default:
          updateCategoryOption('Сначала дешёвые');
          setBoilerPartsCheapFirst();
          break;
      }
    }
  }, [boilerParts.rows, router.query.first]);

  return (
    <Select
      value={categoryOption || createSelectOption('Сначала дешёвые')}
      onChange={handleSortOptionChange}
      styles={{
        ...selectStyles,
        control: (defaultStyles) => ({
          ...controllStyles(defaultStyles, mode)
        }),
        input: (defaultStyles) => ({
          ...defaultStyles,
          color: mode === 'dark' ? '#f2f2f2' : '#222222'
        }),
        menu: (defaultStyles) => ({
          ...menuStyles(defaultStyles, mode)
        }),
        option: (defaultStyles, state) => ({
          ...optionStyles(defaultStyles, state, mode)
        })
      }}
      isSearchable={false}
      options={categoriesOptions}
    />
  );
};
