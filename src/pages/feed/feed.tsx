import { FC, useEffect } from 'react';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { getAllFeeds, getOrdersFeed } from '../../slices/feed';
import { useDispatch, useSelector } from '../../services/store';

export const Feed: FC = () => {
  const orders: TOrder[] = useSelector(getOrdersFeed);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllFeeds());
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(getAllFeeds())} />
  );
};
