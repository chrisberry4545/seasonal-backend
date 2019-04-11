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

const v1SeasonWithFoodUrl = `${process.env.V1_ENDPOINT}/` +
  `${process.env.SEASON_WITH_FOOD_ENDPOINT}`;

describe('Get all seasons with food', () => {
  const makeAllSeasonWithFoodRequest = () => {
    return supertest(app).get(`/${v1SeasonWithFoodUrl}`);
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
