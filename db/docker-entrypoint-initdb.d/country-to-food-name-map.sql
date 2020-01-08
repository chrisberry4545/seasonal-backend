DROP TABLE IF EXISTS public.country_to_food_name_map;

CREATE TABLE public.country_to_food_name_map
(
  id uuid,
  country_id uuid,
  food_id uuid,
  name text
);

INSERT INTO public.country_to_food_name_map (
  id,
  country_id,
  food_id,
  name
)
VALUES
  (
    'dcec5b2c-403b-43ae-8745-ef368987552c',
    'd6e57673-eee8-444a-b7be-d9ab553052cf',
    'c6f78568-fe23-47e4-8e65-55934199a39f',
    'Down Under Beetroot'
  );
