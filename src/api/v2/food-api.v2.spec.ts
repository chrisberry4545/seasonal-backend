import {
  airtableMockSetup
} from '../mocks';
airtableMockSetup();

import {
  app
} from '../../app';

import supertest from 'supertest';
import { V2_ENDPOINT, FOOD_ENDPOINT } from '../../config';

const v2FoodUrl = `${V2_ENDPOINT}/${FOOD_ENDPOINT}`;

describe('Get single food item', () => {
  const makeSingleFoodItemRequest = (id: string = 'f1') => {
    return supertest(app).get(`/${v2FoodUrl}/${id}`);
  };

  test('Returns a status of 200', async () => {
    const result = await makeSingleFoodItemRequest();
    expect(result.status).toBe(200);
  });

  test('Retrieves a single food item', async () => {
    const result = await makeSingleFoodItemRequest();
    expect(result.body).toMatchSnapshot();
  });

  test('Populates a foods seasons', async () => {
    const result = await makeSingleFoodItemRequest();
    expect(result.body.seasons.length > 0).toBe(true);
  });

  test('Hydrates a foods seasons names if they exist', async () => {
    const result = await makeSingleFoodItemRequest();
    expect(result.body.seasons[0].name).toBe('January');
    expect(result.body.seasons[1].name).toBe('February');
  });

  test('Hydrates a foods seasons seasonIndexes if they exist', async () => {
    const result = await makeSingleFoodItemRequest();
    expect(result.body.seasons[0].seasonIndex).toBe(0);
    expect(result.body.seasons[1].seasonIndex).toBe(1);
  });

  test('Hydrates a foods seasons ids if they exist', async () => {
    const result = await makeSingleFoodItemRequest();
    expect(result.body.seasons[0].id).toBe('0');
    expect(result.body.seasons[1].id).toBe('1');
  });

  test('Hydrates a foods primaryFoodInRecipe ids if they exist', async () => {
    const result = await makeSingleFoodItemRequest();
    expect(result.body.primaryFoodInRecipe[0].id).toBe('r1');
  });

  test('Hydrates a foods primaryFoodInRecipe names if they exist', async () => {
    const result = await makeSingleFoodItemRequest();
    expect(result.body.primaryFoodInRecipe[0].name).toBe('recipe 1');
  });

  test('Hydrates a foods secondaryFoodInRecipe ids if they exist', async () => {
    const result = await makeSingleFoodItemRequest();
    expect(result.body.secondaryFoodInRecipe[0].id).toBe('r2');
  });

  test('Hydrates a foods secondaryFoodInRecipe names if they exist', async () => {
    const result = await makeSingleFoodItemRequest();
    expect(result.body.secondaryFoodInRecipe[0].name).toBe('other recipe');
  });
});
