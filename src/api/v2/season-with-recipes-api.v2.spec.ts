import {
  airtableMockSetup
} from '../mocks';
airtableMockSetup();

import {
  app
} from '../../app';

import supertest, { Response } from 'supertest';
import { V2_ENDPOINT, SEASON_WITH_RECIPES_ENDPOINT } from '../../config';

const v2SeasonWithRecipesUrl = `${V2_ENDPOINT}/${SEASON_WITH_RECIPES_ENDPOINT}`;

describe('Get all seasons with recipes', () => {
  let response: Response;
  beforeEach(async () => {
    response = await supertest(app).get(`/${v2SeasonWithRecipesUrl}`);
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
  test('Populates the recipes in the seasons', () => {
    expect(response.body[0].recipes).toHaveLength(1);
  });
  test('Sets the recipes in the seasons name', () => {
    expect(response.body[0].recipes[0].name).toBe('recipe 1');
  });
});

const makeSingleSeasonWithRecipesRequest = (id: string = '0') => {
  return supertest(app).get(`/${v2SeasonWithRecipesUrl}/${id}`);
};

describe('Get single season with recipes', () => {
  let response: Response;

  describe('when the season has no recipes', () => {
    beforeAll(async () => {
      response = await makeSingleSeasonWithRecipesRequest();
    });

    test('Returns a status of 200', () => {
      expect(response.status).toBe(200);
    });
    test('Retrieves a single season', () => {
      expect(response.body).toMatchSnapshot();
    });
    test('Does not populate a seasons recipes if they do not exist', () => {
      expect(response.body.recipes).toHaveLength(0);
    });
  });

  describe('when the season has recipes', () => {
    beforeAll(async () => {
      response = await makeSingleSeasonWithRecipesRequest('1');
    });

    test('Retrieves a single season with food and recipe data', () => {
      expect(response.body).toMatchSnapshot();
    });
    test('Populates a seasons recipes if they exist', () => {
      expect(response.body.recipes.length > 0).toBe(true);
    });
    test('Populates a seasons recipes isVegetarian if true', () => {
      expect(response.body.recipes[0].isVegetarian).toBe(true);
    });
    test('Populates a seasons recipes isVegan if true', () => {
      expect(response.body.recipes[1].isVegan).toBe(true);
    });
    test('Does not return any primaryFood on a recipe', () => {
      expect(response.body.recipes[0].primaryFood).toBeUndefined();
    });
    test('Does not return any secondaryFood on a recipe', () => {
      expect(response.body.recipes[0].secondaryFood).toBeUndefined();
    });
    test('Does not return any food', () => {
      expect(response.body.food).toBeUndefined();
    });
  });
});
