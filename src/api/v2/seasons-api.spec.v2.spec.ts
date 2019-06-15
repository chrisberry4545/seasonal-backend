import {
  airtableMockSetup
} from '../mocks';
airtableMockSetup();

import {
  app
} from '../../app';

import supertest from 'supertest';
import { V2_ENDPOINT, SEASON_DATA_ENDPOINT } from '../../config';

const v2SeasonUrl = `${V2_ENDPOINT}/${SEASON_DATA_ENDPOINT}`;

describe('Get all seasons', () => {
  const makeAllSeasonRequest = () => {
    return supertest(app).get(`/${v2SeasonUrl}`);
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
