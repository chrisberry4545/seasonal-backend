import {
  AIRTABLE_TABLES
} from '../const';

import {
  filterByIds,
  retrieveAirtableData
} from '../airtable';

import { IFood, IAirtableFood } from '@chrisb-dev/seasonal-shared';

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

export const getFoodWithIdsAndSeasonData = (
  ids: string[] | string
): Promise<IAirtableFood[]> => {
  return retrieveAirtableData<IAirtableFood>({
    fields: [
      'name',
      'imageUrlSmall',
      'seasons'
    ],
    filterByFormula: filterByIds(ids),
    tableName: AIRTABLE_TABLES.FOOD
  });
};

export const getAllFoodData = (): Promise<IAirtableFood[]> => {
  return retrieveAirtableData<IAirtableFood>({
    fields: [
      'name',
      'imageUrlSmall',
      'seasons'
    ],
    tableName: AIRTABLE_TABLES.FOOD
  });
};
