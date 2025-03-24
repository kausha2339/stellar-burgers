import { rootReducer } from '../src/services/store';
import { ingredientSlice } from '../src/slices/ingredient';
import { newOrderSlice } from '../src/slices/new_order';
import { userOrders } from '../src/slices/orders_list';
import { userSlice } from '../src/slices/user';
import { feedSlice } from '../src/slices/feed';
import { constructorSlice } from '../src/slices/constructor';

describe('test init rootReducer', function () {
  test('is init correctly', function () {
    const testAction = { type: 'UNKNOWN_ACTION' };
    const state = rootReducer(undefined, testAction);
    expect(state).toEqual({
      user: userSlice.reducer(undefined, testAction),
      ingredients: ingredientSlice.reducer(undefined, testAction),
      constructorIngredient: constructorSlice.reducer(undefined, testAction),
      feeds: feedSlice.reducer(undefined, testAction),
      newOrder: newOrderSlice.reducer(undefined, testAction),
      orders: userOrders.reducer(undefined, testAction)
    });
  });
});
