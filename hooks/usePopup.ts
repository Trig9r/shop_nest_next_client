import React from 'react';

import { setSearchInputZIndex } from '@/context/header';
import {
  removeClassNamesForOverlayAndBody,
  toggleClassNamesForOverlayAndBody
} from '@/utils/common';

export const usePopup = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleIsOpen = () => {
    window.scrollTo(0, 0);

    toggleClassNamesForOverlayAndBody();

    setIsOpen(!isOpen);
  };

  const closePopup = () => {
    removeClassNamesForOverlayAndBody();
    setIsOpen(false);
    setSearchInputZIndex(1);
  };

  React.useEffect(() => {
    const overlay = document.querySelector('.overlay');

    overlay?.addEventListener('click', closePopup);

    return () => overlay?.removeEventListener('click', closePopup);
  }, []);

  return { toggleIsOpen, closePopup, isOpen };
};
