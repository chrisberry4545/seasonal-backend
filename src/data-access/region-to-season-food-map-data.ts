import {
  AIRTABLE_TABLES
} from '../const';

import {
  retrieveAirtableData,
  filterByIds
} from '../airtable';

import { IDbRegionToSeasonAndFoodMap } from '../interfaces';

export const getRegionToSeasonAndFoodMapDataByIds = (
  ids: string[] | string
): Promise<IDbRegionToSeasonAndFoodMap[]> => {
  return retrieveAirtableData<IDbRegionToSeasonAndFoodMap>({
    fields: [
      'region',
      'food',
      'season'
    ],
    filterByFormula: filterByIds(ids),
    tableName: AIRTABLE_TABLES.REGION_TO_SEASON_AND_FOOD_MAP
  });
};
