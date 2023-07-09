import { useStore } from 'effector-react';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';

import { signInFx } from '@/app/api/auth';
import { NameInput, PasswordInput } from '@/components/elements/AuthPage';
import { $mode } from '@/context/mode';
import type { InputProps } from '@/types/auth';
import { showAuthError } from '@/utils/errors';

import styles from '@/styles/auth/index.module.scss';
import spinnerStyles from '@/styles/spinner/index.module.scss';

export const SignInForm = () => {
  const route = useRouter();

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
      await signInFx({
        url: '/users/login',
        username: data.name,
        password: data.password
      });

      resetField('name');
      resetField('password');
      route.push('/dashboard');
    } catch (error) {
      showAuthError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={`${styles.form} ${darkModeClass}`} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={`${styles.form_title} ${styles.title} ${darkModeClass}`}>Ввойти на сайт</h2>
      <NameInput register={register} errors={errors} />
      <PasswordInput register={register} errors={errors} />
      <button
        className={`${styles.form__button} ${styles.button} ${styles.submit} ${darkModeClass}`}
      >
        {isLoading ? <div className={spinnerStyles.spinner} /> : 'Ввойти'}
      </button>
    </form>
  );
};
