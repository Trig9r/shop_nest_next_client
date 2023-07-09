import React from 'react';

export interface PartImageItemProps {
  src: string;
  callback: (arg0: string) => void;
  alt: string;
}

export interface PartAccordionProps {
  title: string;
  children: React.ReactNode;
}
