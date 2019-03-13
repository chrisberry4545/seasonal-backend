import {
  AIRTABLE_TABLES
} from '../const';

import {
  filterByField,
  hydrateAirtableData,
  retrieveAirtableData,
  retrieveSingleAirtableRow
} from '../airtable';

import {
  getFoodWithIds
} from './food-data';

import {
  getRecipesWithIds
} from './recipe-data';

import { AirtableSeason, HydratedSeason } from '../interfaces';

export const getAllSeasonData = (): Promise<AirtableSeason[]> => {
  return retrieveAirtableData<AirtableSeason>({
    tableName: AIRTABLE_TABLES.SEASONS,
    fields: [
      'name'
    ],
    sort: [{
      field: 'seasonIndex',
      direction: 'asc'
    }]
  });
};

export const getSeasonDataBySeasonIndex = (
  seasonIndex: number
): Promise<AirtableSeason> => {
  return retrieveSingleAirtableRow<AirtableSeason>({
    tableName: AIRTABLE_TABLES.SEASONS,
    fields: [
      'name',
      'food',
      'recipes'
    ],
    filterByFormula:
      filterByField<AirtableSeason>('seasonIndex', seasonIndex)
  });
};

export const hydrateSeasonData = (
  seasonData: AirtableSeason
): Promise<HydratedSeason> => {
  return hydrateAirtableData(
    seasonData,
    [{
      getIdFunction: getRecipesWithIds,
      propertyName: 'recipes'
    }, {
      getIdFunction: getFoodWithIds,
      propertyName: 'food'
    }]
  ) as Promise<HydratedSeason>;
};

export const sortByName = <ItemWithName extends { name: string }>(
  a: ItemWithName,
  b: ItemWithName
): number => (
  a.name > b.name ? 1 : -1
);

export const sortSeasonData = (
  seasonData: HydratedSeason
): HydratedSeason => ({
  ...seasonData,
  food: seasonData.food && seasonData.food.sort(sortByName)
});
