import {
  app
} from '../../app';

import supertest, { Response } from 'supertest';
import { V2_ENDPOINT, SEASON_ENDPOINT } from '../../config';

const v2SeasonUrl = `${V2_ENDPOINT}/${SEASON_ENDPOINT}`;

describe('Get all seasons', () => {
  let response: Response;

  beforeAll(async () => {
    response = await supertest(app).get(`/${v2SeasonUrl}`);
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
});
