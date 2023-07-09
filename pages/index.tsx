import Head from 'next/head';

import AuthPage from '@/components/templates/AuthPage/AuthPage';
import { useRedirectByUserCheck } from '@/hooks';

export const Auth = () => {
  const { shouldLoadContent } = useRedirectByUserCheck(true);

  return (
    <>
      <Head>
        <title>Аква Термикс | {shouldLoadContent ? 'Авторизация' : ''}</title>
        <meta charSet='UTF-8' />
        <meta content='IE=edge' httpEquiv='X-UA-Compatible' />
        <meta content='width=device-width, initial-scale=1.0' name='viewport' />
        <link href='/img/logo.svg' rel='icon' sizes='32x32' type='image/svg' />
      </Head>
      {shouldLoadContent && <AuthPage />}
    </>
  );
};

export default Auth;
