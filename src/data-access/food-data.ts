import {
  AIRTABLE_TABLES
} from '../const';

import {
  filterByIds,
  retrieveAirtableData
} from '../airtable';

import { IFood, IAirtableFood, IHydratedFood } from '@chrisb-dev/seasonal-shared';
import { queryPostgres } from '../postgres';

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

export const getFoodDetailsData = async (
  id: string,
  regionCode: string
): Promise<IHydratedFood> => {
  const result = await queryPostgres<IHydratedFood>(`
    SELECT json_agg(
      json_build_object(
        'id', food.id,
        'name', food.name,
        'imageUrlSmall', food.image_url_small,
        'primaryRecipes', food.primary_recipes,
        'secondaryRecipes', food.secondary_recipes,
        'seasons', food.seasons
      )
    ) AS results
    FROM (
      SELECT
        food.id,
        food.name,
        food.image_url_small,
        (
          SELECT json_agg(
            json_build_object(
              'id' , recipes.id,
              'name', recipes.name,
              'linkUrl', recipes.link_url,
              'imageUrlSmall', recipes.image_url_small,
              'isVegan', recipes.is_vegan,
              'isVegetarian', recipes.is_vegetarian
            )
          ) AS primary_recipes
          FROM recipes
          WHERE recipes.id = ANY(food.primary_food_in_recipe_ids)
        ),
        (
          SELECT json_agg(
            json_build_object(
              'id' , recipes.id,
              'name', recipes.name,
              'linkUrl', recipes.link_url,
              'imageUrlSmall', recipes.image_url_small,
              'isVegan', recipes.is_vegan,
              'isVegetarian', recipes.is_vegetarian
            )
            ) AS secondary_recipes
          FROM recipes
          WHERE recipes.id = ANY(food.secondary_food_in_recipe_ids)
        ),
        (
          SELECT json_agg(
            json_build_object(
              'id', seasons.id,
              'name', seasons.name,
              'seasonIndex', seasons.season_index
            )
          ) as seasons
          FROM seasons
          LEFT JOIN region_to_season_food_map
            ON seasons.id = region_to_season_food_map.season_id
          WHERE
            region_to_season_food_map.food_id = food.id
          AND
            region_to_season_food_map.region_id = '${regionCode}'
        )
      FROM food
      WHERE food.id = '${id}'
    ) food
  `);
  return result.rows[0];
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

export const getAllFoodData = (): Promise<IAirtableFood[]> => {
  return retrieveAirtableData<IAirtableFood>({
    fields: [
      'name',
      'imageUrlSmall'
    ],
    tableName: AIRTABLE_TABLES.FOOD
  });
};
