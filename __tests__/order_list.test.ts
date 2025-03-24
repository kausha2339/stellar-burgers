import {
  getUserOrders,
  userOrders,
  TOrdersState,
  initialState
} from '../src/slices/orders_list';
import { createAsyncThunk } from '@reduxjs/toolkit';

jest.mock('@api', () => ({
  getOrdersApi: jest.fn(() =>
    Promise.resolve([
      {
        _id: '66d7fc9d119d45001b503fa1',
        ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa093c'],
        status: 'done',
        name: 'Краторный бургер',
        createdAt: '2024-09-04T06:22:21.104Z',
        updatedAt: '2024-09-04T06:22:21.577Z',
        number: 51930
      }
    ])
  )
}));

describe('userOrders slice', () => {
  it('pending state', () => {
    const result = userOrders.reducer(
      initialState,
      getUserOrders.pending(undefined)
   );
    expect(result.loading).toBe(true);
    expect(result.orders).toEqual([]);
  });

  it('fulfilled state', async () => {
    const mockOrders = [
      {
        _id: '66e9f8b2119d45001b507802',
        ingredients: [
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa0946',
          '643d69a5c3f7b9001cfa0942',
          '643d69a5c3f7b9001cfa093c'
        ],
        status: 'done',
        name: 'Краторный spicy био-марсианский минеральный бургер',
        createdAt: '2024-09-17T21:46:26.339Z',
        updatedAt: '2024-09-17T21:46:26.815Z',
        number: 53260
      }
    ];

    const newState = userOrders.reducer(
      initialState,
      getUserOrders.pending('', undefined)
    );

    const fulfilledState = userOrders.reducer(
      newState,
      getUserOrders.fulfilled(mockOrders, '', undefined)
    );

    expect(fulfilledState.loading).toBe(false);
    expect(fulfilledState.orders).toEqual(mockOrders);
  });

  it('rejected state', () => {
    const newState = userOrders.reducer(
      initialState,
      getUserOrders.pending('', undefined)
    );

    const rejectedState = userOrders.reducer(
      newState,
      getUserOrders.rejected(new Error('Error'), '', undefined)
    );

    expect(rejectedState.loading).toBe(false);
    expect(rejectedState.orders).toEqual([]);
  });
});
