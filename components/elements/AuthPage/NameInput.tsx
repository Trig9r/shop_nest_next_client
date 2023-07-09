import { useId } from 'react';

import type { AuthPageInputProps } from '@/types/auth';

import styles from '@/styles/auth/index.module.scss';

export const NameInput = ({ register, errors }: AuthPageInputProps) => {
  const inputId = useId();

  return (
    <label className={styles.form__label} htmlFor={inputId}>
      <input
        id={inputId}
        {...register('name', {
          required: 'Введите имя!',
          minLength: 2,
          maxLength: 15,
          pattern: {
            value: /^[а-яА-Яa-zA-ZёЁ]*$/,
            message: 'Недопустимое значение!'
          }
        })}
        className={styles.form__input}
        placeholder='Имя'
        type='text'
      />
      {errors.name && <span className={styles.error_alert}>{errors.name?.message}</span>}
      {errors.name && errors.name.type === 'minLength' && (
        <span className={styles.error_alert}>Минимум 2 символа!</span>
      )}
      {errors.name && errors.name.type === 'maxLength' && (
        <span className={styles.error_alert}>Не более 15 символов!</span>
      )}
    </label>
  );
};
