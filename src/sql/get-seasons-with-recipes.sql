WITH
  selected_season AS (
    SELECT seasons.id FROM seasons
    WHERE
      $2::int IS NULL
    OR
      seasons.season_index = $2
  ),
  primary_food_recipes AS (
    SELECT unnest(food.primary_food_in_recipe_ids)
      FROM food
      WHERE
      food.id = ANY(
        SELECT food_id FROM public.region_to_season_food_map
        WHERE season_id = ANY(SELECT selected_season.id FROM selected_season)
        AND region_id = $1
      )
    GROUP BY food.id
  ),
  secondary_food_recipes AS (
    SELECT unnest(food.secondary_food_in_recipe_ids)
    FROM food
    WHERE
      food.id = ANY(
        SELECT food_id from public.region_to_season_food_map
        WHERE season_id = ANY(SELECT selected_season.id FROM selected_season)
        AND region_id = $1
      )
    GROUP BY food.id
  )

SELECT
  id,
  season_index,
  name,
  recipes
FROM (
	SELECT
    seasons.id,
    seasons.season_index,
    seasons.name,
  (
    SELECT json_agg(
      json_build_object(
        'id', recipes.id,
        'name' , recipes.name,
        'linkUrl' , recipes.link_url,
        'imageUrlSmall', recipes.image_url_small
      )
      ORDER BY recipes.name
    ) AS recipes
    FROM recipes
    WHERE
      recipes.id = ANY(SELECT primary_food_recipes.unnest FROM primary_food_recipes)
    OR
      recipes.id = ANY(SELECT secondary_food_recipes.unnest FROM secondary_food_recipes)
  )
  FROM seasons
  WHERE
    $2::int is NULL
  OR
    seasons.season_index = $2
) seasons;
