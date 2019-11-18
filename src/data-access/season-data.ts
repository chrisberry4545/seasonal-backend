import {
  AIRTABLE_TABLES
} from '../const';

import {
  filterByField,
  retrieveAirtableData,
  retrieveSingleAirtableRow,
  filterByIds
} from '../airtable';

import { IDbSeason } from '../interfaces';

export const getAllSeasonData = (): Promise<IDbSeason[]> => {
  return retrieveAirtableData<IDbSeason>({
    fields: [
      'name'
    ],
    sort: [{
      direction: 'asc',
      field: 'seasonIndex'
    }],
    tableName: AIRTABLE_TABLES.SEASONS
  });
};

export const getSeasonDataWithIds = (
  ids: string[] | string,
  countryCode?: string
): Promise<IDbSeason[]> => {
  return retrieveAirtableData<IDbSeason>({
    countryCode,
    fields: [
      'name',
      'seasonIndex'
    ],
    filterByFormula: filterByIds(ids),
    tableName: AIRTABLE_TABLES.SEASONS
  });
};

export const getSeasonDataBySeasonIndex = (
  seasonIndex: number
): Promise<IDbSeason> => {
  return retrieveSingleAirtableRow<IDbSeason>({
    fields: [
      'name',
      'regionToSeasonAndFoodMap'
    ],
    filterByFormula:
      filterByField<IDbSeason>('seasonIndex', seasonIndex),
    tableName: AIRTABLE_TABLES.SEASONS
  });
};
