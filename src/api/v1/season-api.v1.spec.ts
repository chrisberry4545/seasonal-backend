import {
  airtableMockSetup
} from '../mocks';
airtableMockSetup();

import {
  app
} from '../../app';

import supertest, { Response } from 'supertest';
import { V1_ENDPOINT, SEASON_DATA_ENDPOINT } from '../../config';

const v1SeasonUrl = `${V1_ENDPOINT}/${SEASON_DATA_ENDPOINT}`;

describe('Get all seasons', () => {
  let response: Response;
  beforeAll(async () => {
    response = await supertest(app).get(`/${v1SeasonUrl}`);
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

describe('Get single season', () => {
  let response: Response;
  const makeSingleSeasonRequest = (id: string = '0') => {
    return supertest(app).get(`/${v1SeasonUrl}/${id}`);
  };
  describe('when a season has no recipes', () => {
    beforeAll(async () => {
      response = await makeSingleSeasonRequest();
    });

    test('Returns a status of 200', () => {
      expect(response.status).toBe(200);
    });
    test('Retrieves a single season', () => {
      expect(response.body).toMatchSnapshot();
    });
    test('Does not populate a seasons recipes', () => {
      expect(response.body.recipes).toBeUndefined();
    });
    test('Does not populate a seasons food if they do not exist', () => {
      expect(response.body.food).toBeUndefined();
    });
  });

  describe('when a season has recipes', () => {
    beforeAll(async () => {
      response = await makeSingleSeasonRequest('1');
    });

    test('Retrieves a single season with food and recipe data', () => {
      expect(response.body).toMatchSnapshot();
    });
    test('Populates a seasons recipes if they exist', () => {
      expect(response.body.recipes.length > 0).toBe(true);
    });
    test('Populates a seasons recipes isVegan if true', () => {
      expect(response.body.recipes[0].isVegan).toBe(true);
    });
    test('Populates a seasons recipes isVegetarian if true', () => {
      expect(response.body.recipes[1].isVegetarian).toBe(true);
    });
    test('Populates a seasons food if they exist', () => {
      expect(response.body.food.length > 0).toBe(true);
    });
  });
});
