/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-lone-blocks */
/* eslint-disable no-empty */
import Head from 'next/head';
import React from 'react';

import { Layout } from '@/components/layout';
import { Breadcrumbs } from '@/components/modules/Breadcrumbs';
import { CatalogPage } from '@/components/templates/CatalogPage';
import { useRedirectByUserCheck } from '@/hooks';
import { QueryParamsProps } from '@/types/catalog';

export const Catalog = ({ query }: { query: QueryParamsProps }) => {
  const { shouldLoadContent } = useRedirectByUserCheck();

  const getDefaultTextGenerator = React.useCallback(() => 'Каталог', []);

  const getTextGenerator = React.useCallback((param: string) => {
    {
    }
    [param];
  }, []);

  return (
    <>
      <Head>
        <title>Аква Термикс | {shouldLoadContent ? 'Каталог' : ''}</title>
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
            <CatalogPage query={query} />
            <div className='overlay' />
          </main>
        </Layout>
      )}
    </>
  );
};

export async function getServerSideProps(context: { query: QueryParamsProps }) {
  return {
    props: { query: { ...context.query } }
  };
}

export default Catalog;
