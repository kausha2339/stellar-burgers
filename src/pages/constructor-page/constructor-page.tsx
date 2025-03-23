import { useSelector } from '../../services/store';

import styles from './constructor-page.module.css';
import { BurgerConstructor, BurgerIngredients } from '@components';
import { FC } from 'react';
import { getIngredientsLoadingState } from '../../slices/ingredient';
import { Preloader } from '@ui';

export const ConstructorPage: FC = () => {
  const isIngredientsLoading = useSelector(getIngredientsLoadingState);

  return (
    <>
      {isIngredientsLoading ? (
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
