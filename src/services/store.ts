import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { ingredientSlice } from '../slices/ingredient';
import { feedSlice } from '../slices/feed';
import { newOrderSlice } from '../slices/new_order';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { constructorSlice } from '../slices/constructor';
import { userSlice } from '../slices/user';
import { userOrders } from '../slices/orders_list';

export const rootReducer = combineReducers({
  [ingredientSlice.name]: ingredientSlice.reducer,
  [constructorSlice.name]: constructorSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [feedSlice.name]: feedSlice.reducer,
  [newOrderSlice.name]: newOrderSlice.reducer,
  [userOrders.name]: userOrders.reducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
