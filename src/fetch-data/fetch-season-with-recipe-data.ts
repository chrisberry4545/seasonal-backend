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

const allSeasonsWithRecipesCache = new Cache<IHydratedSeason[]>();
const allSeasonsWithRecipesCacheKey = 'season-with-recipes';

const singleSeasonWithRecipeCache = new Cache<IHydratedSeason>();
const singleSeasonWithRecipeCacheKey = 'single-season-with-recipes';

export const fetchFilteredSeasonsWithRecipes = async (
  seasonIndex: number,
  isVegetarian: boolean,
  isVegan: boolean
): Promise<IHydratedSeason> => {
  const result = await fetchSeasonWithRecipes(seasonIndex);
  return {
    ...result,
    recipes: result.recipes && result.recipes.filter((recipe) => {
      return isVegan ? recipe.isVegan
        : isVegetarian ? recipe.isVegetarian || recipe.isVegan
          : true;
    })
  };
};

export const fetchSeasonWithRecipes = cacheFunctionResponse(
  singleSeasonWithRecipeCache,
  singleSeasonWithRecipeCacheKey,
  async (seasonIndex: number): Promise<IHydratedSeason> => {
    const [
      season,
      recipes
    ] = await Promise.all([getSeasonDataBySeasonIndex(seasonIndex), getAllRecipeData()]);
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
  async (): Promise<IHydratedSeason[]> => {
    const [
      allFoodData,
      allRecipeData,
      allSeasonData
    ] = await Promise.all([
      getAllFoodData(), getAllRecipeData(), fetchAllSeasonData()
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
