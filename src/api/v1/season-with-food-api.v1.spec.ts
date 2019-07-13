import {
  airtableMockSetup
} from '../mocks';
airtableMockSetup();

import {
  app
} from '../../app';

import supertest, { Response } from 'supertest';
import { V1_ENDPOINT, SEASON_WITH_FOOD_ENDPOINT } from '../../config';

const v1SeasonWithFoodUrl = `${V1_ENDPOINT}/${SEASON_WITH_FOOD_ENDPOINT}`;

describe('Get all seasons with food', () => {
  let response: Response;
  beforeAll(async () => {
    response = await supertest(app).get(`/${v1SeasonWithFoodUrl}`);
  });

  test('Returns a status of 200', () => {
    expect(response.status).toBe(200);
  });
  test('Returns a full list of season data', () => {
    expect(response.body).toMatchSnapshot();
  });
  test('Returns the name of the first season', () => {
    expect(response.body[0].name).toBe('January');
  });
  test('Returns the name of the second season', () => {
    expect(response.body[1].name).toBe('February');
  });
  test('Populates the food in the seasons', () => {
    expect(response.body[0].food).toHaveLength(1);
  });
  test('Populates the food names in the seasons', () => {
    expect(response.body[0].food[0].name).toBe('Beetroot');
  });
});
