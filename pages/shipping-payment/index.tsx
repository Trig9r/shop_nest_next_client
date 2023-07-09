/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-lone-blocks */
/* eslint-disable no-empty */
import Head from 'next/head';
import React from 'react';

import { Layout } from '@/components/layout';
import { Breadcrumbs } from '@/components/modules/Breadcrumbs';
import { ShippingPayment } from '@/components/templates/ShippingPayment/ShippingPayment';

export const ShippingPaymentPage = () => {
  const getDefaultTextGenerator = React.useCallback(() => 'Доставка и оплата', []);

  const getTextGenerator = React.useCallback((param: string) => {
    {
    }
    [param];
  }, []);

  return (
    <>
      <Head>
        <title>Аква Термикс | Доставка и оплата</title>
        <meta charSet='UTF-8' />
        <meta content='IE=edge' httpEquiv='X-UA-Compatible' />
        <meta content='width=device-width, initial-scale=1.0' name='viewport' />
        <link href='/img/logo.svg' rel='icon' sizes='32x32' type='image/svg' />
      </Head>
      <Layout>
        <main>
          <Breadcrumbs
            getTextGenerator={getTextGenerator}
            getDefaultTextGenerator={getDefaultTextGenerator}
          />
          <ShippingPayment />
          <div className='overlay' />
        </main>
      </Layout>
    </>
  );
};

export default ShippingPaymentPage;
