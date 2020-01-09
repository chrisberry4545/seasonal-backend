import {
  getSeasonsDataWithRecipesBySeasonIndex,
  getAllSeasonDataWithRecipes
} from '../data-access';

import {
  Cache,
  cacheFunctionResponse
} from '../cache';

import { IHydratedSeason } from '@chrisb-dev/seasonal-shared';
import { filterRecipesByDiet } from './filter-recipes-by-diet';
import { DEFAULT_COUNTRY_ID } from '../config';

const allSeasonsWithRecipesCache = new Cache<IHydratedSeason[]>();
const allSeasonsWithRecipesCacheKey = 'season-with-recipes';

const singleSeasonWithRecipeCache = new Cache<IHydratedSeason>();
const singleSeasonWithRecipeCacheKey = 'single-season-with-recipes';

export const fetchSeasonWithRecipes = cacheFunctionResponse(
  singleSeasonWithRecipeCache,
  singleSeasonWithRecipeCacheKey,
  async (
    seasonIndex: number, countryCode: string = DEFAULT_COUNTRY_ID
  ): Promise<IHydratedSeason> =>
    getSeasonsDataWithRecipesBySeasonIndex(seasonIndex, countryCode)
);

export const fetchAllSeasonsWithRecipes = cacheFunctionResponse(
  allSeasonsWithRecipesCache,
  allSeasonsWithRecipesCacheKey,
  async (
    countryCode: string = DEFAULT_COUNTRY_ID
  ): Promise<IHydratedSeason[]> =>
    getAllSeasonDataWithRecipes(countryCode)
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
