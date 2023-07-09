import { useStore } from 'effector-react';
import React from 'react';
import { useForm } from 'react-hook-form';

import { signUpFx } from '@/app/api/auth';
import { EmailInput, NameInput, PasswordInput } from '@/components/elements/AuthPage';
import { $mode } from '@/context/mode';
import type { InputProps } from '@/types/auth';
import { showAuthError } from '@/utils/errors';

import styles from '@/styles/auth/index.module.scss';
import spinnerStyles from '@/styles/spinner/index.module.scss';

export const SignUpForm = ({ switchForm }: { switchForm: () => void }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    resetField
  } = useForm<InputProps>();

  const mode = useStore($mode);
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';

  const onSubmit = async (data: InputProps) => {
    try {
      setIsLoading(true);

      const userData = await signUpFx({
        url: '/users/signup',
        username: data.name,
        password: data.password,
        email: data.email
      });

      if (!userData) {
        return;
      }

      resetField('name');
      resetField('email');
      resetField('password');
      switchForm();
    } catch (error) {
      showAuthError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={`${styles.form} ${darkModeClass}`} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={`${styles.form_title} ${styles.title} ${darkModeClass}`}>Создать аккаунт</h2>
      <NameInput register={register} errors={errors} />
      <EmailInput register={register} errors={errors} />
      <PasswordInput register={register} errors={errors} />
      <button
        className={`${styles.form__button} ${styles.button} ${styles.submit} ${darkModeClass}`}
      >
        {isLoading ? <div className={spinnerStyles.spinner} /> : 'Создать'}
      </button>
    </form>
  );
};

export default SignUpForm;
