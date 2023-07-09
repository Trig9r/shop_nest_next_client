import { useId } from 'react';

import type { AuthPageInputProps } from '@/types/auth';

import styles from '@/styles/auth/index.module.scss';

export const PasswordInput = ({ register, errors }: AuthPageInputProps) => {
  const inputId = useId();

  return (
    <label className={styles.form__label} htmlFor={inputId}>
      <input
        id={inputId}
        {...register('password', {
          required: 'Введите пароль!',
          minLength: 4,
          maxLength: 20
        })}
        className={styles.form__input}
        placeholder='Пароль'
        type='password'
      />
      {errors.password && <span className={styles.error_alert}>{errors.password?.message}</span>}
      {errors.password && errors.password.type === 'minLength' && (
        <span className={styles.error_alert}>Минимум 4 символа!</span>
      )}
      {errors.password && errors.password.type === 'maxLength' && (
        <span className={styles.error_alert}>Не более 20 символов!</span>
      )}
    </label>
  );
};
