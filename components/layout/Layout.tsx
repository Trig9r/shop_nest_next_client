import { LayoutProps } from '@/types/common';

import { Footer, Header } from '../modules';

export const Layout = ({ children }: LayoutProps) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);
