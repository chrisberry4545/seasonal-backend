import {
  AIRTABLE_TABLES
} from '../const';

import {
  retrieveAirtableData,
  filterByIds
} from '../airtable';

import { IDbCountryToFoodNameMap } from '../interfaces';

export const getCountryToFoodNameDataMapById = (
  ids: string[] | string
): Promise<IDbCountryToFoodNameMap[]> => {
  return retrieveAirtableData<IDbCountryToFoodNameMap>({
    fields: [
      'name',
      'country',
      'food'
    ],
    filterByFormula: filterByIds(ids),
    tableName: AIRTABLE_TABLES.COUNTRY_TO_FOOD_NAME_MAP
  });
};
