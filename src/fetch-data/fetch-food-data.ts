import {
  getFoodWithIdsAndSeasonData,
  hydrateFoodData,
  sortHydratedFoodData,
  getAllFoodData
} from '../data-access';

import {
  Cache, cacheFunctionResponse
} from '../cache';

import { IHydratedFood, IFood } from '@chrisb-dev/seasonal-shared';
import { filterRecipesByDiet } from './filter-recipes-by-diet';

const allFoodCache = new Cache<IFood[]>();
const allFoodItemCacheKey = 'food';

const singleFoodCache = new Cache<IHydratedFood>();
const singleFoodCacheKey = 'single-food';

export const fetchAllFoodData = cacheFunctionResponse(
  allFoodCache,
  allFoodItemCacheKey,
  async (): Promise<IFood[]> => await getAllFoodData()
);

export const fetchFoodDataById = cacheFunctionResponse(
  singleFoodCache,
  singleFoodCacheKey,
  async (
    foodId: string,
    countryCode?: string
  ): Promise<IHydratedFood> => {
    const result = await getFoodWithIdsAndSeasonData(foodId, countryCode);
    const hydratedResult = await hydrateFoodData(result[0], countryCode);
    const sortedResult = sortHydratedFoodData(hydratedResult);
    return sortedResult;
  }
);

export const fetchFoodDataWithFilteredRecipes = async (
  foodId: string,
  isVegetarian: boolean,
  isVegan: boolean,
  countryCode?: string
): Promise<IHydratedFood> => {
  const result = await fetchFoodDataById(foodId, countryCode);
  return {
    ...result,
    primaryFoodInRecipe: filterRecipesByDiet(
      result.primaryFoodInRecipe,
      isVegetarian,
      isVegan
    ),
    secondaryFoodInRecipe: filterRecipesByDiet(
      result.secondaryFoodInRecipe,
      isVegetarian,
      isVegan
    )
  };
};
