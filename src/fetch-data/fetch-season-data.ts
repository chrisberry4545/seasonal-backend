import {
  getAllSeasonData,
  getSeasonDataBySeasonIndex,
  hydrateSeasonData,
  sortHydratedSeasonData,
  getAllFoodData
} from '../data-access';

import {
  Cache,
  cacheFunctionResponse
} from '../cache';

import { IBaseSeason, IHydratedSeason } from '@chrisb-dev/seasonal-shared';

const allSeasonDataCache = new Cache<IBaseSeason[]>();
const allSeasonDataCacheKey = 'seasons';

const allSeasonsWithFoodCache = new Cache<IHydratedSeason[]>();
const allSeasonsWithFoodCacheKey = 'season-with-food';

const singleSeasonCache = new Cache<IHydratedSeason>();
const singleSeasonCacheKey = 'single-season';

export const fetchAllSeasonData = cacheFunctionResponse(
  allSeasonDataCache,
  allSeasonDataCacheKey,
  async (): Promise<IBaseSeason[]> => {
    const results = await getAllSeasonData();
    return results;
  }
);

export const fetchAllSeasonsWithFood = cacheFunctionResponse(
  allSeasonsWithFoodCache,
  allSeasonsWithFoodCacheKey,
  async (): Promise<IHydratedSeason[]> => {
    const allFoodData = await getAllFoodData();
    const seasonData = await fetchAllSeasonData();
    const hydratedResult: IHydratedSeason[] = seasonData.map((season) => ({
      ...season,
      food: allFoodData.filter(({ seasons }) => (
        seasons && seasons.includes(season.id)
      )).map((food) => ({
        ...food,
        seasons: undefined
      }))
    }));
    return hydratedResult;
  }
);

export const fetchSeasonDataBySeasonIndex = cacheFunctionResponse(
  singleSeasonCache,
  singleSeasonCacheKey,
  async (seasonIndex: number): Promise<IHydratedSeason> => {
    const result = await getSeasonDataBySeasonIndex(seasonIndex);
    const hydratedResult = await hydrateSeasonData(result);
    const sortedResult = sortHydratedSeasonData(hydratedResult);
    return sortedResult;
  }
);
