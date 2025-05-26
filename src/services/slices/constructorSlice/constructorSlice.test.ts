import constructorSlice, {
  addIngredient,
  initialState,
  moveIngredientDown,
  moveIngredientUp,
  orderBurger,
  removeIngredient
} from './constructorSlice';
import { expect, test, describe } from '@jest/globals';

describe('тестирование редьюсера constructorSlice', () => {
  describe('тестирование экшена addIngredient', () => {
    const initialState = {
      constructorItems: {
        bun: null,
        ingredients: []
      },
      loading: false,
      orderRequest: false,
      orderModalData: null,
      error: null
    };

    const testBun = {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Флюоресцентная булка R2-D3',
      type: 'bun',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/bun-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
    };

    const testSauce = {
      _id: '643d69a5c3f7b9001cfa093e',
      name: 'Соус фирменный Space Sauce',
      type: 'sauce',
      proteins: 50,
      fat: 22,
      carbohydrates: 11,
      calories: 14,
      price: 80,
      image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png'
    };

    const testMain = {
      _id: '643d69a5c3f7b9001cfa093f',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
    };

    test('добавление ингредиента в пустой конструктор', () => {
      const newState = constructorSlice(initialState, addIngredient(testSauce));
      expect(newState.constructorItems.ingredients).toHaveLength(1);
      expect(newState.constructorItems.ingredients[0]).toEqual({
        ...testSauce,
        id: expect.any(String)
      });
    });

    test('добавление нескольких ингредиентов', () => {
      let state = constructorSlice(initialState, addIngredient(testSauce));
      state = constructorSlice(state, addIngredient(testMain));
      expect(state.constructorItems.ingredients).toHaveLength(2);
      expect(state.constructorItems.ingredients[1]).toEqual({
        ...testMain,
        id: expect.any(String)
      });
    });

    test('добавление булки в пустой конструктор', () => {
      const newState = constructorSlice(initialState, addIngredient(testBun));
      expect(newState.constructorItems.bun).toEqual({
        ...testBun,
        id: expect.any(String)
      });
    });

    test('замена существующей булки', () => {
      const stateWithBun = {
        ...initialState,
        constructorItems: {
          ...initialState.constructorItems,
          bun: { ...testBun, id: 'old-bun-id' }
        }
      };
      const newBun = { ...testBun, _id: '643d69a5c3f7b9001cfa093d' };
      const newState = constructorSlice(stateWithBun, addIngredient(newBun));
      const newBunState = newState.constructorItems.bun;
      
      expect(newBunState).not.toBeNull();
      if (newBunState) {
        expect(newBunState).toEqual({
          ...newBun,
          id: expect.any(String)
        });
        expect(newBunState.id).not.toBe('old-bun-id');
      }
    });
  });

  describe('тестирование экшена removeIngredient', () => {
    const testIngredient = {
      id: 'test-id-1',
      _id: '643d69a5c3f7b9001cfa093e',
      name: 'Соус фирменный Space Sauce',
      type: 'sauce',
      proteins: 50,
      fat: 22,
      carbohydrates: 11,
      calories: 14,
      price: 80,
      image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png'
    };

    const initialState = {
      constructorItems: {
        bun: null,
        ingredients: [testIngredient]
      },
      loading: false,
      orderRequest: false,
      orderModalData: null,
      error: null
    };

    test('удаление ингредиента из конструктора', () => {
      const newState = constructorSlice(initialState, removeIngredient('test-id-1'));
      expect(newState.constructorItems.ingredients).toHaveLength(0);
    });

    test('удаление несуществующего ингредиента', () => {
      const newState = constructorSlice(initialState, removeIngredient('non-existent-id'));
      expect(newState.constructorItems.ingredients).toHaveLength(1);
    });
  });

  describe('тестирование экшенов перемещения: moveIngredientUp & moveIngredientDown', () => {
    const testIngredients = [
      {
        id: 'id-1',
        _id: '643d69a5c3f7b9001cfa093e',
        name: 'Соус фирменный Space Sauce',
        type: 'sauce',
        proteins: 50,
        fat: 22,
        carbohydrates: 11,
        calories: 14,
        price: 80,
        image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png'
      },
      {
        id: 'id-2',
        _id: '643d69a5c3f7b9001cfa093f',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
      },
      {
        id: 'id-3',
        _id: '643d69a5c3f7b9001cfa0940',
        name: 'Хрустящие минеральные кольца',
        type: 'main',
        proteins: 808,
        fat: 689,
        carbohydrates: 609,
        calories: 986,
        price: 300,
        image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/mineral_rings-large.png'
      }
    ];

    const initialState = {
      constructorItems: {
        bun: null,
        ingredients: testIngredients
      },
      loading: false,
      orderRequest: false,
      orderModalData: null,
      error: null
    };

    test('перемещение ингредиента вверх', () => {
      const newState = constructorSlice(initialState, moveIngredientUp(1));
      expect(newState.constructorItems.ingredients[0].id).toBe('id-2');
      expect(newState.constructorItems.ingredients[1].id).toBe('id-1');
    });

    test('перемещение ингредиента вниз', () => {
      const newState = constructorSlice(initialState, moveIngredientDown(0));
      expect(newState.constructorItems.ingredients[0].id).toBe('id-2');
      expect(newState.constructorItems.ingredients[1].id).toBe('id-1');
    });

    test('попытка переместить первый ингредиент вверх', () => {
      const newState = constructorSlice(initialState, moveIngredientUp(0));
      expect(newState.constructorItems.ingredients[0].id).toBe('id-1');
      expect(newState.constructorItems.ingredients[1].id).toBe('id-2');
      expect(newState.constructorItems.ingredients[2].id).toBe('id-3');
    });

    test('попытка переместить последний ингредиент вниз', () => {
      const newState = constructorSlice(initialState, moveIngredientDown(2));
      expect(newState.constructorItems.ingredients[0].id).toBe('id-1');
      expect(newState.constructorItems.ingredients[1].id).toBe('id-2');
      expect(newState.constructorItems.ingredients[2].id).toBe('id-3');
    });
  });

  describe('тестирование асинхронного POST экшена orderBurger', () => {
    const actions = {
      pending: {
        type: orderBurger.pending.type,
        payload: null
      },
      rejected: {
        type: orderBurger.rejected.type,
        error: { message: 'Ошибка при создании заказа' }
      },
      fulfilled: {
        type: orderBurger.fulfilled.type,
        payload: { order: { number: 40442 } }
      }
    };

    test('тест синхронного экшена orderBurger.pending', () => {
      const state = constructorSlice(initialState, actions.pending);
      expect(state.loading).toBe(true);
      expect(state.error).toBe(null);
    });

    test('тест синхронного экшена orderBurger.rejected', () => {
      const state = constructorSlice(initialState, actions.rejected);
      expect(state.loading).toBe(false);
      expect(state.error).toBe(actions.rejected.error.message);
      expect(state.orderModalData).toBe(null);
    });

    test('тест синхронного экшена orderBurger.fulfilled', () => {
      const state = constructorSlice(initialState, actions.fulfilled);
      expect(state.loading).toBe(false);
      expect(state.error).toBe(null);
      expect(state.orderModalData?.number).toBe(actions.fulfilled.payload.order.number);
    });
  });
});
