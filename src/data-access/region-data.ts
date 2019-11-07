import {
  AIRTABLE_TABLES
} from '../const';

import {
  filterByField,
  retrieveSingleAirtableRow,
  retrieveAirtableData
} from '../airtable';

import { IDbRegion } from '../interfaces';

const regionFields: Array<keyof IDbRegion> = [
  'name',
  'code',
  'country',
  'regionToSeasonAndFoodMap',
  'lat',
  'lng'
];

export const getRegionByCode = (
  countryCode: string | undefined
): Promise<IDbRegion> => {
  return retrieveSingleAirtableRow<IDbRegion>({
    fields: regionFields,
    filterByFormula:
      filterByField<IDbRegion>('code', countryCode || 'gbr'),
    tableName: AIRTABLE_TABLES.REGIONS
  });
};

export const getAllRegions = (): Promise<IDbRegion[]> => {
  return retrieveAirtableData<IDbRegion>({
    fields: regionFields,
    tableName: AIRTABLE_TABLES.REGIONS
  });
};
