import {
  AIRTABLE_TABLES
} from '../const';

import {
  filterByIds,
  retrieveAirtableData
} from '../airtable';

import { IRecipe, IAirtableRecipe } from '@chrisb-dev/seasonal-shared';

const recipeFields: Array<keyof IAirtableRecipe> = [
  'name',
  'linkUrl',
  'imageUrlSmall',
  'isVegan',
  'isVegetarian',
  'primaryFood',
  'secondaryFood'
];

export const getRecipesWithIds = (
  ids: string[] | string,
  countryCode?: string
): Promise<IRecipe[]> => {
  return retrieveAirtableData<IAirtableRecipe>({
    countryCode,
    fields: recipeFields,
    filterByFormula: filterByIds(ids),
    tableName: AIRTABLE_TABLES.RECIPES
  });
};

export const getAllRecipeData = (
  countryCode?: string
): Promise<IAirtableRecipe[]> => {
  return retrieveAirtableData<IAirtableRecipe>({
    countryCode,
    fields: recipeFields,
    tableName: AIRTABLE_TABLES.RECIPES
  });
};
