import Head from 'next/head';
import React from 'react';

import { Layout } from '@/components/layout';
import { Breadcrumbs } from '@/components/modules/Breadcrumbs';
import { DashboardPage } from '@/components/templates/DashboardPage';
import { useRedirectByUserCheck } from '@/hooks';

export const Dashboard = () => {
  const { shouldLoadContent } = useRedirectByUserCheck();

  const getDefaultTextGenerator = () => '';

  const getTextGenerator = () => '';

  return (
    <>
      <Head>
        <title>Аква Термикс | {shouldLoadContent ? 'Главная' : ''}</title>
        <meta charSet='UTF-8' />
        <meta content='IE=edge' httpEquiv='X-UA-Compatible' />
        <meta content='width=device-width, initial-scale=1.0' name='viewport' />
        <link href='/img/logo.svg' rel='icon' sizes='32x32' type='image/svg' />
      </Head>
      {shouldLoadContent && (
        <Layout>
          <main>
            <Breadcrumbs
              getTextGenerator={getTextGenerator}
              getDefaultTextGenerator={getDefaultTextGenerator}
            />
            <DashboardPage />
            <div className='overlay' />
          </main>
        </Layout>
      )}
    </>
  );
};

export default Dashboard;
