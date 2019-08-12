import { IAirtableFood, IHydratedFood } from '@chrisb-dev/seasonal-shared';
import { hydrateAirtableData } from '../airtable';
import { getSeasonDataWithIds } from './season-data';
import { sortBySeasonIndex } from './data-access-utils';
import { getRecipesWithIds } from './recipe-data';

export const hydrateFoodData = (
  foodData: IAirtableFood,
  countryCode?: string
): Promise<IHydratedFood> => {
  return hydrateAirtableData(
    foodData,
    [
      {
        getIdFunction: getSeasonDataWithIds,
        propertyName: 'seasons'
      },
      {
        getIdFunction: getRecipesWithIds,
        propertyName: 'primaryFoodInRecipe'
      },
      {
        getIdFunction: getRecipesWithIds,
        propertyName: 'secondaryFoodInRecipe'
      }
    ],
    countryCode
  ) as Promise<IHydratedFood>;
};

export const sortHydratedFoodData = (
  foodData: IHydratedFood
): IHydratedFood => ({
  ...foodData,
  seasons: foodData.seasons && foodData.seasons.sort(sortBySeasonIndex)
});
