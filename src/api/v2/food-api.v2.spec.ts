import {
  airtableMockSetup
} from '../mocks';
airtableMockSetup();

import {
  app
} from '../../app';

import supertest, { Response } from 'supertest';
import { V2_ENDPOINT, FOOD_ENDPOINT } from '../../config';

const v2FoodUrl = `${V2_ENDPOINT}/${FOOD_ENDPOINT}`;

const makeSingleFoodRequest = async (
  id: string = 'f1',
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
    expect(response.body.seasons[0].id).toBe('0');
  });
  test('Hydrates the seasons ids of the second season', () => {
    expect(response.body.seasons[1].id).toBe('1');
  });
  test('Hydrates a foods primaryFoodInRecipe ids if they exist', () => {
    expect(response.body.primaryFoodInRecipe[0].id).toBe('r1');
  });
  test('Hydrates a foods primaryFoodInRecipe names if they exist', () => {
    expect(response.body.primaryFoodInRecipe[0].name).toBe('recipe 1');
  });
  test('Hydrates a foods secondaryFoodInRecipe ids if they exist', () => {
    expect(response.body.secondaryFoodInRecipe[0].id).toBe('r2');
  });
  test('Hydrates a foods secondaryFoodInRecipe names if they exist', () => {
    expect(response.body.secondaryFoodInRecipe[0].name).toBe('other recipe');
  });

  describe('When the isVegetarian filter is applied', () => {
    beforeEach(async () => {
      response = await makeSingleFoodRequest('f1', true);
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
    test('Returns the vegetarian recipes', () => {
      expect(response.body.secondaryFoodInRecipe[0].isVegetarian).toBe(true);
    });
  });

  describe('When the isVegan filter is applied', () => {
    beforeEach(async () => {
      response = await makeSingleFoodRequest('f1', false, true);
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
});
