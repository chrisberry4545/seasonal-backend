import {
  getAllSeasonDataWithFood,
  getSeasonsDataWithFoodBySeasonIndex
} from '../data-access';

import {
  Cache,
  cacheFunctionResponse
} from '../cache';

import { IHydratedSeason } from '@chrisb-dev/seasonal-shared';
import { DEFAULT_COUNTRY_ID } from '../config';

const allSeasonsWithFoodCache = new Cache<IHydratedSeason[]>();
const allSeasonsWithFoodCacheKey = 'season-with-food';

const singleSeasonWithFoodCache = new Cache<IHydratedSeason>();
const singleSeasonWithFoodCacheKey = 'single-season-with-foodx';

export const fetchSeasonWithFood = cacheFunctionResponse(
  singleSeasonWithFoodCache,
  singleSeasonWithFoodCacheKey,
  async (
    seasonIndex: number, countryCode: string = DEFAULT_COUNTRY_ID
  ): Promise<IHydratedSeason> => getSeasonsDataWithFoodBySeasonIndex(
    seasonIndex,
    countryCode
  )
);

export const fetchAllSeasonsWithFood = cacheFunctionResponse(
  allSeasonsWithFoodCache,
  allSeasonsWithFoodCacheKey,
  async (
    countryCode: string = DEFAULT_COUNTRY_ID
  ): Promise<IHydratedSeason[]> => getAllSeasonDataWithFood(countryCode)
);
