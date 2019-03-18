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

import { IAirtableSeason, IHydratedSeason } from '@chrisb-dev/seasonal-shared';

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

export const hydrateSeasonData = (
  seasonData: IAirtableSeason
): Promise<IHydratedSeason> => {
  return hydrateAirtableData(
    seasonData,
    [{
      getIdFunction: getRecipesWithIds,
      propertyName: 'recipes'
    }, {
      getIdFunction: getFoodWithIds,
      propertyName: 'food'
    }]
  ) as Promise<IHydratedSeason>;
};

export const sortByName = <ItemWithName extends { name: string }>(
  a: ItemWithName,
  b: ItemWithName
): number => (
  a.name > b.name ? 1 : -1
);

export const sortSeasonData = (
  seasonData: IHydratedSeason
): IHydratedSeason => ({
  ...seasonData,
  food: seasonData.food && seasonData.food.sort(sortByName)
});
