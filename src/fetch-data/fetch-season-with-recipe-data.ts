import {
  getSeasonDataBySeasonIndex,
  getAllRecipeData,
  getAllFoodData,
  sortHydratedSeasonDataByRecipes,
  cleanSeasonDataWithRecipes
} from '../data-access';

import {
  Cache,
  cacheFunctionResponse
} from '../cache';

import { IHydratedSeason, IAirtableRecipe, IAirtableSeason, IBaseSeason } from '@chrisb-dev/seasonal-shared';
import { fetchAllSeasonData } from './fetch-season-data';
import { filterRecipesByDiet } from './filter-recipes-by-diet';

const allSeasonsWithRecipesCache = new Cache<IHydratedSeason[]>();
const allSeasonsWithRecipesCacheKey = 'season-with-recipes';

const singleSeasonWithRecipeCache = new Cache<IHydratedSeason>();
const singleSeasonWithRecipeCacheKey = 'single-season-with-recipes';

export const fetchSeasonWithRecipes = cacheFunctionResponse(
  singleSeasonWithRecipeCache,
  singleSeasonWithRecipeCacheKey,
  async (seasonIndex: number, countryCode?: string): Promise<IHydratedSeason> => {
    const [
      season,
      recipes
    ] = await Promise.all([
      getSeasonDataBySeasonIndex(seasonIndex, countryCode),
      getAllRecipeData(countryCode)
    ]);
    const getRecipesForSeason = (
      baseSeason: IAirtableSeason,
      allRecipeData: IAirtableRecipe[]
    ) => allRecipeData.filter((recipe) => (
        recipe.primaryFood &&
          recipe.primaryFood.every((foodId) => baseSeason.food && baseSeason.food.includes(foodId)))
      );
    const result: IHydratedSeason = {
      ...season,
      food: undefined,
      recipes: getRecipesForSeason(season, recipes)
    };
    const sortedResult = sortHydratedSeasonDataByRecipes(result);
    const cleanedResult = cleanSeasonDataWithRecipes(sortedResult);
    return cleanedResult;
  }
);

export const fetchAllSeasonsWithRecipes = cacheFunctionResponse(
  allSeasonsWithRecipesCache,
  allSeasonsWithRecipesCacheKey,
  async (countryCode?: string): Promise<IHydratedSeason[]> => {
    const [
      allFoodData,
      allRecipeData,
      allSeasonData
    ] = await Promise.all([
      getAllFoodData(countryCode),
      getAllRecipeData(countryCode),
      fetchAllSeasonData(countryCode)
    ]);
    const getFoodIdsInSeason = (season: IBaseSeason) =>
      allFoodData
        .filter((food) => food.seasons && food.seasons.includes(season.id))
        .map((food) => food.id);
    const getRecipesForSeason = (season: IBaseSeason) => {
      const foodIdsInSeason = getFoodIdsInSeason(season);
      return allRecipeData.filter((recipe) => (
        recipe.primaryFood &&
          recipe.primaryFood.every((foodId) => foodIdsInSeason.includes(foodId)))
      );
    };
    const hydratedResult: IHydratedSeason[] = allSeasonData.map((season) => ({
      ...season,
      recipes: getRecipesForSeason(season)
    })).map(cleanSeasonDataWithRecipes);
    return hydratedResult;
  }
);

export const fetchFilteredSeasonsWithRecipes = async (
  seasonIndex: number,
  isVegetarian: boolean,
  isVegan: boolean,
  countryCode?: string
): Promise<IHydratedSeason> => {
  const result = await fetchSeasonWithRecipes(seasonIndex, countryCode);
  return {
    ...result,
    recipes: filterRecipesByDiet(result.recipes, isVegetarian, isVegan)
  };
};
