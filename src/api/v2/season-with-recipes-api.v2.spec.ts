import {
  app
} from '../../app';

import supertest, { Response } from 'supertest';
import { V2_ENDPOINT, SEASON_WITH_RECIPES_ENDPOINT } from '../../config';
import {
  SEASON_ID_JANUARY,
  SEASON_ID_FEBRUARY,
  SEASON_INDEX_JANUARY,
  SEASON_INDEX_FEBRUARY,
  SEASON_INDEX_MARCH
} from './shared-test-ids';
import { IHydratedSeason } from '@chrisb-dev/seasonal-shared';

const v2SeasonWithRecipesUrl = `${V2_ENDPOINT}/${SEASON_WITH_RECIPES_ENDPOINT}`;

describe('Get all seasons with recipes', () => {
  let response: Response;
  let seasonJanuary: IHydratedSeason | undefined;
  let seasonFebruary: IHydratedSeason | undefined;
  beforeEach(async () => {
    response = await supertest(app).get(`/${v2SeasonWithRecipesUrl}`);
    const seasonData: IHydratedSeason[] = response.body;
    seasonJanuary = seasonData.find((season) => season.id === SEASON_ID_JANUARY);
    seasonFebruary = seasonData.find((season) => season.id === SEASON_ID_FEBRUARY);
  });

  test('Returns a status of 200', () => {
    expect(response.status).toBe(200);
  });
  test('Returns a full list of season data', () => {
    expect(response.body).toMatchSnapshot();
  });
  test('Returns the name of the first season', () => {
    expect(seasonJanuary && seasonJanuary.name).toBe('January');
  });
  test('Returns the name of the second season', () => {
    expect(seasonFebruary && seasonFebruary.name).toBe('February');
  });
  test('Populates the recipes in the seasons', () => {
    expect(seasonJanuary && seasonJanuary.recipes).toHaveLength(3);
  });
  test('Sets the recipes in the seasons name', () => {
    expect(
      seasonJanuary
      && seasonJanuary.recipes
      && seasonJanuary.recipes[0].name
    ).toBe('Apple, Beetroot & Meat');
  });
});

const makeSingleSeasonWithRecipesRequest = (
  seasonIndex: string = SEASON_INDEX_JANUARY,
  isVegetarian?: boolean,
  isVegan?: boolean
) => {
  const query = [
    isVegetarian && 'is-vegetarian=true',
    isVegan && 'is-vegan=true'
  ].filter(Boolean).join('&');
  const queryString = query ? `?${query}` : '';
  return supertest(app).get(`/${v2SeasonWithRecipesUrl}/${seasonIndex}${queryString}`);
};

describe('Get single season with recipes', () => {
  let response: Response;

  describe('when the season has no recipes', () => {
    beforeAll(async () => {
      response = await makeSingleSeasonWithRecipesRequest(SEASON_INDEX_MARCH);
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
      response = await makeSingleSeasonWithRecipesRequest(SEASON_INDEX_JANUARY);
    });

    test('Retrieves a single season with food and recipe data', () => {
      expect(response.body).toMatchSnapshot();
    });
    test('Populates a seasons recipes if they exist', () => {
      expect(response.body.recipes.length > 0).toBe(true);
    });
    test('Returns a seasons recipes isVegetarian if true', () => {
      expect(response.body.recipes[1].isVegetarian).toBe(true);
    });
    test('Returns a seasons recipes isVegan if true', () => {
      expect(response.body.recipes[2].isVegan).toBe(true);
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

  describe('when an isVegetarian filter is applied', () => {
    beforeAll(async () => {
      response = await makeSingleSeasonWithRecipesRequest(
        SEASON_INDEX_JANUARY, true
      );
    });
    test('Retrieves the expected data', () => {
      expect(response.body).toMatchSnapshot();
    });
    test('Filters out non vegatarian recipes', () => {
      expect(response.body.recipes).toHaveLength(2);
    });
    test('Returns vegetarian recipes', () => {
      expect(response.body.recipes[0].isVegetarian).toBe(true);
    });
    test('Returns vegan recipes', () => {
      expect(response.body.recipes[1].isVegan).toBe(true);
    });
  });

  describe('when an isVegan filter is applied', () => {
    beforeAll(async () => {
      response = await makeSingleSeasonWithRecipesRequest(
        SEASON_INDEX_FEBRUARY, false, true
      );
    });
    test('Retrieves the expected data', () => {
      expect(response.body).toMatchSnapshot();
    });
    test('Filters out non vegan recipes', () => {
      expect(response.body.recipes).toHaveLength(1);
    });
    test('Returns only the vegan recipes', () => {
      expect(response.body.recipes[0].isVegan).toBe(true);
    });
  });

  describe('when both isVegan and isVegetarian filter is applied', () => {
    beforeAll(async () => {
      response = await makeSingleSeasonWithRecipesRequest(
        SEASON_INDEX_FEBRUARY, true, true
      );
    });
    test('Retrieves the expected data', () => {
      expect(response.body).toMatchSnapshot();
    });
    test('Filters out non vegan recipes', () => {
      expect(response.body.recipes).toHaveLength(1);
    });
    test('Returns only the vegan recipes', () => {
      expect(response.body.recipes[0].isVegan).toBe(true);
    });
  });
});
