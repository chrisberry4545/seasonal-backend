import { IAirtableFood, IHydratedFood } from '@chrisb-dev/seasonal-shared';
import { hydrateAirtableData } from '../airtable';
import { getSeasonDataWithIds } from './season-data';
import { sortBySeasonIndex } from './data-access-utils';

export const hydrateFoodData = (
  foodData: IAirtableFood
): Promise<IHydratedFood> => {
  return hydrateAirtableData(
    foodData,
    [{
      getIdFunction: getSeasonDataWithIds,
      propertyName: 'seasons'
    }]
  ) as Promise<IHydratedFood>;
};

export const sortHydratedFoodData = (
  foodData: IHydratedFood
): IHydratedFood => ({
  ...foodData,
  seasons: foodData.seasons && foodData.seasons.sort(sortBySeasonIndex)
});
