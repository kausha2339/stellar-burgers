import { expect, test, describe } from '@jest/globals';
import {
  getIngredientsList,
  ingredientSlice,
  initialState
} from '../src/slices/ingredient';

describe('test reducer ingredientSlice', () => {
  test('call getIngredients.pending', () => {
    const newState = ingredientSlice.reducer(
      initialState,
      getIngredientsList.pending('')
    );

    expect(newState).toEqual({
      ...initialState,
      loading: true
    });
  });

  test('call getIngredients.fulfilled', () => {
    const mockIngredients = [
      {
        _id: '1',
        name: 'Булка',
        type: 'bun',
        nutrients: {
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420
        },
        price: 1255,
        images: {
          default: 'https://code.s3.yandex.net/react/code/bun-02.png',
          mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
        },
        __v: 0
      }
    ];

    const newState = ingredientSlice.reducer(
      { ...initialState, loading: true },
      getIngredientsList.fulfilled(mockIngredients, '')
    );

    expect(newState).toEqual({
      loading: false,
      ingredients: mockIngredients,
      error: null
    });
  });

  test('call getIngredients.rejected', () => {
    const error = new Error('Error');

    const newState = ingredientSlice.reducer(
      { ...initialState, loading: true },
      getIngredientsList.rejected(error, '')
    );

    expect(newState).toEqual({
      ...initialState,
      loading: false,
      error: error.message
    });
  });
});
