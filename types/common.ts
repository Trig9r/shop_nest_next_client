/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { MultiValue, SingleValue } from 'react-select';

export interface WrappedComponentProps {
  isOpen: boolean;
  setIsOpen: (arg0: boolean) => void;
}

export interface OptionProps {
  value: string | number;
  label: string | number;
}

export type SelectOptionType = MultiValue<OptionProps> | SingleValue<OptionProps> | null;

export interface AccordionProps {
  children: React.ReactNode;
  title: string | false;
  titleClass: string;
  arrowOpenClass?: string;
  isMobileForFilters?: boolean;
  hideArrowClass?: string;
  boxShadowStyle?: string;
  callback?: (arg0: boolean) => void;
}

export interface LayoutProps {
  children: React.ReactNode;
}

export interface GeoLocationProps {
  latitude: number;
  longitude: number;
}

export interface CrumbProps {
  text: string;
  textGenerator: () => string;
  href: string;
  last: boolean;
}
