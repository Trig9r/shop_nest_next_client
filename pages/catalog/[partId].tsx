/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-lone-blocks */
/* eslint-disable no-empty */
import { useStore } from 'effector-react';
import Head from 'next/head';
import React from 'react';
import { toast } from 'react-toastify';

import { getBoilerPartFx } from '@/app/api/boilerParts';
import { Layout } from '@/components/layout';
import { Breadcrumbs } from '@/components/modules/Breadcrumbs';
import { PartPage } from '@/components/templates/PartPage';
import { $boilerPart, setBoilerPart } from '@/context/boilerPart';
import { useRedirectByUserCheck } from '@/hooks';
import { QueryParamsProps } from '@/types/catalog';

import Custom404 from '../404';

export const CatalogPartPage = ({ query }: { query: QueryParamsProps }) => {
  const { shouldLoadContent } = useRedirectByUserCheck();

  const boilerPart = useStore($boilerPart);

  const [error, setError] = React.useState(false);

  const getDefaultTextGenerator = React.useCallback(
    (subpath: string) => subpath.replace('catalog', 'Каталог'),
    []
  );

  const getTextGenerator = React.useCallback((param: string) => {
    {
    }
    [param];
  }, []);

  const lastCrumb = document.querySelector('.last-crumb') as HTMLElement;

  const loadBoilerPart = async () => {
    try {
      const data = await getBoilerPartFx(`/boiler-parts/find/${query.partId}`);

      if (!data) {
        setError(true);
        return;
      }

      setBoilerPart(data);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  React.useEffect(() => {
    if (lastCrumb) {
      lastCrumb.textContent = boilerPart.name;
    }

    loadBoilerPart();
  }, [query.partId, lastCrumb, boilerPart]);

  return (
    <>
      <Head>
        <title>Аква Термикс | {shouldLoadContent ? boilerPart.name : ''}</title>
        <meta charSet='UTF-8' />
        <meta content='IE=edge' httpEquiv='X-UA-Compatible' />
        <meta content='width=device-width, initial-scale=1.0' name='viewport' />
        <link href='/img/logo.svg' rel='icon' sizes='32x32' type='image/svg' />
      </Head>
      {error ? (
        <Custom404 />
      ) : (
        shouldLoadContent && (
          <Layout>
            <main>
              <Breadcrumbs
                getTextGenerator={getTextGenerator}
                getDefaultTextGenerator={getDefaultTextGenerator}
              />
              <PartPage />
              <div className='overlay' />
            </main>
          </Layout>
        )
      )}
    </>
  );
};

export async function getServerSideProps(context: { query: QueryParamsProps }) {
  return {
    props: { query: { ...context.query } }
  };
}

export default CatalogPartPage;
