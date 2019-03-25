import {
  hydrateAirtableData
} from '../airtable';

import {
  getFoodWithIds
} from './food-data';

import {
  getRecipesWithIds
} from './recipe-data';

import { IAirtableSeason, IHydratedSeason } from '@chrisb-dev/seasonal-shared';
import { sortByName } from './data-access-utils';

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

export const sortHydratedSeasonData = (
  seasonData: IHydratedSeason
): IHydratedSeason => ({
  ...seasonData,
  food: seasonData.food && seasonData.food.sort(sortByName)
});
