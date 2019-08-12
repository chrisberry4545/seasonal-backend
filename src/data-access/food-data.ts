import {
  AIRTABLE_TABLES
} from '../const';

import {
  filterByIds,
  retrieveAirtableData
} from '../airtable';

import { IFood, IAirtableFood } from '@chrisb-dev/seasonal-shared';

export const getFoodWithIds = (
  ids: string[] | string,
  countryCode?: string
): Promise<IFood[]> => {
  return retrieveAirtableData<IFood>({
    countryCode,
    fields: [
      'name',
      'imageUrlSmall'
    ],
    filterByFormula: filterByIds(ids),
    tableName: AIRTABLE_TABLES.FOOD
  });
};

export const getFoodWithIdsAndSeasonData = (
  ids: string[] | string,
  countryCode?: string
): Promise<IAirtableFood[]> => {
  return retrieveAirtableData<IAirtableFood>({
    countryCode,
    fields: [
      'name',
      'imageUrlSmall',
      'seasons',
      'primaryFoodInRecipe',
      'secondaryFoodInRecipe'
    ],
    filterByFormula: filterByIds(ids),
    tableName: AIRTABLE_TABLES.FOOD
  });
};

export const getAllFoodData = (
  countryCode?: string
): Promise<IAirtableFood[]> => {
  return retrieveAirtableData<IAirtableFood>({
    countryCode,
    fields: [
      'name',
      'imageUrlSmall',
      'seasons'
    ],
    tableName: AIRTABLE_TABLES.FOOD
  });
};
