DROP TABLE IF EXISTS public.country_to_recipe_name_map;

CREATE TABLE public.country_to_recipe_name_map
(
  id uuid,
  country_id uuid,
  recipe_id uuid,
  name text
);

INSERT INTO public.country_to_recipe_name_map (
  id,
  country_id,
  recipe_id,
  name
)
VALUES
  (
    '8651458c-3827-4172-b668-b43657f23f73',
    'd6e57673-eee8-444a-b7be-d9ab553052cf',
    '0f7fb18e-ac1d-4023-b315-91ca7e29ce4a',
    'Pickled Down Under Beetroot'
  );
