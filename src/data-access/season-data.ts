import {
  AIRTABLE_TABLES
} from '../const';

import {
  filterByField,
  retrieveAirtableData,
  retrieveSingleAirtableRow,
  filterByIds
} from '../airtable';

import {
  IAirtableSeason,
  IBaseSeason
} from '@chrisb-dev/seasonal-shared';

export const getAllSeasonData = (
  countryCode?: string
): Promise<IAirtableSeason[]> => {
  return retrieveAirtableData<IAirtableSeason>({
    countryCode,
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
): Promise<IBaseSeason[]> => {
  return retrieveAirtableData<IBaseSeason>({
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
  seasonIndex: number,
  countryCode?: string
): Promise<IAirtableSeason> => {
  return retrieveSingleAirtableRow<IAirtableSeason>({
    countryCode,
    fields: [
      'name',
      'food',
      'recipes'
    ],
    filterByFormula:
      filterByField<IAirtableSeason>('seasonIndex', seasonIndex),
    tableName: AIRTABLE_TABLES.SEASONS
  });
};
