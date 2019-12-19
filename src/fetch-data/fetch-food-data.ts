import {
  getFoodDetailsData
} from '../data-access';

import {
  Cache, cacheFunctionResponse
} from '../cache';

import { IHydratedFood } from '@chrisb-dev/seasonal-shared';
import { filterRecipesByDiet } from './filter-recipes-by-diet';
import { DEFAULT_COUNTRY_ID } from '../config';

const singleFoodCache = new Cache<IHydratedFood>();
const singleFoodCacheKey = 'single-food';

export const fetchFoodDataById = cacheFunctionResponse(
  singleFoodCache,
  singleFoodCacheKey,
  (
    foodId: string,
    countryCode: string = DEFAULT_COUNTRY_ID
  ): Promise<IHydratedFood> => getFoodDetailsData(
    foodId, countryCode
  )
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
