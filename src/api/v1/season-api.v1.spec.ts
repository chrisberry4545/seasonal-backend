// tslint:disable-next-line
require('env-yaml').config();

import {
  airtableMockSetup
} from '../mocks';
airtableMockSetup();

import {
  app
} from '../../app';

import supertest from 'supertest';

const v1SeasonUrl = `${process.env.V1_ENDPOINT}/` +
  `${process.env.SEASON_DATA_ENDPOINT}`;

describe('Get all seasons', () => {
  const makeAllSeasonRequest = () => {
    return supertest(app).get(`/${v1SeasonUrl}`);
  };

  test('Returns a status of 200', async () => {
    const result = await makeAllSeasonRequest();
    expect(result.status).toBe(200);
  });

  test('Returns a full list of season data', async () => {
    const result = await makeAllSeasonRequest();
    expect(result.body).toMatchSnapshot();
  });

  test('Returns the name of the seasons', async () => {
    const result = await makeAllSeasonRequest();
    expect(result.body[0].name).toBe('January');
    expect(result.body[1].name).toBe('February');
  });
});

describe('Get single season', () => {
  const makeSingleSeasonRequest = (id: string = '0') => {
    return supertest(app).get(`/${v1SeasonUrl}/${id}`);
  };

  const makeSeasonRequestWithFoodAndRecipes = () => {
    return makeSingleSeasonRequest('1');
  };

  test('Returns a status of 200', async () => {
    const result = await makeSingleSeasonRequest();
    expect(result.status).toBe(200);
  });

  test('Retrieves a single season', async () => {
    const result = await makeSingleSeasonRequest();
    expect(result.body).toMatchSnapshot();
  });

  test('Retrieves a single season with food and recipe data', async () => {
    const result = await makeSeasonRequestWithFoodAndRecipes();
    expect(result.body).toMatchSnapshot();
  });

  test('Does not populate a seasons recipes if they do not exist', async () => {
    const result = await makeSingleSeasonRequest();
    expect(result.body.recipes).toBeUndefined();
  });

  test('Populates a seasons recipes if they exist', async () => {
    const result = await makeSeasonRequestWithFoodAndRecipes();
    expect(result.body.recipes.length > 0).toBe(true);
  });

  test('Does not populate a seasons food if they do not exist', async () => {
    const result = await makeSingleSeasonRequest();
    expect(result.body.food).toBeUndefined();
  });

  test('Populates a seasons food if they exist', async () => {
    const result = await makeSeasonRequestWithFoodAndRecipes();
    expect(result.body.food.length > 0).toBe(true);
  });
});
