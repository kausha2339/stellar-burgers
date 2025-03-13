import { useState, useRef, useEffect, FC } from 'react';
import { useInView } from 'react-intersection-observer';

import { TTabMode } from '@utils-types';
import { BurgerIngredientsUI, Preloader } from '@ui';
import { useSelector } from '../../services/store';
import {
  getIngredients,
  getIngredientsState,
  getIngredientsLoadingState
} from '../../slices/ingredient';

export const BurgerIngredients: FC = () => {
  const ingredients = useSelector(getIngredients),
    loading = useSelector(getIngredientsLoadingState),
    state = useSelector(getIngredientsState);

  const buns = ingredients.filter((ingredient) => ingredient.type === 'bun'),
    mains = ingredients.filter((ingredient) => ingredient.type === 'main'),
    sauces = ingredients.filter((ingredient) => ingredient.type === 'sauce');

  const titleBunRef = useRef<HTMLHeadingElement>(null),
    titleMainRef = useRef<HTMLHeadingElement>(null),
    titleSaucesRef = useRef<HTMLHeadingElement>(null);

  const [bunsRef, inViewBuns] = useInView({
    threshold: 0
  });

  const [mainsRef, inViewFilling] = useInView({
    threshold: 0
  });

  const [saucesRef, inViewSauces] = useInView({
    threshold: 0
  });

  const [currentTab, setCurrentTab] = useState<TTabMode>('bun');

  useEffect(() => {
    if (inViewBuns) {
      setCurrentTab('bun');
    } else if (inViewSauces) {
      setCurrentTab('sauce');
    } else if (inViewFilling) {
      setCurrentTab('main');
    }
  }, [inViewBuns, inViewFilling, inViewSauces]);

  const onTabClick = (tab: string) => {
    setCurrentTab(tab as TTabMode);
    if (tab === 'bun')
      titleBunRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'main')
      titleMainRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'sauce')
      titleSaucesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (state.error) {
    return <p>Упс... что-то пошло не так...</p>;
  }

  if (loading) {
    return <Preloader />;
  }

  return (
    <BurgerIngredientsUI
      currentTab={currentTab}
      buns={buns}
      mains={mains}
      sauces={sauces}
      titleBunRef={titleBunRef}
      titleMainRef={titleMainRef}
      titleSaucesRef={titleSaucesRef}
      bunsRef={bunsRef}
      mainsRef={mainsRef}
      saucesRef={saucesRef}
      onTabClick={onTabClick}
    />
  );
};
