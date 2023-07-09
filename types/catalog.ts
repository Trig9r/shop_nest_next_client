import { Event } from 'effector-next';

export interface ManufacturesBlockProps {
  title: string;
  event: Event<FilterCheckboxItemProps>;
  manufacturersList: FilterCheckboxItemProps[];
}

export interface ManufacturesBlockItemProps {
  item: FilterCheckboxItemProps;
  event: Event<FilterCheckboxItemProps>;
}

export interface QueryParamsProps {
  offset: string;
  first: string;
  boiler: string;
  parts: string;
  partId: string;
  priceFrom: string;
  priceTo: string;
}

export interface FilterCheckboxItemProps {
  title: string;
  checked: boolean;
  id?: string;
  event: Event<FilterCheckboxItemProps>;
}

export interface FilterManufacturerAccordionProps {
  manufacturersList: FilterCheckboxItemProps[];
  title: string | false;
  setManufacturer: Event<FilterCheckboxItemProps[]>;
  updateManufacturer: Event<FilterCheckboxItemProps>;
}

export interface PriceRangeProps {
  priceRange: number[];
  setPriceRange: (arg0: number[]) => void;
  setIsPriceRangeChanged: (arg0: boolean) => void;
}

export interface CatalogFiltersDesktopProps extends PriceRangeProps {
  isLoading: boolean;
  resetFilterBtnDisabled: boolean;
  resetFilters: VoidFunction;
  applyFilters: VoidFunction;
}

export interface CatalogFiltersMobileProps extends CatalogFiltersDesktopProps {
  filtersMobileOpen: boolean;
  closePopup: VoidFunction;
}

export interface CatalogFiltersProps extends PriceRangeProps {
  resetFilterBtnDisabled: boolean;
  resetFilters: VoidFunction;
  isPriceRangeChanged: boolean;
  currentPage: number;
  setIsFilterInQuery: (arg0: boolean) => void;
  closePopup: VoidFunction;
  filtersMobileOpen: boolean;
}

export interface FiltersPopupTopProps {
  resetBtnText: string;
  title: string;
  resetFilters: VoidFunction;
  resetFilterBtnDisabled: boolean;
  closePopup: VoidFunction;
}

export interface FiltersPopupProps extends FilterManufacturerAccordionProps {
  resetFilterBtnDisabled: boolean;
  resetAllManufacturers: VoidFunction;
  handleClosePopup: VoidFunction;
  applyFilters: VoidFunction;
  openPopup: boolean;
}
