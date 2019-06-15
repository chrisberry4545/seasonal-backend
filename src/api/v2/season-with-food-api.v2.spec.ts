import {
  airtableMockSetup
} from '../mocks';
airtableMockSetup();

import {
  app
} from '../../app';

import supertest from 'supertest';
import { V2_ENDPOINT, SEASON_WITH_FOOD_ENDPOINT } from '../../config';

const v2SeasonWithFoodUrl = `${V2_ENDPOINT}/${SEASON_WITH_FOOD_ENDPOINT}`;

describe('Get all seasons with food', () => {
  const makeAllSeasonWithFoodRequest = () => {
    return supertest(app).get(`/${v2SeasonWithFoodUrl}`);
  };

  test('Returns a status of 200', async () => {
    const result = await makeAllSeasonWithFoodRequest();
    expect(result.status).toBe(200);
  });

  test('Returns a full list of season data', async () => {
    const result = await makeAllSeasonWithFoodRequest();
    expect(result.body).toMatchSnapshot();
  });

  test('Returns the name of the seasons', async () => {
    const result = await makeAllSeasonWithFoodRequest();
    expect(result.body[0].name).toBe('January');
    expect(result.body[1].name).toBe('February');
  });

  test('Populates the food in the seasons', async () => {
    const result = await makeAllSeasonWithFoodRequest();
    expect(result.body[0].food).toHaveLength(1);
    expect(result.body[0].food[0].name).toBe('Beetroot');
  });
});

describe('Get single season with food', () => {
  const makeSingleSeasonWithFoodRequest = (id: string = '0') => {
    return supertest(app).get(`/${v2SeasonWithFoodUrl}/${id}`);
  };

  const makeSeasonRequestWithFood = () => {
    return makeSingleSeasonWithFoodRequest('1');
  };

  test('Returns a status of 200', async () => {
    const result = await makeSingleSeasonWithFoodRequest();
    expect(result.status).toBe(200);
  });

  test('Retrieves a single season', async () => {
    const result = await makeSingleSeasonWithFoodRequest();
    expect(result.body).toMatchSnapshot();
  });

  test('Retrieves a single season with food data', async () => {
    const result = await makeSeasonRequestWithFood();
    expect(result.body).toMatchSnapshot();
  });

  test('Does not populate a seasons food if they do not exist', async () => {
    const result = await makeSingleSeasonWithFoodRequest();
    expect(result.body.food).toBeUndefined();
  });

  test('Populates a seasons food if they exist', async () => {
    const result = await makeSeasonRequestWithFood();
    expect(result.body.food.length > 0).toBe(true);
  });

  test('Does not return any recipes', async () => {
    const result = await makeSeasonRequestWithFood();
    expect(result.body.recipes).toBeUndefined();
  });
});
