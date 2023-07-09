/* eslint-disable import/no-extraneous-dependencies */
import { withHydrate } from 'effector-next';
import type { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import React from 'react';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import '@/styles/globals.css';

const enhance = withHydrate();

const App = ({ Component, pageProps }: AppProps) => {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    isMounted && (
      <>
        <NextNProgress />
        <Component {...pageProps} />
        <ToastContainer
          position='bottom-right'
          hideProgressBar={false}
          closeOnClick
          rtl={false}
          limit={1}
          theme='light'
        />
      </>
    )
  );
};

export default enhance(App as React.FC<AppProps>);
