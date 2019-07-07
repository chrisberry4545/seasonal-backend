import {
  airtableMockSetup
} from '../mocks';
airtableMockSetup();

import {
  app
} from '../../app';

import supertest from 'supertest';
import { V2_ENDPOINT, SEASON_WITH_RECIPES_ENDPOINT } from '../../config';

const v2SeasonWithRecipesUrl = `${V2_ENDPOINT}/${SEASON_WITH_RECIPES_ENDPOINT}`;

describe('Get all seasons with recipes', () => {
  const makeAllSeasonWithRecipesRequest = () => {
    return supertest(app).get(`/${v2SeasonWithRecipesUrl}`);
  };

  test('Returns a status of 200', async () => {
    const result = await makeAllSeasonWithRecipesRequest();
    expect(result.status).toBe(200);
  });

  test('Returns a full list of season data', async () => {
    const result = await makeAllSeasonWithRecipesRequest();
    expect(result.body).toMatchSnapshot();
  });

  test('Returns the name of the seasons', async () => {
    const result = await makeAllSeasonWithRecipesRequest();
    expect(result.body[0].name).toBe('January');
    expect(result.body[1].name).toBe('February');
  });

  test('Populates the recipes in the seasons', async () => {
    const result = await makeAllSeasonWithRecipesRequest();
    expect(result.body[0].recipes).toHaveLength(1);
    expect(result.body[0].recipes[0].name).toBe('recipe 1');
  });
});

describe('Get single season with recipes', () => {
  const makeSingleSeasonWithRecipesRequest = (id: string = '0') => {
    return supertest(app).get(`/${v2SeasonWithRecipesUrl}/${id}`);
  };

  const makeSeasonRequestWithRecipes = () => {
    return makeSingleSeasonWithRecipesRequest('1');
  };

  test('Returns a status of 200', async () => {
    const result = await makeSingleSeasonWithRecipesRequest();
    expect(result.status).toBe(200);
  });

  test('Retrieves a single season', async () => {
    const result = await makeSingleSeasonWithRecipesRequest();
    expect(result.body).toMatchSnapshot();
  });

  test('Retrieves a single season with food and recipe data', async () => {
    const result = await makeSeasonRequestWithRecipes();
    expect(result.body).toMatchSnapshot();
  });

  test('Does not populate a seasons recipes if they do not exist', async () => {
    const result = await makeSingleSeasonWithRecipesRequest();
    expect(result.body.recipes).toHaveLength(0);
  });

  test('Populates a seasons recipes if they exist', async () => {
    const result = await makeSeasonRequestWithRecipes();
    expect(result.body.recipes.length > 0).toBe(true);
  });

  test('Populates a seasons recipes isVegetarian if true', async () => {
    const result = await makeSeasonRequestWithRecipes();
    expect(result.body.recipes[0].isVegetarian).toBe(true);
  });

  test('Populates a seasons recipes isVegan if true', async () => {
    const result = await makeSeasonRequestWithRecipes();
    expect(result.body.recipes[1].isVegan).toBe(true);
  });

  test('Does not return any primaryFood on a recipe', async () => {
    const result = await makeSeasonRequestWithRecipes();
    expect(result.body.recipes[0].primaryFood).toBeUndefined();
  });

  test('Does not return any secondaryFood on a recipe', async () => {
    const result = await makeSeasonRequestWithRecipes();
    expect(result.body.recipes[0].secondaryFood).toBeUndefined();
  });

  test('Does not return any food', async () => {
    const result = await makeSeasonRequestWithRecipes();
    expect(result.body.food).toBeUndefined();
  });
});
