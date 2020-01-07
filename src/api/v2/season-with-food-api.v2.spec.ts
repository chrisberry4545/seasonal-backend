import {
  app
} from '../../app';

import supertest, { Response } from 'supertest';
import { V2_ENDPOINT, SEASON_WITH_FOOD_ENDPOINT } from '../../config';
import { IHydratedSeason } from '@chrisb-dev/seasonal-shared';
import {
  SEASON_ID_JANUARY,
  SEASON_ID_FEBRUARY,
  REGION_ID_SYDNEY,
  SEASON_INDEX_JANUARY,
  SEASON_INDEX_FEBRUARY,
  SEASON_INDEX_MARCH
} from './shared-test-ids';

const v2SeasonWithFoodUrl = `${V2_ENDPOINT}/${SEASON_WITH_FOOD_ENDPOINT}`;

describe('Get all seasons with food', () => {
  let response: Response;
  let seasonJanuary: IHydratedSeason | undefined;
  let seasonFebruary: IHydratedSeason | undefined;
  beforeAll(async () => {
    response = await supertest(app).get(`/${v2SeasonWithFoodUrl}`);
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
  test('Populates the food in the seasons', () => {
    expect(seasonJanuary && seasonJanuary.food).toHaveLength(2);
  });
  test('Populates the food names in the seasons', () => {
    expect(
      seasonJanuary
      && seasonJanuary.food
      && seasonJanuary.food[0].name
    ).toBe('Apple');
  });
});

describe('Get single season with food', () => {
  let response: Response;
  const makeSingleSeasonWithFoodRequest = (
    seasonIndex: string = SEASON_INDEX_JANUARY,
    countryCode?: string
  ) => {
    return supertest(app).get(`/${v2SeasonWithFoodUrl}/${seasonIndex}${
      countryCode
        ? `?country-code=${countryCode}`
        : ''
    }`);
  };

  describe('when the requested season has no food', () => {
    beforeAll(async () => {
      response = await makeSingleSeasonWithFoodRequest(
        SEASON_INDEX_MARCH
      );
    });

    test('Returns a status of 200', () => {
      expect(response.status).toBe(200);
    });
    test('Retrieves a single season', () => {
      expect(response.body).toMatchSnapshot();
    });
    test('Returns an empty array for a seasons food if there is none', () => {
      expect(response.body.food).toHaveLength(0);
    });
  });

  describe('when the requested season has food data', () => {
    beforeAll(async () => {
      response = await makeSingleSeasonWithFoodRequest(
        SEASON_INDEX_FEBRUARY, REGION_ID_SYDNEY
      );
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
