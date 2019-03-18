import {
  AIRTABLE_TABLES
} from '../const';

import {
  filterByIds,
  retrieveAirtableData
} from '../airtable';

import { IFood } from '@chrisb-dev/seasonal-shared';

export const getFoodWithIds = (ids: string[] | string): Promise<IFood[]> => {
  return retrieveAirtableData<IFood>({
    fields: [
      'name',
      'imageUrlSmall'
    ],
    filterByFormula: filterByIds(ids),
    tableName: AIRTABLE_TABLES.FOOD
  });
};
