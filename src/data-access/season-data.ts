import {
  AIRTABLE_TABLES
} from '../const';

import {
  filterByField,
  retrieveAirtableData,
  retrieveSingleAirtableRow,
  filterByIds
} from '../airtable';

import { IDbSeason } from '../interfaces';
import { queryPostgres } from '../postgres';
import { IHydratedSeason } from '@chrisb-dev/seasonal-shared';

export const getAllSeasonData = async (): Promise<IDbSeason[]> => {
  const result = await queryPostgres<IDbSeason>(`
    SELECT id, season_index, name
    FROM public.seasons;
  `);
  return result.rows;
};

export const getSeasonDataWithIds = (
  ids: string[] | string,
  countryCode?: string
): Promise<IDbSeason[]> => {
  return retrieveAirtableData<IDbSeason>({
    countryCode,
    fields: [
      'name',
      'seasonIndex'
    ],
    filterByFormula: filterByIds(ids),
    tableName: AIRTABLE_TABLES.SEASONS
  });
};

const getSeasonDataWithFoodQuery = (
  countryCode?: string,
  seasonIndex?: number
) => `
SELECT
  id,
  season_index,
  name,
  food
  FROM (
  SELECT
    seasons.id,
    seasons.season_index,
    seasons.name,
    (
      SELECT json_agg(
        json_build_object(
          'id', food.id,
          'name' , food.name,
          'imageUrlSmall', food.image_url_small
        )
        ORDER BY food.name
      ) AS food
      FROM food
      LEFT JOIN region_to_season_food_map
      ON
        region_to_season_food_map.food_id = food.id
      WHERE
        region_to_season_food_map.region_id = '${countryCode}'
      AND
        seasons.id = region_to_season_food_map.season_id
    )
    FROM seasons
    ${
      seasonIndex
        ? `WHERE seasons.season_index = ${seasonIndex}`
        : ''
    }
  ) seasons
`;

export const getSeasonsDataWithFoodBySeasonIndex = async (
  seasonIndex: number,
  countryCode?: string
): Promise<IHydratedSeason> => {
  const result = await queryPostgres<IHydratedSeason>(
    getSeasonDataWithFoodQuery(countryCode, seasonIndex)
  );
  return result.rows[0];
};

export const getAllSeasonDataWithFood = async (
  countryCode?: string
): Promise<IHydratedSeason[]> => {
  const result = await queryPostgres<IHydratedSeason>(
    getSeasonDataWithFoodQuery(countryCode)
  );
  return result.rows;
};

export const getSeasonDataBySeasonIndex = (
  seasonIndex: number
): Promise<IDbSeason> => {
  return retrieveSingleAirtableRow<IDbSeason>({
    fields: [
      'name',
      'regionToSeasonAndFoodMap'
    ],
    filterByFormula:
      filterByField<IDbSeason>('seasonIndex', seasonIndex),
    tableName: AIRTABLE_TABLES.SEASONS
  });
};
