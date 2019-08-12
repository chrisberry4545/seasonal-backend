import {
  getSeasonDataBySeasonIndex,
  sortHydratedSeasonDataByFood,
  getAllFoodData,
  hydrateSeasonDataWithFood,
  cleanSeasonDataWithFood
} from '../data-access';

import {
  Cache,
  cacheFunctionResponse
} from '../cache';

import { IHydratedSeason } from '@chrisb-dev/seasonal-shared';
import { fetchAllSeasonData } from './fetch-season-data';

const allSeasonsWithFoodCache = new Cache<IHydratedSeason[]>();
const allSeasonsWithFoodCacheKey = 'season-with-food';

const singleSeasonWithFoodCache = new Cache<IHydratedSeason>();
const singleSeasonWithFoodCacheKey = 'single-season-with-foodx';

export const fetchSeasonWithFood = cacheFunctionResponse(
  singleSeasonWithFoodCache,
  singleSeasonWithFoodCacheKey,
  async (
    seasonIndex: number, countryCode?: string
  ): Promise<IHydratedSeason> => {
    const result = await getSeasonDataBySeasonIndex(seasonIndex, countryCode);
    const hydratedResult = await hydrateSeasonDataWithFood(result, countryCode);
    const sortedResult = sortHydratedSeasonDataByFood(hydratedResult);
    const cleanedResult = cleanSeasonDataWithFood(sortedResult);
    return cleanedResult;
  }
);

export const fetchAllSeasonsWithFood = cacheFunctionResponse(
  allSeasonsWithFoodCache,
  allSeasonsWithFoodCacheKey,
  async (countryCode?: string): Promise<IHydratedSeason[]> => {
    const [allFoodData, allSeasonData] = await Promise.all([
      getAllFoodData(countryCode), fetchAllSeasonData(countryCode)
    ]);
    const hydratedResult: IHydratedSeason[] = allSeasonData.map((season) => ({
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
