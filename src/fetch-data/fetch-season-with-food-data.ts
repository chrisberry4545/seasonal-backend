import {
  getAllSeasonDataWithFood,
  getSeasonsDataWithFoodBySeasonIndex
} from '../data-access';

import {
  Cache,
  cacheFunctionResponse
} from '../cache';

import { IHydratedSeason } from '@chrisb-dev/seasonal-shared';

const allSeasonsWithFoodCache = new Cache<IHydratedSeason[]>();
const allSeasonsWithFoodCacheKey = 'season-with-food';

const singleSeasonWithFoodCache = new Cache<IHydratedSeason>();
const singleSeasonWithFoodCacheKey = 'single-season-with-foodx';

export const fetchSeasonWithFood = cacheFunctionResponse(
  singleSeasonWithFoodCache,
  singleSeasonWithFoodCacheKey,
  async (
    seasonIndex: number, countryCode?: string
  ): Promise<IHydratedSeason> => getSeasonsDataWithFoodBySeasonIndex(
    seasonIndex,
    countryCode
  )
);

export const fetchAllSeasonsWithFood = cacheFunctionResponse(
  allSeasonsWithFoodCache,
  allSeasonsWithFoodCacheKey,
  async (
    countryCode?: string
  ): Promise<IHydratedSeason[]> => getAllSeasonDataWithFood(countryCode)
);
