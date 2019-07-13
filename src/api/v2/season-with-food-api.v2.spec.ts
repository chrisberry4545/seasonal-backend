import {
  airtableMockSetup
} from '../mocks';
airtableMockSetup();

import {
  app
} from '../../app';

import supertest, { Response } from 'supertest';
import { V2_ENDPOINT, SEASON_WITH_FOOD_ENDPOINT } from '../../config';

const v2SeasonWithFoodUrl = `${V2_ENDPOINT}/${SEASON_WITH_FOOD_ENDPOINT}`;

describe('Get all seasons with food', () => {
  let response: Response;
  beforeAll(async () => {
    response = await supertest(app).get(`/${v2SeasonWithFoodUrl}`);
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

describe('Get single season with food', () => {
  let response: Response;
  const makeSingleSeasonWithFoodRequest = (id: string = '0') => {
    return supertest(app).get(`/${v2SeasonWithFoodUrl}/${id}`);
  };

  describe('when the requested season has no food', () => {
    beforeAll(async () => {
      response = await makeSingleSeasonWithFoodRequest();
    });

    test('Returns a status of 200', () => {
      expect(response.status).toBe(200);
    });
    test('Retrieves a single season', () => {
      expect(response.body).toMatchSnapshot();
    });
    test('Does not populate a seasons food if they do not exist', () => {
      expect(response.body.food).toBeUndefined();
    });
  });

  describe('when the requested season has food data', () => {
    beforeAll(async () => {
      response = await makeSingleSeasonWithFoodRequest('1');
    });

    test('Retrieves a single season with food data', () => {
      expect(response.body).toMatchSnapshot();
    });
    test('Populates a seasons food if they exist', () => {
      expect(response.body.food.length > 0).toBe(true);
    });
    test('Does not return any recipes', () => {
      expect(response.body.recipes).toBeUndefined();
    });
  });
});
