/* eslint-disable jsx-a11y/label-has-associated-control */
import { FeedbackInputProps } from '@/types/feedbackForm';

import styles from '@/styles/feedbackForm/index.module.scss';

export const EmailInput = ({ register, errors, darkModeClass }: FeedbackInputProps) => (
  <label className={`${styles.feedback_form__form__label} ${darkModeClass}`}>
    <span>Email *</span>
    <input
      className={styles.feedback_form__form__input}
      type='email'
      placeholder='ivan@gmail.com'
      {...register('email', {
        required: 'Введите Email!',
        pattern: {
          value: /\S+@\S+\.\S+/,
          message: 'Неправильный Email!'
        }
      })}
    />
    {errors.email && <span className={styles.error_alert}>{errors.email?.message}</span>}
  </label>
);
