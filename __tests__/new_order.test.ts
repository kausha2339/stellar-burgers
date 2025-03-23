import {
  placeNewOrder,
  resetOrder,
  initialState,
  getOrderData
} from '../src/slices/new_order';
import { TOrder } from '../src/utils/types';
import newOrderSlice from '../src/slices/new_order';

describe('test newOrderSlice', () => {
  // const initialState = {
  //   loading: false,
  //   order: null,
  // };

  it('initial state', () => {
    expect(newOrderSlice.reducer(undefined, { type: undefined })).toEqual(
      initialState
    );
  });

  it('reset order', () => {
    const previousState = {
      loading: true,
      order: {
        _id: '671a8f96d829be001c7787ea',
        ingredients: [
          'Флюоресцентная булка R2-D3',
          'Флюоресцентный spicy люминесцентный бургер',
          'Филе Люминесцентного тетраодонтимформа',
          'Соус Spicy-X',
          'Флюоресцентная булка R2-D3'
        ],
        status: 'done',
        name: 'Флюоресцентный spicy люминесцентный бургер',
        createdAt: '2024-10-24T18:19:02.774Z',
        updatedAt: '2024-10-24T18:19:03.715Z',
        number: 57403
      },
      error: 'Error'
    };
    expect(newOrderSlice.reducer(previousState, resetOrder())).toEqual(
      initialState
    );
  });

  it('placeNewOrder.pending', () => {
    const action = { type: placeNewOrder.pending.type };
    const state = newOrderSlice.reducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.order).toBe(null);
    expect(state.error).toBeUndefined();
  });

  it('placeNewOrder.fulfilled', () => {
    const action = {
      type: placeNewOrder.fulfilled.type,
      payload: { order: getOrderData }
    };
    const state = newOrderSlice.reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.order).toEqual(getOrderData);
    expect(state.error).toBeUndefined();
  });

  it('placeNewOrder.rejected', () => {
    const action = {
      type: placeNewOrder.rejected.type,
      error: { message: 'Error' }
    };
    const state = newOrderSlice.reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.order).toBe(null);
    expect(state.error).toBe('Error');
  });
});
