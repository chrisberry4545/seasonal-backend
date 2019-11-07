import {
  AIRTABLE_TABLES
} from '../const';

import {
  filterByIds,
  retrieveSingleAirtableRow,
  retrieveAirtableData
} from '../airtable';

import { IDbCountry } from '../interfaces';

const countryFields: Array<keyof IDbCountry> = [
  'name',
  'regions',
  'countryToFoodNameMap'
];

export const getCountryById = (
  id: string
): Promise<IDbCountry> => {
  return retrieveSingleAirtableRow<IDbCountry>({
    fields: countryFields,
    filterByFormula: filterByIds(id),
    tableName: AIRTABLE_TABLES.COUNTRIES
  });
};

export const getAllCountries = (): Promise<IDbCountry[]> => {
  return retrieveAirtableData<IDbCountry>({
    fields: countryFields,
    tableName: AIRTABLE_TABLES.COUNTRIES
  });
};
