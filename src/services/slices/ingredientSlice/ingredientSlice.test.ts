import { describe, expect, it } from '@jest/globals';
import ingredientSlice, {
  getIngredients,
  initialState
} from './ingredientSlice';

describe('Ingredients Slice', () => {
  describe('getIngredients', () => {
    it('should handle pending state', () => {
      const nextState = ingredientSlice(initialState, {
        type: getIngredients.pending.type
      });

      expect(nextState.loading).toBe(true);
      expect(nextState.error).toBe(null);
    });

    it('should handle fulfilled state', () => {
      const ingredients = [
        {
          _id: '643d69a5c3f7b9001cfa093c',
          name: 'Краторная булка N-200i',
          type: 'bun',
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
          image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
        }
      ];

      const nextState = ingredientSlice(initialState, {
        type: getIngredients.fulfilled.type,
        payload: ingredients
      });

      expect(nextState.loading).toBe(false);
      expect(nextState.error).toBe(null);
      expect(nextState.ingredients).toEqual(ingredients);
    });

    it('should handle rejected state', () => {
      const error = 'Failed to fetch ingredients';

      const nextState = ingredientSlice(initialState, {
        type: getIngredients.rejected.type,
        error: { message: error }
      });

      expect(nextState.loading).toBe(false);
      expect(nextState.error).toBe(error);
      expect(nextState.ingredients).toEqual([]);
    });
  });
});
