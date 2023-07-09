/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable simple-import-sort/imports */
import { useStore } from 'effector-react';
import React, { MutableRefObject } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';

import { $mode } from '@/context/mode';
import { FeedbackInputsProps } from '@/types/feedbackForm';

import { EmailInput } from './EmailInput';
import { MessageInput } from './MessageInput';
import { NameInput } from './NameInput';
import { PhoneInput } from './PhoneInput';

import styles from '@/styles/feedbackForm/index.module.scss';
import spinnerStyles from '@/styles/spinner/index.module.scss';
import { toast } from 'react-toastify';

export const FeedbackForm = () => {
  const mode = useStore($mode);
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';

  const [isLoading, setIsLoading] = React.useState(false);
  const formRef = React.useRef() as MutableRefObject<HTMLFormElement>;

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FeedbackInputsProps>();

  const submitForm = () => {
    setIsLoading(true);

    emailjs
      .sendForm('service_l5zy0sm', 'template_bzmmy78', formRef.current, 'g51fUKbW4WREPGnhj')
      .then((result) => {
        setIsLoading(false);
        toast.success(`Сообщение отправлено! ${result.text}`);
        formRef.current.reset();
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(`Что-то пошло не так! ${error.text}`);
      });
  };

  return (
    <div className={`${styles.feedback_form} ${darkModeClass}`}>
      <h3 className={`${styles.feedback_form__title} ${darkModeClass}`}>Форма обратной связи</h3>
      <form
        ref={formRef}
        className={styles.feedback_form__form}
        onSubmit={handleSubmit(submitForm)}
      >
        <NameInput register={register} errors={errors} darkModeClass={darkModeClass} />
        <PhoneInput register={register} errors={errors} darkModeClass={darkModeClass} />
        <EmailInput register={register} errors={errors} darkModeClass={darkModeClass} />
        <MessageInput register={register} errors={errors} darkModeClass={darkModeClass} />
        <div className={styles.feedback_form__form__btn}>
          <button>
            {isLoading ? (
              <span className={spinnerStyles.spinner} style={{ top: '6px', left: '47%' }} />
            ) : (
              'Отправить сообщение'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
