/* eslint-disable import/no-extraneous-dependencies */
import { useStore } from 'effector-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import React, { forwardRef } from 'react';

import { logoutFx } from '@/app/api/auth';
import { LogoutSvg, ProfileSvg } from '@/components/elements';
import { $mode } from '@/context/mode';
import { $user } from '@/context/user';
import { WrappedComponentProps } from '@/types/common';
import { withClickOutside } from '@/utils/withClickOutside';

import styles from '@/styles/profileDropdown/index.module.scss';

export const ProfileDropdown = forwardRef<HTMLDivElement, WrappedComponentProps>(
  ({ isOpen, setIsOpen }, ref) => {
    const router = useRouter();

    const user = useStore($user);
    const mode = useStore($mode);
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';

    const toggleProfileDropdown = () => {
      setIsOpen(!isOpen);
    };

    const handleLogout = async () => {
      await logoutFx('/users/logout');
      router.push('/');
    };

    return (
      <div className={styles.profile} ref={ref}>
        <button className={styles.profile__btn} onClick={toggleProfileDropdown}>
          <span className={styles.profile__span}>
            <ProfileSvg />
          </span>
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.ul
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className={`${styles.profile__dropdown} ${darkModeClass}`}
              style={{ transformOrigin: 'right top' }}
            >
              <li className={styles.profile__dropdown__user}>
                <span className={`${styles.profile__dropdown__username} ${darkModeClass}`}>
                  {user.username}
                </span>
                <span className={`${styles.profile__dropdown__email}  ${darkModeClass}`}>
                  {user.email}
                </span>
              </li>
              <li className={styles.profile__dropdown__item}>
                <button className={styles.profile__dropdown__item__btn} onClick={handleLogout}>
                  <span className={`${styles.profile__dropdown__item__text} ${darkModeClass}`}>
                    Выйти
                  </span>
                  <span className={`${styles.profile__dropdown__item__svg} ${darkModeClass}`}>
                    <LogoutSvg />
                  </span>
                </button>
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

ProfileDropdown.displayName = 'ProfileDropdown';

export default withClickOutside(ProfileDropdown);
