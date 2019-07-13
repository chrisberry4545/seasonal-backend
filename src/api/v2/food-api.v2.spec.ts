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

describe('Get single food item', () => {
  let response: Response;
  beforeAll(async () => {
    response = await supertest(app).get(`/${v2FoodUrl}/f1`);
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
});
