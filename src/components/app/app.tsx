import '../../index.css';
import styles from './app.module.css';

import { useEffect } from 'react';

import { useDispatch } from '../../services/store';

import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';

import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import { ProtectedRoute } from '../protected-route';
import { getIngredientsList } from '../../slices/ingredient';
import { apiGetUser } from '../../slices/user';

const routes = {
  home: '/',
  feed: '/feed',
  feedNum: '/feed/:number',
  ingredients: '/ingredients/:id',
  login: '/login',
  register: '/register',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  profile: '/profile',
  profileOrders: '/profile/orders',
  profileOrdersNum: '/profile/orders/:number',
  notFound: '*'
};
const App = () => {
  const dispatch = useDispatch(),
    navigate = useNavigate(),
    location = useLocation(),
    background = location.state?.background;

  useEffect(() => {
    dispatch(getIngredientsList());
    dispatch(apiGetUser());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path={routes.home} element={<ConstructorPage />} />
        <Route path={routes.feed} element={<Feed />} />
        <Route path={routes.ingredients} element={<IngredientDetails />} />
        <Route path={routes.feedNum} element={<OrderInfo />} />
        <Route
          path={routes.login}
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path={routes.register}
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path={routes.forgotPassword}
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path={routes.resetPassword}
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path={routes.profile}
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path={routes.resetPassword}
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path={routes.profileOrders}
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path={routes.profileOrdersNum}
          element={
            <ProtectedRoute>
              <OrderInfo />
            </ProtectedRoute>
          }
        />
        <Route path={routes.notFound} element={<NotFound404 />} />
      </Routes>
      {background && (
        <Routes>
          <Route
            path={routes.feedNum}
            element={
              <Modal title={''} onClose={() => navigate(-1)}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path={routes.ingredients}
            element={
              <Modal title={'Детали ингредиента'} onClose={() => navigate(-1)}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path={routes.profileOrdersNum}
            element={
              <Modal title={''} onClose={() => navigate(-1)}>
                <ProtectedRoute>
                  <OrderInfo />
                </ProtectedRoute>
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};
export default App;
