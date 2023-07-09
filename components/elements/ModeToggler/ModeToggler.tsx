import { useStore } from 'effector-react';
import React from 'react';

import { $mode } from '@/context/mode';
import { useTheme } from '@/hooks';

import styles from '@/styles/modeToggler/index.module.scss';

export const ModeToggler = () => {
  const { toggleTheme } = useTheme();
  const mode = useStore($mode);

  const handleToggleMode = () => {
    toggleTheme();
    document.body.classList.toggle('dark_mode');
  };

  React.useEffect(() => {
    document.body.classList.add(mode === 'dark' ? 'dark_mode' : 'body');
  }, [mode]);

  return (
    <div className={styles.theme}>
      <input
        className={styles.theme__input}
        type='checkbox'
        checked={mode === 'light'}
        onChange={handleToggleMode}
      />
    </div>
  );
};
