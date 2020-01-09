import { IHydratedFood } from '@chrisb-dev/seasonal-shared';
import { queryPostgres, getSqlQuery } from '../postgres';

export const getFoodDetailsData = async (
  id: string,
  regionCode: string
): Promise<IHydratedFood> => {
  const getSingleFoodDetails = await getSqlQuery('get-food-details.sql');
  const result = await queryPostgres<IHydratedFood>(
    getSingleFoodDetails,
    [regionCode, id]
  );
  return result.rows[0];
};
