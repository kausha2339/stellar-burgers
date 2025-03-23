import {
  addItem,
  constructorSlice,
  deleteItem,
  initialState,
  constructorReducer,
  clearAll,
  updateAll
} from '../src/slices/constructor';

const testBun = {
  _id: '1',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  __v: 0,
  id: '1'
};

const testIngredients = {
  _id: '2',
  id: '2',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
  __v: 0
};

describe('test reducer constructorSlice', () => {
  it('add ingredien', () => {
    expect(
      constructorSlice.reducer(initialState, addItem(testIngredients))
        .ingredients
    ).toHaveLength(1);
  });

  it('remove ingredient', () => {
    const state = {
      bun: null,
      ingredients: [testIngredients]
    };
    expect(
      constructorSlice.reducer(state, deleteItem(testIngredients)).ingredients
    ).toHaveLength(0);
  });

  it('add bun', () => {
    expect(
      constructorSlice.reducer(initialState, addItem(testBun)).bun?._id
    ).toBe('1');
  });

  it('remove bun', () => {
    expect(
      constructorSlice.reducer(initialState, deleteItem(testBun)).bun
    ).toBeNull();
  });
  // it('swap ingredients', () => {
  //   const testIngredients_2 = {
  //     id: '4',
  //     _id: '4',
  //     name: 'Соус фирменный Space Sauce',
  //     type: 'sauce',
  //     proteins: 10,
  //     fat: 5,
  //     carbohydrates: 25,
  //     calories: 45,
  //     price: 60,
  //     image: '',
  //     image_large: '',
  //     image_mobile: ''
  //   };
  //   const state = {
  //     bun: null,
  //     ingredients: [testIngredients, testIngredients_2]
  //   };
  //   const newState = constructorReducer(
  //     state,
  //     swapIngredient({ index: 1, direction: 'up' })
  //   );
  //   expect(newState).toEqual({
  //     bun: null,
  //     ingredients: [testIngredients_2, testIngredients]
  //   });
  // });
  it('reset the state to initial state', () => {
    const state = {
      bun: { id: '1', type: 'bun', name: 'Краторная булка N-200i' },
      ingredients: [{ id: '2', name: 'Биокотлета из марсианской Магнолии' }]
    };
    const action = clearAll();
    const newState = constructorReducer(state, action);
    expect(newState).toEqual(initialState);
  });

  it('update ingredients with new array', () => {
    const newIngredients = [
      { id: '3', name: 'Биокотлета из марсианской Магнолии' },
      { id: '4', name: 'Соус фирменный Space Sauce' }
    ];
    const action = updateAll(newIngredients);
    const newState = constructorReducer(initialState, action);
    expect(newState.ingredients).toEqual(newIngredients);
  });
});
