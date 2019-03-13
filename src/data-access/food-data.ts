import {
  AIRTABLE_TABLES
} from '../const';

import {
  filterByIds,
  retrieveAirtableData
} from '../airtable';

import { Food } from '../interfaces';

export const getFoodWithIds = (ids: string[] | string): Promise<Food[]> => {
  return retrieveAirtableData<Food>({
    tableName: AIRTABLE_TABLES.FOOD,
    fields: [
      'name',
      'imageUrlSmall'
    ],
    filterByFormula: filterByIds(ids)
  });
};
