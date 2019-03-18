import {
  AIRTABLE_TABLES
} from '../const';

import {
  filterByIds,
  retrieveAirtableData
} from '../airtable';

import { IRecipe } from '@chrisb-dev/seasonal-shared';

export const getRecipesWithIds = (
  ids: string[] | string
): Promise<IRecipe[]> => {
  return retrieveAirtableData<IRecipe>({
    fields: [
      'name',
      'linkUrl',
      'imageUrlSmall'
    ],
    filterByFormula: filterByIds(ids),
    tableName: AIRTABLE_TABLES.RECIPES
  });
};
