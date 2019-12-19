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
          region_to_season_food_map.region_id = $1
        AND
          seasons.id = region_to_season_food_map.season_id
      )
  FROM seasons
  WHERE
    $2::int is NULL
  OR
    seasons.season_index = $2
) seasons;
