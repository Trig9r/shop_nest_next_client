/* eslint-disable import/no-extraneous-dependencies */
import { useStore } from 'effector-react';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { toast } from 'react-toastify';

import { getBestsellersOrNewPartsFx } from '@/app/api/boilerParts';
import { BrandsSlider, CartAlert, DashboardSlider } from '@/components/modules/DashboardPage';
import { $mode } from '@/context/mode';
import { $shoppingCart } from '@/context/shopping-cart';
import { BoilerPartsProps } from '@/types/boilerparts';

import styles from '@/styles/dashboard/index.module.scss';

export const DashboardPage = () => {
  const mode = useStore($mode);
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';

  const shoppingCart = useStore($shoppingCart);

  const [newParts, setNewParts] = React.useState<BoilerPartsProps>({} as BoilerPartsProps);
  const [bestsellers, setBestsellers] = React.useState<BoilerPartsProps>({} as BoilerPartsProps);
  const [isLoading, setIsLoading] = React.useState(false);
  const [showAlert, setShowAlert] = React.useState(!!shoppingCart.length);

  const loadBoilerParts = async () => {
    try {
      setIsLoading(true);
      const bestsellers = await getBestsellersOrNewPartsFx('/boiler-parts/bestsellers');
      const newParts = await getBestsellersOrNewPartsFx('/boiler-parts/new');

      setBestsellers(bestsellers);
      setNewParts(newParts);
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  React.useEffect(() => {
    loadBoilerParts();
  }, []);

  React.useEffect(() => {
    if (shoppingCart.length) {
      setShowAlert(true);
      return;
    }

    setShowAlert(false);
  }, [shoppingCart.length]);

  return (
    <section className={styles.dashboard}>
      <div className={`container ${styles.dashboard__container}`}>
        <AnimatePresence>
          {showAlert && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`${styles.dashboard__alert} ${darkModeClass}`}
            >
              <CartAlert
                count={shoppingCart.reduce((count, item) => count + item.count, 0)}
                closeAlert={handleCloseAlert}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className={styles.dashboard__brands}>
          <BrandsSlider />
        </div>

        <h2 className={`${styles.dashboard__title} ${darkModeClass}`}>Детали для газовых котлов</h2>
        <div className={styles.dashboard__parts}>
          <h3 className={`${styles.dashboard__parts__title} ${darkModeClass}`}>Хиты продаж</h3>
          <DashboardSlider
            key={Math.random()}
            items={bestsellers.rows || []}
            isLoading={isLoading}
          />
        </div>

        <div className={styles.dashboard__parts}>
          <h3 className={`${styles.dashboard__parts__title} ${darkModeClass}`}>Новинки</h3>
          <DashboardSlider key={Math.random()} items={newParts.rows || []} isLoading={isLoading} />
        </div>

        <div className={styles.dashboard__about}>
          <h3
            className={`${styles.dashboard__parts__title} ${styles.dashboard__about__title} ${darkModeClass}`}
          >
            О компании
          </h3>
          <p className={`${styles.dashboard__about__text} ${darkModeClass}`}>
            Инструкции и схемы помогут разобраться в эксплуатации, определить неисправность и
            правильно выбрать запчасть для ремонта Вашего газового оборудования. Купить запчасть,
            деталь для ремонта газового котла возможно в любом населенном пункте Российской
            Федерации: Осуществляем доставку запчасти к газовым котлам в следующие города: Москва,
            Сан
          </p>
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
