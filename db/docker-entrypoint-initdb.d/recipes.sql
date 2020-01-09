DROP TABLE IF EXISTS public.recipes;

CREATE TABLE public.recipes
(
    id uuid,
    link_url text,
    image_url_small text,
    is_vegetarian boolean,
    is_vegan boolean,
    name text,
    primary_food_in_recipe_ids uuid[][],
    secondary_food_in_recipe_ids uuid[][]
);

INSERT INTO public.recipes (
  id,
  link_url,
  image_url_small,
  is_vegetarian,
  is_vegan,
  name,
  primary_food_in_recipe_ids,
  secondary_food_in_recipe_ids
)
VALUES
  (
    '0f7fb18e-ac1d-4023-b315-91ca7e29ce4a',
    'https://pickled-beetroot.com',
    'https://pickled-beetroot.com/image',
    false,
    true,
    'Pickled Beetroot',
    ARRAY['c6f78568-fe23-47e4-8e65-55934199a39f']::uuid[],
    ARRAY[]::uuid[]
  ),
  (
    'fefc209f-ddaf-465d-941f-fe3fefa6b931',
    'https://apple-and-cheese.com',
    'https://apple-and-cheese.com/image',
    true,
    false,
    'Apple, Cheese & Onion',
    ARRAY['dd9ba012-8f8e-48af-9775-0139374dd94c']::uuid[],
    ARRAY['d1df368e-6ed1-4a50-bb7d-6163c15df1d3']::uuid[]
  ),
  (
    '053c46cd-584e-46c5-a70d-b79b9ded3cca',
    'https://apple-beetroot-and-cheese.com',
    'https://apple-beetroot-and-cheese.com/image',
    false,
    false,
    'Apple, Beetroot & Meat',
    ARRAY['dd9ba012-8f8e-48af-9775-0139374dd94c', 'c6f78568-fe23-47e4-8e65-55934199a39f']::uuid[],
    ARRAY[]::uuid[]
  );
