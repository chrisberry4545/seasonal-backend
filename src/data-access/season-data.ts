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

export const getAllSeasonData = (): Promise<IAirtableSeason[]> => {
  return retrieveAirtableData<IAirtableSeason>({
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
  ids: string[] | string
): Promise<IBaseSeason[]> => {
  return retrieveAirtableData<IBaseSeason>({
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
): Promise<IAirtableSeason> => {
  return retrieveSingleAirtableRow<IAirtableSeason>({
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
