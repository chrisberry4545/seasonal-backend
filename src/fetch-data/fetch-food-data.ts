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
    foodId: string
  ): Promise<IHydratedFood> => {
    const result = await getFoodWithIdsAndSeasonData(foodId);
    const hydratedResult = await hydrateFoodData(result[0]);
    const sortedResult = sortHydratedFoodData(hydratedResult);
    return sortedResult;
  }
);
