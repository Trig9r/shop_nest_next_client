/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';

import { Accordion,MailSvg, MarkerSvg, PhoneSvg  } from '@/components/elements';
import { useMediaQuery } from '@/hooks';

import { CompanyContent } from './CompanyContent';
import { FooterLogo } from './FooterLogo';
import { OnlineStoreContent } from './OnlineStoreContent';

import styles from '@/styles/footer/index.module.scss';

export const Footer = () => {
  const isMedia750 = useMediaQuery(750);
  const isMedia500 = useMediaQuery(500);

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__top}>
          {!isMedia750 && <FooterLogo />}
          <div className={styles.footer__top__inner}>
            <div className={styles.footer__top__item}>
              {!isMedia500 ? (
                <>
                  <h3 className={styles.footer__top__item__title}>Интернет-магазин</h3>
                  <OnlineStoreContent />
                </>
              ) : (
                <Accordion
                  title='Интернет-магазин'
                  titleClass={styles.footer__top__item__title}
                  arrowOpenClass={styles.oppen}
                >
                  <OnlineStoreContent />
                  <div style={{ height: 17 }} />
                </Accordion>
              )}
            </div>
            <div className={styles.footer__top__item}>
              {!isMedia500 ? (
                <>
                  <h3 className={styles.footer__top__item__title}>Компания</h3>
                  <CompanyContent />
                </>
              ) : (
                <Accordion
                  title='Компания'
                  titleClass={styles.footer__top__item__title}
                  arrowOpenClass={styles.oppen}
                >
                  <CompanyContent />
                  <div style={{ height: 17 }} />
                </Accordion>
              )}
            </div>
          </div>
          <div className={styles.footer__top__item}>
            <h3 className={styles.footer__top__item__title}>Контакты</h3>
            <ul
              className={`${styles.footer__top__item__list} ${styles.footer__top__item__contacts}`}
            >
              <li className={styles.footer__top__item__list__item}>
                <Link href='/contacts' passHref legacyBehavior>
                  <a className={styles.footer__top__item__list__item__link}>
                    <span>Наш адрес:</span>
                    <span>г. Москва, ул. ... д. ...</span>
                    <span>
                      <MarkerSvg />
                    </span>
                  </a>
                </Link>
              </li>
              <li className={styles.footer__top__item__list__item}>
                <a href='tel:+780955555555' className={styles.footer__top__item__list__item__link}>
                  <span>Наш контактный телефон:</span>
                  <span>+7(8095) 555-55-55</span>
                  <span>
                    <PhoneSvg />
                  </span>
                </a>
              </li>
              <li className={styles.footer__top__item__list__item}>
                <a
                  href='mailto:info@zapchasti.com.ru'
                  className={styles.footer__top__item__list__item__link}
                >
                  <span>E-mail:</span>
                  <span>info@zapchasti.com.ru</span>
                  <span>
                    <MailSvg />
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.footer__bottom}>
          <div className={styles.footer__bottom__block}>
            <div className={styles.footer__bottom__block__left}>
              <h3 className={styles.footer__bottom__block__title}>Мы принимаем к оплате:</h3>
              <ul className={styles.footer__bottom__block__pay}>
                <li className={styles.footer__bottom__block__pay__item}>
                  <img src='/img/google-pay.png' alt='google-pay' />
                </li>
                <li className={styles.footer__bottom__block__pay__item}>
                  <img src='/img/apple-pay.png' alt='apple-pay' />
                </li>
                <li className={styles.footer__bottom__block__pay__item}>
                  <img src='/img/master-card.png' alt='master-card' />
                </li>
                <li className={styles.footer__bottom__block__pay__item}>
                  <img src='/img/visa.png' alt='visa' />
                </li>
              </ul>
            </div>

            <div className={styles.footer__bottom__block__right}>
              <h3 className={styles.footer__bottom__block__title}>Мы в соцсетях:</h3>

              <ul className={styles.footer__bottom__block__social}>
                <li className={styles.footer__bottom__block__social__item}>
                  <a href='#' className={styles.footer__bottom__block__social__item_vk} />
                </li>

                <li className={styles.footer__bottom__block__social__item}>
                  <a href='#' className={styles.footer__bottom__block__social__item_fb} />
                </li>

                <li className={styles.footer__bottom__block__social__item}>
                  <a href='#' className={styles.footer__bottom__block__social__item_inst} />
                </li>

                <li className={styles.footer__bottom__block__social__item}>
                  <a href='#' className={styles.footer__bottom__block__social__item_ytb} />
                </li>
              </ul>
            </div>
          </div>

          {isMedia750 && <FooterLogo />}

          <div className={styles.footer__bottom__block__copyright}>
            <p>© «Детали для газовых котлов» 2023.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
