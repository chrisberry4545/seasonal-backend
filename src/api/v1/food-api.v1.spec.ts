import {
  airtableMockSetup
} from '../mocks';
airtableMockSetup();

import {
  app
} from '../../app';

import supertest, { Response } from 'supertest';
import { V1_ENDPOINT, FOOD_DATA_ENDPOINT } from '../../config';

const v1FoodUrl = `${V1_ENDPOINT}/${FOOD_DATA_ENDPOINT}`;

describe('Get single food item', () => {
  let response: Response;
  beforeAll(async () => {
    response = await supertest(app).get(`/${v1FoodUrl}/f1`);
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
  test('Hydrates a foods first seasons names', () => {
    expect(response.body.seasons[0].name).toBe('January');
  });
  test('Hydrates a foods second seasons names', () => {
    expect(response.body.seasons[1].name).toBe('February');
  });
  test('Hydrates a foods first seasons seasonIndexes', () => {
    expect(response.body.seasons[0].seasonIndex).toBe(0);
  });
  test('Hydrates a foods second seasons seasonIndexes', () => {
    expect(response.body.seasons[1].seasonIndex).toBe(1);
  });
  test('Hydrates a foods first seasons ids', () => {
    expect(response.body.seasons[0].id).toBe('0');
  });
  test('Hydrates a foods second seasons ids', () => {
    expect(response.body.seasons[1].id).toBe('1');
  });
  test('Hydrates a foods primaryFoodInRecipe ids', () => {
    expect(response.body.primaryFoodInRecipe[0].id).toBe('r1');
  });
  test('Hydrates a foods primaryFoodInRecipe names', () => {
    expect(response.body.primaryFoodInRecipe[0].name).toBe('recipe 1');
  });
  test('Hydrates a foods secondaryFoodInRecipe ids', () => {
    expect(response.body.secondaryFoodInRecipe[0].id).toBe('r2');
  });
  test('Hydrates a foods secondaryFoodInRecipe names', () => {
    expect(response.body.secondaryFoodInRecipe[0].name).toBe('other recipe');
  });
});
