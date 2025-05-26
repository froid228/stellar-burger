import { describe, expect, it } from '@jest/globals';
import { rootReducer } from './store';
import { initialState as constructorInitialState } from './slices/constructorSlice/constructorSlice';
import { initialState as ingredientInitialState } from './slices/ingredientSlice/ingredientSlice';
import { initialState as orderInitialState } from './slices/orderSlice/orderSlice';
import { initialState as userInitialState } from './slices/userSlice/userSlice';
import { initialState as feedInitialState } from './slices/feedSlice/feedSlice';

describe('Root Reducer', () => {
  it('should return initial state', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    
    expect(initialState).toEqual({
      constructorBurger: constructorInitialState,
      ingredient: ingredientInitialState,
      order: orderInitialState,
      user: userInitialState,
      feed: feedInitialState
    });
  });
});
