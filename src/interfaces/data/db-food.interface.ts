export interface IDbFood {
  id: string;
  name: string;
  image_url_small: string;
  primary_food_in_recipe_ids: string[];
  secondary_food_in_recipe_ids: string[];
  alt_name: string;
  season_id: string;
  season_name: string;
  season_index: number;
  recipe_id: string;
  recipe_link_url: string;
  recipe_name: string;
  recipe_image_url_small: string;
  is_vegan: boolean;
  is_vegetarian: boolean;
}
