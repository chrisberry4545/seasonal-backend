WITH
  selected_season AS (
	  SELECT * FROM seasons
    WHERE
      $2::int is NULL
    OR
      seasons.season_index = $2
  ),
  food_in_season AS (
  	SELECT array_agg(region_to_season_food_map.food_id)
    FROM region_to_season_food_map
	  WHERE
      region_to_season_food_map.season_id = ANY(
        SELECT selected_season.id
        FROM selected_season
      )
	  AND
      region_to_season_food_map.region_id = $1
  )

SELECT
  id,
  season_index,
  name,
  recipes
FROM (
	SELECT
    selected_season.id,
    selected_season.season_index,
    selected_season.name,
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
      recipes.primary_food_in_recipe_ids <@ (SELECT array_agg FROM food_in_season)
  )
  FROM selected_season
) seasons;
