WITH
	food_name_mappings AS (
		SELECT
      country_to_food_name_map.name
		FROM country_to_food_name_map
		WHERE
		  country_to_food_name_map.country_id = ANY(
			  SELECT
				  regions.country_id
			  FROM
				  regions
			  WHERE
				  regions.code = $1
			)
		AND
		  country_to_food_name_map.food_id = $2
	)

SELECT
  food.id,
  COALESCE((SELECT name FROM food_name_mappings), food.name) AS name,
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
    ) AS primary_food_in_recipe
    FROM recipes
    WHERE
      food.id = ANY(recipes.primary_food_in_recipe_ids)
    OR
      food.id = ANY(recipes.secondary_food_in_recipe_ids)
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
      region_to_season_food_map.region_id = $1
  )
FROM food
WHERE food.id = $2
