import {
  getSeasonDataBySeasonIndex,
  hydrateSeasonData,
  sortHydratedSeasonDataByFood,
  getAllFoodData
} from '../data-access';

import {
  Cache,
  cacheFunctionResponse
} from '../cache';

import { IHydratedSeason } from '@chrisb-dev/seasonal-shared';
import { fetchAllSeasonData } from './fetch-season-data';

const allSeasonsWithFoodAndRecipesCache = new Cache<IHydratedSeason[]>();
const allSeasonsWithFoodAndRecipesCacheKey = 'season-with-food-and-recipes';

const singleSeasonWithFoodAndRecipesCache = new Cache<IHydratedSeason>();
const singleSeasonWithFoodAndRecipesCacheKey = 'single-season-with-food-and-recipes';

export const fetchSeasonWithFoodAndRecipes = cacheFunctionResponse(
  singleSeasonWithFoodAndRecipesCache,
  singleSeasonWithFoodAndRecipesCacheKey,
  async (seasonIndex: number, countryCode?: string): Promise<IHydratedSeason> => {
    const result = await getSeasonDataBySeasonIndex(seasonIndex, countryCode);
    const hydratedResult = await hydrateSeasonData(result, countryCode);
    const sortedResult = sortHydratedSeasonDataByFood(hydratedResult);
    return sortedResult;
  }
);

export const fetchAllSeasonsWithFoodAndRecipes = cacheFunctionResponse(
  allSeasonsWithFoodAndRecipesCache,
  allSeasonsWithFoodAndRecipesCacheKey,
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
