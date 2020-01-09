import {
  app
} from '../../app';

import supertest, { Response } from 'supertest';
import { V2_ENDPOINT, FOOD_ENDPOINT } from '../../config';
import {
  RECIPES_ID_PICKLED_BEETROOT,
  SEASON_ID_JANUARY,
  SEASON_ID_FEBRUARY,
  FOOD_ID_BEETROOT,
  FOOD_ID_ONION,
  RECIPES_ID_APPLE_CHEESE_AND_ONION
} from './shared-test-ids';

const v2FoodUrl = `${V2_ENDPOINT}/${FOOD_ENDPOINT}`;

const makeSingleFoodRequest = async (
  id: string = FOOD_ID_BEETROOT,
  isVegetarian?: boolean,
  isVegan?: boolean
) => {
  const query = [
    isVegetarian && 'is-vegetarian=true',
    isVegan && 'is-vegan=true'
  ].filter(Boolean).join('&');
  const queryString = query ? `?${query}` : '';
  return supertest(app).get(`/${v2FoodUrl}/${id}${queryString}`);
};

describe('Get single food item', () => {
  let response: Response;
  beforeAll(async () => {
    response = await makeSingleFoodRequest();
  });

  test('Returns a status of 200', () => {
    expect(response.status).toBe(200);
  });
  test('Retrieves a single food item', () => {
    expect(response.body).toMatchSnapshot();
  });
  test('Populates a foods seasons', () => {
    expect(response.body.seasons.length > 0).toBe(true);
  });
  test('Hydrates the first seasons name', () => {
    expect(response.body.seasons[0].name).toBe('January');
  });
  test('Hydrates the second seasons name', () => {
    expect(response.body.seasons[1].name).toBe('February');
  });
  test('Hydrates the first seasons seasonIndexes', () => {
    expect(response.body.seasons[0].seasonIndex).toBe(0);
  });
  test('Hydrates the second seasons seasonIndexes', () => {
    expect(response.body.seasons[1].seasonIndex).toBe(1);
  });
  test('Hydrates the seasons ids of the first season', () => {
    expect(response.body.seasons[0].id).toBe(SEASON_ID_JANUARY);
  });
  test('Hydrates the seasons ids of the second season', () => {
    expect(response.body.seasons[1].id).toBe(SEASON_ID_FEBRUARY);
  });
  test('Hydrates a foods primaryFoodInRecipe ids if they exist', () => {
    expect(response.body.primaryFoodInRecipe[0].id).toBe(RECIPES_ID_PICKLED_BEETROOT);
  });
  test('Hydrates a foods primaryFoodInRecipe names if they exist', () => {
    expect(response.body.primaryFoodInRecipe[0].name).toBe('Pickled Beetroot');
  });
  test('Returns an empty array for a foods secondaryFoodInRecipe if there is none', () => {
    expect(response.body.secondaryFoodInRecipe).toHaveLength(0);
  });

  describe('When the isVegetarian filter is applied', () => {
    beforeEach(async () => {
      response = await makeSingleFoodRequest(FOOD_ID_BEETROOT, true);
    });

    test('Returns a status of 200', () => {
      expect(response.status).toBe(200);
    });
    test('Filters out non vegetarian/vegan from the primaryFood recipes', () => {
      expect(response.body.primaryFoodInRecipe).toHaveLength(1);
    });
    test('Filters out non vegetarian/vegan from the secondaryFood recipes', () => {
      expect(response.body.primaryFoodInRecipe).toHaveLength(1);
    });
    test('Returns the vegan recipes', () => {
      expect(response.body.primaryFoodInRecipe[0].isVegan).toBe(true);
    });
  });

  describe('When the isVegan filter is applied', () => {
    beforeEach(async () => {
      response = await makeSingleFoodRequest(FOOD_ID_BEETROOT, false, true);
    });

    test('Returns a status of 200', () => {
      expect(response.status).toBe(200);
    });
    test('Filters out non vegan recipes', () => {
      expect(response.body.primaryFoodInRecipe).toHaveLength(1);
    });
    test('Filters out vegetarian recipes', () => {
      expect(response.body.secondaryFoodInRecipe).toHaveLength(0);
    });
    test('Returns only the vegan recipes', () => {
      expect(response.body.primaryFoodInRecipe[0].isVegan).toBe(true);
    });
  });

  describe('when the food is a secondary food item in recipes', () => {
    beforeAll(async () => {
      response = await makeSingleFoodRequest(
        FOOD_ID_ONION
      );
    });

    test('Returns a status of 200', () => {
      expect(response.status).toBe(200);
    });
    test('Retrieves a single food item', () => {
      expect(response.body).toMatchSnapshot();
    });
    test('Retrieves a foods secondaryFoodInRecipe names if they exist', () => {
      expect(response.body.secondaryFoodInRecipe[0].id)
        .toBe(RECIPES_ID_APPLE_CHEESE_AND_ONION);
    });
    test('Retrieves a foods secondaryFoodInRecipe names if they exist', () => {
      expect(response.body.secondaryFoodInRecipe[0].name).toBe('Apple, Cheese & Onion');
    });

    describe('and the isVegan recipe is applied', () => {
      beforeAll(async () => {
        response = await makeSingleFoodRequest(
          FOOD_ID_ONION, false, true
        );
      });

      test('returns the expected result', () => {
        expect(response.body).toMatchSnapshot();
      });
      test('filters out non vegan recipes', () => {
        expect(response.body.secondaryFoodInRecipe).toHaveLength(0);
      });
    });

    describe('and the isVegetarian recipe is applied', () => {
      beforeAll(async () => {
        response = await makeSingleFoodRequest(
          FOOD_ID_ONION, true
        );
      });

      test('returns the expected result', () => {
        expect(response.body).toMatchSnapshot();
      });
      test('does not filter out vegetarian recipes', () => {
        expect(response.body.secondaryFoodInRecipe).toHaveLength(1);
      });
    });
  });
});
