import { useId } from 'react';

import type { AuthPageInputProps } from '@/types/auth';

import styles from '@/styles/auth/index.module.scss';

export const EmailInput = ({ register, errors }: AuthPageInputProps) => {
  const inputId = useId();

  return (
    <label className={styles.form__label} htmlFor={inputId}>
      <input
        id={inputId}
        {...register('email', {
          required: 'Введите email!',
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: 'Недопустимый email!'
          }
        })}
        className={styles.form__input}
        placeholder='Email'
        type='email'
      />
      {errors.email && <span className={styles.error_alert}>{errors.email?.message}</span>}
    </label>
  );
};
