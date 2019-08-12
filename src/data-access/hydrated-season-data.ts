import {
  hydrateAirtableData
} from '../airtable';

import {
  getFoodWithIds
} from './food-data';

import {
  getRecipesWithIds
} from './recipe-data';

import { IAirtableSeason, IHydratedSeason, IAirtableRecipe } from '@chrisb-dev/seasonal-shared';
import { sortByName } from './data-access-utils';

export const hydrateSeasonDataWithFood = (
  seasonData: IAirtableSeason,
  countryCode?: string
): Promise<IHydratedSeason> => {
  return hydrateAirtableData(
    seasonData,
    [{
      getIdFunction: getFoodWithIds,
      propertyName: 'food'
    }],
    countryCode
  ) as Promise<IHydratedSeason>;
};

export const hydrateSeasonDataWithRecipes = (
  seasonData: IAirtableSeason,
  countryCode?: string
): Promise<IHydratedSeason> => {
  return hydrateAirtableData(
    seasonData,
    [{
      getIdFunction: getRecipesWithIds,
      propertyName: 'recipes'
    }],
    countryCode
  ) as Promise<IHydratedSeason>;
};

export const hydrateSeasonData = (
  seasonData: IAirtableSeason,
  countryCode?: string
): Promise<IHydratedSeason> => {
  return hydrateAirtableData(
    seasonData,
    [{
      getIdFunction: getRecipesWithIds,
      propertyName: 'recipes'
    }, {
      getIdFunction: getFoodWithIds,
      propertyName: 'food'
    }],
    countryCode
  ) as Promise<IHydratedSeason>;
};

export const sortHydratedSeasonDataByFood = (
  seasonData: IHydratedSeason
): IHydratedSeason => ({
  ...seasonData,
  food: seasonData.food && seasonData.food.sort(sortByName)
});

export const sortHydratedSeasonDataByRecipes = (
  seasonData: IHydratedSeason
): IHydratedSeason => ({
  ...seasonData,
  recipes: seasonData.recipes && seasonData.recipes.sort(sortByName)
});

export const cleanSeasonDataWithFood = (
  seasonData: IHydratedSeason
): IHydratedSeason => ({
  ...seasonData,
  recipes: undefined
});

export const cleanSeasonDataWithRecipes = (
  seasonData: IHydratedSeason
): IHydratedSeason => ({
  ...seasonData,
  food: undefined,
  recipes: seasonData.recipes && seasonData.recipes.map((recipe: IAirtableRecipe) => ({
    ...recipe,
    primaryFood: undefined,
    secondaryFood: undefined
  }))
});
