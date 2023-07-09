import { components, GroupBase, NoticeProps } from 'react-select';

import { OptionProps } from '@/types/common';

import spinnerStyles from '@/styles/spinner/index.module.scss';

export const NoOptionsMessage = (
  props: NoticeProps<OptionProps, boolean, GroupBase<OptionProps>>
) => (
  <components.NoOptionsMessage {...props}>
    <span>Ничего не найдено</span>
  </components.NoOptionsMessage>
);

export const NoOptionsLoading = (
  props: NoticeProps<OptionProps, boolean, GroupBase<OptionProps>>
) => (
  <components.NoOptionsMessage {...props}>
    <span
      className={spinnerStyles.spinner}
      style={{ top: '5px', left: '48%', width: 25, height: 25 }}
    />
  </components.NoOptionsMessage>
);
