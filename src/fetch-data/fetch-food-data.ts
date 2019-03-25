import {
  getFoodWithIdsAndSeasonData,
  hydrateFoodData,
  sortHydratedFoodData
} from '../data-access';

import {
  Cache
} from '../cache';

import { IHydratedFood } from '@chrisb-dev/seasonal-shared';

const singleFoodCache = new Cache<IHydratedFood>();
const singleFoodItemCacheKey = 'single-food';

export const fetchFoodDataById = async (
  foodId: string
): Promise<IHydratedFood> => {
  const cacheKey = `${singleFoodItemCacheKey}:${foodId}`;
  const cachedFoodData = singleFoodCache.get(cacheKey);
  if (cachedFoodData) {
    return cachedFoodData;
  }
  const result = await getFoodWithIdsAndSeasonData(foodId);
  const hydratedResult = await hydrateFoodData(result[0]);
  const sortedResult = sortHydratedFoodData(hydratedResult);
  singleFoodCache.set(cacheKey, sortedResult);
  return sortedResult;
};
