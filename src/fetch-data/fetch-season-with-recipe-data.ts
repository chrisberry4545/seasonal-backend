import {
  getSeasonDataBySeasonIndex,
  getAllRecipeData,
  getAllFoodData,
  hydrateSeasonDataWithRecipes,
  sortHydratedSeasonDataByRecipes,
  cleanSeasonDataWithRecipes
} from '../data-access';

import {
  Cache,
  cacheFunctionResponse
} from '../cache';

import { IHydratedSeason } from '@chrisb-dev/seasonal-shared';
import { fetchAllSeasonData } from './fetch-season-data';

const allSeasonsWithRecipesCache = new Cache<IHydratedSeason[]>();
const allSeasonsWithRecipesCacheKey = 'season-with-recipes';

const singleSeasonWithRecipeCache = new Cache<IHydratedSeason>();
const singleSeasonWithRecipeCacheKey = 'single-season-with-recipes';

export const fetchSeasonWithRecipes = cacheFunctionResponse(
  singleSeasonWithRecipeCache,
  singleSeasonWithRecipeCacheKey,
  async (seasonIndex: number): Promise<IHydratedSeason> => {
    const result = await getSeasonDataBySeasonIndex(seasonIndex);
    const hydratedResult = await hydrateSeasonDataWithRecipes(result);
    const sortedResult = sortHydratedSeasonDataByRecipes(hydratedResult);
    const cleanedResult = cleanSeasonDataWithRecipes(sortedResult);
    return cleanedResult;
  }
);

export const fetchAllSeasonsWithRecipes = cacheFunctionResponse(
  allSeasonsWithRecipesCache,
  allSeasonsWithRecipesCacheKey,
  async (): Promise<IHydratedSeason[]> => {
    const [
      allFoodData,
      allRecipeData,
      seasonData
    ] = await Promise.all([
      getAllFoodData(), getAllRecipeData(), fetchAllSeasonData()
    ]);
    const getFoodIdsInSeason = (season: IHydratedSeason) =>
      allFoodData
        .filter((food) => food.seasons && food.seasons.includes(season.id))
        .map((food) => food.id);
    const getRecipesForSeason = (season: IHydratedSeason) => {
      const foodIdsInSeason = getFoodIdsInSeason(season);
      return allRecipeData.filter((recipe) => (
        recipe.primaryFood &&
          recipe.primaryFood.every((foodId) => foodIdsInSeason.includes(foodId)))
      );
    };
    const hydratedResult: IHydratedSeason[] = seasonData.map((season) => ({
      ...season,
      recipes: getRecipesForSeason(season).map((recipe) => ({
        ...recipe,
        primaryFood: undefined,
        secondaryFood: undefined
      }))
    }));
    return hydratedResult;
  }
);
