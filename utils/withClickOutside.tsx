import React, { ForwardRefExoticComponent, MutableRefObject, RefAttributes } from 'react';

import { WrappedComponentProps } from '@/types/common';

export const withClickOutside = (
  WrappedComponent: ForwardRefExoticComponent<WrappedComponentProps & RefAttributes<HTMLDivElement>>
) => {
  const Component = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const ref = React.useRef() as MutableRefObject<HTMLDivElement>;

    React.useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (!ref.current.contains(e.target as HTMLDivElement)) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);

      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [ref]);

    return <WrappedComponent isOpen={isOpen} setIsOpen={setIsOpen} ref={ref} />;
  };

  return Component;
};
