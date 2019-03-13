import {
  AIRTABLE_TABLES
} from '../const';

import {
  filterByIds,
  retrieveAirtableData
} from '../airtable';

import { Recipe } from '../interfaces';

export const getRecipesWithIds = (
  ids: string[] | string
): Promise<Recipe[]> => {
  return retrieveAirtableData<Recipe>({
    tableName: AIRTABLE_TABLES.RECIPES,
    fields: [
      'name',
      'linkUrl',
      'imageUrlSmall'
    ],
    filterByFormula: filterByIds(ids)
  });
};
